import { ribbon, starPath, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-grand-opening",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر افتتاح محل", en: "Grand opening poster" },
  note: { ar: "كلمة «افتتاح» بين شريطين ونجوم، واسم المحل تحتها على لوحة داكنة. يعلَّق على الواجهة قبل اليوم الكبير.", en: "The word for opening between two ribbons and stars, with the shop name below on a dark panel. Hangs in the window before the big day." },
  tags: ["افتتاح", "محل", "قريباً", "متجر", "جديد", "opening", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("fresh", "طازج", "Fresh", inks.ivory, inks.black, inks.teal, inks.terracotta, inks.navy),
    pal("gold", "ذهب", "Gold", inks.black, inks.paper, inks.gold, inks.red, inks.charcoal),
    pal("olive", "زيتون", "Olive", inks.sand, inks.oliveDark, inks.olive, inks.red, inks.oliveDark),
  ],
  fonts: ["rakkas", "lalezar", "kufam", "arefruqaa"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "بحمد الله وتوفيقه" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "الافتتاح الكبير", maxLength: 22 },
    { id: "shop", kind: "text", label: { ar: "اسم المحل", en: "Shop name" }, sample: "محمصة البلد", maxLength: 26 },
    { id: "what", kind: "text", label: { ar: "ماذا يبيع", en: "What it sells" }, sample: "قهوة · مكسّرات · بهارات" },
    { id: "date", kind: "text", label: { ar: "الموعد", en: "When" }, sample: "السبت ١ أيار، ٥ مساءً" },
    { id: "offers", kind: "multiline", label: { ar: "العروض", en: "Offers" }, sample: "ضيافة للجميع وخصم ٢٠٪ في أسبوع الافتتاح", maxLines: 2 },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "دوّار المنارة، بجانب البنك" },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, v, s, cx } = dims(ctx, 297, 420), m = 22 * s, max = W - 2 * m, panel = 232 * v, rw = Math.min(max * 0.8, 200 * s);
    const stars = [[0.14, 60, 7], [0.86, 52, 9], [0.22, 186, 5], [0.8, 196, 6], [0.07, 130, 4], [0.93, 136, 4]] as const;
    return scene(W, H, p.paper,
      stars.map(([x, y, r]) => g({ x: x * W, y: y * v, rotate: x * 40 }, path(starPath(5, r * s, r * 0.42 * s), { fill: p.accent2 }))),
      g({ x: cx, y: 62 * v }, ribbon(rw * 0.62, 20 * s, p.accent, p.soft)),
      line(val(ctx, "kicker"), cx, 62 * v + 4 * s, 11 * s, { font: "tajawal", weight: 800, fill: inks.ivory, maxWidth: rw * 0.54 }),
      line(val(ctx, "title"), cx, 150 * v, 68 * s, { font: ctx.font, weight: 800, fill: p.ink, maxWidth: max }),
      g({ x: cx - rw / 2, y: 172 * v }, tatreezBand("chain", rw, 8 * s, [p.accent2, p.accent])),
      rect(-b, panel, W + 2 * b, H - panel + b, { fill: p.soft }),
      line(val(ctx, "shop"), cx, panel + 52 * v, 40 * s, { font: ctx.font, weight: 700, fill: inks.mustard, maxWidth: max }),
      line(val(ctx, "what"), cx, panel + 74 * v, 14 * s, { font: "tajawal", weight: 700, fill: inks.ivory, maxWidth: max }),
      rect(cx - 30 * s, panel + 86 * v, 60 * s, 0.8 * s, { fill: inks.mustard }),
      line(val(ctx, "date"), cx, panel + 112 * v, 22 * s, { font: ctx.font, weight: 700, fill: inks.ivory, maxWidth: max }),
      stack(linesOf(val(ctx, "offers"), 2), cx, panel + 132 * v, 10.5 * s, 13 * v, { font: "tajawal", weight: 500, fill: inks.ivory, maxWidth: max }),
      line(joined(ctx, ["address"]), cx, H - Math.max(15 * v, ctx.safeMm + 3), 10 * s, { font: "tajawal", weight: 800, fill: inks.mustard, maxWidth: max }),
    );
  },
};
export default t;
