import { oliveBranch } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-olive-minimal",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت أعمال هادئ بغصن زيتون", en: "Calm business card with an olive branch" },
  note: { ar: "كل شيء في الوسط: الاسم، غصن زيتون صغير، ثم سطر التواصل. للأطباء والمحامين والمستشارين.", en: "Everything centred: the name, a small olive branch, then one contact line. For doctors, lawyers and consultants." },
  tags: ["كرت", "أعمال", "زيتون", "بسيط", "طبيب", "محامي", "business card", "minimal"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.oliveDark, inks.olive, inks.goldDeep, inks.grey),
    pal("white", "أبيض", "White", inks.white, inks.black, inks.black, inks.red, inks.grey),
    pal("deep", "عميق", "Deep", inks.oliveDark, inks.ivory, inks.sage, inks.gold, inks.sage),
  ],
  fonts: ["amiri", "arefruqaa", "reemkufi", "cairo"],
  fields: [
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Name" }, sample: "د. ليان الكيلاني", maxLength: 32 },
    { id: "role", kind: "text", label: { ar: "المهنة", en: "Role" }, sample: "أخصائية طب الأطفال" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "٠٥٦٩ ٢٢٢ ٣٣٣" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "مجمّع الشفاء الطبي، جنين" },
    { id: "hours", kind: "text", label: { ar: "الدوام", en: "Hours" }, sample: "السبت – الخميس، ٩ – ٤" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, cx } = dims(ctx, 85, 55), s = H / 55, max = W - 14 * s;
    return scene(W, H, p.paper,
      line(val(ctx, "name"), cx, 20 * s, 8.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "role"), cx, 26.6 * s, 3.3 * s, { font: "tajawal", weight: 500, fill: p.accent2, maxWidth: max }),
      g({ x: cx - 11 * s, y: 33.6 * s }, oliveBranch(22 * s, p.accent, p.ink === inks.ivory ? null : p.ink, { leaves: 7, bend: 0.07, olives: 2 })),
      line(joined(ctx, ["phone", "address"]), cx, 42.4 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "hours"), cx, 47.6 * s, 2.7 * s, { font: "tajawal", fill: p.soft, maxWidth: max }),
    );
  },
};
export default t;
