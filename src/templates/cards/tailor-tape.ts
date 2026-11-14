import { dotField } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { cardAr } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-tailor-tape",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت خيّاط بشريط القياس", en: "Tailor's card with a tape measure" },
  note: { ar: "شريط قياس أصفر بعلاماته يعبر أسفل الكرت مائلاً قليلاً، وغرزة خيط متقطّعة تحت الاسم. للخيّاطين ومشاغل التطريز والفساتين.", en: "A yellow tape measure with its marks crosses the foot of the card at a slight tilt, with a running stitch under the name. For tailors, embroidery and dress workshops." },
  tags: ["كرت", "خياط", "خياطة", "تفصيل", "تطريز", "فساتين", "tailor"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("linen", "كتّان", "Linen", inks.ivory, inks.black, inks.mustard, inks.red, inks.grey),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.mustard, inks.rose, inks.sky),
    pal("rose", "وردي", "Rose", inks.blush, inks.burgundy, inks.mustard, inks.burgundy, inks.grey),
  ],
  fonts: ["arefruqaa", "rakkas", "marhey"],
  fields: cardAr({ name: "مشغل أم نضال", role: "تفصيل فساتين · تطريز فلاحي · تعديل", phone: "٠٥٩٩ ٢٠٢ ٣٠٣", address: "سوق الخضار القديم، طوباس" }),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 85, 55), ty = H - 13 * s, th = 8 * s, ticks: string[] = [];
    for (let i = 0; (i * 1.6 - 4) * s < W + 2 * b; i++) { const x = -b - 4 * s + i * 1.6 * s; ticks.push(`M${x} ${ty} v${i % 5 === 0 ? th * 0.5 : th * 0.28}`); }
    const max = W - 12 * s;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      dotField(0, 0, W, H * 0.75, 2.6 * z, 0.2 * z, p.accent, { opacity: 0.15 }),
      rect(-b - 4 * s, ty, W + 2 * b + 8 * s, th, { fill: p.accent }),
      path(ticks.join(" "), { fill: null, stroke: inks.black, strokeWidth: 0.2 * s }),
      line(val(ctx, "name"), cx, 15 * s, 7.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      path(Array.from({ length: 14 }, (_, i) => `M${cx - 21 * s + i * 3 * s} ${19.4 * s} h${1.8 * s}`).join(" "), { fill: null, stroke: p.accent2, strokeWidth: 0.5 * s }),
      line(val(ctx, "role"), cx, 25.6 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "phone"), cx, 32.6 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "address"), cx, 37.8 * s, 2.6 * s, { font: "tajawal", fill: p.ink, maxWidth: max }),
      [[3.4, 3.4], [W / z - 3.4, 3.4]].map(([x, y]) => g({ x: x * z, y: y * z }, circle(0, 0, 1 * z, { fill: null, stroke: p.accent, strokeWidth: 0.2 * z }), [-0.4, 0.4].map(dx => circle(dx * z, 0, 0.18 * z, { fill: p.accent })))),
    );
  },
};
export default t;
