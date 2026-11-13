import { oliveBranch, tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const col = [{ ar: "الصنف", en: "Item" }, { ar: "السعر", en: "Price" }];

const t: Template = {
  id: "menus-en-cafe",
  category: "menus",
  lang: "en",
  title: { ar: "قائمة مطعم إنجليزية", en: "English restaurant menu" },
  note: { ar: "قائمة بالإنجليزية للمطاعم الفلسطينية في الخارج: عمودان بحروف سيريف، وغصن زيتون وشريط تطريز في الرأس.", en: "An English menu for Palestinian kitchens abroad: two serif columns under an olive branch and a tatreez band." },
  tags: ["menu", "english", "restaurant", "cafe", "mezze", "قائمة", "منيو", "إنجليزي"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.olive, inks.red, inks.sage),
    pal("ink", "حبر", "Ink", inks.white, inks.black, inks.black, inks.red, inks.sand),
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.oliveDark, inks.sand),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "name", kind: "text", label: { ar: "اسم المطعم", en: "Restaurant name" }, sample: "Beit Sitti", maxLength: 24 },
    { id: "tagline", kind: "text", label: { ar: "الشعار", en: "Tagline" }, sample: "PALESTINIAN HOME COOKING" },
    { id: "head1", kind: "text", label: { ar: "عنوان القسم الأول", en: "First section title" }, sample: "Mezze" },
    { id: "list1", kind: "list", label: { ar: "القسم الأول", en: "First section" }, columns: col, maxRows: 8, sample: [["Hummus & warm bread", "6"], ["Mutabbal", "6"], ["Falafel, six pieces", "7"], ["Fattoush", "8"], ["Labneh with za'atar", "6"], ["Stuffed vine leaves", "8"]] },
    { id: "head2", kind: "text", label: { ar: "عنوان القسم الثاني", en: "Second section title" }, sample: "Mains" },
    { id: "list2", kind: "list", label: { ar: "القسم الثاني", en: "Second section" }, columns: col, maxRows: 8, sample: [["Musakhan", "16"], ["Maqluba", "15"], ["Maftoul with chicken", "15"], ["Freekeh soup", "9"], ["Knafeh", "8"], ["Mint tea", "3"]] },
    { id: "footer", kind: "text", label: { ar: "التذييل", en: "Footer" }, sample: "Open Tuesday to Sunday · 12 Olive Lane · Please tell us about allergies" },
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, v, s, cx } = dims(ctx, 210, 297), m = 20 * s, colW = (W - 2 * m - 16 * s) / 2, top = 122 * v, pitch = Math.min(16 * v, (H - top - 56 * v) / 8);
    const column = (headId: string, listId: string, left: number) => [
      line(val(ctx, headId), left, top, 13 * s, { font: ctx.font, weight: 600, fill: p.accent, align: "start", maxWidth: colW }),
      rect(left, top + 4 * v, colW, 0.5 * s, { fill: p.ink }),
      priceList(ctx, listId, { nameX: left, priceX: left + colW, top: top + 22 * v, pitch, size: 5.6 * s, max: 8, ink: p.ink, priceInk: p.accent2, rule: p.soft, font: "inter", priceFont: "inter", dir: "ltr" }),
    ];
    return scene(W, H, p.paper,
      g({ x: cx - 27 * s, y: 36 * v }, oliveBranch(54 * s, p.accent, p.ink, { leaves: 11, bend: 0.08, olives: 3 })),
      line(val(ctx, "name"), cx, 72 * v, 28 * s, { font: ctx.font, weight: 600, fill: p.ink, maxWidth: W - 2 * m }),
      line(val(ctx, "tagline"), cx, 86 * v, 4.4 * s, { font: "inter", weight: 700, fill: p.accent2, tracking: 1.2 * s, maxWidth: W - 2 * m }),
      g({ x: cx - 40 * s, y: 94 * v }, tatreezBand("chain", 80 * s, 4.2 * s, [p.accent2, p.accent])),
      column("head1", "list1", m), column("head2", "list2", W - m - colW),
      rect(m, H - 36 * v, W - 2 * m, 0.5 * s, { fill: p.ink }),
      line(val(ctx, "footer"), cx, H - 25 * v, 4 * s, { font: "inter", weight: 500, fill: p.soft === inks.sage ? p.ink : inks.grey, maxWidth: W - 2 * m }),
    );
  },
};
export default t;
