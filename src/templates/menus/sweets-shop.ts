import { doubleFrame, rays, scallopPath, starPath, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const col = [{ ar: "الصنف", en: "Item" }, { ar: "السعر", en: "Price" }];

const t: Template = {
  id: "menus-sweets-shop",
  category: "menus",
  lang: "ar",
  title: { ar: "قائمة حلويات وكنافة", en: "Sweets and knafeh menu" },
  note: { ar: "صينية كنافة مرسومة من فوق في رأس القائمة، وعمودان للأصناف بالكيلو وبالقطعة. لمحلات الحلويات النابلسية.", en: "A knafeh tray seen from above heads the menu, with two columns for sweets by the kilo and by the piece. For Nabulsi sweet shops." },
  tags: ["قائمة", "منيو", "حلويات", "كنافة", "نابلسية", "بقلاوة", "menu", "sweets"],
  sizes: [sizes.a4, sizes.a3],
  palettes: [
    pal("knafeh", "كنافة", "Knafeh", inks.ivory, inks.black, inks.orange, inks.olive, inks.sand),
    pal("syrup", "قطر", "Syrup", inks.mustard, inks.black, inks.terracotta, inks.oliveDark, inks.goldDeep),
    pal("night", "ليل", "Night", inks.charcoal, inks.paper, inks.orange, inks.sage, inks.grey),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa", "kufam"],
  fields: [
    { id: "name", kind: "text", label: { ar: "اسم المحل", en: "Shop name" }, sample: "حلويات الأقصى", maxLength: 26 },
    { id: "tagline", kind: "text", label: { ar: "الشعار", en: "Tagline" }, sample: "كنافة نابلسية على أصولها" },
    { id: "head1", kind: "text", label: { ar: "عنوان القسم الأول", en: "First section title" }, sample: "بالكيلو" },
    { id: "list1", kind: "list", label: { ar: "القسم الأول", en: "First section" }, columns: col, maxRows: 8, sample: [["كنافة ناعمة", "٦٠"], ["كنافة خشنة", "٦٠"], ["بقلاوة مشكّلة", "٨٠"], ["برما", "٩٠"], ["هريسة", "٤٠"], ["معمول", "٧٠"]] },
    { id: "head2", kind: "text", label: { ar: "عنوان القسم الثاني", en: "Second section title" }, sample: "بالقطعة" },
    { id: "list2", kind: "list", label: { ar: "القسم الثاني", en: "Second section" }, columns: col, maxRows: 8, sample: [["صحن كنافة", "١٢"], ["قطايف جوز", "٣"], ["قطايف جبنة", "٣"], ["عوّامة", "١٠"], ["مدلوقة", "١٢"], ["نمّورة", "٥"]] },
    { id: "footer", kind: "text", label: { ar: "التذييل", en: "Footer" }, sample: "نستقبل طلبات المناسبات · ٠٩ ٢٣٨ ٠٠٠٠ · نابلس، خان التجار" },
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, v, s, cx } = dims(ctx, 210, 297), m = 17 * s, colW = (W - 2 * m - 14 * s) / 2, r = 30 * s, cy = 46 * v, top = 150 * v, pitch = Math.min(15.5 * v, (H - top - 50 * v) / 8);
    const column = (headId: string, listId: string, right: number) => [
      rect(right - colW, top - 11 * s, colW, 14 * s, { fill: p.accent }),
      line(val(ctx, headId), right - colW / 2, top - 0.6 * s, 10.5 * s, { font: ctx.font, weight: 700, fill: inks.ivory, maxWidth: colW - 8 * s }),
      priceList(ctx, listId, { nameX: right, priceX: right - colW, top: top + 20 * v, pitch, size: 7.4 * s, max: 8, ink: p.ink, priceInk: p.accent, rule: p.soft }),
    ];
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      starTile(0, H * 0.35, W, H * 0.65, 14 * z, 1.4 * z, p.accent, 0.05),
      g({ x: cx, y: cy }, g({ opacity: 0.25 }, rays(24, r * 1.2, r * 4.2, p.accent, 0.4)), circle(0, 0, r * 1.14, { fill: p.ink }), circle(0, 0, r, { fill: p.accent }),
        path(scallopPath(r * 0.84, 18, 0.1), { fill: null, stroke: inks.ivory, strokeWidth: 0.5 * s, opacity: 0.7 }), circle(0, 0, r * 0.5, { fill: p.accent2 }), path(starPath(8, r * 0.34, r * 0.2), { fill: p.accent })),
      rect(-b, cy + r * 1.3, W + 2 * b, H - cy - r * 1.3 + b, { fill: p.paper }),
      line(val(ctx, "name"), cx, 108 * v, 26 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 2 * m }),
      line(val(ctx, "tagline"), cx, 121 * v, 7.6 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: W - 2 * m }),
      column("head1", "list1", W - m), column("head2", "list2", m + colW),
      rect(m, H - 30 * v, W - 2 * m, 0.6 * s, { fill: p.ink }),
      line(val(ctx, "footer"), cx, H - 20 * v, 5.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 2 * m }),
      doubleFrame(6 * z, 6 * z, W - 12 * z, H - 12 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "khatam", r: 2 * z }),
    );
  },
};
export default t;
