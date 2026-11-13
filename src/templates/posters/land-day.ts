import { poppy, tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-land-day",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر يوم الأرض", en: "Land Day poster" },
  note: { ar: "حنّونة واحدة كبيرة تنبت من أرض سوداء، والعنوان بحروف عريضة. لفعاليات يوم الأرض وزراعة الأشجار.", en: "One great poppy growing from black earth, with the title in heavy letters. For Land Day events and tree planting." },
  tags: ["يوم الأرض", "آذار", "حنون", "أرض", "فلسطين", "زراعة", "land day", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("land", "أرض", "Land", inks.paper, inks.black, inks.red, inks.olive, inks.black),
    pal("field", "حقل", "Field", inks.sage, inks.black, inks.red, inks.oliveDark, inks.oliveDark),
    pal("dusk", "غسق", "Dusk", inks.mustard, inks.black, inks.red, inks.oliveDark, inks.black),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "cairo"],
  fields: [
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "يوم الأرض", maxLength: 22 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "٣٠ آذار", maxLength: 20 },
    { id: "slogan", kind: "text", label: { ar: "الشعار", en: "Slogan" }, sample: "نزرع فنبقى" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "زراعة ٥٠٠ شتلة زيتون في أراضي البلدة\nالتجمّع ٩ صباحاً أمام المجلس القروي", maxLines: 3 },
    { id: "organiser", kind: "text", label: { ar: "الجهة المنظمة", en: "Organiser" }, sample: "لجنة الدفاع عن الأراضي · سخنين" },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, v, s, cx } = dims(ctx, 297, 420), m = 22 * s, max = W - 2 * m, ground = H - 104 * v, fy = 196 * v;
    return scene(W, H, p.paper,
      g({ x: W * 0.34, y: fy }, poppy(150 * s, p.accent, inks.black, { stem: p.accent2, stemLength: ground - fy + 10 * v })),
      g({ x: W * 0.74, y: fy + 96 * v }, poppy(58 * s, p.accent, inks.black, { stem: p.accent2, stemLength: ground - fy - 86 * v })),
      rect(-b, ground, W + 2 * b, H - ground + b, { fill: p.soft }),
      g({ x: -b, y: ground - 5 * s }, tatreezBand("trees", W + 2 * b, 10 * s, [p.accent2, p.accent])),
      line(val(ctx, "title"), W - m, 70 * v, 64 * s, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "date"), W - m, 104 * v, 30 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max * 0.5 }),
      line(val(ctx, "slogan"), W - m, ground + 34 * v, 24 * s, { font: ctx.font, weight: 700, fill: inks.paper, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 3), W - m, ground + 54 * v, 9.5 * s, 12.5 * v, { font: "tajawal", weight: 500, fill: inks.paper, align: "start", maxWidth: max }),
      line(joined(ctx, ["organiser"]), cx, H - Math.max(14 * v, ctx.safeMm + 3), 8 * s, { font: "tajawal", weight: 700, fill: inks.mustard, maxWidth: max }),
    );
  },
};
export default t;
