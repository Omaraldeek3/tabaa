import { rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-receipt-voucher",
  category: "stationery",
  lang: "ar",
  title: { ar: "سند قبض بالصيغة التقليدية", en: "Traditional receipt voucher" },
  note: { ar: "سند قبض كما في دفاتر المحلات: «استلمنا من السيد... مبلغاً وقدره... وذلك عن...» على سطور منقّطة، والمبلغ رقماً في مربّع، وخانتا توقيع. يُطبع دفتراً ويُعبّأ باليد أو من هنا.", en: "A receipt voucher as in shop receipt books: received from, the sum of, being for, on dotted lines, the amount in figures in a box, and two signature spaces. Print as a pad and fill by hand or here." },
  tags: ["سند قبض", "إيصال", "محاسبة", "دفتر", "محل", "receipt"],
  sizes: [more.a5l],
  palettes: [
    pal("blue", "أزرق", "Blue", inks.white, inks.navy, inks.navy, inks.sky, inks.grey),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.olive, inks.sage, inks.grey),
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.blush, inks.grey),
  ],
  fonts: ["reemkufi", "arefruqaa", "kufam"],
  fields: [
    tf("company", "الجهة", "Business", "محلات أبو العبد للأدوات المنزلية", 34),
    tf("number", "الرقم", "Number", "٠٥٦٧", 8),
    tf("amount", "المبلغ رقماً", "Amount", "٢٥٠٠ ₪", 14),
    tf("from", "استلمنا من", "Received from", "السيد ماهر النتشة"),
    tf("words", "المبلغ كتابةً", "Amount in words", "ألفان وخمسمئة شيكل فقط لا غير"),
    tf("for", "وذلك عن", "Being for", "الدفعة الثانية من ثمن غرفة النوم"),
    tf("date", "التاريخ", "Date", "٢٠٢٧/٩/١٢"),
  ],
  safeMm: 7,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 210, 148), R = W - 14 * s, L = 14 * s;
    const field = (label: string, value: string, y: number) => [
      line(label, R, y, 4.4 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", safe: false }),
      rect(L, y + 1.4 * s, R - L - 34 * s, 0.3 * s, { fill: p.soft }),
      line(value, R - 36 * s, y - 0.6 * s, 5 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: R - L - 40 * s }),
    ];
    return scene(W, H, p.paper,
      rect(6 * s, 6 * s, W - 12 * s, H - 12 * s, { fill: null, stroke: p.accent, strokeWidth: 0.8 * s }),
      line(val(ctx, "company"), R, 22 * s, 6.4 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: W * 0.3 }),
      rect(cx - 28 * s, 13 * s, 44 * s, 13 * s, { fill: p.accent, r: 2 * s }),
      line("سند قبض", cx - 6 * s, 22.4 * s, 7 * s, { font: ctx.font, weight: 700, fill: inks.white, safe: false }),
      line(val(ctx, "number") ? "رقم " + val(ctx, "number") : "", L, 22 * s, 4.4 * s, { font: "tajawal", weight: 800, fill: inks.red, align: "end", maxWidth: 40 * s }),
      rect(L, 34 * s, 50 * s, 14 * s, { fill: p.accent2, opacity: 0.4, r: 1.4 * s }),
      line(val(ctx, "amount"), L + 25 * s, 43.6 * s, 7 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: 44 * s }),
      field("استلمنا من:", val(ctx, "from"), 62 * s),
      field("مبلغاً وقدره:", val(ctx, "words"), 78 * s),
      field("وذلك عن:", val(ctx, "for"), 94 * s),
      line(val(ctx, "date") ? "التاريخ: " + val(ctx, "date") : "", R, 114 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: 70 * s }),
      ["المستلم", "المحاسب"].map((l, i) => [rect(L + i * 60 * s, 128 * s, 44 * s, 0.3 * s, { fill: p.ink }), line(l, L + 22 * s + i * 60 * s, 134 * s, 3.6 * s, { font: "tajawal", weight: 700, fill: p.ink, safe: false })]),
    );
  },
};
export default t;
