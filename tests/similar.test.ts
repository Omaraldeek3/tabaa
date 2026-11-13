import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { templates } from "../src/templates/registry.ts";

/** Two templates whose thumbnails score above this under CLIP count as a
 *  repeat. The first 60, all distinct designs, top out at 0.927. */
export const REPEAT = 0.95;

const data = JSON.parse(readFileSync(new URL("../src/templates/similar.json", import.meta.url), "utf8")) as {
  ids: string[]; closest: [string, string, number][]; near: Record<string, string[]>;
};

test("similar.json covers exactly the templates in the registry (run npm run similar)", () => {
  assert.deepEqual(data.ids, templates.map(t => t.id).sort());
  for (const t of templates) assert.equal(data.near[t.id]?.length, 8, t.id);
});

test("no two templates look like repeats", () => {
  const repeats = data.closest.filter(([, , s]) => s >= REPEAT).map(([a, b, s]) => `${s} ${a} ~ ${b}`);
  assert.deepEqual(repeats, []);
});

test("ids and titles are unique", () => {
  const ids = templates.map(t => t.id), titles = templates.map(t => t.title.ar);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(titles.filter((x, i) => titles.indexOf(x) !== i), []);
});
