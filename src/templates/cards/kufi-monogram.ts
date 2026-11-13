import { keffiyeh, khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const kufiMonogram: Template = {
  id: "cards-kufi-monogram",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت أعمال بحرف كوفي", en: "Kufi monogram business card" },
  note: { ar: "كرت بلوحة ملوّنة تحمل حرفك الأول داخل نجمة مثمّنة فوق شبكة الكوفية.", en: "A card with a colour panel carrying your initial in a khatam star over a keffiyeh net." },
  tags: ["كرت", "بطاقة", "أعمال", "كوفي", "كوفية", "business card"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("ink", "حبر", "Ink", inks.ivory, inks.black, inks.black, inks.red, inks.grey),
    pal("olive", "زيتون", "Olive", inks.paper, inks.oliveDark, inks.olive, inks.mustard, inks.grey),
    pal("sea", "بحر", "Sea", inks.white, inks.navy, inks.teal, inks.mustard, inks.grey),
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.black, inks.grey),
  ],
  fonts: ["reemkufi", "kufam", "cairo", "amiri"],
  fields: [
    { id: "initial", kind: "text", label: { ar: "الحرف", en: "Initial" }, sample: "س", maxLength: 2 },
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Name" }, sample: "سليم العبد الله", maxLength: 32 },
    { id: "role", kind: "text", label: { ar: "المهنة", en: "Role" }, sample: "مهندس معماري" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "٠٥٩٩ ١٢٣ ٤٥٦" },
    { id: "email", kind: "text", label: { ar: "البريد", en: "Email" }, sample: "salim@example.ps" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "شارع الإرسال، رام الله" },
  ],
  safeMm: 4,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 0.5;
    const panel = W * 0.36, s = H / 55, right = W - 6 * s, max = W - panel - 12 * s;
    const pcx = panel / 2, r = 13 * s;
    return scene(W, H, p.paper,
      rect(-b, -b, panel + b, H + 2 * b, { fill: p.accent }),
      g({ x: -b, y: -b, opacity: 0.16 }, keffiyeh(panel + b, H + 2 * b, 4.2 * s, p.paper, 0.14)),
      g({ x: pcx, y: H / 2 }, path(khatamPath(r), { fill: p.paper }), path(khatamPath(r * 0.88), { fill: null, stroke: p.accent2, strokeWidth: 0.35 * s })),
      line(val(ctx, "initial"), pcx, H / 2 + 5.2 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: r * 1.1 }),
      line(val(ctx, "name"), right, 19 * s, 6.6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), right, 26 * s, 3.5 * s, { font: "tajawal", weight: 500, fill: p.accent2, align: "start", maxWidth: max }),
      rect(right - 12 * s, 30 * s, 12 * s, 0.6 * s, { fill: p.accent2 }),
      line(val(ctx, "phone"), right, 38.5 * s, 3.3 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "email"), right, 43.5 * s, 3.1 * s, { font: "inter", weight: 500, fill: p.ink, align: "end", dir: "ltr", maxWidth: max }),
      line(val(ctx, "address"), right, 48.5 * s, 3 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
    );
  },
};

export default kufiMonogram;
