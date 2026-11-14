import { dotField, keffiyeh, tatreezUnit } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const enKeffiyeh: Template = {
  id: "cards-en-keffiyeh",
  category: "cards",
  lang: "en",
  title: { ar: "كرت أعمال إنجليزي بشريط كوفية", en: "English business card with a keffiyeh band" },
  note: { ar: "كرت بالإنجليزية: شريط كوفية على الحافة ونجمة تطريز صغيرة، والباقي أبيض هادئ بحروف واضحة.", en: "An English card: a keffiyeh band down one edge and a small stitched star; the rest is calm white with clear type." },
  tags: ["business card", "english", "keffiyeh", "minimal", "كرت", "إنجليزي", "كوفية"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.white, inks.black, inks.black, inks.red, inks.grey),
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.oliveDark, inks.terracotta, inks.grey),
    pal("navy", "كحلي", "Navy", inks.paper, inks.navy, inks.navy, inks.goldDeep, inks.grey),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Name" }, sample: "Rana Haddad", maxLength: 30 },
    { id: "role", kind: "text", label: { ar: "المهنة", en: "Role" }, sample: "TEXTILE DESIGNER" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "+970 599 123 456" },
    { id: "email", kind: "text", label: { ar: "البريد", en: "Email" }, sample: "rana@example.ps" },
    { id: "web", kind: "text", label: { ar: "الموقع", en: "Website" }, sample: "ranahaddad.example" },
    { id: "city", kind: "text", label: { ar: "المدينة", en: "City" }, sample: "Bethlehem, Palestine" },
  ],
  safeMm: 4,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 0.5;
    const s = H / 55, band = 15 * s, left = band + 8 * s, max = W - left - 6 * s;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      dotField(W * 0.3, 0, W * 0.7, H, 2.6 * z, 0.2 * z, p.accent, { fade: "left", opacity: 0.12 }),
      rect(-b, -b, band + b, H + 2 * b, { fill: p.accent }),
      g({ x: -b, y: -b, opacity: 0.85 }, keffiyeh(band + b, H + 2 * b, 3.6 * s, p.paper, 0.13)),
      rect(band, -b, 1 * s, H + 2 * b, { fill: p.accent2 }),
      g({ x: W - 6 * s - 7 * s, y: 6 * s }, tatreezUnit("star", 7 * s, [p.accent2, p.ink])),
      line(val(ctx, "name"), left, 22 * s, 7.4 * s, { font: ctx.font, weight: 600, fill: p.ink, align: "start", maxWidth: max - 9 * s }),
      line(val(ctx, "role"), left, 28.4 * s, 2.5 * s, { font: "inter", weight: 600, fill: p.accent2, align: "start", tracking: 0.5 * s, maxWidth: max }),
      rect(left, 32.6 * s, 10 * s, 0.4 * s, { fill: p.ink }),
      line(val(ctx, "phone"), left, 39.4 * s, 2.9 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "email"), left, 43.9 * s, 2.9 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "web"), left, 48.4 * s, 2.9 * s, { font: "inter", weight: 500, fill: p.ink, align: "start", maxWidth: max * 0.55 }),
      line(val(ctx, "city"), W - 6 * s, 48.4 * s, 2.6 * s, { font: "inter", weight: 400, fill: p.soft, align: "end", maxWidth: max * 0.42 }),
      rect(W * 0.3, H - 3 * z, W * 0.7 - 3 * z, 0.3 * z, { fill: p.accent }),
    );
  },
};

export default enKeffiyeh;
