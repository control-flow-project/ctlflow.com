import path from "node:path";
import ts from "typescript";
import { frontmatter } from "./sources.mjs";
import { schemaId, sourceText } from "./model.mjs";
import { describe, fieldRows, references } from "./fields.mjs";

const escaped = value => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
export const slug = name => name.replace(/([a-z0-9])([A-Z])/gu, "$1-$2").toLowerCase();

function queryNames(expression) {
  const names = new Set();
  function visit(node) {
    if (ts.isCallExpression(node)) {
      if (ts.isPropertyAccessExpression(node.expression) && ["get", "getAll", "has"].includes(node.expression.name.text)) {
        const first = node.arguments[0];
        if (first && ts.isStringLiteral(first)) names.add(first.text);
      }
      if (ts.isIdentifier(node.expression) && ["listQuery", "checked"].includes(node.expression.text)) {
        for (const argument of node.arguments) if (ts.isArrayLiteralExpression(argument)) for (const item of argument.elements) if (ts.isStringLiteral(item)) names.add(item.text);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(expression);
  return [...names];
}

function parserSection(model, field, label) {
  const details = fieldRows(model, field.expression, field.module);
  const lines = [`## ${label}`, "", describe(model, field.expression, field.module), ""];
  if (details.rows.length) {
    lines.push("| Field path | Representation and constraints |", "| --- | --- |");
    for (const row of details.rows) lines.push(`| \`${escaped(row.path)}\` | ${escaped(row.type)} |`);
    lines.push("");
  }
  const resolved = model.resolve(field.expression, field.module);
  if (label === "Query parameters") {
    const names = queryNames(resolved.expression);
    if (names.length) lines.push(`Explicit query names in this parser: ${names.map(name => `\`${name}\``).join(", ")}.`, "");
    lines.push("Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.", "");
  }
  if (details.constraints.length) {
    lines.push("### Custom constraints", "", "These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.", "");
    for (const constraint of details.constraints) lines.push(`Constraint on \`${constraint.prefix}\`:`, "", "```typescript", constraint.text, "```", "");
  }
  lines.push("### Exact validator", "", "```typescript", sourceText(field.expression, field.module), "```", "");
  const links = references(model, field.expression, field.module);
  if (links.length) lines.push("Referenced definitions:", "", ...links.map(link => `- ${link}`), "");
  return lines.join("\n");
}

export function operationPage(model, operation, product) {
  const info = {
    title: `${operation.method} ${operation.path}`,
    linkTitle: operation.name,
    description: operation.description,
    sourceProject: "ctlflow",
    sourcePath: operation.module.relative,
    operation: operation.name,
    product,
    generated: true,
  };
  const lines = [frontmatter(info), `## ${operation.description}`, ""];
  if (product === "fleetd") lines.push(
    "> Private controller API. This route is carried over the owning user's Unix socket, locally or through SSH. The catalog's `auth: public` does not make it an Internet-public endpoint; filesystem/socket ownership supplies the transport admission boundary.", "");
  lines.push("| Contract fact | Value |", "| --- | --- |",
    `| Product owner | \`${product}\` |`,
    `| Operation | \`${operation.name}\` |`,
    `| Method | \`${operation.method}\` |`,
    `| Path | \`${operation.path}\` |`,
    `| Catalog audience | \`${operation.auth}\` |`,
    `| Success status | \`${operation.status}\` |`,
    `| Response data | ${operation.collection ? "Collection; paginated response metadata is required" : "Single value; not a collection operation"} |`,
    `| Request format | \`${operation.requestFormat ?? "json"}\` |`,
    `| Request byte ceiling | ${operation.requestBytes ?? (product === "fleetd" ? 1048576 : 2097152)} bytes${operation.requestBytes === undefined ? " (product HTTP default; not the model-inline limit)" : " (operation-specific)"} |`,
    `| Declared permissions | ${operation.permissions.length ? operation.permissions.map(permission => `\`${permission}\``).join(", ") : "No permission codes declared; domain/credential/transport checks still apply"} |`, "",
    "Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.", "");
  if (operation.status === 202) lines.push("HTTP 202 records accepted intent. It does not establish native application, process completion or completion of model work.", "");
  if (operation.requestFormat === "binary") lines.push("The request body is raw declared file bytes, not a JSON wrapper or base64 field. The staged manifest owns the exact byte length, SHA-256 and media type; publication is a separate commit operation.", "");
  lines.push("- [Authentication, envelopes and pagination](/docs/api/http/)", "- [Language-neutral client examples](/docs/api/client-examples/)", "");
  for (const [key, label] of [["params", "Path parameters"], ["query", "Query parameters"], ["input", "Request body"], ["output", "Response data"]]) {
    if (key === "input" && operation.requestFormat === "binary") {
      lines.push("## Request body", "", "Send raw bytes with `Content-Type: application/octet-stream` and the exact canonical decimal `Content-Length`. The length must match the staged file, remain within the operation limit, and hash to the declared SHA-256. Do not send a JSON object or base64 wrapper.", "", "The named `BinaryInput` validator below describes the server-internal stream adapter result, not a client JSON field schema. Clients never provide `chunks` or an `AsyncIterable` object over HTTP.", "", "### Server-side transport validator", "", "```typescript", sourceText(operation.fields.get(key).expression, operation.module), "```", "", ...references(model, operation.fields.get(key).expression, operation.module).map(link => `- ${link}`), "");
    } else lines.push(parserSection(model, operation.fields.get(key), label));
  }
  lines.push("## Response envelope", "", "The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.", "", "```json", JSON.stringify({ data: "<value matching the response-data validator>", meta: { requestId: "00000000-0000-0000-0000-000000000001", ...(operation.collection ? { page: 1, pageSize: 20, totalItems: 0, totalPages: 1 } : {}) } }, null, 2), "```", "", "The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.", "");
  return lines.join("\n");
}

export function apiIndex(operations, product) {
  const lines = [frontmatter({ title: product === "fleetd" ? "fleetd private API" : "crossfire HTTP API", description: `${operations.length} exact ${product} operation contracts, with nested fields, custom predicates and source definitions.`, weight: product === "crossfire" ? 30 : 40, operationCount: operations.length, generated: true, noCards: true }),
    product === "fleetd" ? "This is a **private Unix-socket API**, not an Internet-exposed service. fleet uses it locally or over authenticated SSH. Catalog `auth: public` means no separate human/agent cookie or bearer requirement inside that private transport boundary." : "These routes belong to the crossfire coordination server. Node, C# managed, C# NativeAOT and Rust serve the same contract. Catalog presence does not bypass domain authorization.", "", "The reference is generated from the executable operation catalog and its transitive parser definitions. Nested objects, array items, optional/null fields, scalar bounds and custom predicates are retained. This is not a generated OpenAPI/JSON Schema claim.", "", "| Operation | Method | Path | Audience | Success |", "| --- | --- | --- | --- | --- |"];
  for (const operation of operations) lines.push(`| [\`${operation.name}\`](/docs/api/${product}/${slug(operation.name)}/) | \`${operation.method}\` | \`${operation.path}\` | \`${operation.auth}\` | ${operation.status} |`);
  return `${lines.join("\n")}\n`;
}

export function schemaPage(model, module) {
  const lines = [frontmatter({ title: module.relative.replace(/^services\//u, ""), linkTitle: path.basename(module.filename, ".ts"), description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries.", sourceProject: "ctlflow", sourcePath: module.relative, generated: true }),
    "## How to read this page", "", "These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.", "", "### Imported definitions", ""];
  const imports = [...new Set([...module.imports.values()].map(item => item.file))].filter(filename => model.modules.has(filename));
  if (imports.length) for (const filename of imports) { const imported = model.load(filename); lines.push(`- [\`${imported.relative}\`](/docs/api/schemas/${schemaId(imported)}/)`); }
  else lines.push("This module has no local contract dependencies.");
  lines.push("");
  const declarations = new Map();
  for (const [name, binding] of module.bindings) {
    lines.push(`## ${name} {#${name}}`, "", "```typescript", sourceText(binding.declaration, module), "```", "");
    declarations.set(binding.declaration, true);
    const links = references(model, binding.expression, module).filter(link => !link.includes(`/#${name})`));
    if (links.length) lines.push("Related definitions:", "", ...links.map(link => `- ${link}`), "");
  }
  if (!declarations.size) lines.push("## Exact module", "", "```typescript", module.text, "```", "");
  return lines.join("\n");
}
