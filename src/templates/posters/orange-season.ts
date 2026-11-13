import { leafPath, orange } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-orange-season",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر سوق المزارعين", en: "Farmers' market poster" },
  note: { ar: "شبكة برتقال مرتّبة كصندوق في الحسبة، وواحدة منها مقطوفة. لأسواق المزارعين ومواسم الحمضيات.", en: "A grid of oranges packed like a crate at the market, with one picked out. For farmers' markets and the citrus season." },
  tags: ["برتقال", "سوق", "مزارعين", "حمضيات", "موسم", "بلدي", "market", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("crate", "صندوق", "Crate", inks.ivory, inks.oliveDark, inks.orange, inks.olive, inks.oliveDark),
    pal("sea", "بحر", "Sea", inks.sky, inks.navy, inks.orange, inks.teal, inks.navy),
    pal("soil", "تراب", "Soil", inks.sand, inks.black, inks.terracotta, inks.oliveDark, inks.black),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "marhey"],
  fields: [
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "سوق المزارعين", maxLength: 24 },
    { id: "subtitle", kind: "text", label: { ar: "العنوان الفرعي", en: "Subtitle" }, sample: "من الأرض إلى سلّتك" },
    { id: "date", kind: "text", label: { ar: "الموعد", en: "When" }, sample: "كل جمعة، ٨ صباحاً – ٢ ظهراً" },
    { id: "place", kind: "text", label: { ar: "المكان", en: "Place" }, sample: "ساحة البلدية، قلقيلية" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "حمضيات · خضار بعلية · جبنة بلدية · عسل\nأحضر سلّتك معك", maxLines: 2 },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, v, s } = dims(ctx, 297, 420), m = 22 * s, max = W - 2 * m, top = 136 * v, cols = 5, rowsN = 3, cell = (W + 2 * b) / cols, d = cell * 0.78, foot = top + rowsN * cell * 0.94 + 10 * v;
    const fruit: SceneNode[] = [];
    for (let r = 0; r < rowsN; r++) for (let c = 0; c < cols; c++) {
      if (r === 1 && c === 1) { fruit.push(g({ x: -b + (c + 0.5) * cell, y: top + (r + 0.5) * cell * 0.94, rotate: 30 }, path(leafPath(d * 0.5, d * 0.12), { fill: p.accent2 }), g({ rotate: 120 }, path(leafPath(d * 0.4, d * 0.1), { fill: p.accent2 })))); continue; }
      fruit.push(g({ x: -b + (c + 0.5) * cell, y: top + (r + 0.5) * cell * 0.94 + d * 0.06 }, orange(d, p.accent, p.accent2, inks.ivory)));
    }
    return scene(W, H, p.paper,
      line(val(ctx, "title"), W - m, 72 * v, 58 * s, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "subtitle"), W - m, 104 * v, 20 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      fruit,
      rect(-b, foot, W + 2 * b, H - foot + b, { fill: p.soft }),
      line(val(ctx, "date"), W - m, foot + 34 * v, 21 * s, { font: ctx.font, weight: 700, fill: inks.ivory, align: "start", maxWidth: max }),
      line(joined(ctx, ["place"]), W - m, foot + 52 * v, 13 * s, { font: "tajawal", weight: 800, fill: inks.mustard, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 2), W - m, foot + 70 * v, 9.5 * s, 12 * v, { font: "tajawal", weight: 500, fill: inks.ivory, align: "start", maxWidth: max }),
    );
  },
};
export default t;
