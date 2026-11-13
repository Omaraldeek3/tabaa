import { rays, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-football-cup",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر دوري كرة قدم", en: "Football tournament poster" },
  note: { ar: "كرة تنطلق بخطوط سرعة مائلة فوق عنوان صارخ. لدوريات الحارات والمدارس والنوادي.", en: "A ball flying on slanted speed lines over a loud title. For neighbourhood, school and club tournaments." },
  tags: ["كرة قدم", "دوري", "بطولة", "رياضة", "نادي", "شباب", "football", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("pitch", "ملعب", "Pitch", inks.olive, inks.ivory, inks.mustard, inks.black, inks.oliveDark),
    pal("derby", "ديربي", "Derby", inks.red, inks.ivory, inks.mustard, inks.black, inks.burgundy),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.mustard, inks.teal, inks.navy),
  ],
  fonts: ["lalezar", "kufam", "cairo", "rakkas"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "نادي شباب البلدة يقدّم" },
    { id: "title", kind: "multiline", label: { ar: "العنوان", en: "Title" }, sample: "دوري\nالحارات", maxLines: 2 },
    { id: "dates", kind: "text", label: { ar: "المدة", en: "Dates" }, sample: "يبدأ الجمعة ٤ حزيران" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "١٦ فريقاً · خماسي · كأس وجوائز للهدّاف\nالتسجيل حتى نهاية أيار", maxLines: 3 },
    { id: "place", kind: "text", label: { ar: "المكان", en: "Place" }, sample: "ملعب البلدية" },
    { id: "contact", kind: "text", label: { ar: "للتسجيل", en: "To register" }, sample: "الكابتن رامي · ٠٥٩٨ ٠٠٠ ٠٠٠" },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, v, s, cx } = dims(ctx, 297, 420), m = 22 * s, max = W - 2 * m, bx = W * 0.3, by = 128 * v, r = 54 * s, foot = H - 96 * v;
    return scene(W, H, p.paper,
      g({ x: bx, y: by, rotate: -28 }, [-0.7, -0.25, 0.2, 0.65].map((k, i) => rect(r * 0.6, k * r - 3 * s, W * 1.4, (i % 2 ? 5 : 9) * s, { fill: p.soft }))),
      g({ x: bx, y: by }, g({ opacity: 0.35 }, rays(14, r * 1.12, r * 1.5, p.accent, 0.4)), circle(0, 0, r, { fill: inks.ivory }), path(starPath(5, r * 0.36, r * 0.3), { fill: inks.black }),
        [0, 72, 144, 216, 288].map(a => g({ rotate: a }, path(`M0 ${-r * 0.36} L0 ${-r * 0.74}`, { fill: null, stroke: inks.black, strokeWidth: 1.4 * s }), g({ y: -r * 0.92 }, path(starPath(5, r * 0.2, r * 0.16), { fill: inks.black })))),
        circle(0, 0, r, { fill: null, stroke: inks.black, strokeWidth: 1.6 * s })),
      line(val(ctx, "kicker"), W - m, 36 * v, 11 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: max * 0.6 }),
      stack(linesOf(val(ctx, "title"), 2), W - m, 226 * v, 70 * s, 68 * v, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      rect(-b, foot, W + 2 * b, H - foot + b, { fill: p.accent2 }),
      rect(-b, foot, W + 2 * b, 3 * s, { fill: p.accent }),
      line(val(ctx, "dates"), W - m, foot + 30 * v, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 3), W - m, foot + 48 * v, 9.5 * s, 12 * v, { font: "tajawal", weight: 500, fill: inks.ivory, align: "start", maxWidth: max }),
      line(joined(ctx, ["place", "contact"]), cx, H - Math.max(13 * v, ctx.safeMm + 3), 8.5 * s, { font: "tajawal", weight: 800, fill: inks.ivory, maxWidth: max }),
    );
  },
};
export default t;
