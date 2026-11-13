import assert from "node:assert/strict";
import { test } from "node:test";
import { inflateSync } from "node:zlib";
import { PDFDocument, cmyk } from "pdf-lib";
import { hexToCmyk, ink } from "../src/lib/color.ts";
import { pathBounds, rotate, transformPath, translate } from "../src/lib/pathdata.ts";
import { circle, flatten, g, path, rect, scene, text } from "../src/lib/scene.ts";

const near = (a: number, b: number, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} is not within ${tol} of ${b}`);

test("pdf-lib writes CMYK fills for SVG paths", async () => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([100, 100]);
  page.drawSvgPath("M0 0 L10 0 L10 10 Z", { x: 0, y: 100, color: cmyk(0, 1, 1, 0) });
  const bytes = await doc.save({ useObjectStreams: false });
  const raw = Buffer.from(bytes);
  let content = raw.toString("latin1");
  const start = raw.indexOf("stream\n");
  if (start >= 0) {
    const end = raw.indexOf("endstream", start);
    try { content += inflateSync(raw.subarray(start + 7, end)).toString("latin1"); } catch { /* stream was not deflated */ }
  }
  assert.match(content, /0 1 1 0 k/);
});

test("ink derives CMYK from hex and keeps an explicit one", () => {
  assert.deepEqual(hexToCmyk("#ff0000"), [0, 1, 1, 0]);
  assert.deepEqual(hexToCmyk("#000000"), [0, 0, 0, 1]);
  assert.deepEqual(ink("#B3261E", [0.1, 0.95, 0.9, 0.2]).cmyk, [0.1, 0.95, 0.9, 0.2]);
  assert.equal(ink("#B3261E").hex, "#b3261e");
});

test("transformPath translates, rotates and normalises relative commands", () => {
  assert.equal(transformPath("M0 0 L10 0", translate(5, 5)), "M5 5 L15 5");
  assert.equal(transformPath("M0 0 L10 0", rotate(90)), "M0 0 L0 10");
  assert.equal(transformPath("m1 1 h2 v2 z", translate(0, 0)), "M1 1 L3 1 L3 3 Z");
  assert.equal(transformPath("M0 0 l1 1 l1 1", translate(0, 0)), "M0 0 L1 1 L2 2");
});

test("pathBounds covers curve extremes and arcs", () => {
  const b = pathBounds("M0 0 C0 10 10 10 10 0");
  near(b.maxY, 7.5); near(b.minX, 0); near(b.maxX, 10);
  const arc = pathBounds("M10 0 A10 10 0 1 1 -10 0 A10 10 0 1 1 10 0 Z");
  near(arc.minY, -10, 0.05); near(arc.maxY, 10, 0.05);
});

test("flatten composes nested group transforms and shapes", () => {
  const red = ink("#ff0000");
  const s = scene(100, 100, ink("#ffffff"),
    g({ x: 10, y: 10 }, g({ scale: 2 }, rect(0, 0, 5, 5, { fill: red }), path("M0 0 L1 0", { stroke: red, strokeWidth: 1 }))),
    circle(50, 50, 10, { fill: red, opacity: 0.5 }),
    rect(0, 0, 1, 1), // no paint: dropped
  );
  const shapes = flatten(s);
  assert.equal(shapes.length, 3);
  assert.deepEqual([shapes[0].bounds.minX, shapes[0].bounds.maxX, shapes[0].bounds.maxY], [10, 20, 20]);
  assert.equal(shapes[1].strokeWidth, 2);
  near(shapes[2].bounds.minX, 40); near(shapes[2].bounds.maxY, 60);
  assert.equal(shapes[2].opacity, 0.5);
});

test("flatten refuses unresolved text", () => {
  const s = scene(10, 10, ink("#ffffff"), text("سلام", { font: "amiri", size: 5, x: 5, y: 5, align: "center" }));
  assert.throws(() => flatten(s), /resolveScene/);
});
