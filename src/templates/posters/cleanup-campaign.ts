import { broom, dotField, doubleFrame, starPath } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-cleanup-campaign",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر حملة تنظيف الحيّ", en: "Neighbourhood clean-up poster" },
  note: { ar: "مكنسة قشّ كبيرة تكنس خطوط غبار تحت عنوان عريض. لحملات التطوّع وتنظيف الحارات والمدارس والشواطئ.", en: "A big straw broom sweeps up lines of dust under a heavy title. For volunteer days cleaning streets, schools and beaches." },
  tags: ["تنظيف", "تطوع", "حملة", "بيئة", "حارة", "clean-up", "volunteer"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.olive, inks.mustard, inks.terracotta),
    pal("blue", "أزرق", "Blue", inks.sky, inks.navy, inks.navy, inks.mustard, inks.terracotta),
    pal("yellow", "أصفر", "Yellow", inks.mustard, inks.black, inks.black, inks.ivory, inks.terracotta),
  ],
  fonts: ["lalezar", "rakkas", "marhey"],
  fields: [
    tf("title", "العنوان", "Title", "حارتنا أحلى", 16),
    tf("sub", "النوع", "Kind", "حملة تنظيف تطوّعية"),
    ml("bring", "ماذا تحضر", "What to bring", "قفازات وكيس\nقبعة وماء\nوقلب طيّب", 3),
    tf("date", "الموعد", "When", "السبت ٥ نيسان · ٨ صباحاً"),
    tf("meet", "نقطة التجمّع", "Meeting point", "التجمّع عند مدرسة البنات"),
    tf("organiser", "المنظّم", "Organiser", "شباب الحارة الغربية · مخيم الجلزون"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 297, 420), max = W - 40 * s, by = H * 0.74;
    const dust = [0, 1, 2, 3].map(i => `M${W * 0.12 + i * 10 * s} ${by - 10 * s - i * 12 * s} q${-14 * s} ${6 * s} ${-26 * s} ${-2 * s}`).join(" ");
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      dotField(0, H * 0.4, W * 0.6, H * 0.6, 7 * z, 0.8 * z, p.accent, { fade: "up", opacity: 0.15 }),
      [0.62, 0.72, 0.8].map((y, i) => g({ x: W * (0.1 + i * 0.06), y: H * y, rotate: i * 30, opacity: 0.5 }, path(starPath(4, 4 * z, 1 * z), { fill: p.accent2 }))),
      line(val(ctx, "title"), cx, 86 * s, 56 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "sub"), cx, 122 * s, 13 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: max }),
      g({ x: W * 0.3, y: by }, broom(H * 0.42, p.accent2 === inks.ivory ? inks.terracotta : p.soft, p.accent2, p.ink, -24)),
      path(dust, { fill: null, stroke: p.ink, strokeWidth: 1.6 * s, opacity: 0.6 }),
      [0, 1, 2, 3, 4].map(i => path(`M${W * 0.08 + i * 7 * s} ${by + 2 * s - (i % 2) * 3 * s} h${3 * s}`, { fill: null, stroke: p.ink, strokeWidth: 2 * s, opacity: 0.4 })),
      line(linesOf(val(ctx, "bring"), 1).length ? "أحضِر معك:" : "", W * 0.74, H * 0.42, 9 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: W * 0.4, safe: false }),
      stack(linesOf(val(ctx, "bring"), 3), W * 0.74, H * 0.42 + 18 * s, 10 * s, 15 * s, { font: ctx.font, fill: p.ink, maxWidth: W * 0.42 }),
      line(val(ctx, "date"), W * 0.62, by + 6 * s, 9 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: W * 0.5 }),
      line(val(ctx, "meet"), W * 0.62, by + 20 * s, 7.4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: W * 0.5 }),
      line(val(ctx, "organiser"), cx, H - 20 * s, 7.4 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: max }),
      doubleFrame(10 * z, 10 * z, W - 20 * z, H - 20 * z, p.accent, p.paper, { gap: 3 * z, heavy: 0.8 * z, thin: 0.3 * z, corner: "star", r: 4 * z }),
    );
  },
};
export default t;
