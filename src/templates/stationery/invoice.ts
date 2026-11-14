import { rect, scene } from "../../lib/scene.ts";
import { toArabicDigits, toLatinDigits } from "../calendar-kit.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const num = (v: string) => { const n = Number.parseFloat(toLatinDigits(v).replace(/[^\d.]/g, "")); return Number.isFinite(n) ? n : null; };
const money = (n: number) => toArabicDigits(Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2));

const t: Template = {
  id: "stationery-invoice",
  category: "stationery",
  lang: "ar",
  title: { ar: "فاتورة تحسب المجموع وحدها", en: "Invoice that adds itself up" },
  note: { ar: "فاتورة مبيعات: اكتب الصنف والكمية وسعر الوحدة فيُحسب مجموع كل سطر والمجموع الكلّي تلقائياً. رأس داكن برقم الفاتورة وتاريخها، وخانة للعميل.", en: "A sales invoice: type item, quantity and unit price and each line's total and the grand total are worked out for you. A dark head with the invoice number and date, and a box for the customer." },
  tags: ["فاتورة", "مبيعات", "حسابات", "محل", "عميل", "invoice"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.white, inks.black, inks.navy, inks.teal, inks.grey),
    pal("olive", "زيتي", "Olive", inks.white, inks.black, inks.oliveDark, inks.terracotta, inks.grey),
    pal("black", "أسود", "Black", inks.white, inks.black, inks.charcoal, inks.red, inks.grey),
  ],
  fonts: ["reemkufi", "kufam", "cairo"],
  fields: [
    tf("company", "الشركة", "Company", "منجرة أبو سليم للأثاث", 30),
    tf("contact", "بيانات الشركة", "Company details", "بيت أمّر · ٠٥٩٨ ٣٣٣ ٧٧٧"),
    tf("number", "رقم الفاتورة", "Invoice no.", "٠٠١٢٤"),
    tf("date", "التاريخ", "Date", "٢٠٢٧/١١/٣"),
    tf("client", "العميل", "Customer", "السيد خالد عودة · الخليل"),
    lf("items", "الأصناف", "Items", [["الصنف", "Item"], ["الكمية", "Qty"], ["سعر الوحدة", "Unit price"]], [["باب خشب سنديان", "٣", "١٢٠٠"], ["خزانة مطبخ علوية", "٦", "٤٥٠"], ["تركيب ونقل", "١", "٣٠٠"]], 12),
    tf("currency", "العملة", "Currency", "شيكل"),
    tf("note", "ملاحظة", "Note", "شكراً لتعاملكم معنا · البضاعة المباعة لا ترد"),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, u, v } = dims(ctx, 210, 297), s = u, R = W - 16 * s, L = 16 * s, head = 46 * v, items = rows(ctx, "items", 12), cur = val(ctx, "currency");
    const cols = [R, R - (R - L) * 0.52, R - (R - L) * 0.68, R - (R - L) * 0.84], top = head + 46 * v, pitch = Math.min(12 * v, (H - top - 60 * v) / 12);
    let total = 0, any = false;
    const body = items.flatMap(([item = "", qty = "", price = ""], i) => {
      const q = num(qty), pr = num(price), sum = q !== null && pr !== null ? q * pr : null, y = top + (i + 1) * pitch;
      if (sum !== null) { total += sum; any = true; }
      return [
        i % 2 ? null : rect(L, y - pitch * 0.72, R - L, pitch, { fill: p.accent, opacity: 0.06 }),
        line(item, cols[0] - 2 * s, y, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: (R - L) * 0.48 }),
        line(qty, (cols[1] + cols[2]) / 2, y, 4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: (R - L) * 0.14 }),
        line(price, (cols[2] + cols[3]) / 2, y, 4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: (R - L) * 0.14 }),
        line(sum === null ? "" : money(sum), (cols[3] + L) / 2, y, 4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: (R - L) * 0.15 }),
      ];
    });
    const ty = top + (items.length + 2) * pitch;
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, head + b, { fill: p.accent }),
      line(val(ctx, "company"), R, 22 * v, 8 * s, { font: ctx.font, weight: 700, fill: inks.white, align: "start", maxWidth: W * 0.55 }),
      line(val(ctx, "contact"), R, 32 * v, 3.4 * s, { font: "tajawal", weight: 500, fill: inks.white, align: "start", maxWidth: W * 0.55 }),
      line("فاتورة", L, 22 * v, 9 * s, { font: ctx.font, weight: 700, fill: inks.white, align: "end", safe: false }),
      line([val(ctx, "number") && "رقم " + val(ctx, "number"), val(ctx, "date")].filter(Boolean).join("  ·  "), L, 32 * v, 3.4 * s, { font: "tajawal", weight: 700, fill: inks.white, align: "end", maxWidth: W * 0.35 }),
      line(val(ctx, "client") ? "إلى: " + val(ctx, "client") : "", R, head + 16 * v, 4.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: R - L }),
      rect(L, top - pitch * 0.2, R - L, pitch * 0.9, { fill: p.accent }),
      ["الصنف", "الكمية", "السعر", "المجموع"].map((h, i) => line(h, i ? ((i === 3 ? L : cols[i + 1]) + cols[i]) / 2 : cols[0] - 2 * s, top + pitch * 0.45, 3.6 * s, { font: "tajawal", weight: 800, fill: inks.white, align: i ? "center" : "start", safe: false })),
      body,
      any ? rect(L, ty - pitch * 0.8, (R - L) * 0.4, pitch * 1.4, { fill: p.accent2 }) : null,
      line(any ? `المجموع: ${money(total)} ${cur}` : "", L + (R - L) * 0.2, ty + pitch * 0.1, 4.6 * s, { font: "tajawal", weight: 800, fill: inks.white, maxWidth: (R - L) * 0.38 }),
      line(val(ctx, "note"), (R + L) / 2, H - 16 * v, 3.4 * s, { font: "tajawal", fill: p.soft, maxWidth: R - L }),
    );
  },
};
export default t;
