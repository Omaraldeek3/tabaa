import { dotRing, rosetteLines, tatreezUnit } from "../../lib/motifs/index.ts";
import { circle, g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-en-handmade",
  category: "labels",
  lang: "en",
  title: { ar: "ملصق إنجليزي «صُنع باليد»", en: "English handmade seal" },
  note: { ar: "ختم دائري بالإنجليزية للمنتجات اليدوية المصدَّرة: نجمة تطريز في الوسط، واسم المنتج والمنشأ تحتها.", en: "A round English seal for handmade goods sold abroad: a stitched star in the middle, with the product and origin beneath." },
  tags: ["label", "english", "handmade", "seal", "export", "ملصق", "إنجليزي", "يدوي", "تصدير"],
  sizes: [sizes.round50, sizes.round70, sizes.round90],
  shape: "round",
  palettes: [
    pal("thobe", "ثوب", "Thobe", inks.black, inks.black, inks.red, inks.black, inks.paper),
    pal("olive", "زيتون", "Olive", inks.olive, inks.oliveDark, inks.olive, inks.terracotta, inks.ivory),
    pal("indigo", "نيلي", "Indigo", inks.navy, inks.navy, inks.terracotta, inks.navy, inks.white),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "top", kind: "text", label: { ar: "السطر العلوي", en: "Top line" }, sample: "HANDMADE", maxLength: 16 },
    { id: "name", kind: "text", label: { ar: "اسم المنتج", en: "Product name" }, sample: "Tatreez Purse", maxLength: 20 },
    { id: "origin", kind: "text", label: { ar: "المنشأ", en: "Origin" }, sample: "MADE IN PALESTINE", maxLength: 24 },
    { id: "maker", kind: "text", label: { ar: "المنتِج", en: "Maker" }, sample: "Hebron Women's Co-op", maxLength: 28 },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, b } = dims(ctx, 50, 50), s = W / 50, c = W / 2, R = W / 2 - 3.2 * s, unit = 12 * s;
    const z = W / 50;
    return scene(W, W, p.paper,
      g({ x: W / 2, y: W / 2, opacity: 0.25 }, rosetteLines(W / 2 - 6 * z, p.accent, { rings: 2, lobes: 20, width: 0.1 * z })),
      rect(-b, -b, W + 2 * b, W + 2 * b, { fill: p.paper }),
      circle(c, c, R, { fill: p.soft }), circle(c, c, R - 1.5 * s, { fill: null, stroke: p.accent, strokeWidth: 0.25 * s }),
      g({ x: c, y: c }, dotRing(R + 1.6 * s, 44, 0.3 * s, p.soft)),
      line(val(ctx, "top"), c, 12.6 * s, 2.5 * s, { font: "inter", weight: 800, fill: p.accent, tracking: 0.7 * s, maxWidth: 22 * s }),
      g({ x: c - unit / 2, y: 14.6 * s }, tatreezUnit("star", unit, [p.accent, p.accent2])),
      line(val(ctx, "name"), c, 33.6 * s, 5 * s, { font: ctx.font, weight: 600, fill: p.ink, maxWidth: 32 * s }),
      line(val(ctx, "origin"), c, 37.8 * s, 1.9 * s, { font: "inter", weight: 700, fill: p.accent, tracking: 0.4 * s, maxWidth: 25 * s }),
      line(joined(ctx, ["maker"]), c, 41.4 * s, 1.8 * s, { font: "inter", weight: 500, fill: p.ink, maxWidth: 17 * s }),
    );
  },
};
export default t;
