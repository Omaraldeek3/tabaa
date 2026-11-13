import { carobPod } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-carob-molasses",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق قنينة دبس خرّوب", en: "Carob molasses bottle label" },
  note: { ar: "ثلاث قرون خرّوب منحنية تتقاطع في أعلى الملصق كإكليل، بلون بنّي داكن ولامع، والاسم تحتها. لدبس الخرّوب والعنب والتمر.", en: "Three curved carob pods cross at the top of the label like a crown, in deep glossy brown, the name below. For carob, grape and date molasses." },
  tags: ["دبس", "خروب", "عنب", "قنينة", "مونة", "بلدي", "molasses"],
  sizes: [sizes.label9060, sizes.card90],
  palettes: [
    pal("brown", "بنّي", "Brown", inks.paper, inks.black, inks.burgundy, inks.goldDeep, inks.charcoal),
    pal("dark", "داكن", "Dark", inks.charcoal, inks.paper, inks.terracotta, inks.gold, inks.sand),
    pal("sand", "رمل", "Sand", inks.sand, inks.black, inks.burgundy, inks.oliveDark, inks.charcoal),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar"],
  fields: [
    tf("name", "اسم المنتج", "Product", "دبس خرّوب", 14),
    tf("note", "الوصف", "Description", "طبيعي بلا سكّر · مطبوخ على النار"),
    tf("origin", "المنشأ", "Origin", "من خرّوب قرية الولجة"),
    tf("volume", "الحجم", "Volume", "٧٥٠ مل"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 90, 60), max = W - 14 * s;
    return scene(W, H, p.paper,
      [[-6, 78, p.accent], [0, 96, p.soft], [6, 114, p.accent]].map(([dx, a, c]) => g({ x: W * 0.17 + (dx as number) * s, y: 4 * s + 17 * s, rotate: a as number }, carobPod(34 * s, c as typeof p.ink, a === 96 ? p.accent : p.soft, 0.14))),
      line(val(ctx, "name"), W - 7 * s, 20 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "note"), W - 7 * s, 28.6 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "origin"), W - 7 * s, 35 * s, 3 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      val(ctx, "volume") ? rect(-b, H - 9 * s, W + 2 * b, 9 * s + b, { fill: p.accent }) : null,
      line(val(ctx, "volume"), cx, H - 3.2 * s - 1.4, 3.4 * s, { font: "tajawal", weight: 800, fill: p.paper === inks.charcoal ? inks.paper : inks.ivory, maxWidth: max }),
    );
  },
};
export default t;
