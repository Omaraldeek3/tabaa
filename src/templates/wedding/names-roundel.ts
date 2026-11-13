import { dotRing, rays } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-names-roundel",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بالختم الدائري", en: "Round seal wedding invitation" },
  note: { ar: "الاسمان داخل دائرة كختم أو طغراء، بحلقة نقاط وأشعة قصيرة حولها، وبقية الدعوة تحتها.", en: "Both names inside a circle like a seal, ringed with dots and short rays, the rest of the invitation below." },
  tags: ["زفاف", "عرس", "ختم", "دائرة", "خط عربي", "wedding", "seal"],
  sizes: [sizes.a5, sizes.square15, sizes.dl],
  palettes: [
    pal("emerald", "زمردي", "Emerald", inks.ivory, inks.oliveDark, inks.teal, inks.goldDeep, inks.sage),
    pal("rose", "وردي", "Rose", inks.blush, inks.burgundy, inks.rose, inks.burgundy, inks.ivory),
    pal("ink", "حبر", "Ink", inks.white, inks.black, inks.black, inks.red, inks.grey),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh", "reemkufi"],
  fields: weddingAr({ groom: "أنس", bride: "جود", venue: "قاعة الأندلس، طولكرم", families: "آل جيوسي وآل حنون" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), R = Math.min(W * 0.38, H * 0.25), cy = 17 * s + R + 6 * s, inner = R * 1.5;
    const Y = (k: number) => cy + R + 14 * s + (H - 7 - 6 * s - cy - R - 14 * s) * k, max = W - 22 * s;
    return scene(W, H, p.paper,
      g({ x: cx, y: cy }, g({ opacity: 0.85 }, rays(72, R + 1.5 * s, R + 5 * s, p.accent2, 0.35)), circle(0, 0, R, { fill: null, stroke: p.accent, strokeWidth: 0.9 * s }),
        dotRing(R - 2.6 * s, 60, 0.45 * s, p.accent), circle(0, 0, R - 5 * s, { fill: null, stroke: p.accent, strokeWidth: 0.25 * s })),
      line(val(ctx, "opening"), cx, 8 + 4 * s, 4 * s, { font: "amiri", fill: p.accent, maxWidth: max * 0.7 }),
      line(val(ctx, "groom"), cx, cy - R * 0.12, R * 0.36, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: inner * 0.9 }),
      line("و", cx, cy + R * 0.12, R * 0.16, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, cy + R * 0.48, R * 0.36, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: inner * 0.9 }),
      line(val(ctx, "invite"), cx, Y(0), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.33), 6 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.62), 4.6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.6 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
