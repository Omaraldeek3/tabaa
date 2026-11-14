import { ringsNode } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { cardAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-carpentry-grain",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت منجرة بعروق الخشب", en: "Carpentry card with wood grain" },
  note: { ar: "عروق خشب متموّجة تغطي الكرت كلّه حول عقدة، والاسم على لوح فاتح كأنه محفور. للنجّارين ومحلات الأثاث والمطابخ.", en: "Wavy wood grain covers the whole card around a knot, with the name on a pale board as if carved. For carpenters, furniture and kitchen makers." },
  tags: ["كرت", "نجار", "منجرة", "خشب", "أثاث", "مطابخ", "carpentry"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("walnut", "جوز", "Walnut", inks.terracotta, inks.black, inks.goldDeep, inks.paper, inks.black),
    pal("oak", "بلوط", "Oak", inks.sand, inks.black, inks.goldDeep, inks.ivory, inks.black),
    pal("dark", "داكن", "Dark", inks.charcoal, inks.ivory, inks.goldDeep, inks.sand, inks.charcoal),
  ],
  fonts: ["rakkas", "lalezar", "reemkufi"],
  fields: cardAr({ name: "منجرة أبو سليم", role: "أبواب · مطابخ · غرف نوم حسب الطلب", phone: "٠٥٩٨ ٣٣٣ ٧٧٧", address: "المنطقة الصناعية، بيت أمّر" }),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 85, 55), kx = W * 0.22, ky = H * 0.7, lines: string[] = [];
    for (let i = -6; i < 18; i++) {
      const y0 = i * 3.4 * s, pts: string[] = [];
      for (let x = -b; x <= W + b + 2; x += 2 * s) {
        const d = Math.hypot((x - kx) / 1.8, y0 - ky), bump = d < 14 * s ? Math.cos((d / (14 * s)) * Math.PI / 2) * 5 * s * Math.sign(y0 - ky || 1) : 0;
        pts.push(`${pts.length ? "L" : "M"}${x.toFixed(2)} ${(y0 + Math.sin(x / (9 * s) + i * 0.7) * 1.2 * s + bump).toFixed(2)}`);
      }
      lines.push(pts.join(" "));
    }
    const bw = W * 0.74, bx = cx - bw / 2;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      [[0.1, 0.2], [0.88, 0.85]].map(([x, y]) => g({ x: W * x, y: H * y, opacity: 0.25 }, ringsNode(1 * z, 5 * z, 5, p.ink, 0.12 * z))),
      path(lines.join(" "), { fill: null, stroke: p.accent, strokeWidth: 0.35 * s, opacity: 0.7 }),
      path(`M${kx - 2.4 * s} ${ky} a${2.4 * s} ${1.4 * s} 0 1 0 ${4.8 * s} 0 a${2.4 * s} ${1.4 * s} 0 1 0 ${-4.8 * s} 0 Z`, { fill: p.accent, opacity: 0.8 }),
      rect(bx, 9 * s, bw, 20 * s, { fill: p.accent2, r: 1 * s }),
      rect(bx + 1.2 * s, 10.2 * s, bw - 2.4 * s, 17.6 * s, { fill: null, stroke: p.soft, strokeWidth: 0.3 * s, r: 0.6 * s }),
      line(val(ctx, "name"), cx, 21.6 * s, 7.4 * s, { font: ctx.font, weight: 700, fill: p.soft, maxWidth: bw - 8 * s }),
      line(val(ctx, "role"), cx, 35 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.ink === inks.ivory ? p.ink : p.accent2, maxWidth: W - 12 * s }),
      line(val(ctx, "phone"), cx, 42.4 * s, 4.4 * s, { font: "tajawal", weight: 800, fill: p.ink === inks.ivory ? p.ink : p.accent2, maxWidth: W - 12 * s }),
      line(joined(ctx, ["address"]), cx, 48.4 * s, 2.6 * s, { font: "tajawal", weight: 500, fill: p.ink === inks.ivory ? p.ink : p.accent2, maxWidth: W - 12 * s }),
    );
  },
};
export default t;
