import { dotRing, hatch, khatamPath, scallopPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-craft-stamp",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت ورشة بختم مسنّن", en: "Workshop card with a toothed stamp" },
  note: { ar: "ختم مسنّن كبير بحرفك الأول على ورق بلون الكرتون، والخدمات في سطور قصيرة. للنجّارين والحدّادين وورش الليزر.", en: "A large toothed stamp with your initial on kraft-coloured paper, and services in short lines. For carpenters, smiths and laser workshops." },
  tags: ["كرت", "أعمال", "ورشة", "نجار", "حداد", "ليزر", "ختم", "business card", "workshop"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("kraft", "كرتون", "Kraft", inks.sand, inks.black, inks.black, inks.red, inks.grey),
    pal("steel", "فولاذ", "Steel", inks.white, inks.navy, inks.navy, inks.orange, inks.grey),
    pal("wood", "خشب", "Wood", inks.paper, inks.oliveDark, inks.terracotta, inks.oliveDark, inks.grey),
  ],
  fonts: ["lalezar", "kufam", "rakkas", "cairo"],
  fields: [
    { id: "initial", kind: "text", label: { ar: "الحرف", en: "Initial" }, sample: "ع", maxLength: 2 },
    { id: "name", kind: "text", label: { ar: "اسم الورشة", en: "Workshop name" }, sample: "ورشة عمر", maxLength: 24 },
    { id: "service1", kind: "text", label: { ar: "الخدمة الأولى", en: "First service" }, sample: "قص وحفر بالليزر" },
    { id: "service2", kind: "text", label: { ar: "الخدمة الثانية", en: "Second service" }, sample: "حروف بارزة ولافتات" },
    { id: "service3", kind: "text", label: { ar: "الخدمة الثالثة", en: "Third service" }, sample: "طباعة وهدايا" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "٠٥٩٩ ٣٣٣ ٢٢٢" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "المنطقة الصناعية، الخليل" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b } = dims(ctx, 85, 55), s = H / 55, right = W - 6 * s, r = 15 * s, sx = 6 * s + r, max = W - sx - r - 10 * s;
    const svc = ["service1", "service2", "service3"].map(id => val(ctx, id)).filter(Boolean);
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      hatch(0, 0, W, H * 0.8, 2 * z, p.ink, 0.1 * z, 0.06),
      rect(-b, H - 11 * s, W + 2 * b, 11 * s + b, { fill: p.accent }),
      g({ x: sx, y: 23 * s, rotate: -8 }, path(scallopPath(r, 20, 0.12), { fill: p.accent }), circle(0, 0, r * 0.8, { fill: null, stroke: p.paper, strokeWidth: 0.4 * s }), dotRing(r * 0.68, 22, 0.3 * s, p.paper)),
      line(val(ctx, "initial"), sx, 28.4 * s, 15 * s, { font: ctx.font, weight: 800, fill: p.paper, maxWidth: r }),
      line(val(ctx, "name"), right, 14.6 * s, 8.4 * s, { font: ctx.font, weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      rect(right - 9 * s, 18 * s, 9 * s, 0.8 * s, { fill: p.accent2 }),
      svc.map((l, i) => line(l, right, 25.4 * s + i * 5.4 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max })),
      line(val(ctx, "phone"), right, H - Math.max(4.6 * s, 5), 3.6 * s, { font: "tajawal", weight: 800, fill: p.paper, align: "start", maxWidth: (W - 12 * s) * 0.44 }),
      line(val(ctx, "address"), 6 * s, H - Math.max(4.6 * s, 5), 2.8 * s, { font: "tajawal", weight: 500, fill: p.paper === inks.sand ? inks.sand : p.paper, align: "end", maxWidth: (W - 12 * s) * 0.5 }),
      [[3.4, 3.4], [W / z - 3.4, 3.4]].map(([x, y]) => g({ x: x * z, y: y * z }, path(khatamPath(1.2 * z), { fill: p.ink }))),
    );
  },
};
export default t;
