import { stitchedHeart } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-mothers-day",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة عيد الأم بقلب مطرّز", en: "Mother's Day card with a stitched heart" },
  note: { ar: "قلب كبير مشغول بغرز التطريز الفلسطيني كأن الأم طرّزته بيدها، و«كل عام وأنتِ الحياة» تحته. لعيد الأم في ٢١ آذار.", en: "A big heart worked in Palestinian cross-stitch as if embroidered by her own hand, with a line of love beneath. For Mother's Day on 21 March." },
  tags: ["عيد الأم", "أم", "ماما", "تطريز", "قلب", "آذار", "mother's day"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("red", "أحمر", "Red", inks.ivory, inks.burgundy, inks.red, inks.olive, inks.rose),
    pal("black", "ثوب", "Thobe", inks.charcoal, inks.ivory, inks.red, inks.mustard, inks.rose),
    pal("rose", "وردي", "Rose", inks.blush, inks.burgundy, inks.burgundy, inks.rose, inks.rose),
  ],
  fonts: ["arefruqaa", "marhey", "amiri"],
  fields: [
    tf("title", "العنوان", "Title", "إلى أمّي", 16),
    tf("message", "الرسالة", "Message", "كل عام وأنتِ الحياة كلّها"),
    tf("from", "من", "From", "ابنتك سلمى"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), hw = Math.min(W * 0.7, H * 0.46), max = W - 16 * s;
    return scene(W, H, p.paper,
      line(val(ctx, "title"), cx, 9 + 14 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx - hw / 2, y: H * 0.5 - hw * 0.5 }, stitchedHeart(hw, [p.accent, p.accent2])),
      line(val(ctx, "message"), cx, H * 0.5 + hw * 0.58, 5.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 4 * s, 4.2 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
