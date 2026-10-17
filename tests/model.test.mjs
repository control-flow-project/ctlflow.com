import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createModel, extractOperations, schemaId } from "../scripts/docs/model.mjs";
import { definitionLink, describe, fieldRows } from "../scripts/docs/fields.mjs";
import { operationPage, schemaPage } from "../scripts/docs/api-pages.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
function fixture(context, source) {
  fs.mkdirSync(path.join(root, ".temp"), { recursive: true });
  const directory = fs.mkdtempSync(path.join(root, ".temp/model-test-"));
  context.after(() => fs.rmSync(directory, { recursive: true }));
  fs.mkdirSync(path.join(directory, "schema"));
  fs.writeFileSync(path.join(directory, "schema/validation.ts"), "export const empty = object({}); export const identifier = input => input; export const boolean = input => input; export function object(value) { return value; }");
  fs.writeFileSync(path.join(directory, "contract.ts"), `import * as check from './schema/validation.js';\n${source}`);
  return { model: createModel(directory), filename: path.join(directory, "contract.ts") };
}

test("nested imported shapes, scalar bounds, spreads and refinements are preserved", context => {
  const source = `
const maximum = 64 * 1024;
const original = { hidden: check.text(10), preserved: check.integer(-100, maximum) };
const { hidden: _hidden, ...rest } = original;
export const input = check.refine(check.object({
  ...rest,
  records: check.list(check.object({ id: check.identifier,
    title: check.optional(check.nullable(check.text(90, 2))) }), 20, 1),
  mode: check.choice('shared', 'per-room')
}), value => value.records.length > 0, 'Required records');`;
  const { model, filename } = fixture(context, source);
  const module = model.load(filename);
  const expression = module.bindings.get("input").expression;
  const fields = fieldRows(model, expression, module);
  assert.equal(fields.rows.some(row => row.path === "hidden"), false, "destructured field must be removed");
  assert.equal(fields.rows.some(row => row.path === "preserved" && row.type.includes("-100…65536")), true, "native bound must resolve exactly");
  assert.equal(fields.rows.some(row => row.path === "records[].id"), true, "nested item identity must remain");
  assert.equal(fields.rows.some(row => row.path === "records[].title" && row.type.includes("optional property") && row.type.includes("JSON null")), true, "optional and nullable are distinct");
  assert.equal(fields.constraints.some(item => item.text.includes("value.records.length > 0")), true, "real predicate must be retained");
});

test("custom discriminated parser branches remain visible", context => {
  const { model, filename } = fixture(context, `export const schedule = input => {
    if (input.kind === 'interval') return check.object({ kind: check.choice('interval'), seconds: check.integer(1, 31536000) })(input);
    if (input.kind === 'cron') return check.object({ kind: check.choice('cron'), expression: check.text(200), timeZone: check.text(100) })(input);
    throw new Error('Unknown schedule');
  };`);
  const module = model.load(filename);
  const fields = fieldRows(model, module.bindings.get("schedule").expression, module);
  assert.equal(fields.rows.some(item => item.path.startsWith("seconds") && item.type.includes("31536000")), true);
  assert.equal(fields.rows.some(item => item.path.startsWith("timeZone")), true);
  assert.equal(fields.constraints[0].text.includes("Unknown schedule"), true);
});

test("case-distinct type and value anchors target their exact declarations", context => {
  const { model, filename } = fixture(context, "export const fleetView = check.object({}); export type FleetView = { id: string }; export const output = fleetView;");
  const module = model.load(filename);
  const rendered = schemaPage(model, module);
  assert.equal(rendered.includes("## fleetView {#fleetView}"), true);
  assert.equal(rendered.includes("## FleetView {#FleetView}"), true);
  assert.equal(definitionLink(model, module.bindings.get("output").expression, module).endsWith("#fleetView)"), true);
});

test("operation extraction expands defaults and preserves binary override", context => {
  const { model, filename } = fixture(context, `const common = { auth: 'agent', status: 201, collection: false, permissions: ['publication.publish.self'] };
  export const operations = { upload: operation({ ...common, method: 'PUT', path: '/api/files/{fileId}',
    params: check.object({ fileId: check.identifier }), query: check.empty, input: check.empty, output: check.empty,
    requestFormat: 'binary', requestBytes: 8 * 1024 * 1024, description: 'Upload exact bytes' }) };`);
  const operations = extractOperations(model, filename);
  assert.equal(operations.length, 1);
  assert.equal(operations[0].requestBytes, 8388608);
  const page = operationPage(model, operations[0], "crossfire");
  assert.equal(page.includes("raw declared file bytes"), true);
  assert.equal(page.includes("8388608 bytes"), true);
});

test("unknown metadata and unresolved spreads fail closed", context => {
  const { model, filename } = fixture(context, `export const operations = { value: operation({ method: unknownMethod, path: '/api/value', auth: 'public',
    params: check.empty, query: check.empty, input: check.empty, output: check.empty, status: 200, collection: false, permissions: [], description: 'Read' }) };`);
  assert.throws(() => extractOperations(model, filename), /Unresolved value.method/u);
  const another = fixture(context, "export const value = check.object({ ...unknownFields });");
  const module = another.model.load(another.filename);
  assert.throws(() => fieldRows(another.model, module.bindings.get("value").expression, module), /Unresolved object spread/u);
});

test("schema IDs retain product owner and optional null description is precise", context => {
  assert.equal(schemaId({ relative: "services/fleetd/node/packages/contracts/src/api.ts" }), "fleetd-contracts-api");
  const { model, filename } = fixture(context, "export const value = check.optional(check.nullable(check.integer()));");
  const module = model.load(filename);
  const output = describe(model, module.bindings.get("value").expression, module);
  assert.equal(output.includes("9007199254740991"), true);
  assert.equal(output.includes("optional property"), true);
  assert.equal(output.includes("JSON null permitted"), true);
});

test("omitted bounds use declared defaults while supplied unresolved bounds fail", context => {
  const source = `
export const valid = check.list(check.text());
export const badText = check.text(dynamicBound());
export const badInteger = check.integer(0, dynamicBound());
export const badList = check.list(check.identifier, dynamicBound());
export const badMinimum = check.list(check.identifier, 100, dynamicBound());
export const badChoice = check.choice('known', unknownChoice);
export const badSpreadChoice = check.choice(...['known', unknownChoice]);`;
  const { model, filename } = fixture(context, source);
  const module = model.load(filename);
  const output = describe(model, module.bindings.get("valid").expression, module);
  assert.equal(output.includes("0–100 entries"), true);
  assert.equal(output.includes("1–255 UTF-16 units"), true);
  for (const name of ["badText", "badInteger", "badList", "badMinimum"]) assert.throws(() => describe(model, module.bindings.get(name).expression, module), /Unresolved numeric contract bound/u, name);
  for (const name of ["badChoice", "badSpreadChoice"]) assert.throws(() => describe(model, module.bindings.get(name).expression, module), /Unresolved/u, name);
});
