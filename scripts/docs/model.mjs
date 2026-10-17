import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export function unwrap(expression) {
  while (expression && (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression) || ts.isParenthesizedExpression(expression) || ts.isTypeAssertionExpression(expression))) expression = expression.expression;
  return expression;
}

export function createModel(root, source = {}) {
  const modules = new Map();
  function load(filename) {
    const absolute = path.resolve(filename);
    if (modules.has(absolute)) return modules.get(absolute);
    if (!absolute.startsWith(`${path.resolve(root)}/`)) throw new Error("Contract dependency escaped source root");
    const text = source.read ? source.read(path.relative(root, absolute)) : fs.readFileSync(absolute, "utf8");
    const file = ts.createSourceFile(absolute, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (file.parseDiagnostics.length) throw new Error(`Cannot parse ${absolute}`);
    const module = { filename: absolute, relative: path.relative(root, absolute), text, file, bindings: new Map(), imports: new Map(), exports: [] };
    modules.set(absolute, module);
    for (const statement of file.statements) {
      if (ts.isImportDeclaration(statement) && statement.importClause && ts.isStringLiteral(statement.moduleSpecifier)) {
        const specifier = statement.moduleSpecifier.text;
        let dependency;
        if (specifier.startsWith(".")) dependency = path.resolve(path.dirname(absolute), specifier.replace(/\.js$/u, ".ts"));
        const aliases = {
          "@ctlflow/crossfire-contracts/": "services/crossfire/node/packages/contracts/src/",
          "@ctlflow/crossfire-domain/": "services/crossfire/node/packages/domain/src/",
          "@ctlflow/crossfire-kernel/": "services/crossfire/node/packages/kernel/src/",
        };
        for (const [prefix, target] of Object.entries(aliases)) if (specifier.startsWith(prefix)) dependency = path.join(root, target, `${specifier.slice(prefix.length)}.ts`);
        if (!dependency || !(source.exists ? source.exists(path.relative(root, dependency)) : fs.existsSync(dependency))) continue;
        const clause = statement.importClause.namedBindings;
        if (clause && ts.isNamespaceImport(clause)) module.imports.set(clause.name.text, { file: dependency });
        if (clause && ts.isNamedImports(clause)) for (const element of clause.elements) module.imports.set(element.name.text, { file: dependency, name: element.propertyName?.text ?? element.name.text });
      }
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name) && declaration.initializer) module.bindings.set(declaration.name.text, { expression: declaration.initializer, declaration, module });
          if (ts.isObjectBindingPattern(declaration.name) && declaration.initializer) {
            const excluded = declaration.name.elements.filter(element => !element.dotDotDotToken).map(element => element.propertyName?.getText(file) ?? element.name.getText(file));
            for (const element of declaration.name.elements) if (element.dotDotDotToken && ts.isIdentifier(element.name)) module.bindings.set(element.name.text, { expression: declaration.initializer, declaration, module, excluded });
          }
        }
      }
      if ((ts.isFunctionDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) && statement.name) module.bindings.set(statement.name.text, { expression: statement, declaration: statement, module });
      if (statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) module.exports.push(statement);
    }
    return module;
  }
  function resolve(expression, module, visited = new Set()) {
    const current = unwrap(expression);
    if (!current) return { expression: current, module };
    let binding;
    if (ts.isIdentifier(current)) {
      binding = module.bindings.get(current.text);
      const imported = module.imports.get(current.text);
      if (!binding && imported?.name) binding = load(imported.file).bindings.get(imported.name);
    }
    if (ts.isPropertyAccessExpression(current) && ts.isIdentifier(current.expression)) {
      const imported = module.imports.get(current.expression.text);
      if (imported && !imported.name) binding = load(imported.file).bindings.get(current.name.text);
      if (!binding) {
        const object = objectFields(current.expression, module, visited);
        const field = object?.get(current.name.text);
        if (field) return resolve(field.expression, field.module, visited);
      }
    }
    if (!binding) return { expression: current, module };
    const key = `${binding.module.filename}:${binding.declaration.pos}:${binding.excluded?.join(",") ?? ""}`;
    if (visited.has(key)) return { expression: current, module };
    const nextVisited = new Set(visited).add(key);
    if (binding.excluded) {
      const resolved = resolve(binding.expression, binding.module, nextVisited);
      return { ...resolved, excluded: [...(resolved.excluded ?? []), ...binding.excluded] };
    }
    return resolve(binding.expression, binding.module, nextVisited);
  }
  function objectFields(expression, module, visited = new Set()) {
    const original = unwrap(expression);
    if (!original) return null;
    let resolved = { expression: original, module };
    if (!ts.isObjectLiteralExpression(original)) resolved = resolve(original, module, visited);
    const current = unwrap(resolved.expression);
    if (!ts.isObjectLiteralExpression(current)) return null;
    const fields = new Map();
    for (const property of current.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = objectFields(property.expression, resolved.module, new Set(visited));
        if (!spread) throw new Error(`Unresolved object spread ${property.getText(resolved.module.file)} in ${resolved.module.relative}`);
        for (const [name, field] of spread) fields.set(name, field);
      } else if (ts.isPropertyAssignment(property)) fields.set(property.name.getText(resolved.module.file).replace(/^['"]|['"]$/gu, ""), { expression: property.initializer, module: resolved.module });
      else if (ts.isShorthandPropertyAssignment(property)) fields.set(property.name.text, { expression: property.name, module: resolved.module });
      else throw new Error(`Unsupported contract property ${property.kind}`);
    }
    for (const omitted of resolved.excluded ?? []) fields.delete(omitted);
    return fields;
  }
  function scalar(expression, module) {
    const resolved = resolve(expression, module);
    const current = unwrap(resolved.expression);
    if (!current) return null;
    if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) return current.text;
    if (ts.isNumericLiteral(current)) return Number(current.text.replaceAll("_", ""));
    if (current.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (current.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (ts.isPrefixUnaryExpression(current) && current.operator === ts.SyntaxKind.MinusToken) { const value = scalar(current.operand, resolved.module); return typeof value === "number" ? -value : null; }
    if (ts.isPropertyAccessExpression(current) && current.getText(resolved.module.file) === "Number.MAX_SAFE_INTEGER") return Number.MAX_SAFE_INTEGER;
    if (ts.isPropertyAccessExpression(current) && current.getText(resolved.module.file) === "Number.MIN_SAFE_INTEGER") return Number.MIN_SAFE_INTEGER;
    if (ts.isBinaryExpression(current)) {
      const left = scalar(current.left, resolved.module), right = scalar(current.right, resolved.module);
      if (typeof left !== "number" || typeof right !== "number") return null;
      if (current.operatorToken.kind === ts.SyntaxKind.AsteriskToken) return left * right;
      if (current.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + right;
      if (current.operatorToken.kind === ts.SyntaxKind.MinusToken) return left - right;
    }
    if (ts.isArrayLiteralExpression(current)) return current.elements.flatMap(element => {
      const value = scalar(ts.isSpreadElement(element) ? element.expression : element, resolved.module);
      return ts.isSpreadElement(element) && Array.isArray(value) ? value : [value];
    });
    return null;
  }
  function bindingFor(expression, module) {
    const current = unwrap(expression);
    if (ts.isIdentifier(current)) {
      const local = module.bindings.get(current.text);
      if (local) return { name: current.text, ...local };
      const imported = module.imports.get(current.text);
      if (imported?.name) { const target = load(imported.file); const value = target.bindings.get(imported.name); if (value) return { name: imported.name, ...value }; }
    }
    if (ts.isPropertyAccessExpression(current) && ts.isIdentifier(current.expression)) {
      const imported = module.imports.get(current.expression.text);
      if (imported && !imported.name) { const target = load(imported.file); const value = target.bindings.get(current.name.text); if (value) return { name: current.name.text, ...value }; }
    }
    return null;
  }
  function closure(module) {
    const pending = [module];
    const included = new Map();
    while (pending.length) {
      const current = pending.pop();
      if (included.has(current.filename)) continue;
      included.set(current.filename, current);
      for (const imported of current.imports.values()) pending.push(load(imported.file));
    }
    return [...included.values()].sort((first, second) => first.relative.localeCompare(second.relative));
  }
  return { modules, load, resolve, objectFields, scalar, bindingFor, closure };
}

export function extractOperations(model, filename) {
  const module = model.load(filename);
  const catalog = module.bindings.get("operations");
  if (!catalog) throw new Error("No operation catalog");
  const declarations = model.objectFields(catalog.expression, module);
  return [...declarations].map(([name, value]) => {
    const call = unwrap(value.expression);
    if (!ts.isCallExpression(call) || call.expression.getText(module.file) !== "operation") throw new Error(`Unsupported operation ${name}`);
    const fields = model.objectFields(call.arguments[0], module);
    const metadata = {};
    for (const key of ["method", "path", "auth", "status", "collection", "permissions", "description", "requestBytes", "requestFormat"]) {
      const field = fields.get(key);
      if (field) { const result = model.scalar(field.expression, field.module); if (result === null) throw new Error(`Unresolved ${name}.${key}`); metadata[key] = result; }
    }
    for (const required of ["method", "path", "auth", "status", "collection", "permissions", "description"]) if (!(required in metadata)) throw new Error(`Missing ${name}.${required}`);
    for (const required of ["params", "query", "input", "output"]) if (!fields.has(required)) throw new Error(`Missing ${name}.${required}`);
    return { name, module, fields, line: module.file.getLineAndCharacterOfPosition(call.getStart(module.file)).line + 1, ...metadata };
  });
}

export function schemaId(module) {
  return module.relative.replace(/^services\//u, "").replace(/\/node\/packages\//u, "/").replace(/\/src\//u, "/").replace(/\.ts$/u, "").replaceAll("/", "-");
}

export function sourceText(expression, module) {
  return ts.createPrinter({ newLine: ts.NewLineKind.LineFeed }).printNode(ts.EmitHint.Unspecified, expression, module.file);
}
