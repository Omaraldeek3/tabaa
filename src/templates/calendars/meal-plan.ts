import { type SceneNode, circle, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "calendars-meal-plan",
  category: "calendars",
  lang: "ar",
  title: { ar: "جدول طبخات الأسبوع", en: "Weekly meal plan" },
  note: { ar: "ورقة تخطيط لطبخات الأسبوع: سبعة أيام بخانات للفطور والغداء والعشاء، وعمود جانبي لقائمة مشتريات السوق. تُعلّق على الثلاجة.", en: "A sheet to plan the week's cooking: seven days with spaces for breakfast, lunch and dinner, and a side column for the shopping list. Goes on the fridge." },
  tags: ["طبخات", "أسبوع", "مطبخ", "تخطيط", "مشتريات", "meal plan"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("tomato", "بندورة", "Tomato", inks.ivory, inks.black, inks.red, inks.olive, inks.sand),
    pal("olive", "زيتون", "Olive", inks.paper, inks.oliveDark, inks.olive, inks.terracotta, inks.sand),
    pal("blue", "أزرق", "Blue", inks.white, inks.navy, inks.teal, inks.orange, inks.sky),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "شو طابخين هالأسبوع؟", 26),
    tf("week", "الأسبوع", "Week", "أسبوع ......................"),
    tf("shop", "عنوان المشتريات", "Shopping heading", "من السوق", 14),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, u, v } = dims(ctx, 210, 297), s = u, mx = 12 * s, side = 46 * s, gw = W - 2 * mx - side - 6 * s, top = 56 * v, rh = (H - top - 14 * v) / 7, R = W - mx;
    const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"], meals = ["فطور", "غداء", "عشاء"], mw = (gw - 22 * s) / 3;
    const nodes: (SceneNode | null)[] = [];
    meals.forEach((m, j) => nodes.push(line(m, R - 22 * s - mw * (j + 0.5), top - 3 * v, 4 * s, { font: "tajawal", weight: 800, fill: p.accent, safe: false })));
    days.forEach((d, i) => {
      const y = top + i * rh;
      nodes.push(rect(R - 20 * s, y + 1 * s, 20 * s, rh - 2 * s, { fill: i % 2 ? p.accent2 : p.accent, r: 1.4 * s }));
      nodes.push(line(d, R - 10 * s, y + rh / 2 + 1.6 * s, 4.4 * s, { font: ctx.font, weight: 700, fill: inks.white, safe: false }));
      meals.forEach((_, j) => nodes.push(rect(R - 22 * s - mw * (j + 1) + 1 * s, y + 1 * s, mw - 2 * s, rh - 2 * s, { fill: null, stroke: p.soft, strokeWidth: 0.35 * s, r: 1.4 * s })));
    });
    const shopLines = Array.from({ length: 16 }, (_, i) => [circle(mx + 2 * s, top + 8 * s + i * 13 * v, 1 * s, { fill: null, stroke: p.ink, strokeWidth: 0.3 * s }), rect(mx + 5 * s, top + 9 * s + i * 13 * v, side - 8 * s, 0.25 * s, { fill: p.soft })]);
    return scene(W, H, p.paper,
      line(val(ctx, "title"), R, 26 * v, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W - 2 * mx }),
      line(val(ctx, "week"), R, 38 * v, 4 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      nodes,
      line(val(ctx, "shop"), mx + side / 2, top - 3 * v, 4.4 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: side - 4 * s }),
      shopLines,
    );
  },
};
export default t;
