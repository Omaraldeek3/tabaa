import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-thanks-order",
  category: "stickers",
  lang: "ar",
  title: { ar: "ستيكر «شكراً لطلبك» للطرود", en: "Thank-you sticker for parcels" },
  note: { ar: "ستيكر دائري لإغلاق أكياس وعلب الطلبات: قلب صغير فوق «شكراً لطلبك» داخل حلقة متقطّعة، واسم المتجر تحته. للمتاجر الإلكترونية والصناعات المنزلية.", en: "A round sticker to seal order bags and boxes: a small heart above the thanks inside a dashed ring, the shop name below. For online shops and home businesses." },
  tags: ["ستيكر", "شكرا", "طلب", "متجر", "تغليف", "sticker", "thank you"],
  sizes: [sizes.round50, sizes.round70],
  shape: "round",
  palettes: [
    pal("pink", "زهري", "Pink", inks.blush, inks.burgundy, inks.rose, inks.burgundy, inks.white),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.red, inks.black, inks.ivory),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.gold, inks.ivory, inks.grey),
  ],
  fonts: ["marhey", "arefruqaa", "lalezar"],
  fields: [
    tf("title", "العبارة", "Words", "شكراً لطلبك", 14),
    tf("shop", "المتجر", "Shop", "متجر تطريز ريم", 22),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 50, 50), k = W / 50, c = W / 2, r = W / 2 - 3.6 * k;
    const dashes = Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2, a2 = a + Math.PI / 60; return `M${c + Math.cos(a) * r} ${c + Math.sin(a) * r} L${c + Math.cos(a2) * r} ${c + Math.sin(a2) * r}`; }).join(" ");
    const heart = `M0 ${2.2 * k} C${-4 * k} ${-0.6 * k} ${-2.6 * k} ${-4 * k} 0 ${-2 * k} C${2.6 * k} ${-4 * k} ${4 * k} ${-0.6 * k} 0 ${2.2 * k} Z`;
    return scene(W, W, p.paper,
      path(dashes, { fill: null, stroke: p.accent, strokeWidth: 0.5 * k }),
      g({ x: c, y: 15 * k }, path(heart, { fill: p.accent })),
      line(val(ctx, "title"), cx, 28.6 * k, 6.4 * k, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 34 * k }),
      circle(c - 8 * k, 33 * k, 0.4 * k, { fill: p.accent2 }), circle(c + 8 * k, 33 * k, 0.4 * k, { fill: p.accent2 }),
      line(val(ctx, "shop"), cx, 38 * k, 2.8 * k, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: 28 * k }),
    );
  },
};
export default t;
