import { arcade, crescentPath, dotRing, lantern, starPath, tatreezBand } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const ramadanLantern: Template = {
  id: "greetings-ramadan-lantern",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة رمضان بفانوس كبير", en: "Ramadan card with a great lantern" },
  note: { ar: "بطاقة طولية: فانوس واحد كبير داخل هالة، فوق صف من الأقواس. تصلح بطاقة تهنئة أو دعوة إفطار.", en: "A tall card: one great lantern in a halo over a row of arches. Works as a greeting or an iftar invitation." },
  tags: ["رمضان", "فانوس", "تهنئة", "إفطار", "كريم", "ramadan", "lantern"],
  sizes: [sizes.a6, sizes.dl, sizes.a5],
  palettes: [
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.mustard, inks.night, inks.gold),
    pal("plum", "برقوقي", "Plum", inks.burgundy, inks.paper, inks.gold, inks.black, inks.mustard),
    pal("sand", "رملي", "Sand", inks.sand, inks.navy, inks.terracotta, inks.navy, inks.goldDeep),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri", "lalezar"],
  fields: [
    { id: "title", kind: "text", label: { ar: "التهنئة", en: "Greeting" }, sample: "رمضان كريم", maxLength: 22 },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "تقبّل الله صيامكم وقيامكم" },
    { id: "extra", kind: "text", label: { ar: "سطر إضافي", en: "Extra line" }, sample: "ندعوكم إلى الإفطار يوم الجمعة" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "عائلة البرغوثي" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 0.5;
    const s = Math.min(W / 105, H / 148), cx = W / 2, max = W - 22 * s;
    const lampH = Math.min(H * 0.34, 56 * s), lampTop = H * 0.07, haloY = lampTop + lampH * 0.56, halo = lampH * 0.62;
    const arcH = Math.min(26 * s, H * 0.16), textY = Math.max(lampTop + lampH + (H - arcH - lampTop - lampH) * 0.3, haloY + halo * 1.12 + 15 * s);
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      g({ x: cx, y: haloY }, circle(0, 0, halo, { fill: p.accent2, opacity: 0.35 }), circle(0, 0, halo, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }), dotRing(halo * 1.1, 36, 0.45 * s, p.accent)),
      g({ x: cx, y: -b }, path(`M0 0 L0 ${lampTop + b}`, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }), g({ y: lampTop + b }, lantern(lampH, p.accent2, p.accent))),
      g({ x: W * 0.17, y: haloY - halo * 0.5, rotate: 200 }, path(crescentPath(5.5 * s, 0.5), { fill: p.accent })),
      [[0.84, 0.16, 1], [0.78, 0.3, 0.6], [0.14, 0.34, 0.6], [0.9, 0.05, 0.7]].map(([x, y, r]) => g({ x: x * W, y: y * H }, path(starPath(4, r * 2 * s, r * 0.6 * s), { fill: p.accent, opacity: 0.85 }))),
      line(val(ctx, "title"), cx, textY, 19 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      g({ x: cx - 18 * s, y: textY + 5 * s }, tatreezBand("dots", 36 * s, 0.9 * s, [p.soft])),
      line(val(ctx, "message"), cx, textY + 14 * s, 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "extra"), cx, textY + 22 * s, 4.6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, textY + 31 * s, 4.6 * s, { font: "amiri", weight: 700, fill: p.soft === inks.goldDeep ? p.accent : p.soft, maxWidth: max * 0.8 }),
      g({ x: -b, y: H - arcH, opacity: 0.55 }, arcade(Math.max(5, Math.round(W / (15 * s))), W + 2 * b, arcH + b, p.accent, 0.35 * s)),
    );
  },
};

export default ramadanLantern;
