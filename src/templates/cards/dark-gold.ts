import { khatamPath } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-dark-gold",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت أعمال داكن بنجوم ذهبية", en: "Dark business card with gold stars" },
  note: { ar: "أرضية داكنة وربع وردة من النجوم المثمّنة في الزاوية بخطوط ذهبية. للصاغة والعطّارين والمكاتب.", en: "Dark ground with a quarter rosette of eight-pointed stars in gold line at the corner. For jewellers, perfumers and offices." },
  tags: ["كرت", "أعمال", "ذهبي", "فاخر", "صائغ", "مكتب", "business card", "gold"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("gold", "ذهب", "Gold", inks.charcoal, inks.paper, inks.gold, inks.goldDeep, inks.sand),
    pal("navy", "كحلي", "Navy", inks.night, inks.ivory, inks.gold, inks.goldDeep, inks.sky),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.paper, inks.gold, inks.goldDeep, inks.blush),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi", "rakkas"],
  fields: [
    { id: "name", kind: "text", label: { ar: "الاسم أو المحل", en: "Name or shop" }, sample: "مجوهرات الياقوت", maxLength: 28 },
    { id: "role", kind: "text", label: { ar: "الوصف", en: "Description" }, sample: "ذهب · ألماس · تصميم خاص" },
    { id: "person", kind: "text", label: { ar: "الشخص", en: "Person" }, sample: "فادي النابلسي" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "٠٩ ٢٣٨ ١١١١ · ٠٥٩٩ ٧٧٧ ٨٨٨" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "سوق الذهب، نابلس" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b } = dims(ctx, 85, 55), s = H / 55, right = W - 7 * s, max = W - 14 * s;
    const rosette: SceneNode[] = [34, 26, 18, 10].map((r, i) => g({ rotate: i * 11.25 }, path(khatamPath(r * s), { fill: null, stroke: p.accent, strokeWidth: (0.22 + i * 0.05) * s, opacity: 0.55 + i * 0.12 })));
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      g({ x: 0, y: H }, rosette), g({ x: 0, y: H }, path(khatamPath(4.4 * s), { fill: p.accent })),
      line(val(ctx, "name"), right, 18 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      line(val(ctx, "role"), right, 24.4 * s, 3.1 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max * 0.8 }),
      rect(right - 14 * s, 28.4 * s, 14 * s, 0.3 * s, { fill: p.accent }),
      line(val(ctx, "person"), right, 36.4 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max * 0.56 }),
      line(val(ctx, "phone"), right, 42 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.soft, align: "start", maxWidth: max * 0.56 }),
      line(val(ctx, "address"), right, 47 * s, 3 * s, { font: "tajawal", fill: p.soft === inks.sand ? inks.sand : p.soft, align: "start", maxWidth: max * 0.56 }),
    );
  },
};
export default t;
