import { burstLines, crescentPath, doubleFrame, jerusalem, starPath, starTile, tatreezBand, tatreezUnit } from "../../lib/motifs/index.ts";
import { g, path, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const heritageNight: Template = {
  id: "posters-heritage-night",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر أمسية تراثية", en: "Heritage evening poster" },
  note: { ar: "بوستر ليلي لأمسية دبكة أو زجل أو عرض تراثي: عنوان ذهبي كبير فوق أفق القدس، وصف من نجوم التطريز.", en: "A night poster for a dabke, zajal or heritage evening: a large gold title over the Jerusalem skyline and a row of stitched stars." },
  tags: ["تراث", "أمسية", "دبكة", "حفل", "فعالية", "القدس", "heritage", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.red, inks.navy),
    pal("ember", "جمر", "Ember", inks.charcoal, inks.paper, inks.mustard, inks.red, inks.black),
    pal("thobe", "ثوب", "Thobe", inks.burgundy, inks.paper, inks.gold, inks.paper, inks.black),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "kufam"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "الجهة الداعية", en: "Host" }, sample: "مركز يبوس الثقافي يدعوكم إلى" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "أمسية تراثية", maxLength: 26 },
    { id: "subtitle", kind: "text", label: { ar: "العنوان الفرعي", en: "Subtitle" }, sample: "دبكة · زجل · عود وناي" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ٢٠ آب" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "الثامنة مساءً" },
    { id: "place", kind: "text", label: { ar: "المكان", en: "Place" }, sample: "ساحة البلدة القديمة" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "الدخول مجاني · سوق للمطرّزات والمأكولات البلدية\nتحييها فرقة الفنون الشعبية", maxLines: 3 },
  ],
  safeMm: 10,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 1;
    const u = W / 297, v = H / 420, s = Math.min(u, v), cx = W / 2, m = 24 * s, max = W - 2 * m;
    const skyH = 96 * v, skyY = H - skyH - 64 * v, unit = 20 * s, gap = 9 * s, count = 5, rowW = count * unit + (count - 1) * gap;
    const stars: SceneNode[] = [[0.1, 0.08, 1.2], [0.3, 0.05, 0.8], [0.86, 0.07, 1], [0.94, 0.2, 0.7], [0.06, 0.24, 0.8], [0.6, 0.04, 0.7], [0.74, 0.16, 0.6], [0.18, 0.16, 0.6]]
      .map(([x, y, r]) => g({ x: x * W, y: y * H }, path(starPath(4, r * 3.2 * s, r * 0.9 * s), { fill: p.accent, opacity: 0.8 })));
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H * 0.7, 16 * z, 2 * z, p.accent, 0.07),
      g({ x: W / 2, y: H * 0.85, opacity: 0.12 }, burstLines(60, 40 * z, H * 0.8, p.accent, 0.6 * z)),
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      stars,
      g({ x: W * 0.8, y: 60 * v, rotate: 205 }, path(crescentPath(21 * s, 0.5), { fill: p.accent })),
      line(val(ctx, "kicker"), cx, 104 * v, 11 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "title"), cx, 160 * v, 62 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "subtitle"), cx, 186 * v, 15 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      Array.from({ length: count }, (_, i) => g({ x: cx - rowW / 2 + i * (unit + gap), y: 204 * v }, tatreezUnit(i % 2 ? "rose" : "star", unit, [p.accent2, p.accent]))),
      g({ x: -b, y: skyY }, jerusalem(W + 2 * b, skyH, p.soft, p.accent, p.paper)),
      rect(-b, skyY + skyH - 0.5, W + 2 * b, H - skyY - skyH + b + 0.5, { fill: p.soft }),
      g({ x: -b, y: skyY + skyH - 0.5 }, tatreezBand("chain", W + 2 * b, 7 * s, [p.accent2, p.accent])),
      line([val(ctx, "date"), val(ctx, "time")].filter(Boolean).join("  ·  "), cx, H - 40 * v, 19 * s, { font: ctx.font, weight: 700, fill: inks.paper, maxWidth: max }),
      line(val(ctx, "place"), cx, H - 26 * v, 11 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 3), cx, 237 * v, 8.6 * s, 10.5 * v, { font: "tajawal", fill: p.ink, maxWidth: max }),
      doubleFrame(10 * z, 10 * z, W - 20 * z, H - 20 * z, p.accent, p.paper, { gap: 3 * z, heavy: 0.8 * z, thin: 0.3 * z, corner: "khatam", r: 4 * z }),
    );
  },
};

export default heritageNight;
