import { oliveBranch, rays, tatreezBand } from "../../lib/motifs/index.ts";
import { circle, g, rect, scene } from "../../lib/scene.ts";
import { inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const oliveHarvest: Template = {
  id: "posters-olive-harvest",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر موسم الزيتون", en: "Olive harvest poster" },
  note: { ar: "بوستر جريء لفعالية قطاف أو مهرجان زيتون: شمس وغصن كبير وشريط تطريز فوق لوحة المعلومات.", en: "A bold poster for a harvest day or olive festival: sun, a large branch and a tatreez band over the details." },
  tags: ["زيتون", "قطاف", "موسم", "مهرجان", "فعالية", "فلسطين", "olive", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("grove", "كرم", "Grove", inks.sand, inks.black, inks.olive, inks.red, inks.oliveDark),
    pal("sunrise", "شروق", "Sunrise", inks.mustard, inks.black, inks.oliveDark, inks.red, inks.black),
    pal("press", "معصرة", "Press", inks.oliveDark, inks.paper, inks.mustard, inks.terracotta, inks.black),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "cairo"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "دعوة عامة · يوم تطوعي" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "موسم الزيتون", maxLength: 28 },
    { id: "subtitle", kind: "text", label: { ar: "العنوان الفرعي", en: "Subtitle" }, sample: "عونة القطاف: يدٌ مع يد" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "السبت ١٧ تشرين الأول" },
    { id: "place", kind: "text", label: { ar: "المكان", en: "Place" }, sample: "كروم بورين، جنوب نابلس" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "التجمّع الساعة ٧ صباحاً في ساحة البلدة\nفطور بلدي وزيت جديد للمشاركين\nأحضر قفازات وقبعة", maxLines: 4 },
    { id: "organiser", kind: "text", label: { ar: "الجهة المنظمة", en: "Organiser" }, sample: "لجنة المزارعين · ٠٥٩٩ ٠٠٠ ٠٠٠" },
  ],
  safeMm: 10,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 1;
    const u = W / 297, v = H / 420, s = Math.min(u, v), cx = W / 2, m = 22 * s, right = W - m, max = W - 2 * m;
    const panelY = 286 * v, bandH = 13 * s, body = "tajawal";
    const sun = { x: W * 0.27, y: 196 * v, r: 50 * s };
    return scene(W, H, p.paper,
      g({ x: sun.x, y: sun.y }, rays(28, sun.r * 1.18, sun.r * 2.6, p.accent2, 0.42), circle(0, 0, sun.r, { fill: p.accent2 })),
      // The title sits on a band of paper so the rays never fight it.
      rect(-b, 0 - b, W + 2 * b, 128 * v + b, { fill: p.paper }),
      line(val(ctx, "kicker"), right, 34 * v, 11 * s, { font: body, weight: 700, fill: p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "title"), right, 82 * v, 58 * s, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      rect(m, 96 * v, max, 1.6 * s, { fill: p.ink }),
      line(val(ctx, "subtitle"), right, 118 * v, 17 * s, { font: body, weight: 500, fill: p.ink, align: "start", maxWidth: max * 0.62 }),
      g({ x: W * 0.07, y: 272 * v, rotate: -22 }, oliveBranch(250 * s, p.accent, p.ink, { leaves: 13, olives: 5, bend: 0.1 })),
      rect(-b, panelY, W + 2 * b, H - panelY + b, { fill: p.soft }),
      g({ x: -b, y: panelY - bandH / 2 }, rect(0, 0, W + 2 * b, bandH, { fill: p.paper }), g({ y: bandH * 0.12 }, tatreezBand("chain", W + 2 * b, bandH * 0.76, [p.accent2, p.ink]))),
      line(val(ctx, "date"), right, panelY + 40 * v, 24 * s, { font: ctx.font, weight: 700, fill: inks.paper, align: "start", maxWidth: max }),
      line(val(ctx, "place"), right, panelY + 59 * v, 14 * s, { font: body, weight: 700, fill: inks.mustard, align: "start", maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 4), right, panelY + 78 * v, 9.5 * s, 12.5 * v, { font: body, fill: inks.paper, align: "start", maxWidth: max }),
      line(val(ctx, "organiser"), cx, H - Math.max(16 * v, ctx.safeMm + 3), 8 * s, { font: body, weight: 700, fill: inks.paper, maxWidth: max }),
    );
  },
};

export default oliveHarvest;
