import { keffiyeh, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, more, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const col = [{ ar: "الصنف", en: "Item" }, { ar: "السعر", en: "Price" }];

const t: Template = {
  id: "menus-grill-house",
  category: "menus",
  lang: "ar",
  title: { ar: "قائمة مشاوي عرضية", en: "Landscape grill menu" },
  note: { ar: "قائمة عرضية سوداء وحمراء بلهب في الزاوية: ثلاثة أعمدة للمشاوي والمقبلات والمشروبات. لمطاعم المشاوي والشاورما.", en: "A black and red landscape menu with flames in the corner: three columns for grills, starters and drinks. For grill and shawarma houses." },
  tags: ["قائمة", "منيو", "مشاوي", "شاورما", "كباب", "مطعم", "menu", "grill"],
  sizes: [sizes.a4l, more.a5l],
  palettes: [
    pal("coal", "فحم", "Coal", inks.black, inks.paper, inks.red, inks.orange, inks.grey),
    pal("paper", "ورق", "Paper", inks.paper, inks.black, inks.red, inks.terracotta, inks.sand),
    pal("olive", "زيتون", "Olive", inks.oliveDark, inks.ivory, inks.orange, inks.mustard, inks.olive),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "cairo"],
  fields: [
    { id: "name", kind: "text", label: { ar: "اسم المطعم", en: "Restaurant name" }, sample: "مشاوي الشام", maxLength: 24 },
    { id: "tagline", kind: "text", label: { ar: "الشعار", en: "Tagline" }, sample: "على الفحم، من الملحمة إلى الصحن" },
    { id: "head1", kind: "text", label: { ar: "العمود الأول", en: "First column" }, sample: "المشاوي" },
    { id: "list1", kind: "list", label: { ar: "أصناف العمود الأول", en: "First column items" }, columns: col, maxRows: 7, sample: [["كباب", "٣٥"], ["شقف", "٤٠"], ["شيش طاووق", "٣٠"], ["ريش", "٥٥"], ["مشكّل", "٤٥"], ["جاج مسحّب", "٢٨"]] },
    { id: "head2", kind: "text", label: { ar: "العمود الثاني", en: "Second column" }, sample: "المقبلات" },
    { id: "list2", kind: "list", label: { ar: "أصناف العمود الثاني", en: "Second column items" }, columns: col, maxRows: 7, sample: [["حمّص", "١٠"], ["متبّل", "١٠"], ["تبّولة", "١٢"], ["فتّوش", "١٢"], ["بطاطا", "٨"], ["ورق عنب", "١٥"]] },
    { id: "head3", kind: "text", label: { ar: "العمود الثالث", en: "Third column" }, sample: "المشروبات" },
    { id: "list3", kind: "list", label: { ar: "أصناف العمود الثالث", en: "Third column items" }, columns: col, maxRows: 7, sample: [["لبن عيران", "٥"], ["عصير طازج", "١٠"], ["مشروب غازي", "٤"], ["ماء", "٢"], ["شاي", "٣"]] },
    { id: "footer", kind: "text", label: { ar: "التذييل", en: "Footer" }, sample: "توصيل مجاني داخل المدينة · ٠٥٩٩ ١١١ ٢٢٢" },
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, v, s } = dims(ctx, 297, 210), m = 16 * s, side = W * 0.27, gap = 9 * s, area = W - side - 2 * m, colW = (area - 2 * gap) / 3, top = 40 * v, pitch = Math.min(18 * v, (H - top - 52 * v) / 7);
    const flame = (h: number) => `M0 0 C${-h * 0.42} ${-h * 0.2} ${-h * 0.3} ${-h * 0.62} ${-h * 0.04} ${-h} C${-h * 0.02} ${-h * 0.7} ${h * 0.3} ${-h * 0.62} ${h * 0.22} ${-h * 0.36} C${h * 0.34} ${-h * 0.42} ${h * 0.4} ${-h * 0.16} 0 0 Z`;
    const column = (i: number) => { const right = W - m - i * (colW + gap); return [
      line(val(ctx, `head${i + 1}`), right, top, 12 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: colW }),
      g({ x: right - colW, y: top + 4 * v }, tatreezBand("zigzag", colW, 3.6 * s, [p.ink, p.accent2])),
      priceList(ctx, `list${i + 1}`, { nameX: right, priceX: right - colW, top: top + 22 * v, pitch, size: 6.6 * s, max: 7, ink: p.ink, priceInk: p.accent2, rule: p.soft }),
    ]; };
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      rect(-b, -b, side + b, H + 2 * b, { fill: p.accent }),
      g({ x: -b, y: -b, opacity: 0.14 }, keffiyeh(side + b, H + 2 * b, 10 * s, inks.paper, 0.12)),
      [[0.24, 46, 1], [0.5, 66, 0.9], [0.76, 42, 1]].map(([x, h, o]) => g({ x: x * side, y: H * 0.5, opacity: o }, path(flame(h * s), { fill: inks.mustard }), path(flame(h * s * 0.55), { fill: inks.ivory, opacity: 0.85 }))),
      rect(side * 0.12, H * 0.5 + 2 * s, side * 0.76, 3 * s, { fill: inks.ivory }),
      line(val(ctx, "name"), side / 2, H * 0.5 + 34 * v, 20 * s, { font: ctx.font, weight: 800, fill: inks.ivory, maxWidth: side - 2 * (ctx.safeMm + 3) }),
      line(val(ctx, "tagline"), side / 2, H * 0.5 + 48 * v, 5.4 * s, { font: "tajawal", weight: 500, fill: inks.ivory, maxWidth: side - 2 * (ctx.safeMm + 3) }),
      column(0), column(1), column(2),
      rect(side + m, H - 30 * v, area, 0.5 * s, { fill: p.ink }),
      line(val(ctx, "footer"), side + m + area / 2, H - 19 * v, 5.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: area }),
    );
  },
};
export default t;
