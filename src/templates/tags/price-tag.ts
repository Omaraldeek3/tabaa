import { dotField, guillocheNode, stepEdge } from "../../lib/motifs/index.ts";
import { circle, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import { barcode } from "../ticket-kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tags-price-tag",
  category: "tags",
  lang: "ar",
  title: { ar: "بطاقة سعر للملابس", en: "Clothing price tag" },
  note: { ar: "بطاقة سعر تُعلّق على الملابس: اسم الماركة في شريط علوي، والمقاس في دائرة، والسعر كبير، وباركود في الأسفل. لمحلات الألبسة والمشاغل.", en: "A swing tag for clothes: the brand on a top band, the size in a circle, the price large and a barcode at the foot. For clothing shops and workshops." },
  tags: ["سعر", "ملابس", "تاغ", "ماركة", "مقاس", "price tag"],
  sizes: [more.tagS, more.tag],
  palettes: [
    pal("black", "أسود", "Black", inks.white, inks.black, inks.black, inks.red, inks.grey),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.black, inks.terracotta, inks.ivory),
    pal("rose", "وردي", "Rose", inks.blush, inks.burgundy, inks.burgundy, inks.rose, inks.ivory),
  ],
  fonts: ["reemkufi", "lalezar", "kufam"],
  fields: [
    tf("brand", "الماركة", "Brand", "تطريز", 10),
    tf("item", "القطعة", "Item", "ثوب مطرّز يدوياً", 22),
    tf("size", "المقاس", "Size", "M", 4),
    tf("price", "السعر", "Price", "٣٥٠ ₪", 10),
    tf("code", "الكود", "Code", "TT-2047", 12),
  ],
  safeMm: 3.5,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 45, 75), s = u, band = 18 * s;
    return scene(W, H, p.paper,
      guillocheNode(-b, -b, W + 2 * b, band + b, inks.white, { waves: 3, amp: 0.8 * s, period: 10 * s, width: 0.12 * s, opacity: 0.2 }),
      dotField(0, H * 0.8, W, H * 0.2, 2.4 * s, 0.35 * s, p.soft, { fade: "up", opacity: 0.45 }),
      rect(-b, -b, W + 2 * b, band + b, { fill: p.accent }),
      circle(cx, 6 * s, 2 * s, { fill: inks.white }), circle(cx, 6 * s, 2 * s, { fill: null, stroke: p.soft, strokeWidth: 0.4 * s }),
      line(val(ctx, "brand"), cx, 15 * s, 5.6 * s, { font: ctx.font, weight: 700, fill: p.paper, maxWidth: W - 10 * s }),
      line(val(ctx, "item"), cx, 25 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 9 * s }),
      val(ctx, "size") ? circle(cx, 33 * s, 4.4 * s, { fill: null, stroke: p.ink, strokeWidth: 0.4 * s }) : null,
      line(val(ctx, "size"), cx, 34.6 * s, 4.4 * s, { font: "inter", weight: 800, fill: p.ink, maxWidth: 7 * s }),
      line(val(ctx, "price"), cx, 50 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: W - 9 * s }),
      val(ctx, "code") ? barcode(cx - 15 * s, 55 * s, 30 * s, 10 * s, val(ctx, "code"), p.ink) : [],
      line(val(ctx, "code"), cx, 69 * s, 2.4 * s, { font: "inter", weight: 600, fill: p.ink, maxWidth: 30 * s }),
      stepEdge(-b, band + 1.2 * s, W + 2 * b, 1.2 * s, p.accent),
      rect(3 * s, band + 3 * s, W - 6 * s, H - band - 6 * s, { fill: null, stroke: p.soft, strokeWidth: 0.2 * s, r: 1 * s }),
    );
  },
};
export default t;
