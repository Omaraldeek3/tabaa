import { dotField, tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-en-block",
  category: "cards",
  lang: "en",
  title: { ar: "كرت أعمال إنجليزي بلوحة لون", en: "English business card with a colour block" },
  note: { ar: "كرت إنجليزي جريء: الاسم بحروف كبيرة على لوحة لون تملأ ثلثي الكرت، وخيط تطريز يفصلها عن التفاصيل.", en: "A bold English card: the name in large type on a block that fills two thirds of the card, with a stitched line above the details." },
  tags: ["business card", "english", "bold", "studio", "كرت", "إنجليزي", "جريء"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.black, inks.grey),
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.olive, inks.mustard, inks.grey),
    pal("ink", "حبر", "Ink", inks.white, inks.black, inks.black, inks.red, inks.grey),
    pal("sea", "بحر", "Sea", inks.white, inks.navy, inks.teal, inks.mustard, inks.grey),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    { id: "first", kind: "text", label: { ar: "الاسم الأول", en: "First name" }, sample: "Sami", maxLength: 16 },
    { id: "last", kind: "text", label: { ar: "اسم العائلة", en: "Last name" }, sample: "Khoury", maxLength: 18 },
    { id: "role", kind: "text", label: { ar: "المهنة", en: "Role" }, sample: "Architect & Urban Designer" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "+970 592 000 111" },
    { id: "email", kind: "text", label: { ar: "البريد", en: "Email" }, sample: "sami@khoury.example" },
    { id: "city", kind: "text", label: { ar: "المدينة", en: "City" }, sample: "Ramallah" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b } = dims(ctx, 85, 55), s = H / 55, m = 6 * s, max = W - 2 * m, block = H * 0.64;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      dotField(W * 0.6, 0, W * 0.4, H * 0.5, 2.4 * z, 0.3 * z, p.paper, { fade: "left", opacity: 0.3 }),
      rect(-b, -b, W + 2 * b, block + b, { fill: p.accent }),
      g({ x: -b, y: block - 1.5 * s }, rect(0, 0, W + 2 * b, 3 * s, { fill: p.paper }), g({ y: 0.4 * s }, tatreezBand("chain", W + 2 * b, 2.2 * s, [p.accent2, p.accent]))),
      line(val(ctx, "first"), m, 16.5 * s, 10.5 * s, { font: ctx.font, weight: 800, fill: inks.ivory, align: "start", maxWidth: max }),
      line(val(ctx, "last"), m, 27.6 * s, 10.5 * s, { font: ctx.font, weight: 800, fill: inks.ivory, align: "start", maxWidth: max }),
      line(val(ctx, "role"), m, block + 6.4 * s, 2.9 * s, { font: "inter", weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), m, block + 10.8 * s, 2.6 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", maxWidth: max * 0.5 }),
      line(val(ctx, "email"), m, block + 14.6 * s, 2.6 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", maxWidth: max * 0.6 }),
      line(val(ctx, "city"), W - m, block + 14.6 * s, 2.6 * s, { font: "inter", weight: 500, fill: p.soft, align: "end", maxWidth: max * 0.34 }),
    );
  },
};
export default t;
