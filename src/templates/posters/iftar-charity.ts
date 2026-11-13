import { crescentPath, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-iftar-charity",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر حملة إفطار صائم", en: "Iftar meal drive poster" },
  note: { ar: "سفرة إفطار ممدودة من طرف إلى طرف: صحون وتمر وأكواب ماء، والهلال فوقها. لحملات الإفطار الجماعي وجمع التبرعات في رمضان.", en: "A long iftar spread edge to edge, plates, dates and cups of water, under the crescent. For group iftars and Ramadan fundraising." },
  tags: ["إفطار صائم", "رمضان", "تبرع", "خير", "سفرة", "iftar", "charity"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.terracotta, inks.ivory),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.mustard, inks.terracotta, inks.ivory),
    pal("cream", "قشدي", "Cream", inks.ivory, inks.navy, inks.goldDeep, inks.terracotta, inks.white),
  ],
  fonts: ["arefruqaa", "rakkas", "lalezar"],
  fields: [
    tf("title", "العنوان", "Title", "إفطار صائم", 16),
    tf("verse", "الحديث", "Saying", "من فطّر صائماً كان له مثل أجره"),
    tf("goal", "الهدف", "Goal", "هدفنا ١٠٠٠ وجبة للعائلات المستورة"),
    tf("price", "قيمة الوجبة", "Meal cost", "الوجبة بـ ٢٠ شيكل"),
    tf("how", "طريقة التبرع", "How to give", "تبرّع عبر المسجد أو بنك فلسطين ١٢٣٤٥٦"),
    tf("organiser", "الجهة", "Organiser", "لجنة زكاة حيّ الشجاعية"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 40 * s, ty = H * 0.56, n = 6, step = (W - 20 * s) / n;
    const table = Array.from({ length: n }, (_, i) => {
      const x = 10 * s + step * (i + 0.5);
      return g({ x, y: ty },
        circle(0, 0, step * 0.3, { fill: p.soft }), circle(0, 0, step * 0.2, { fill: null, stroke: p.accent, strokeWidth: 0.6 * s }),
        [-1, 0, 1].map(k => g({ x: k * step * 0.07, y: -step * 0.02, rotate: 70 + k * 20 }, path(`M0 ${-step * 0.05} Q${step * 0.03} 0 0 ${step * 0.05} Q${-step * 0.03} 0 0 ${-step * 0.05} Z`, { fill: p.accent2 }))),
        rect(step * 0.33, -step * 0.2, step * 0.12, step * 0.22, { fill: p.accent, opacity: 0.5, r: step * 0.02 }));
    });
    return scene(W, H, p.paper,
      g({ x: W * 0.78, y: 64 * s, rotate: -30 }, path(crescentPath(30 * s, 0.4), { fill: p.accent })),
      [[0.12, 0.06], [0.3, 0.12], [0.55, 0.05], [0.9, 0.24]].map(([x, y], i) => g({ x: W * x, y: H * y + 10 * s }, path(starPath(4, (2 + i % 2) * s, 0.7 * s), { fill: p.accent }))),
      line(val(ctx, "title"), cx, 160 * s, 54 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "verse"), cx, 190 * s, 10 * s, { font: "amiri", fill: p.accent, maxWidth: max }),
      rect(-b, ty - step * 0.45, W + 2 * b, step * 0.9, { fill: p.accent2, opacity: 0.25 }),
      table,
      line(val(ctx, "goal"), cx, ty + step * 0.85, 9 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "price"), cx, ty + step * 0.85 + 26 * s, 20 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "how"), cx, H - 46 * s, 8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "organiser"), cx, H - 24 * s, 7 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
