import { dotRing, oliveWreath, starPath, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const oliveOil: Template = {
  id: "labels-olive-oil",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق زيت زيتون دائري", en: "Round olive oil label" },
  note: { ar: "ملصق دائري لقناني وتنكات الزيت: إكليل زيتون حول الاسم، مع المنشأ والحجم وسنة العصر.", en: "A round label for oil bottles and tins: an olive wreath round the name, with origin, volume and pressing year." },
  tags: ["زيت", "زيتون", "ملصق", "دائري", "منتج", "بلدي", "label", "olive oil"],
  sizes: [sizes.round70, sizes.round50, sizes.round90],
  shape: "round",
  palettes: [
    pal("grove", "كرم", "Grove", inks.oliveDark, inks.oliveDark, inks.olive, inks.goldDeep, inks.ivory),
    pal("gold", "ذهب", "Gold", inks.black, inks.black, inks.goldDeep, inks.gold, inks.paper),
    pal("clay", "فخّار", "Clay", inks.terracotta, inks.black, inks.olive, inks.terracotta, inks.paper),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "reemkufi"],
  fields: [
    { id: "top", kind: "text", label: { ar: "السطر العلوي", en: "Top line" }, sample: "بكر ممتاز", maxLength: 22 },
    { id: "name", kind: "text", label: { ar: "اسم المنتج", en: "Product name" }, sample: "زيت زيتون", maxLength: 20 },
    { id: "origin", kind: "text", label: { ar: "المنشأ", en: "Origin" }, sample: "من جبال نابلس", maxLength: 26 },
    { id: "volume", kind: "text", label: { ar: "الحجم", en: "Volume" }, sample: "٧٥٠ مل", maxLength: 12 },
    { id: "year", kind: "text", label: { ar: "الموسم", en: "Season" }, sample: "عصرة ٢٠٢٧", maxLength: 14 },
  ],
  safeMm: 4,
  render(ctx) {
    const W = ctx.size.widthMm, p = ctx.palette, b = ctx.bleedMm + 0.5, s = W / 70, c = W / 2;
    const R = W / 2, inner = R - 4.2 * s;
    const z = W / 70;
    return scene(W, W, p.paper,
      starTile(0, 0, W, W, 6 * z, 0.7 * z, p.paper, 0.08),
      rect(-b, -b, W + 2 * b, W + 2 * b, { fill: p.paper }),
      circle(c, c, inner, { fill: p.soft }),
      circle(c, c, inner - 1.3 * s, { fill: null, stroke: p.accent2, strokeWidth: 0.3 * s }),
      g({ x: c, y: c }, dotRing(R - 2.1 * s, 44, 0.45 * s, p.soft)),
      g({ x: c, y: c + 1 * s }, oliveWreath(24.5 * s, p.accent, p.ink, { leaves: 12, open: 46 })),
      g({ x: c, y: 11.6 * s }, path(starPath(8, 1.6 * s, 0.75 * s), { fill: p.accent2 })),
      line(val(ctx, "top"), c, 22 * s, 4.1 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: 26 * s }),
      line(val(ctx, "name"), c, 36.5 * s, 12.5 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 38 * s }),
      rect(c - 9 * s, 40.6 * s, 18 * s, 0.35 * s, { fill: p.accent2 }),
      line(val(ctx, "origin"), c, 46.6 * s, 4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: 34 * s }),
      line([val(ctx, "volume"), val(ctx, "year")].filter(Boolean).join("  ·  "), c, 52.8 * s, 3.3 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: 21 * s }),
    );
  },
};

export default oliveOil;
