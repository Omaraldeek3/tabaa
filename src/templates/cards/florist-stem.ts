import { leafPath } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { cardAr, tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-florist-stem",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت محل ورد بساق زهرة", en: "Florist's card with a single stem" },
  note: { ar: "ساق زهرة طويلة واحدة تصعد على طرف الكرت بأوراقها وتتفتّح في أعلاه، والبيانات بجانبها. لمحلات الورد وتنسيق الحفلات.", en: "A single long stem climbs one edge of the card with its leaves and opens at the top, the details beside it. For florists and event stylists." },
  tags: ["كرت", "ورد", "زهور", "تنسيق", "حفلات", "هدايا", "florist"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.rose, inks.olive, inks.burgundy),
    pal("white", "أبيض", "White", inks.white, inks.oliveDark, inks.red, inks.olive, inks.grey),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.mustard, inks.sage, inks.sage),
  ],
  fonts: ["marhey", "arefruqaa", "amiri"],
  fields: cardAr({ name: "ورد وفل", role: "باقات · تنسيق أعراس · توصيل", phone: "٠٥٩٨ ١٢٣ ٣٢١", address: "شارع الجامعة، نابلس" }, [tf("social", "الحساب", "Social", "@wardwafol")]),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 85, 55), sx = W * 0.14, R = W - 6 * s, max = W * 0.66;
    const stem = `M${sx + 3 * s} ${H + b} C${sx - 4 * s} ${H * 0.6} ${sx + 6 * s} ${H * 0.4} ${sx} ${H * 0.2}`;
    const petals = Array.from({ length: 6 }, (_, i) => g({ rotate: -90 + (i - 2.5) * 26 }, path(leafPath(7 * s, 2.6 * s), { fill: p.accent, opacity: 0.9 })));
    return scene(W, H, p.paper,
      path(stem, { fill: null, stroke: p.accent2, strokeWidth: 0.7 * s }),
      [[0.75, -40], [0.55, 210], [0.42, -30]].map(([k, a]) => g({ x: sx + (k > 0.5 ? 0 : 2 * s), y: H * k, rotate: a }, path(leafPath(8 * s, 2.4 * s), { fill: p.accent2 }))),
      g({ x: sx, y: H * 0.2 }, petals, circle(0, -1 * s, 1.6 * s, { fill: p.soft })),
      line(val(ctx, "name"), R, 18 * s, 8.6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), R, 25.4 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), R, 35 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "social"), R, 41 * s, 2.9 * s, { font: "inter", weight: 600, fill: p.ink, align: "start", dir: "rtl", maxWidth: max }),
      line(val(ctx, "address"), R, 46.4 * s, 2.6 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: max }),
    );
  },
};
export default t;
