import { khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-book-fair",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر معرض الكتاب", en: "Book fair poster" },
  note: { ar: "كتب ملوّنة مرصوصة على رفّ بجانب عنوان كوفي كبير. لمعارض الكتب والأمسيات الثقافية والمكتبات.", en: "Coloured book spines on a shelf beside a large Kufi title. For book fairs, readings and libraries." },
  tags: ["كتاب", "معرض", "مكتبة", "قراءة", "ثقافة", "أمسية", "books", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("shelf", "رفّ", "Shelf", inks.paper, inks.black, inks.red, inks.teal, inks.mustard),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.mustard, inks.terracotta, inks.sky),
    pal("olive", "زيتون", "Olive", inks.sand, inks.oliveDark, inks.olive, inks.terracotta, inks.black),
  ],
  fonts: ["kufam", "reemkufi", "lalezar", "cairo"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "الدورة الثانية عشرة" },
    { id: "title", kind: "multiline", label: { ar: "العنوان", en: "Title" }, sample: "معرض\nالكتاب", maxLines: 2 },
    { id: "dates", kind: "text", label: { ar: "المدة", en: "Dates" }, sample: "٥ – ١٥ أيلول" },
    { id: "place", kind: "text", label: { ar: "المكان", en: "Place" }, sample: "المكتبة الوطنية، رام الله" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "٨٠ دار نشر · توقيع كتب · ركن للأطفال\nيومياً من ١٠ صباحاً حتى ٩ مساءً", maxLines: 3 },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, v, s } = dims(ctx, 297, 420), m = 22 * s, right = W - m, max = W - 2 * m, shelf = 300 * v;
    const cols = [p.accent, p.accent2, p.soft, p.ink, p.accent, p.soft, p.accent2];
    const books = [[0, 20, 150], [22, 15, 120], [39, 26, 172], [67, 13, 104], [82, 22, 140], [106, 17, 160], [125, 24, 112]] as const;
    return scene(W, H, p.paper,
      books.map(([x, w, h], i) => g({ x: m + x * s * 0.8, y: shelf - h * v, scaleX: 0.8 },
        rect(0, 0, w * s, h * v, { fill: cols[i] }), rect(0, h * v * 0.12, w * s, 1.4 * s, { fill: p.paper, opacity: 0.8 }), rect(0, h * v * 0.86, w * s, 1.4 * s, { fill: p.paper, opacity: 0.8 }),
        g({ x: (w * s) / 2, y: h * v * 0.5 }, path(khatamPath(w * s * 0.26), { fill: p.paper, opacity: 0.85 })))),
      rect(-b, shelf, W + 2 * b, 4 * s, { fill: p.ink }),
      line(val(ctx, "kicker"), right, 40 * v, 11 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: max * 0.46 }),
      stack(linesOf(val(ctx, "title"), 2), right, 104 * v, 60 * s, 58 * v, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max * 0.46 }),
      line(val(ctx, "dates"), right, shelf - 22 * v, 25 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max * 0.42 }),
      line(val(ctx, "place"), right, shelf + 34 * v, 16 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 3), right, shelf + 54 * v, 10 * s, 13 * v, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
    );
  },
};
export default t;
