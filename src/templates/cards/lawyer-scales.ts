import { guillocheNode, scales } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { cardAr } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-lawyer-scales",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت محامٍ بالميزان", en: "Lawyer's card with scales" },
  note: { ar: "ثلث الكرت عمود داكن عليه ميزان العدل، والاسم والمكتب على الباقي بخط رصين. للمحامين وكتّاب العدل والمستشارين.", en: "A dark column on a third of the card carries the scales of justice, with the name and office set soberly beside it. For lawyers, notaries and advisers." },
  tags: ["كرت", "محامي", "محاماة", "ميزان", "قانون", "عدل", "lawyer"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.ivory, inks.navy, inks.navy, inks.gold, inks.grey),
    pal("burgundy", "خمري", "Burgundy", inks.white, inks.black, inks.burgundy, inks.gold, inks.grey),
    pal("black", "أسود", "Black", inks.paper, inks.black, inks.charcoal, inks.goldDeep, inks.grey),
  ],
  fonts: ["amiri", "reemkufi", "arefruqaa"],
  fields: cardAr({ name: "المحامي فراس النتشة", role: "محامٍ ومستشار قانوني · مزاول أمام المحاكم النظامية", phone: "٠٥٩٩ ٤٤٤ ٥٥٥", email: "firas.law@example.ps", address: "عمارة الريان، شارع عين سارة، الخليل" }),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 85, 55), col = W * 0.32, R = W - 6 * s, max = W - col - 11 * s;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      guillocheNode(0, 0, W * 0.32, H, p.paper, { waves: 6, amp: 0.6 * z, period: 7 * z, width: 0.1 * z, opacity: 0.15 }),
      rect(-b, -b, col + b, H + 2 * b, { fill: p.accent }),
      g({ x: col / 2, y: H * 0.68 }, scales(H * 0.46, p.accent2)),
      line(val(ctx, "name"), R, 17 * s, 6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      rect(R - 16 * s, 21 * s, 16 * s, 0.4 * s, { fill: p.accent2 }),
      line(val(ctx, "role"), R, 27 * s, 2.7 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), R, 37 * s, 3.2 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "email"), R, 42.4 * s, 2.7 * s, { font: "tajawal", fill: p.ink, align: "start", dir: "rtl", maxWidth: max }),
      line(val(ctx, "address"), R, 47.6 * s, 2.6 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
      rect(W * 0.34, H - 3 * z, W * 0.66 - 3 * z, 0.3 * z, { fill: p.accent }),
      rect(W * 0.34, H - 2.2 * z, W * 0.66 - 3 * z, 0.12 * z, { fill: p.accent }),
    );
  },
};
export default t;
