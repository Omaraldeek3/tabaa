import { dotField, doubleFrame, flag } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-marathon",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر ماراثون وسباق جري", en: "Marathon and fun run poster" },
  note: { ar: "طريق متعرّج عريض يلتفّ في البوستر من علم البداية إلى علم النهاية المربّع، والمسافة برقم ضخم.", en: "A wide winding road loops through the poster from the start flag to the chequered finish, with the distance in huge figures." },
  tags: ["ماراثون", "جري", "سباق", "رياضة", "مشي", "marathon", "run"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("track", "مضمار", "Track", inks.ivory, inks.black, inks.terracotta, inks.teal, inks.ivory),
    pal("lime", "حيوي", "Lively", inks.teal, inks.ivory, inks.navy, inks.mustard, inks.ivory),
    pal("sun", "شمس", "Sun", inks.mustard, inks.black, inks.black, inks.red, inks.mustard),
  ],
  fonts: ["lalezar", "kufam", "rakkas"],
  fields: [
    tf("distance", "المسافة", "Distance", "١٠ كم", 8),
    tf("title", "العنوان", "Title", "ماراثون بيت لحم", 20),
    tf("sub", "الشعار", "Slogan", "نركض من أجل حقّنا في الحركة"),
    tf("date", "التاريخ", "Date", "الجمعة ٢٨ آذار · ٧ صباحاً"),
    tf("start", "نقطة الانطلاق", "Start", "الانطلاق من ساحة المهد"),
    tf("register", "التسجيل", "Registration", "التسجيل عبر موقع البلدية حتى ١٥ آذار"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 40 * s;
    const road = `M${-b} ${H * 0.9} C${W * 0.35} ${H * 0.98} ${W * 0.95} ${H * 0.86} ${W * 0.82} ${H * 0.72} S${W * 0.08} ${H * 0.62} ${W * 0.2} ${H * 0.5} S${W * 0.85} ${H * 0.44} ${W * 0.78} ${H * 0.34}`;
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      dotField(0, 0, W, H, 9 * z, 0.9 * z, p.accent, { opacity: 0.08 }),
      [0, 1, 2, 3].map(i => path(`M${W * 0.62} ${H * (0.42 + i * 0.03)} H${W * 0.9}`, { fill: null, stroke: p.accent2, strokeWidth: 0.8 * z, opacity: 0.25 })),
      path(road, { fill: null, stroke: p.accent, strokeWidth: 22 * s }),
      path(road, { fill: null, stroke: p.soft === p.paper ? inks.ivory : p.soft, strokeWidth: 1.2 * s, opacity: 0.9 }),
      g({ x: 26 * s, y: H * 0.9 - 6 * s }, flag(34 * s, p.ink, p.accent2)),
      g({ x: W * 0.78 + 14 * s, y: H * 0.34 - 4 * s }, flag(40 * s, p.ink, inks.white, inks.black)),
      line(val(ctx, "distance"), cx, 112 * s, 80 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 30 * s + 12 * s, 16 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "sub"), cx, 150 * s, 8 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), W * 0.5, H * 0.8, 9 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: W * 0.62 }),
      line(val(ctx, "start"), W * 0.5, H * 0.8 + 13 * s, 7 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: W * 0.62 }),
      line(val(ctx, "register"), cx, H - 12 - 4 * s, 6.4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      doubleFrame(10 * z, 10 * z, W - 20 * z, H - 20 * z, p.accent2, p.paper, { gap: 3 * z, heavy: 0.8 * z, thin: 0.3 * z, corner: "bracket", r: 4 * z }),
    );
  },
};
export default t;
