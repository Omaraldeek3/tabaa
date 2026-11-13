import { path, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-dish-of-the-day",
  category: "menus",
  lang: "ar",
  title: { ar: "لوح «طبخة اليوم» الأسبوعي", en: "Weekly dish-of-the-day board" },
  note: { ar: "لوح طباشير بإطار خشبي عليه طبخة كل يوم من أيام الأسبوع بخط اليد: مقلوبة السبت، ملوخية الأحد... لمطاعم البيت والكافتيريات.", en: "A chalkboard in a wooden frame with a home-cooked dish for each day of the week in chalk handwriting. For home-style restaurants and canteens." },
  tags: ["منيو", "طبخة اليوم", "لوح", "طباشير", "أسبوع", "مطبخ بيتي", "dish of the day"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("slate", "لوح أسود", "Slate", inks.charcoal, inks.ivory, inks.terracotta, inks.mustard, inks.sky),
    pal("green", "لوح أخضر", "Green board", inks.oliveDark, inks.ivory, inks.goldDeep, inks.mustard, inks.blush),
    pal("navy", "كحلي", "Navy board", inks.night, inks.ivory, inks.goldDeep, inks.sky, inks.mustard),
  ],
  fonts: ["marhey", "arefruqaa", "katibeh"],
  fields: [
    tf("title", "العنوان", "Title", "طبخة اليوم", 16),
    lf("days", "الأيام", "Days", [["اليوم", "Day"], ["الطبخة", "Dish"]], [["السبت", "مقلوبة دجاج"], ["الأحد", "ملوخية ورز"], ["الإثنين", "مسخّن"], ["الثلاثاء", "منسف"], ["الأربعاء", "ورق دوالي وكوسا"], ["الخميس", "قدرة خليلية"]], 7),
    tf("price", "السعر", "Price", "الصحن ٣٥ شيكل مع لبن وسلطة"),
    tf("footer", "التذييل", "Footer", "مطبخ أم محمد · اطلب قبل الساعة ١١"),
  ],
  safeMm: 14,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), fr = 12 * s, list = rows(ctx, "days", 7), top = 116 * s, pitch = Math.min(34 * s, (H - top - 90 * s) / Math.max(list.length, 1));
    const smudge = Array.from({ length: 6 }, (_, i) => `M${40 * s + i * 40 * s} ${60 * s + (i % 3) * 120 * s} q${20 * s} ${-6 * s} ${40 * s} 0`).join(" ");
    return scene(W, H, inks.goldDeep,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: inks.goldDeep }),
      rect(fr, fr, W - 2 * fr, H - 2 * fr, { fill: p.paper }),
      rect(fr + 1.5 * s, fr + 1.5 * s, W - 2 * fr - 3 * s, H - 2 * fr - 3 * s, { fill: null, stroke: inks.black, strokeWidth: 0.6 * s, opacity: 0.3 }),
      path(smudge, { fill: null, stroke: p.ink, strokeWidth: 6 * s, opacity: 0.05 }),
      line(val(ctx, "title"), cx, 74 * s, 36 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 60 * s }),
      path(`M${cx - 60 * s} ${86 * s} q${60 * s} ${6 * s} ${120 * s} 0`, { fill: null, stroke: p.accent2, strokeWidth: 1.6 * s }),
      list.flatMap(([day = "", dish = ""], i) => [
        line(day, W - 34 * s, top + i * pitch + 14 * s, 11 * s, { font: ctx.font, weight: 700, fill: [p.accent2, p.soft, p.accent][i % 3], align: "start", maxWidth: W * 0.26 }),
        line(dish, W * 0.64, top + i * pitch + 14 * s, 14 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.52 }),
      ]),
      line(val(ctx, "price"), cx, H - 58 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: W - 60 * s }),
      line(val(ctx, "footer"), cx, H - 34 * s, 8 * s, { font: ctx.font, fill: p.ink, maxWidth: W - 60 * s }),
    );
  },
};
export default t;
