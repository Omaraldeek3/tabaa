import { tatreezBand, tatreezUnit } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-tatreez-edge",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت أعمال بحاشية تطريز", en: "Business card with a tatreez hem" },
  note: { ar: "حاشية مطرّزة على طول الحافة السفلى كذيل الثوب، ووردة تطريز في الزاوية. للخيّاطات ومحلات التراث والهدايا.", en: "A stitched hem along the foot like the edge of a thobe, and a rose in the corner. For seamstresses, heritage shops and gift makers." },
  tags: ["كرت", "أعمال", "تطريز", "خياطة", "تراث", "هدايا", "business card", "tatreez"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("thobe", "ثوب", "Thobe", inks.black, inks.paper, inks.red, inks.gold, inks.sand),
    pal("linen", "كتّان", "Linen", inks.paper, inks.black, inks.red, inks.black, inks.grey),
    pal("indigo", "نيلي", "Indigo", inks.navy, inks.ivory, inks.rose, inks.mustard, inks.sky),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "amiri"],
  fields: [
    { id: "name", kind: "text", label: { ar: "الاسم أو المحل", en: "Name or shop" }, sample: "مشغل أم خليل", maxLength: 28 },
    { id: "role", kind: "text", label: { ar: "الوصف", en: "Description" }, sample: "تطريز فلاحي وأثواب حسب الطلب" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "٠٥٩٧ ٤٤٤ ٥٥٥" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "البلدة القديمة، بيت لحم" },
    { id: "social", kind: "text", label: { ar: "حساب التواصل", en: "Social handle" }, sample: "@umkhalil.tatreez" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b } = dims(ctx, 85, 55), s = H / 55, right = W - 6 * s, max = W - 12 * s, hem = 9 * s;
    return scene(W, H, p.paper,
      g({ x: -b, y: H - hem }, rect(0, -1.2 * s, W + 2 * b, 0.5 * s, { fill: p.accent2 }), tatreezBand("chain", W + 2 * b, hem * 0.8, [p.accent, p.accent2])),
      rect(-b, H - hem * 0.12, W + 2 * b, hem * 0.12 + b, { fill: p.accent }),
      g({ x: 6 * s, y: 6 * s }, tatreezUnit("rose", 13 * s, [p.accent, p.accent2])),
      line(val(ctx, "name"), right, 16.5 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max - 17 * s }),
      line(val(ctx, "role"), right, 23 * s, 3.2 * s, { font: "tajawal", weight: 500, fill: p.accent2 === inks.black ? p.accent : p.accent2, align: "start", maxWidth: max - 17 * s }),
      line(val(ctx, "phone"), right, 33 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max * 0.55 }),
      line(val(ctx, "address"), right, 38.4 * s, 3 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: max * 0.55 }),
      line(val(ctx, "social"), 6 * s, 38.4 * s, 2.8 * s, { font: "inter", weight: 500, fill: p.soft, align: "start", dir: "ltr", maxWidth: max * 0.4 }),
    );
  },
};
export default t;
