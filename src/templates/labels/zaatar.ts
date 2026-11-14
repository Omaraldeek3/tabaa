import { dotField, khatamPath, leafPath, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-zaatar",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق زعتر بلدي", en: "Za'atar jar label" },
  note: { ar: "ملصق مستطيل لمرطبانات الزعتر والسمّاق والدقّة: عود زعتر أخضر على جانب، واسم المنتج بخط عريض.", en: "A rectangular label for jars of za'atar, sumac and duqqa: a green sprig at one side and the product name in heavy type." },
  tags: ["زعتر", "سماق", "دقة", "ملصق", "مرطبان", "بلدي", "مؤونة", "label", "zaatar"],
  sizes: [sizes.label9060, more.label10070],
  palettes: [
    pal("zaatar", "زعتر", "Zaatar", inks.ivory, inks.oliveDark, inks.olive, inks.terracotta, inks.sage),
    pal("sumac", "سمّاق", "Sumac", inks.paper, inks.burgundy, inks.burgundy, inks.goldDeep, inks.blush),
    pal("kraft", "كرتون", "Kraft", inks.sand, inks.black, inks.oliveDark, inks.red, inks.paper),
  ],
  fonts: ["lalezar", "rakkas", "arefruqaa", "kufam"],
  fields: [
    { id: "top", kind: "text", label: { ar: "السطر العلوي", en: "Top line" }, sample: "مؤونة البيت", maxLength: 22 },
    { id: "name", kind: "text", label: { ar: "اسم المنتج", en: "Product name" }, sample: "زعتر بلدي", maxLength: 18 },
    { id: "detail", kind: "text", label: { ar: "الوصف", en: "Description" }, sample: "مع سمسم محمّص وسمّاق" },
    { id: "weight", kind: "text", label: { ar: "الوزن", en: "Weight" }, sample: "٥٠٠ غم", maxLength: 12 },
    { id: "maker", kind: "text", label: { ar: "المنتِج", en: "Maker" }, sample: "من تلال جنين · ٠٥٩٩ ٠٠٠ ١١١" },
  ],
  safeMm: 3.5,
  render(ctx) {
    const { W, H, p, b } = dims(ctx, 90, 60), s = H / 60, side = W * 0.26, right = W - 6 * s, max = W - side - 12 * s;
    const sprig = [0.12, 0.26, 0.4, 0.54, 0.68, 0.82].flatMap((k, i) => [-1, 1].map(d => g({ x: 0, y: -44 * s * k, rotate: d > 0 ? -38 : -142 }, path(leafPath(7.5 * s * (1 - i * 0.09), 1.9 * s), { fill: inks.ivory }))));
    const z = Math.min(W, H) / 60;
    return scene(W, H, p.paper,
      dotField(W * 0.33, 0, W * 0.67, H, 2.6 * z, 0.25 * z, p.accent, { fade: "left", opacity: 0.15 }),
      rect(-b, -b, side + b, H + 2 * b, { fill: p.accent }),
      g({ x: side / 2, y: H - 8 * s }, path(`M0 0 L0 ${-44 * s}`, { fill: null, stroke: inks.ivory, strokeWidth: 0.6 * s }), sprig, g({ y: -44 * s, rotate: -90 }, path(leafPath(6 * s, 1.6 * s), { fill: inks.ivory }))),
      g({ x: side, y: -b }, rect(0, 0, 1.2 * s, H + 2 * b, { fill: p.accent2 })),
      line(val(ctx, "top"), right, 13 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "name"), right, 28.5 * s, 14 * s, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      g({ x: right - max, y: 32.4 * s }, tatreezBand("zigzag", max, 3 * s, [p.ink, p.accent2])),
      line(val(ctx, "detail"), right, 41.6 * s, 3.5 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "weight"), right, 49.4 * s, 4.6 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", maxWidth: max * 0.4 }),
      line(joined(ctx, ["maker"]), right - max, 54.4 * s, 2.5 * s, { font: "tajawal", fill: p.ink, align: "end", maxWidth: max }),
      [[W - 3.4 * z, 3.4 * z], [W - 3.4 * z, H - 3.4 * z]].map(([x, y]) => g({ x, y }, path(khatamPath(1.3 * z), { fill: p.accent }))),
    );
  },
};
export default t;
