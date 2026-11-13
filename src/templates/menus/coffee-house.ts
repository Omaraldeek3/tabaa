import { khatamPath, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const col = [{ ar: "الصنف", en: "Item" }, { ar: "السعر", en: "Price" }];

const t: Template = {
  id: "menus-coffee-house",
  category: "menus",
  lang: "ar",
  title: { ar: "قائمة مقهى طولية", en: "Tall coffee house menu" },
  note: { ar: "قائمة طولية داكنة بعمود واحد للمقاهي: قهوة ومشروبات ساخنة وباردة. توضع على الطاولة أو تعلَّق قرب الصندوق.", en: "A tall, dark single-column menu for cafés: coffee, hot and cold drinks. Stands on the table or hangs by the till." },
  tags: ["قائمة", "منيو", "مقهى", "قهوة", "مشروبات", "كافيه", "menu", "coffee"],
  sizes: [sizes.dl, sizes.a5, sizes.a4],
  palettes: [
    pal("roast", "محمّص", "Roast", inks.charcoal, inks.paper, inks.mustard, inks.terracotta, inks.grey),
    pal("cream", "قشطة", "Cream", inks.paper, inks.black, inks.terracotta, inks.black, inks.sand),
    pal("mint", "نعنع", "Mint", inks.oliveDark, inks.ivory, inks.sage, inks.mustard, inks.olive),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "kufam"],
  fields: [
    { id: "name", kind: "text", label: { ar: "اسم المقهى", en: "Café name" }, sample: "قهوة الديوان", maxLength: 24 },
    { id: "head1", kind: "text", label: { ar: "عنوان القسم الأول", en: "First section title" }, sample: "ساخن" },
    { id: "list1", kind: "list", label: { ar: "القسم الأول", en: "First section" }, columns: col, maxRows: 7, sample: [["قهوة عربية", "٥"], ["قهوة تركية", "٧"], ["شاي بالنعنع", "٥"], ["شاي بالميرمية", "٥"], ["سحلب", "١٠"], ["يانسون", "٦"]] },
    { id: "head2", kind: "text", label: { ar: "عنوان القسم الثاني", en: "Second section title" }, sample: "بارد" },
    { id: "list2", kind: "list", label: { ar: "القسم الثاني", en: "Second section" }, columns: col, maxRows: 7, sample: [["ليمون بالنعنع", "١٠"], ["تمر هندي", "٨"], ["خرّوب", "٨"], ["عصير برتقال", "١٢"], ["لبن عيران", "٦"]] },
    { id: "footer", kind: "text", label: { ar: "التذييل", en: "Footer" }, sample: "الأسعار بالشيكل · واي فاي مجاني" },
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 99, 210), m = 11 * s, head = 46 * s, body = H - head - 22 * s, pitch = Math.min(11 * s, body / 17);
    const sec = (headId: string, listId: string, top: number) => [
      line(val(ctx, headId), W - m, top, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: W - 2 * m }),
      g({ x: m, y: top + 2.4 * s }, tatreezBand("dots", W - 2 * m, 0.8 * s, [p.accent2])),
      priceList(ctx, listId, { nameX: W - m, priceX: m, top: top + pitch * 1.25, pitch, size: 4.6 * s, max: 7, ink: p.ink, priceInk: p.accent, rule: p.soft }),
    ];
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      g({ x: cx, y: 15 * s }, path(khatamPath(6 * s), { fill: null, stroke: p.accent, strokeWidth: 0.4 * s }), path(khatamPath(2.6 * s), { fill: p.accent2 })),
      line(val(ctx, "name"), cx, 36 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 2 * m }),
      g({ x: -b, y: head - 3 * s }, tatreezBand("chain", W + 2 * b, 3.4 * s, [p.accent, p.accent2])),
      sec("head1", "list1", head + pitch * 1.3), sec("head2", "list2", head + pitch * 10.2),
      line(val(ctx, "footer"), cx, H - 10 * s, 3.5 * s, { font: "tajawal", weight: 500, fill: p.soft === inks.sand ? inks.grey : p.soft, maxWidth: W - 2 * m }),
    );
  },
};
export default t;
