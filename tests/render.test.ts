import assert from "node:assert/strict";
import { test } from "node:test";
import { PDFDocument } from "pdf-lib";
import { ink } from "../src/lib/color.ts";
import { PT_PER_MM, renderPdf } from "../src/lib/render-pdf.ts";
import { renderSvg } from "../src/lib/render-svg.ts";
import { resolveScene } from "../src/lib/resolve.ts";
import { circle, g, path, rect, scene, text } from "../src/lib/scene.ts";
import { useDiskFonts } from "./setup.ts";

useDiskFonts();
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.01, `${a} vs ${b}`);
const red = ink("#b3261e"), black = ink("#000000");
const a6 = () => scene(105, 148, ink("#f4ecdc"),
  rect(-3, -3, 111, 20, { fill: red }),
  g({ x: 52.5, y: 74, rotate: 15 }, circle(0, 0, 20, { fill: red, opacity: 0.4 }), path("M-10 0 L10 0", { stroke: black, strokeWidth: 0.5 })),
  path("M10 10 H30 V30 H10 Z M15 15 H25 V25 H15 Z", { fill: black, evenOdd: true }),
  text("دعوة زفاف", { font: "amiri", size: 9, x: 52.5, y: 120, align: "center", fill: black, safe: true }),
);

test("PDF page, trim box and bleed box are sized for bleed and crop marks", async () => {
  const bytes = await renderPdf(await resolveScene(a6()), { bleedMm: 3, cropMarks: true });
  assert.equal(Buffer.from(bytes.subarray(0, 4)).toString(), "%PDF");
  const page = (await PDFDocument.load(bytes)).getPage(0);
  near(page.getWidth(), (105 + 18) * PT_PER_MM); near(page.getHeight(), (148 + 18) * PT_PER_MM);
  const trim = page.getTrimBox(), bleed = page.getBleedBox();
  near(trim.x, 9 * PT_PER_MM); near(trim.width, 105 * PT_PER_MM); near(trim.height, 148 * PT_PER_MM);
  near(bleed.x, 6 * PT_PER_MM); near(bleed.width, 111 * PT_PER_MM); near(bleed.height, 154 * PT_PER_MM);
});

test("without crop marks the page is the bleed box; without bleed it is the trim", async () => {
  const resolved = await resolveScene(a6());
  const withBleed = (await PDFDocument.load(await renderPdf(resolved, { bleedMm: 3, cropMarks: false }))).getPage(0);
  near(withBleed.getWidth(), 111 * PT_PER_MM); near(withBleed.getTrimBox().x, 3 * PT_PER_MM);
  const plain = (await PDFDocument.load(await renderPdf(resolved, { bleedMm: 0, cropMarks: false }))).getPage(0);
  near(plain.getWidth(), 105 * PT_PER_MM); near(plain.getHeight(), 148 * PT_PER_MM);
});

test("SVG export is outlined and its viewBox includes bleed and marks", async () => {
  const svg = renderSvg(await resolveScene(a6()), { bleedMm: 3, cropMarks: true });
  assert.ok(!svg.includes("<text"));
  assert.match(svg, /viewBox="-9 -9 123 166"/);
  assert.match(svg, /width="123mm"/);
  assert.match(svg, /fill-rule="evenodd"/);
});

test("the quick preview keeps live text and escapes it", () => {
  const s = scene(50, 50, ink("#ffffff"), text("A & B <c>", { font: "inter", size: 4, x: 5, y: 10, align: "start", fill: black }));
  const svg = renderSvg(s);
  assert.match(svg, /<text[^>]*direction="ltr"[^>]*>A &amp; B &lt;c&gt;<\/text>/);
  assert.match(svg, /viewBox="0 0 50 50"/);
});
