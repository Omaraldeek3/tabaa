import { starTile, tatreezFrame, tatreezUnit } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-tatreez-workshop",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر ورشة تطريز", en: "Embroidery workshop poster" },
  note: { ar: "نجمة تطريز عملاقة غرزةً غرزة في وسط البوستر. لورش التطريز والحِرف والمعارض التراثية.", en: "One giant cross-stitch star, stitch by stitch, in the middle of the poster. For embroidery and craft workshops and heritage shows." },
  tags: ["تطريز", "ورشة", "حرف", "تراث", "دورة", "tatreez", "workshop", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("thobe", "ثوب", "Thobe", inks.black, inks.paper, inks.red, inks.gold, inks.black),
    pal("linen", "كتّان", "Linen", inks.paper, inks.black, inks.red, inks.black, inks.sand),
    pal("indigo", "نيلي", "Indigo", inks.navy, inks.ivory, inks.rose, inks.mustard, inks.night),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa", "kufam"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "للمبتدئات والمحترفات" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "ورشة تطريز فلاحي", maxLength: 28 },
    { id: "date", kind: "text", label: { ar: "الموعد", en: "When" }, sample: "كل سبت في تشرين الثاني" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "١٠ صباحاً – ١ ظهراً" },
    { id: "details", kind: "multiline", label: { ar: "التفاصيل", en: "Details" }, sample: "الخيوط والقماش علينا · المقاعد محدودة\nمع الحاجّة أم نضال", maxLines: 3 },
    { id: "contact", kind: "text", label: { ar: "للتسجيل", en: "To register" }, sample: "جمعية إنعاش الأسرة · ٠٢ ٢٤٠ ٠٠٠٠" },
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, v, s, cx } = dims(ctx, 297, 420), m = 12 * s, max = W - 2 * m - 34 * s, star = Math.min(150 * s, 150 * v);
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      starTile(18 * z, 18 * z, W - 36 * z, H - 36 * z, 16 * z, 2 * z, p.accent, 0.07),
      g({ x: m, y: m }, tatreezFrame(W - 2 * m, H - 2 * m, 11 * s, [p.accent, p.accent2], { style: "chain", gap: 0.12 })),
      line(val(ctx, "kicker"), cx, 54 * v, 11 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 96 * v, 40 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx - star / 2, y: 118 * v }, tatreezUnit("star", star, [p.accent, p.accent2], 0.14)),
      rect(cx - 30 * s, 118 * v + star + 14 * v, 60 * s, 1 * s, { fill: p.accent }),
      line(val(ctx, "date"), cx, 118 * v + star + 42 * v, 22 * s, { font: ctx.font, weight: 700, fill: p.accent2 === inks.black ? p.accent : p.accent2, maxWidth: max }),
      line(joined(ctx, ["time"]), cx, 118 * v + star + 60 * v, 13 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      stack(linesOf(val(ctx, "details"), 3), cx, 118 * v + star + 80 * v, 10 * s, 13 * v, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "contact"), cx, H - 36 * v, 9 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
