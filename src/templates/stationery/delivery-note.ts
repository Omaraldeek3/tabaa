import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-delivery-note",
  category: "stationery",
  lang: "ar",
  title: { ar: "سند تسليم بضاعة بشاحنة", en: "Delivery note with a lorry" },
  note: { ar: "سند تسليم للتوزيع: شاحنة صغيرة في الرأس، وقائمة البضاعة بمربّعات تُشطب عند الاستلام، وخانة لاسم المستلم وتوقيعه. لتجّار الجملة والتوصيل.", en: "A delivery note for distributors: a small lorry at the head, the goods listed with tick boxes for checking on arrival, and space for the receiver's name and signature. For wholesalers and delivery." },
  tags: ["سند تسليم", "توصيل", "بضاعة", "جملة", "شحن", "delivery note"],
  sizes: [sizes.a5, sizes.a4],
  palettes: [
    pal("orange", "برتقالي", "Orange", inks.white, inks.black, inks.orange, inks.navy, inks.grey),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.olive, inks.terracotta, inks.grey),
    pal("blue", "أزرق", "Blue", inks.white, inks.navy, inks.teal, inks.mustard, inks.grey),
  ],
  fonts: ["lalezar", "kufam", "reemkufi"],
  fields: [
    tf("company", "الشركة", "Company", "شركة الريف لتوزيع المواد الغذائية", 32),
    tf("number", "رقم السند", "Note no.", "٣٣٨٧", 8),
    tf("to", "إلى", "Deliver to", "سوبرماركت النجمة · قلقيلية"),
    tf("date", "التاريخ", "Date", "٢٠٢٧/٤/٨"),
    lf("goods", "البضاعة", "Goods", [["الصنف", "Item"], ["الكمية", "Qty"]], [["زيت زيتون ١ لتر", "٢٤ عبوة"], ["زعتر بلدي ٥٠٠ غم", "٤٠ كيس"], ["فريكة ١ كغم", "٢٠ كيس"], ["مفتول ٥٠٠ غم", "٣٠ كيس"]], 12),
  ],
  safeMm: 7,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 148, 210), R = W - 12 * s, L = 12 * s, goods = rows(ctx, "goods", 12), top = 72 * s, pitch = Math.min(10 * s, (H - top - 40 * s) / Math.max(goods.length, 1));
    const lorry = g({ x: L, y: 30 * s },
      rect(0, -14 * s, 22 * s, 13 * s, { fill: p.accent, r: 1 * s }),
      path(`M${22.6 * s} ${-9 * s} H${29 * s} L${32 * s} ${-5 * s} V${-1 * s} H${22.6 * s} Z`, { fill: p.accent2 }),
      [5, 27].map(x => circle(x * s, 0, 2.4 * s, { fill: p.ink })));
    return scene(W, H, p.paper,
      rect(-b, 36 * s, W + 2 * b, 0.8 * s, { fill: p.accent }), lorry,
      line("سند تسليم", R, 18 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", safe: false }),
      line(val(ctx, "company"), R, 28 * s, 3.6 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.62 }),
      line(val(ctx, "number") ? "رقم " + val(ctx, "number") : "", L + 34 * s, 22 * s, 3.8 * s, { font: "tajawal", weight: 800, fill: inks.red, align: "end", maxWidth: 30 * s }),
      line(val(ctx, "to") ? "إلى: " + val(ctx, "to") : "", R, 48 * s, 4.2 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: R - L }),
      line(val(ctx, "date") ? "التاريخ: " + val(ctx, "date") : "", R, 57 * s, 3.6 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: R - L }),
      goods.flatMap(([item = "", qty = ""], i) => {
        const y = top + i * pitch;
        return [rect(R - 5 * s, y - 4 * s, 4.4 * s, 4.4 * s, { fill: null, stroke: p.ink, strokeWidth: 0.35 * s }), rect(L, y + 1.6 * s, R - L, 0.2 * s, { fill: p.soft }),
          line(item, R - 9 * s, y, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: (R - L) * 0.6 }),
          line(qty, L, y, 4 * s, { font: "tajawal", weight: 800, fill: p.accent2, align: "end", maxWidth: (R - L) * 0.28 })];
      }),
      ["اسم المستلم", "التوقيع"].map((l, i) => [rect(R - 50 * s - i * 66 * s, H - 20 * s, 50 * s, 0.3 * s, { fill: p.ink }), line(l, R - 25 * s - i * 66 * s, H - 14 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, safe: false })]),
    );
  },
};
export default t;
