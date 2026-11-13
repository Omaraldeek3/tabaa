import { crescentPath, khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

/** A date palm standing on the origin, h tall. */
const palm = (h: number) => {
  const fronds = [-70, -40, -14, 14, 40, 70].map(a => { const r = (a * Math.PI) / 180, l = h * 0.5, x = Math.sin(r) * l, y = -h * 0.62 - Math.cos(r) * l * 0.62 + Math.abs(a) * 0.004 * h; return `M0 ${-h * 0.62} Q${x * 0.5} ${y - h * 0.16} ${x} ${y} Q${x * 0.4} ${y - h * 0.04} 0 ${-h * 0.62} Z`; }).join(" ");
  return `M${-h * 0.035} 0 L${-h * 0.025} ${-h * 0.62} L${h * 0.025} ${-h * 0.62} L${h * 0.035} 0 Z ${fronds}`;
};

const t: Template = {
  id: "labels-dates-box",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق علبة تمر", en: "Date box label" },
  note: { ar: "ملصق عرضي بنخلتين وهلال لعلب التمر المجهول وهدايا رمضان. يُلصق على غطاء العلبة.", en: "A landscape label with two palms and a crescent for boxes of medjool dates and Ramadan gifts. Goes on the lid." },
  tags: ["تمر", "مجهول", "أريحا", "نخيل", "ملصق", "رمضان", "هدية", "label", "dates"],
  sizes: [more.label10070, sizes.label9060],
  palettes: [
    pal("oasis", "واحة", "Oasis", inks.sand, inks.black, inks.terracotta, inks.oliveDark, inks.burgundy),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.gold, inks.navy),
    pal("palm", "نخيل", "Palm", inks.ivory, inks.oliveDark, inks.olive, inks.terracotta, inks.oliveDark),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "reemkufi"],
  fields: [
    { id: "top", kind: "text", label: { ar: "السطر العلوي", en: "Top line" }, sample: "من نخيل أريحا", maxLength: 22 },
    { id: "name", kind: "text", label: { ar: "اسم المنتج", en: "Product name" }, sample: "تمر مجهول", maxLength: 18 },
    { id: "grade", kind: "text", label: { ar: "الصنف", en: "Grade" }, sample: "جامبو فاخر", maxLength: 18 },
    { id: "weight", kind: "text", label: { ar: "الوزن", en: "Weight" }, sample: "١ كغم", maxLength: 10 },
    { id: "maker", kind: "text", label: { ar: "المنتِج", en: "Maker" }, sample: "مزارع الغور · موسم ٢٠٢٧" },
  ],
  safeMm: 3.5,
  render(ctx) {
    const { W, H, p, b, cx } = dims(ctx, 100, 70), s = H / 70, ground = H - 13 * s, max = W - 52 * s;
    return scene(W, H, p.paper,
      rect(-b, ground, W + 2 * b, H - ground + b, { fill: p.soft }),
      g({ x: 13 * s, y: ground }, path(palm(44 * s), { fill: p.accent2 })), g({ x: W - 13 * s, y: ground }, path(palm(38 * s), { fill: p.accent2 })),
      g({ x: 22 * s, y: ground }, path(palm(22 * s), { fill: p.accent2, opacity: 0.6 })), g({ x: W - 22 * s, y: ground }, path(palm(20 * s), { fill: p.accent2, opacity: 0.6 })),
      g({ x: cx, y: 10 * s, rotate: -90 }, path(crescentPath(3.4 * s, 0.5), { fill: p.accent })),
      line(val(ctx, "top"), cx, 21 * s, 3.5 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "name"), cx, 37.4 * s, 14.5 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx - 12 * s, y: 43 * s }, rect(0, 0, 9 * s, 0.3 * s, { fill: p.accent }), rect(15 * s, 0, 9 * s, 0.3 * s, { fill: p.accent }), g({ x: 12 * s, y: 0.15 * s }, path(khatamPath(1.5 * s), { fill: p.accent }))),
      line(joined(ctx, ["grade", "weight"]), cx, 50.6 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "maker"), cx, H - 5.2 * s, 3 * s, { font: "tajawal", weight: 700, fill: inks.ivory, maxWidth: W - 14 * s }),
    );
  },
};
export default t;
