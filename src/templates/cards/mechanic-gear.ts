import { gearPath, hatch } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { cardAr, tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-mechanic-gear",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت كراج ميكانيك بالتروس", en: "Mechanic's card with gears" },
  note: { ar: "ترسان متعشّقان يخرجان من زاوية الكرت، أسود وأصفر كلون الورشة. للكراجات ومحلات قطع الغيار والخراطة.", en: "Two meshing gears break out of the card's corner in workshop black and yellow. For garages, spare-parts shops and machinists." },
  tags: ["كرت", "ميكانيك", "كراج", "قطع غيار", "سيارات", "ورشة", "mechanic"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("yellow", "أصفر", "Yellow", inks.charcoal, inks.ivory, inks.mustard, inks.mustard, inks.grey),
    pal("steel", "فولاذ", "Steel", inks.navy, inks.ivory, inks.grey, inks.orange, inks.sky),
    pal("light", "فاتح", "Light", inks.ivory, inks.black, inks.black, inks.orange, inks.grey),
  ],
  fonts: ["lalezar", "kufam", "jomhuria"],
  fields: cardAr({ name: "كراج الأمانة", role: "ميكانيك · كهرباء · فحص كمبيوتر", phone: "٠٥٩٧ ٧٧٧ ٨٨٨", address: "شارع حيفا، جنين" }, [tf("owner", "المالك", "Owner", "المعلّم أبو سامر")]),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 85, 55), R = W - 6 * s, max = W * 0.6, r1 = H * 0.38, r2 = H * 0.24;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      hatch(0, 0, W, H, 2.4 * z, p.paper, 0.1 * z, 0.05),
      g({ x: 2 * s, y: H - 2 * s, rotate: 8 }, path(gearPath(r1, 12), { fill: p.accent, evenOdd: true })),
      g({ x: 2 * s + r1 * 0.98 + r2 * 0.86, y: H - 2 * s - r1 * 0.55, rotate: 2 }, path(gearPath(r2, 8, 0.22), { fill: p.accent2 === p.accent ? p.soft : p.accent2, evenOdd: true })),
      line(val(ctx, "name"), R, 17 * s, 8.6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), R, 24.4 * s, 2.9 * s, { font: "tajawal", weight: 700, fill: p.accent2 === inks.mustard ? p.accent : p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "owner"), R, 32 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max * 0.8 }),
      line(val(ctx, "phone"), R, 39 * s, 4.4 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max * 0.8 }),
      line(val(ctx, "address"), R, 45 * s, 2.6 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: max * 0.7 }),
      [[3.4, 3.4], [W / z - 3.4, 3.4], [W / z - 3.4, H / z - 3.4]].map(([x, y]) => g({ x: x * z, y: y * z }, circle(0, 0, 0.9 * z, { fill: p.soft }), path(`M${-0.6 * z} 0 H${0.6 * z}`, { fill: null, stroke: p.paper, strokeWidth: 0.25 * z }))),
    );
  },
};
export default t;
