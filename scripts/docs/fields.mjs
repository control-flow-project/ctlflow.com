import ts from "typescript";
import { schemaId, sourceText, unwrap } from "./model.mjs";

const builtins = new Set(["refine", "optional", "nullable", "list", "object", "text", "plainText", "integer", "choice"]);
const inline = value => String.fromCharCode(96) + value + String.fromCharCode(96);
const scalarNames = {
  boolean: "boolean",
  identifier: "lowercase opaque UUID",
  name: "lowercase name; pattern `[a-z][a-z0-9-]{0,39}`",
  matrixUserId: "well-formed Matrix user ID; maximum 255 UTF-16 units",
  roomId: "immutable Matrix room ID; maximum 255 UTF-16 units",
  eventId: "opaque Matrix event ID; maximum 255 UTF-16 units",
  secret: "43-character base64url private claim (32 bytes)",
  multiline: "well-formed plain text; maximum 8192 UTF-8 bytes",
  empty: "empty object; unknown fields rejected",
};

export function definitionLink(model, expression, module) {
  const binding = model.bindingFor(expression, module);
  return binding ? `[${inline(binding.name)}](/docs/api/schemas/${schemaId(binding.module)}/#${binding.name})` : null;
}

function primitive(expression, module) {
  const current = unwrap(expression);
  if (!ts.isPropertyAccessExpression(current)) return null;
  const name = current.name.text;
  const imported = ts.isIdentifier(current.expression) ? module.imports.get(current.expression.text) : null;
  return imported?.file.endsWith("/schema/validation.ts") ? name : null;
}

export function describe(model, expression, module, visited = new Set()) {
  const current = unwrap(expression);
  const primitiveName = primitive(current, module);
  if (primitiveName && scalarNames[primitiveName]) return scalarNames[primitiveName];
  if (ts.isCallExpression(current)) {
    const name = primitive(current.expression, module);
    const args = current.arguments;
    const values = args.map(argument => model.scalar(argument, module));
    function bound(index, defaultValue) {
      if (args[index] === undefined && defaultValue !== undefined) return defaultValue;
      const value = values[index];
      if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error(`Unresolved numeric contract bound in ${module.relative}: ${args[index] ? sourceText(args[index], module) : "missing argument"}`);
      return value;
    }
    if (name === "text") return `string; ${bound(1, 1)}–${bound(0, 255)} UTF-16 units; well-formed Unicode; no C0/DEL controls`;
    if (name === "plainText") return `plain-text string; at most ${bound(0)} UTF-8 bytes; allowed whitespace controls only`;
    if (name === "integer") return `exact JSON integer; ${bound(0, 0)}…${bound(1, Number.MAX_SAFE_INTEGER)}`;
    if (name === "choice") return args.flatMap(argument => {
      if (ts.isSpreadElement(argument)) { const items = model.scalar(argument.expression, module); if (!Array.isArray(items) || items.some(item => typeof item !== "string")) throw new Error("Unresolved choice spread"); return items; }
      const value = model.scalar(argument, module);
      if (typeof value !== "string") throw new Error(`Unresolved contract choice in ${module.relative}: ${sourceText(argument, module)}`);
      return [value];
    }).map(value => inline(String(value))).join(" or ");
    if (name === "optional") return `${describe(model, args[0], module, visited)}; optional property`;
    if (name === "nullable") return `${describe(model, args[0], module, visited)}; JSON null permitted`;
    if (name === "list") return `array; ${bound(2, 0)}–${bound(1, 100)} entries; item: ${describe(model, args[0], module, visited)}`;
    if (name === "object") return "object; fields below; unknown fields rejected";
    if (name === "refine") return `${describe(model, args[0], module, visited)}; constraint: ${String(values[2] ?? "see additional checks below")}`;
  }
  const binding = model.bindingFor(current, module);
  if (binding) {
    const key = `${binding.module.relative}:${binding.name}`;
    const link = definitionLink(model, current, module);
    if (visited.has(key)) return `recursive reference ${link}`;
    const next = new Set(visited).add(key);
    if (ts.isFunctionDeclaration(binding.expression) || ts.isArrowFunction(unwrap(binding.expression))) return `custom validation: ${link}; see function below`;
    return `${describe(model, binding.expression, binding.module, next)} (${link})`;
  }
  if (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) return "custom validation; see function below";
  const resolved = model.resolve(current, module);
  if (resolved.expression !== current) return describe(model, resolved.expression, resolved.module, visited);
  return `validator ${inline(sourceText(current, module).replaceAll("|", "\\|").replaceAll("\n", " "))}`;
}

export function fieldRows(model, expression, module) {
  const rows = [];
  const constraints = new Map();
  const seen = new Set();
  function walk(currentExpression, currentModule, prefix, suffix = "") {
    const original = unwrap(currentExpression);
    const builtin = primitive(original, currentModule);
    if (builtin && scalarNames[builtin]) return;
    if (ts.isCallExpression(original)) {
      const name = primitive(original.expression, currentModule);
      if (name === "refine") {
        const predicate = sourceText(original.arguments[1], currentModule);
        constraints.set(`${currentModule.relative}:${predicate}`, { prefix: prefix || "object", text: predicate, module: currentModule });
        walk(original.arguments[0], currentModule, prefix, suffix);
        return;
      }
      if (name === "optional" || name === "nullable") { walk(original.arguments[0], currentModule, prefix, suffix); return; }
      if (name === "list") { walk(original.arguments[0], currentModule, `${prefix}[]`, suffix); return; }
      if (name === "object") {
        const fields = model.objectFields(original.arguments[0], currentModule);
        if (!fields) throw new Error("Unresolved schema object");
        for (const [name, field] of fields) {
          const key = prefix ? `${prefix}.${name}` : name;
          rows.push({ path: key + suffix, type: describe(model, field.expression, field.module) });
          walk(field.expression, field.module, key, suffix);
        }
        return;
      }
      if (name && builtins.has(name)) return;
    }
    const binding = model.bindingFor(original, currentModule);
    if (binding) {
      const key = `${binding.module.relative}:${binding.name}:${prefix}`;
      if (seen.has(key)) return;
      seen.add(key);
      walk(binding.expression, binding.module, prefix, suffix);
      return;
    }
    if (ts.isArrowFunction(original) || ts.isFunctionDeclaration(original) || ts.isFunctionExpression(original)) {
      const body = original.body;
      const code = sourceText(original, currentModule);
      constraints.set(`${currentModule.relative}:${code}`, { prefix: prefix || "value", text: code, module: currentModule });
      let variant = 0;
      function visit(node) {
        if (ts.isCallExpression(node) && primitive(node.expression, currentModule) === "object") {
          variant += 1;
          walk(node, currentModule, prefix, ` (parser branch ${variant})`);
        } else ts.forEachChild(node, visit);
      }
      if (body) visit(body);
    }
  }
  walk(expression, module, "");
  return { rows, constraints: [...constraints.values()] };
}

export function references(model, expression, module) {
  const links = new Map();
  function visit(node) {
    if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
      const binding = model.bindingFor(node, module);
      if (binding) links.set(`${binding.module.relative}:${binding.name}`, definitionLink(model, node, module));
    }
    ts.forEachChild(node, visit);
  }
  visit(expression);
  return [...links.values()];
}
