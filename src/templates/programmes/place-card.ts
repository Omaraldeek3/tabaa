import { khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "programmes-place-card",
  category: "programmes",
  lang: "ar",
  title: { ar: "بطاقة اسم الضيف المطوية", en: "Folded guest place card" },
  note: { ar: "بطاقة تُطوى من النصف وتقف على الطاولة: خط الطيّ في الوسط، والوجه الأمامي يحمل اسم الضيف كبيراً بين نجمتين. للأعراس والعشاءات الرسمية.", en: "A card folded in half to stand on the table: the fold line in the middle, and the front carries the guest's name large between two stars. For weddings and formal dinners." },
  tags: ["اسم الضيف", "طاولة", "عرس", "عشاء", "مطوية", "place card"],
  sizes: [{ id: "90x100", label: { ar: "تُطوى إلى ٩٠×٥٠ ملم", en: "Folds to 90×50 mm" }, widthMm: 90, heightMm: 100 }],
  palettes: [
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.black, inks.goldDeep, inks.red, inks.sand),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.gold, inks.sky, inks.sky),
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.goldDeep, inks.rose, inks.ivory),
  ],
  fonts: ["arefruqaa", "amiri", "marhey"],
  fields: [
    tf("name", "اسم الضيف", "Guest", "الحاج أبو خليل", 24),
    tf("table", "الطاولة", "Table", "طاولة ٣", 12),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 90, 100), fold = H / 2;
    return scene(W, H, p.paper,
      path(Array.from({ length: 30 }, (_, i) => `M${i * 3 * s} ${fold} h${1.6 * s}`).join(" "), { fill: null, stroke: p.soft, strokeWidth: 0.3 * s }),
      rect(6 * s, fold + 5 * s, W - 12 * s, fold - 10 * s, { fill: null, stroke: p.accent, strokeWidth: 0.4 * s }),
      [10 * s, W - 10 * s].map(x => g({ x, y: fold + fold / 2 - 2 * s }, path(khatamPath(2.6 * s), { fill: p.accent }))),
      line(val(ctx, "name"), cx, fold + fold / 2 + 1 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 34 * s }),
      line(val(ctx, "table"), cx, fold + fold / 2 + 10 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: W - 34 * s }),
    );
  },
};
export default t;
