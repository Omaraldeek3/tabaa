import { burstLines, ringsNode, starPath } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-sale-burst",
  category: "stickers",
  lang: "ar",
  title: { ar: "ستيكر تنزيلات بانفجار مسنّن", en: "Sale starburst sticker" },
  note: { ar: "ستيكر على شكل انفجار مسنّن بأربعة وعشرين رأساً، فيه «تنزيلات» ونسبة الخصم بخط ثقيل. للصقه على الواجهات والرفوف والأكياس.", en: "A sticker shaped like a starburst with twenty-four points, carrying the word sale and the discount in heavy type. For windows, shelves and bags." },
  tags: ["تنزيلات", "خصم", "عرض", "ستيكر", "واجهة", "sale"],
  sizes: [sizes.round70, sizes.round50, sizes.round90],
  shape: "round",
  palettes: [
    pal("red", "أحمر", "Red", inks.white, inks.white, inks.red, inks.mustard, inks.mustard),
    pal("yellow", "أصفر", "Yellow", inks.white, inks.black, inks.mustard, inks.red, inks.red),
    pal("black", "أسود", "Black", inks.white, inks.mustard, inks.black, inks.white, inks.white),
  ],
  fonts: ["lalezar", "jomhuria", "kufam"],
  fields: [
    tf("top", "الكلمة", "Word", "تنزيلات", 10),
    tf("amount", "النسبة", "Amount", "٥٠٪", 6),
    tf("note", "ملاحظة", "Note", "حتى نفاد الكمية", 18),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 70, 70), k = W / 70, c = W / 2;
    return scene(W, W, p.paper,
      g({ x: c, y: c }, path(starPath(24, W / 2 - 1.6 * k, W / 2 - 7 * k), { fill: p.accent }), path(starPath(24, W / 2 - 7.6 * k, W / 2 - 11 * k), { fill: null, stroke: p.soft, strokeWidth: 0.5 * k })),
      g({ x: c, y: c, opacity: 0.25 }, burstLines(48, W / 2 - 18 * k, W / 2 - 12 * k, p.accent2, 0.3 * k)),
      line(val(ctx, "top"), cx, 25 * k, 7.6 * k, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: 38 * k }),
      line(val(ctx, "amount"), cx, 45 * k, 20 * k, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 42 * k }),
      line(val(ctx, "note"), cx, 52 * k, 3.2 * k, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: 30 * k }),
      g({ x: c, y: c }, ringsNode(W / 2 - 13 * k, W / 2 - 12.4 * k, 2, p.soft, 0.2 * k, 0.8)),
      [c - 18 * k, c + 18 * k].map(x => g({ x, y: 32 * k }, path(starPath(4, 1.8 * k, 0.5 * k), { fill: p.accent2 }))),
    );
  },
};
export default t;
