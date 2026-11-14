import { path, rect, scene } from "../../lib/scene.ts";
import { ml, priced, tf } from "../fields.ts";
import { dims, inks, line, linesOf, pal, rows, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-quotation",
  category: "stationery",
  lang: "ar",
  title: { ar: "عرض سعر ببطاقات وشريط مائل", en: "Price quotation with item cards" },
  note: { ar: "عرض سعر للمقاولين والمكاتب: رأس بشريط مائل، وكل بند في بطاقة مستطيلة بسعره، وشروط العرض ومدّة صلاحيته في الأسفل.", en: "A price quote for contractors and offices: a head with a slanted band, each item in its own card with its price, and the terms and how long the offer stands at the foot." },
  tags: ["عرض سعر", "مقاول", "شركة", "تسعير", "عطاء", "quotation"],
  sizes: [sizes.a4],
  palettes: [
    pal("orange", "برتقالي", "Orange", inks.white, inks.black, inks.orange, inks.charcoal, inks.grey),
    pal("teal", "فيروزي", "Teal", inks.white, inks.navy, inks.teal, inks.navy, inks.grey),
    pal("red", "أحمر", "Red", inks.ivory, inks.black, inks.red, inks.black, inks.grey),
  ],
  fonts: ["kufam", "reemkufi", "lalezar"],
  fields: [
    tf("company", "الشركة", "Company", "شركة البنّاء للمقاولات", 28),
    tf("to", "إلى", "To", "إلى: بلدية بيرزيت · قسم الأشغال"),
    tf("subject", "الموضوع", "Subject", "عرض سعر لترميم سور المدرسة"),
    priced("items", "البنود", "Items", [["هدم وإزالة السور القديم", "٤٬٥٠٠"], ["بناء حجر مسمسم ٦٠ م²", "٢١٬٠٠٠"], ["بوابة حديد مع دهان", "٦٬٨٠٠"], ["تنظيف ونقل المخلّفات", "١٬٢٠٠"]], 8),
    tf("total", "الإجمالي", "Total", "الإجمالي ٣٣٬٥٠٠ شيكل شامل الضريبة"),
    ml("terms", "الشروط", "Terms", "مدة التنفيذ ٣٠ يوم عمل\nالدفع ٣ دفعات حسب الإنجاز\nالعرض ساري لمدة ١٥ يوماً", 4),
    tf("contact", "التواصل", "Contact", "م. سامر حمّاد · ٠٥٩٩ ١١١ ٢٢٢"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, u, v } = dims(ctx, 210, 297), s = u, R = W - 18 * s, L = 18 * s, items = rows(ctx, "items", 8), top = 92 * v, ch = Math.min(16 * v, (H - top - 92 * v) / Math.max(items.length, 1));
    return scene(W, H, p.paper,
      path(`M${-b} ${-b} H${W + b} V${40 * v} L${-b} ${62 * v} Z`, { fill: p.accent }),
      line("عرض سعر", R, 26 * v, 11 * s, { font: ctx.font, weight: 700, fill: inks.white, align: "start", safe: false }),
      line(val(ctx, "company"), R, 36 * v, 4.4 * s, { font: "tajawal", weight: 800, fill: inks.white, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "to"), R, 72 * v, 4.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: R - L }),
      line(val(ctx, "subject"), R, 82 * v, 5 * s, { font: ctx.font, weight: 700, fill: p.accent2, align: "start", maxWidth: R - L }),
      items.flatMap(([item = "", price = ""], i) => {
        const y = top + i * ch;
        return [rect(L, y, R - L, ch - 2 * s, { fill: null, stroke: p.soft, strokeWidth: 0.35 * s, r: 1.6 * s }), rect(R - 3 * s, y, 3 * s, ch - 2 * s, { fill: p.accent }),
          line(item, R - 8 * s, y + ch * 0.58, 4.2 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: (R - L) * 0.66 }),
          line(price, L + 6 * s, y + ch * 0.58, 4.6 * s, { font: "tajawal", weight: 800, fill: p.accent2, align: "end", maxWidth: (R - L) * 0.24 })];
      }),
      line(val(ctx, "total"), R, top + items.length * ch + 10 * v, 5.4 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: R - L }),
      stack(linesOf(val(ctx, "terms"), 4), R, H - 62 * v, 3.8 * s, 8 * v, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: R - L }),
      line(val(ctx, "contact"), (R + L) / 2, H - 16 * v, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: R - L }),
    );
  },
};
export default t;
