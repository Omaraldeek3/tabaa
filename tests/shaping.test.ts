import assert from "node:assert/strict";
import { test } from "node:test";
import { ink } from "../src/lib/color.ts";
import { fonts } from "../src/lib/fonts.ts";
import { pathBounds } from "../src/lib/pathdata.ts";
import { resolveScene } from "../src/lib/resolve.ts";
import { g, scene, text, walk } from "../src/lib/scene.ts";
import { textToPath, visualRuns } from "../src/lib/shaping.ts";
import { useDiskFonts } from "./setup.ts";

useDiskFonts();
const base = { font: "amiri", size: 10, x: 100, y: 50, align: "center" as const };
const node = (value: string, more: object = {}) => text(value, { ...base, ...more });

test("Arabic text becomes a non-empty outline", async () => {
  const o = await textToPath(node("سلام"));
  assert.ok(o.d.length > 50);
  assert.ok(o.width > 5 && o.width < 40);
});

test("every font shapes Arabic or Latin sample text", async () => {
  for (const f of fonts) {
    const sample = f.scripts.includes("ar") ? "دعوة فرح ١٢" : "Wedding 12";
    const o = await textToPath(node(sample, { font: f.id, weight: 700 }));
    assert.ok(o.d.length > 50 && o.width > 0, f.id);
  }
});

test("maxWidth shrinks the size to fit", async () => {
  const natural = await textToPath(node("حفل زفاف سعيد"));
  const fitted = await textToPath(node("حفل زفاف سعيد", { maxWidth: natural.width / 2 }));
  assert.ok(Math.abs(fitted.size - 5) < 0.01);
  assert.ok(Math.abs(fitted.width - natural.width / 2) < 0.01);
});

test("alignment anchors the line", async () => {
  const c = await textToPath(node("سلام"));
  assert.ok(Math.abs((c.bounds!.minX + c.bounds!.maxX) / 2 - 100) < 1);
  const s = await textToPath(node("سلام", { align: "start" }));
  assert.ok(s.bounds!.maxX <= 100.6 && s.bounds!.maxX > 98);
  const e = await textToPath(node("سلام", { align: "end" }));
  assert.ok(e.bounds!.minX >= 99.4 && e.bounds!.minX < 102);
  const ltr = await textToPath(node("Hello", { align: "start" }));
  assert.ok(ltr.bounds!.minX >= 99.4 && ltr.bounds!.minX < 102);
});

test("the baseline sits at y, with the outline above it", async () => {
  const o = await textToPath(node("ا"));
  assert.ok(o.bounds!.minY < 46 && o.bounds!.maxY < 51.5);
});

test("digits inside Arabic stay left to right and sit to the left", () => {
  assert.deepEqual(visualRuns("عرس 2026", "rtl").map(r => r.text.trim()), ["2026", "عرس"]);
});

test("a font without Latin falls back instead of dropping the text", async () => {
  const o = await textToPath(node("Hello", { font: "inter" }));
  const ar = await textToPath(node("سلام", { font: "inter" }));
  assert.ok(o.d && ar.d);
});

test("resolveScene leaves no text and drops empty lines", async () => {
  const s = scene(200, 100, ink("#ffffff"), g({ x: 5 }, node("سلام", { fill: ink("#000000"), safe: true }), node("   ")));
  const r = await resolveScene(s);
  const types: string[] = [];
  walk(r.children, n => types.push(n.type));
  assert.deepEqual(types, ["group", "path"]);
  const p = (r.children[0] as { children: { d: string; safe?: boolean }[] }).children[0];
  assert.equal(p.safe, true);
  assert.ok(pathBounds(p.d).maxX < 200);
});
