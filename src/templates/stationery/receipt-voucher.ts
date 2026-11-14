import { dotRing, khatamPath, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const f = (v: number) => Math.round(v * 100) / 100;

/** Banknote-style guilloche: interleaved sine waves across a box. */
function guilloche(x: number, y: number, w: number, h: number, waves: number, amp: number, period: number) {
  const d: string[] = [];
  for (let k = 0; k < waves; k++) {
    const y0 = y + (k + 0.5) * (h / waves), phase = k * 0.9;
    for (const sign of [1, -1]) {
      const pts: string[] = [];
      for (let t = 0; t <= w; t += period / 12) pts.push(`${pts.length ? "L" : "M"}${f(x + t)} ${f(y0 + sign * amp * Math.sin((t / period) * 2 * Math.PI + phase))}`);
      d.push(pts.join(" "));
    }
  }
  return d.join(" ");
}

/** A dotted writing line: short dashes, as on printed receipt books. */
function dotted(x0: number, x1: number, y: number, step: number, dot: number) {
  const d: string[] = [];
  for (let x = x0; x + dot <= x1; x += step) d.push(`M${f(x)} ${f(y)} H${f(x + dot)}`);
  return d.join(" ");
}

const t: Template = {
  id: "stationery-receipt-voucher",
  category: "stationery",
  lang: "ar",
  title: { ar: "سند قبض بالصيغة التقليدية", en: "Traditional receipt voucher" },
  note: { ar: "سند قبض كما في دفاتر المحلات، بزخرفة الأوراق المالية: خلفية خطوط متموّجة ونجمة ثمانية باهتة، و«استلمنا من... مبلغاً وقدره... وذلك عن...» على سطور منقّطة، والمبلغ رقماً في مربّع بخانتي شيكل وأغورة، ومربّعا نقداً أو شيك، وخانتا توقيع ودائرة للختم. يُطبع دفتراً ويُعبّأ باليد أو من هنا.", en: "A receipt voucher as in shop receipt books, dressed like a banknote: a wavy guilloche ground and a pale eight-pointed star, received from, the sum of, being for, on dotted lines, the amount in a box split into shekels and agorot, cash or cheque boxes, two signatures and a ring for the stamp." },
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
    tf("address", "العنوان والهاتف", "Address and phone", "الخليل · شارع السلام · ٠٢ ٢٢٢ ٠٠٠٠"),
    tf("number", "الرقم", "Number", "٠٥٦٧", 8),
    tf("amount", "المبلغ رقماً", "Amount", "٢٥٠٠", 10),
    tf("cents", "أغورة", "Agorot", "٠٠", 3),
    tf("from", "استلمنا من", "Received from", "السيد ماهر النتشة"),
    tf("words", "المبلغ كتابةً", "Amount in words", "ألفان وخمسمئة شيكل فقط لا غير"),
    tf("for", "وذلك عن", "Being for", "الدفعة الثانية من ثمن غرفة النوم"),
    tf("cheque", "رقم الشيك والبنك", "Cheque no. and bank", ""),
    tf("date", "التاريخ", "Date", "٢٠٢٧/٩/١٢"),
  ],
  safeMm: 7,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 210, 148), R = W - 15 * s, L = 15 * s;
    const field = (label: string, value: string, y: number) => [
      line(label, R, y, 4.2 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", safe: false }),
      path(dotted(L, R - 30 * s, y + 1.4 * s, 1.6 * s, 0.7 * s), { fill: null, stroke: p.soft, strokeWidth: 0.3 * s }),
      line(value, R - 32 * s, y - 0.6 * s, 5 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: R - L - 36 * s }),
    ];
    const tick = (label: string, x: number, y: number, on: boolean) => [
      rect(x - 3.6 * s, y - 3.2 * s, 3.6 * s, 3.6 * s, { fill: null, stroke: p.ink, strokeWidth: 0.35 * s, r: 0.4 * s }),
      on && path(`M${x - 3 * s} ${y - 1.4 * s} L${x - 1.9 * s} ${y - 0.2 * s} L${x - 0.4 * s} ${y - 3 * s}`, { fill: null, stroke: p.accent, strokeWidth: 0.5 * s }),
      line(label, x - 5 * s, y, 3.6 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", safe: false }),
    ];
    const corner = (x: number, y: number) => g({ x, y }, path(khatamPath(4.2 * s), { fill: p.accent }), path(khatamPath(2.2 * s), { fill: p.paper }), circle(0, 0, 0.9 * s, { fill: p.accent }));
    const cheque = val(ctx, "cheque"), amountBox = { x: L, y: 34 * s, w: 58 * s, h: 18 * s };
    return scene(W, H, p.paper,
      // Security ground and watermark.
      path(guilloche(9 * s, 9 * s, W - 18 * s, H - 18 * s, 14, 1.6 * s, 18 * s), { fill: null, stroke: p.accent2, strokeWidth: 0.18 * s, opacity: 0.55 }),
      g({ x: cx, y: 84 * s, opacity: 0.09 }, path(khatamPath(34 * s), { fill: p.accent }), path(khatamPath(26 * s), { fill: p.paper }), path(starPath(8, 18 * s, 9 * s), { fill: p.accent })),
      // Double frame with star corners.
      rect(5 * s, 5 * s, W - 10 * s, H - 10 * s, { fill: null, stroke: p.accent, strokeWidth: 1.2 * s }),
      rect(8 * s, 8 * s, W - 16 * s, H - 16 * s, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }),
      [[6.5, 6.5], [W / s - 6.5, 6.5], [6.5, H / s - 6.5], [W / s - 6.5, H / s - 6.5]].map(([x, y]) => corner(x * s, y * s)),
      // Header: seal, business, address.
      g({ x: R - 7 * s, y: 20 * s }, circle(0, 0, 7 * s, { fill: p.accent }), dotRing(5.6 * s, 24, 0.35 * s, p.paper), path(khatamPath(3.6 * s), { fill: p.paper })),
      line(val(ctx, "company"), R - 17 * s, 20 * s, 6 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: R - 20 * s - cx - 15 * s }),
      line(val(ctx, "address"), R - 17 * s, 26.4 * s, 2.8 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: R - 20 * s - cx - 15 * s }),
      // Title plate with the English line beneath.
      rect(cx - 25 * s, 12 * s, 40 * s, 13 * s, { fill: p.accent, r: 2 * s }),
      rect(cx - 23.8 * s, 13.2 * s, 37.6 * s, 10.6 * s, { fill: null, stroke: p.paper, strokeWidth: 0.25 * s, r: 1.4 * s }),
      line("سند قبض", cx - 5 * s, 21.4 * s, 7 * s, { font: ctx.font, weight: 700, fill: inks.white, safe: false }),
      line("RECEIPT VOUCHER", cx - 5 * s, 29.4 * s, 2.6 * s, { font: "inter", weight: 700, fill: p.accent, dir: "ltr", tracking: 0.5 * s, safe: false }),
      // Serial number in a red box.
      rect(L, 13 * s, 34 * s, 10 * s, { fill: null, stroke: inks.red, strokeWidth: 0.4 * s, r: 1 * s }),
      line("رقم", L + 32 * s, 19.6 * s, 3 * s, { font: "tajawal", weight: 700, fill: inks.red, align: "start", safe: false }),
      line(val(ctx, "number"), L + 2.4 * s, 20 * s, 5 * s, { font: "tajawal", weight: 800, fill: inks.red, align: "end", maxWidth: 22 * s }),
      // Amount box: shekels and agorot.
      rect(amountBox.x, amountBox.y, amountBox.w, amountBox.h, { fill: p.accent2, opacity: 0.35, r: 1.4 * s }),
      rect(amountBox.x, amountBox.y, amountBox.w, amountBox.h, { fill: null, stroke: p.accent, strokeWidth: 0.4 * s, r: 1.4 * s }),
      rect(amountBox.x, amountBox.y, amountBox.w, 5 * s, { fill: p.accent, r: 1.4 * s }),
      rect(amountBox.x + 16 * s, amountBox.y + 5 * s, 0.3 * s, amountBox.h - 5 * s, { fill: p.accent }),
      line("شيكل", amountBox.x + 37 * s, amountBox.y + 3.7 * s, 2.8 * s, { font: "tajawal", weight: 800, fill: inks.white, safe: false }),
      line("أغورة", amountBox.x + 8 * s, amountBox.y + 3.7 * s, 2.8 * s, { font: "tajawal", weight: 800, fill: inks.white, safe: false }),
      line(val(ctx, "amount"), amountBox.x + 37 * s, amountBox.y + 14.6 * s, 7 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: 36 * s }),
      line(val(ctx, "cents"), amountBox.x + 8 * s, amountBox.y + 14.6 * s, 6 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: 12 * s }),
      // The three written lines.
      field("استلمنا من:", val(ctx, "from"), 64 * s),
      field("مبلغاً وقدره:", val(ctx, "words"), 78 * s),
      field("وذلك عن:", val(ctx, "for"), 92 * s),
      // Payment method and date.
      tick("نقداً", R, 106 * s, !cheque),
      tick("شيك رقم:", R - 22 * s, 106 * s, !!cheque),
      path(dotted(cx - 6 * s, R - 46 * s, 107 * s, 1.6 * s, 0.7 * s), { fill: null, stroke: p.soft, strokeWidth: 0.3 * s }),
      line(cheque, R - 47 * s, 105.6 * s, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: R - 47 * s - cx }),
      line(val(ctx, "date") ? "التاريخ: " + val(ctx, "date") : "", L, 106 * s, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "end", maxWidth: cx - L - 12 * s }),
      // Signatures and the stamp ring.
      ["توقيع المستلم", "توقيع المحاسب"].map((l, i) => [rect(R - 44 * s - i * 54 * s, 126 * s, 44 * s, 0.3 * s, { fill: p.ink }), line(l, R - 22 * s - i * 54 * s, 131.6 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, safe: false })]),
      circle(L + 13 * s, 122 * s, 11 * s, { fill: null, stroke: p.soft, strokeWidth: 0.3 * s }),
      circle(L + 13 * s, 122 * s, 9.6 * s, { fill: null, stroke: p.soft, strokeWidth: 0.2 * s }),
      line("الختم", L + 13 * s, 123.2 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.soft, safe: false }),
    );
  },
};
export default t;
