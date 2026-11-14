import { dotField, hatch, khatamPath, ringsNode } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-discount-coupon",
  category: "tickets",
  lang: "ar",
  title: { ar: "قسيمة خصم بخط القصّ والمقص", en: "Discount coupon with a scissor line" },
  note: { ar: "قسيمة بإطار متقطّع ومقصّ صغير على الحافة، ونسبة الخصم برقم ضخم مائل، وكود الخصم في صندوق. للمحلات والعروض الموسمية.", en: "A coupon with a dashed cut line and a little pair of scissors on the edge, the discount in huge slanted figures and the code in a box. For shops and seasonal offers." },
  tags: ["خصم", "قسيمة", "كوبون", "عرض", "تخفيضات", "coupon"],
  sizes: [more.ticket, more.ticketS],
  palettes: [
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.mustard, inks.grey),
    pal("yellow", "أصفر", "Yellow", inks.mustard, inks.black, inks.black, inks.red, inks.black),
    pal("teal", "فيروزي", "Teal", inks.ivory, inks.navy, inks.teal, inks.orange, inks.grey),
  ],
  fonts: ["lalezar", "jomhuria", "kufam"],
  fields: [
    tf("amount", "الخصم", "Discount", "٢٠٪", 6),
    tf("title", "العنوان", "Title", "خصم على كل المشتريات", 26),
    tf("shop", "المحل", "Shop", "ملابس الأناقة · شارع فيصل، نابلس"),
    tf("code", "الكود", "Code", "EID20", 10),
    tf("valid", "الصلاحية", "Valid until", "صالحة حتى نهاية العيد"),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 160, 60), m = 3 * s, L = W * 0.36, R = W - 9 * s, tw = W - L - 14 * s;
    const dash = (x0: number, y0: number, x1: number, y1: number) => { const len = Math.hypot(x1 - x0, y1 - y0), n = Math.floor(len / (3 * s)); return Array.from({ length: n }, (_, i) => `M${x0 + (x1 - x0) * i / n} ${y0 + (y1 - y0) * i / n} L${x0 + (x1 - x0) * (i + 0.5) / n} ${y0 + (y1 - y0) * (i + 0.5) / n}`).join(" "); };
    const scissors = g({ x: 14 * s, y: m, rotate: 0 }, path(`M0 0 l${4 * s} ${1.2 * s} M0 0 l${4 * s} ${-1.2 * s}`, { fill: null, stroke: p.ink, strokeWidth: 0.5 * s }), path(`M${-1.2 * s} ${-1.4 * s} a${1.1 * s} ${1.1 * s} 0 1 0 0.01 0 Z M${-1.2 * s} ${1.4 * s} a${1.1 * s} ${1.1 * s} 0 1 0 0.01 0 Z`, { fill: null, stroke: p.ink, strokeWidth: 0.5 * s }));
    return scene(W, H, p.paper,
      hatch(m + 2 * s, m + 2 * s, L - m - 4 * s, H - 2 * m - 4 * s, 2.4 * s, p.accent, 0.2 * s, 0.12),
      g({ x: L / 2 + 1 * s, y: H / 2 }, ringsNode(14 * s, 24 * s, 4, p.accent2, 0.35 * s, 0.35)),
      dotField(L, m + 2 * s, W - L - m - 2 * s, H - 2 * m - 4 * s, 3 * s, 0.4 * s, p.soft, { fade: "right", opacity: 0.35 }),
      path(`${dash(m, m, W - m, m)} ${dash(W - m, m, W - m, H - m)} ${dash(W - m, H - m, m, H - m)} ${dash(m, H - m, m, m)}`, { fill: null, stroke: p.ink, strokeWidth: 0.45 * s }),
      rect(14 * s - 3 * s, m - 2.4 * s, 9 * s, 4.8 * s, { fill: p.paper }), scissors,
      line(val(ctx, "amount"), L / 2 + 3 * s, H * 0.66, 30 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: L - 14 * s }),
      line(val(ctx, "title"), R, 20 * s, 7.4 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "shop"), R, 28 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      val(ctx, "code") ? rect(R - 34 * s, 33 * s, 34 * s, 10 * s, { fill: p.accent2, r: 1 * s }) : null,
      line(val(ctx, "code"), R - 17 * s, 40.4 * s, 5.4 * s, { font: "inter", weight: 800, fill: p.paper === inks.mustard ? inks.mustard : inks.white, maxWidth: 30 * s, tracking: 0.6 * s }),
      line(val(ctx, "valid"), R, 50 * s, 2.8 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: tw }),
      rect(L - 0.15 * s, 10 * s, 0.3 * s, H - 20 * s, { fill: p.soft }),
      [0, 1].map(i => g({ x: L, y: i ? H - 10 * s : 10 * s }, path(khatamPath(1.6 * s), { fill: p.accent }))),
    );
  },
};
export default t;
