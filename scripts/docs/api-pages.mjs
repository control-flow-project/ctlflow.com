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
    if (names.length) lines.push(`Accepted query parameters: ${names.map(name => `\`${name}\``).join(", ")}.`, "");
    lines.push("Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.", "");
  }
  if (details.constraints.length) {
    lines.push("### Additional checks", "", "The following checks apply in addition to the field limits.", "");
    for (const constraint of details.constraints) lines.push(`Constraint on \`${constraint.prefix}\`:`, "", "```typescript", constraint.text, "```", "");
  }
  lines.push("### Validation", "", "```typescript", sourceText(field.expression, field.module), "```", "");
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
    "> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.", "",
    "Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.", "",
    "- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)", "");
  lines.push("| Property | Value |", "| --- | --- |",
    `| Service | \`${product}\` |`,
    `| Operation | \`${operation.name}\` |`,
    `| Method | \`${operation.method}\` |`,
    `| Path | \`${operation.path}\` |`,
    `| Authentication | \`${operation.auth}\` |`,
    `| Success status | \`${operation.status}\` |`,
    `| Response data | ${operation.collection ? "Paginated collection" : "Unpaginated value"} |`,
    `| Request format | \`${operation.requestFormat ?? "json"}\` |`,
    `| Maximum request body | ${operation.requestBytes ?? (product === "fleetd" ? 1048576 : 2097152)} bytes${operation.requestBytes === undefined ? " (service default)" : " (operation-specific)"} |`,
    `| Permission codes | ${operation.permissions.length ? operation.permissions.map(permission => `\`${permission}\``).join(", ") : "None declared"} |`, "",
    "Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.", "");
  if (operation.status === 202) lines.push("HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.", "");
  if (operation.requestFormat === "binary") lines.push("Send raw declared file bytes. The length, SHA-256 and media type must match the staged manifest. Commit the publication after uploading its files.", "");
  lines.push("- [Authentication, envelopes and pagination](/docs/api/http/)", "- [Language-neutral client examples](/docs/api/client-examples/)", "");
  for (const [key, label] of [["params", "Path parameters"], ["query", "Query parameters"], ["input", "Request body"], ["output", "Response data"]]) {
    if (key === "input" && operation.requestFormat === "binary") {
      lines.push("## Request body", "", "Use `Content-Type: application/octet-stream` and a canonical decimal `Content-Length` matching the staged file. The body must remain within the operation limit and match the declared SHA-256. Do not wrap it in JSON or base64.", "", "`BinaryInput` below describes the server's representation of the upload stream. `chunks` is not an HTTP request field.", "", "### Server-side stream validation", "", "```typescript", sourceText(operation.fields.get(key).expression, operation.module), "```", "", ...references(model, operation.fields.get(key).expression, operation.module).map(link => `- ${link}`), "");
    } else lines.push(parserSection(model, operation.fields.get(key), label));
  }
  lines.push("## Response envelope", "", "A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.", "", "```json", JSON.stringify({ data: "<value matching the response-data validator>", meta: { requestId: "00000000-0000-0000-0000-000000000001", ...(operation.collection ? { page: 1, pageSize: 20, totalItems: 0, totalPages: 1 } : {}) } }, null, 2), "```", "");
  return lines.join("\n");
}

export function apiIndex(operations, product) {
  const lines = [frontmatter({ title: product === "fleetd" ? "fleetd private API" : "crossfire HTTP API", description: `${operations.length} HTTP operations with request fields, responses and validation.`, weight: product === "crossfire" ? 30 : 40, operationCount: operations.length, generated: true, noCards: true }),
    product === "fleetd" ? "fleet calls this **private Unix-socket API** locally or over SSH. Every operation requires the OS-user controller credential in `Authorization: Bearer <authenticationKey>`, in addition to private socket ownership. fleetd initializes the key; fleet reads it from the same private OS-native configuration. There are no anonymous endpoints. See [controller authentication](/docs/fleetd/authentication/) for paths, remote access and recovery." : "The crossfire server exposes these routes. Its Node, C# managed, C# NativeAOT and Rust implementations serve the same API.", "", "These pages are generated from the operation definitions and validation functions. Each page includes field limits and custom validation code.", "", "| Operation | Method | Path | Authentication | Success |", "| --- | --- | --- | --- | --- |"];
  for (const operation of operations) lines.push(`| [\`${operation.name}\`](/docs/api/${product}/${slug(operation.name)}/) | \`${operation.method}\` | \`${operation.path}\` | \`${operation.auth}\` | ${operation.status} |`);
  return `${lines.join("\n")}\n`;
}

export function schemaPage(model, module) {
  const lines = [frontmatter({ title: module.relative.replace(/^services\//u, ""), linkTitle: path.basename(module.filename, ".ts"), description: "Validation functions, types and constants from the recorded source revision.", sourceProject: "ctlflow", sourcePath: module.relative, generated: true }),
    "## Definitions", "", "These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.", "", "### Imported definitions", ""];
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
  if (!declarations.size) lines.push("## Module", "", "```typescript", module.text, "```", "");
  return lines.join("\n");
}
