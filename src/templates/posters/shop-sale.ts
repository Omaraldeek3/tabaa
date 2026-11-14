import { dotField, rays, ribbon, ringsNode, scallopPath, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const shopSale: Template = {
  id: "posters-shop-sale",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر تنزيلات المحل", en: "Shop sale poster" },
  note: { ar: "بوستر صارخ لواجهة المحل: نسبة الخصم داخل ختم مسنّن فوق أشعة، مع المدة والعنوان. يُقرأ من الرصيف المقابل.", en: "A loud poster for the shop window: the discount in a toothed seal over rays, with the dates and address. Readable from across the street." },
  tags: ["تنزيلات", "خصم", "عروض", "محل", "تخفيضات", "sale", "poster"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("hot", "حار", "Hot", inks.mustard, inks.black, inks.red, inks.black, inks.paper),
    pal("fresh", "طازج", "Fresh", inks.paper, inks.black, inks.olive, inks.red, inks.mustard),
    pal("night", "ليل", "Night", inks.black, inks.paper, inks.red, inks.mustard, inks.mustard),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "cairo"],
  fields: [
    { id: "shop", kind: "text", label: { ar: "اسم المحل", en: "Shop name" }, sample: "بيت الأقمشة", maxLength: 28 },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "تنزيلات", maxLength: 18 },
    { id: "amount", kind: "text", label: { ar: "نسبة الخصم", en: "Discount" }, sample: "٥٠٪", maxLength: 6 },
    { id: "upto", kind: "text", label: { ar: "فوق النسبة", en: "Above the number" }, sample: "حتى", maxLength: 12 },
    { id: "what", kind: "text", label: { ar: "على ماذا", en: "On what" }, sample: "على جميع أقمشة الصيف" },
    { id: "dates", kind: "text", label: { ar: "المدة", en: "Dates" }, sample: "من ١ إلى ١٥ آب" },
    { id: "address", kind: "text", label: { ar: "العنوان والهاتف", en: "Address and phone" }, sample: "شارع النصر، نابلس · ٠٩ ٢٣٤ ٥٦٧٨" },
  ],
  safeMm: 10,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 1;
    const u = W / 297, v = H / 420, s = Math.min(u, v), cx = W / 2, m = 22 * s, max = W - 2 * m;
    const cy = 236 * v, R = 82 * s, footH = 62 * v;
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      dotField(0, H * 0.8, W, H * 0.2, 8 * z, 0.9 * z, p.ink, { fade: "up", opacity: 0.12 }),
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      g({ x: cx, y: cy, opacity: 0.22 }, rays(24, R * 0.9, Math.hypot(W, H), p.ink, 0.5)),
      rect(-b, -b, W + 2 * b, 46 * v + b, { fill: p.ink }),
      line(val(ctx, "shop"), cx, 33 * v, 16 * s, { font: ctx.font, weight: 700, fill: p.paper, maxWidth: max }),
      line(val(ctx, "title"), cx, 124 * v, 78 * s, { font: ctx.font, weight: 800, fill: p.ink, maxWidth: max }),
      g({ x: cx, y: cy }, path(scallopPath(R, 22, 0.1), { fill: p.accent }), circle(0, 0, R * 0.84, { fill: null, stroke: inks.paper, strokeWidth: 0.9 * s }),
        g({ x: -R * 0.62, y: -R * 0.5 }, path(starPath(5, 5 * s, 2.1 * s), { fill: p.soft })), g({ x: R * 0.62, y: -R * 0.5 }, path(starPath(5, 5 * s, 2.1 * s), { fill: p.soft }))),
      line(val(ctx, "upto"), cx, cy - R * 0.42, 17 * s, { font: "tajawal", weight: 800, fill: inks.paper, maxWidth: R * 0.9 }),
      line(val(ctx, "amount"), cx, cy + R * 0.34, 82 * s, { font: ctx.font, weight: 800, fill: inks.paper, maxWidth: R * 1.42 }),
      g({ x: cx, y: cy + R + 13 * v }, ribbon(Math.min(max * 0.78, 190 * s), 21 * s, p.ink, p.accent2 === p.ink ? p.accent : p.accent2)),
      line(val(ctx, "what"), cx, cy + R + 13 * v + 4.4 * s, 12.5 * s, { font: "tajawal", weight: 800, fill: p.paper, maxWidth: Math.min(max * 0.72, 176 * s) }),
      rect(-b, H - footH, W + 2 * b, footH + b, { fill: p.ink }),
      line(val(ctx, "dates"), cx, H - footH + 25 * v, 21 * s, { font: ctx.font, weight: 700, fill: p.soft, maxWidth: max }),
      line(val(ctx, "address"), cx, H - Math.max(15 * v, ctx.safeMm + 3), 9.5 * s, { font: "tajawal", weight: 700, fill: p.paper, maxWidth: max }),
      g({ x: W / 2, y: H * 0.5 }, ringsNode(64 * z, 68 * z, 2, p.paper, 0.5 * z, 0.7)),
    );
  },
};

export default shopSale;
