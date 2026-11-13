import { starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-shop-seal",
  category: "stickers",
  lang: "ar",
  title: { ar: "ستيكر ختم المحل الدائري", en: "Round shop seal sticker" },
  note: { ar: "ختم دائري كأختام المحلات القديمة: حلقتان ونجمتان على الجانبين، والحرف الأول كبير في الوسط، والاسم وسنة التأسيس. لأكياس وعلب المحل.", en: "A round stamp like an old shop seal: two rings and a star either side, the initial large in the centre, then the name and founding year. For the shop's bags and boxes." },
  tags: ["ختم", "شعار", "محل", "ستيكر", "تأسيس", "seal", "logo"],
  sizes: [sizes.round50, sizes.round70, sizes.round90],
  shape: "round",
  palettes: [
    pal("ink", "حبر", "Ink", inks.white, inks.navy, inks.navy, inks.red, inks.navy),
    pal("red", "أحمر", "Red", inks.red, inks.ivory, inks.ivory, inks.ivory, inks.ivory),
    pal("gold", "ذهبي", "Gold", inks.charcoal, inks.gold, inks.gold, inks.gold, inks.gold),
  ],
  fonts: ["arefruqaa", "reemkufi", "lalezar"],
  fields: [
    tf("initial", "الحرف", "Initial", "ح", 2),
    tf("name", "اسم المحل", "Shop name", "حلويات الحاج", 16),
    tf("since", "التأسيس", "Since", "منذ ١٩٦٥", 12),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 50, 50), k = W / 50, c = W / 2;
    return scene(W, W, p.paper,
      circle(c, c, W / 2 - 2.4 * k, { fill: null, stroke: p.ink, strokeWidth: 1.1 * k }),
      circle(c, c, W / 2 - 4.6 * k, { fill: null, stroke: p.ink, strokeWidth: 0.3 * k }),
      [c - 17 * k, c + 17 * k].map(x => g({ x, y: c }, path(starPath(5, 1.6 * k, 0.7 * k), { fill: p.accent2 }))),
      line(val(ctx, "initial"), cx, 27 * k, 15 * k, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: 20 * k }),
      val(ctx, "name") ? rect(c - 13 * k, 30.4 * k, 26 * k, 0.3 * k, { fill: p.ink }) : null,
      line(val(ctx, "name"), cx, 36 * k, 3.6 * k, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: 28 * k }),
      line(val(ctx, "since"), cx, 41 * k, 2.6 * k, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 20 * k }),
    );
  },
};
export default t;
