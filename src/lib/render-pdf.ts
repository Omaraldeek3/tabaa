/** Resolved scene to a print-ready PDF: vector, CMYK, with trim and bleed
 *  boxes and optional crop marks. */
import {
  PDFDocument, PDFName, PDFNumber, PDFOperator, PDFOperatorNames as Ops, type Color, type PDFPage,
  appendBezierCurve, appendQuadraticCurve, closePath, cmyk, concatTransformationMatrix, lineTo, moveTo,
  popGraphicsState, pushGraphicsState, setFillingColor, setGraphicsState, setLineWidth, setStrokingColor,
} from "pdf-lib";
import type { Ink } from "./color.ts";
import { parsePath } from "./pathdata.ts";
import { MARK_GAP, MARK_LENGTH, type PrintOptions, pageMargin } from "./render-svg.ts";
import { type Scene, flatten, rectPath } from "./scene.ts";

export const PT_PER_MM = 72 / 25.4;
const op = (name: Ops, args: number[] = []) => PDFOperator.of(name, args.map(a => PDFNumber.of(a)));
const press = (i: Ink): Color => cmyk(...i.cmyk);

function pathOps(d: string): PDFOperator[] {
  const out: PDFOperator[] = [];
  for (const s of parsePath(d)) {
    if (s.c === "M") out.push(moveTo(s.p[0], s.p[1]));
    else if (s.c === "L") out.push(lineTo(s.p[0], s.p[1]));
    else if (s.c === "Q") out.push(appendQuadraticCurve(s.p[0], s.p[1], s.p[2], s.p[3]));
    else if (s.c === "C") out.push(appendBezierCurve(s.p[0], s.p[1], s.p[2], s.p[3], s.p[4], s.p[5]));
    else out.push(closePath());
  }
  return out;
}

function alphaState(doc: PDFDocument, page: PDFPage, cache: Map<number, PDFName>, alpha: number): PDFName {
  const key = Math.round(alpha * 100);
  let name = cache.get(key);
  if (!name) {
    name = page.node.newExtGState(`A${key}`, doc.context.obj({ Type: "ExtGState", ca: key / 100, CA: key / 100 }));
    cache.set(key, name);
  }
  return name;
}

export async function renderPdf(scene: Scene, opts: PrintOptions, meta: { title?: string } = {}): Promise<Uint8Array> {
  const { widthMm: w, heightMm: h } = scene, bleed = opts.bleedMm, m = pageMargin(opts);
  const doc = await PDFDocument.create();
  doc.setTitle(meta.title ?? "Tabaa");
  doc.setProducer("Tabaa (tabaa.omardeek.tech)");
  doc.setCreator("Tabaa");
  const pw = (w + 2 * m) * PT_PER_MM, ph = (h + 2 * m) * PT_PER_MM;
  const page = doc.addPage([pw, ph]);
  page.setTrimBox(m * PT_PER_MM, m * PT_PER_MM, w * PT_PER_MM, h * PT_PER_MM);
  page.setBleedBox((m - bleed) * PT_PER_MM, (m - bleed) * PT_PER_MM, (w + 2 * bleed) * PT_PER_MM, (h + 2 * bleed) * PT_PER_MM);

  const alphas = new Map<number, PDFName>();
  const bleedBox = rectPath(-bleed, -bleed, w + 2 * bleed, h + 2 * bleed);
  const ops: PDFOperator[] = [
    pushGraphicsState(),
    // From here on the unit is the millimetre, origin at the trim's top-left, y down.
    concatTransformationMatrix(PT_PER_MM, 0, 0, -PT_PER_MM, m * PT_PER_MM, ph - m * PT_PER_MM),
    pushGraphicsState(),
    ...pathOps(bleedBox), op(Ops.ClipNonZero), op(Ops.EndPath),
    setFillingColor(press(scene.background)), ...pathOps(bleedBox), op(Ops.FillNonZero),
  ];
  for (const shape of flatten(scene)) {
    ops.push(pushGraphicsState());
    if (shape.opacity < 0.995) ops.push(setGraphicsState(alphaState(doc, page, alphas, shape.opacity)));
    if (shape.fill) ops.push(setFillingColor(press(shape.fill)));
    if (shape.stroke) ops.push(setStrokingColor(press(shape.stroke)), setLineWidth(shape.strokeWidth));
    ops.push(...pathOps(shape.d));
    if (shape.fill && shape.stroke) ops.push(op(shape.evenOdd ? Ops.FillEvenOddAndStroke : Ops.FillNonZeroAndStroke));
    else if (shape.fill) ops.push(op(shape.evenOdd ? Ops.FillEvenOdd : Ops.FillNonZero));
    else ops.push(op(Ops.StrokePath));
    ops.push(popGraphicsState());
  }
  ops.push(popGraphicsState());
  if (opts.cropMarks) {
    const a = bleed + MARK_GAP, b = a + MARK_LENGTH;
    ops.push(setStrokingColor(cmyk(1, 1, 1, 1)), setLineWidth(0.25 / PT_PER_MM));
    for (const x of [0, w]) for (const [y0, y1] of [[-a, -b], [h + a, h + b]]) ops.push(moveTo(x, y0), lineTo(x, y1));
    for (const y of [0, h]) for (const [x0, x1] of [[-a, -b], [w + a, w + b]]) ops.push(moveTo(x0, y), lineTo(x1, y));
    ops.push(op(Ops.StrokePath));
  }
  ops.push(popGraphicsState());
  page.pushOperators(...ops);
  return doc.save();
}
