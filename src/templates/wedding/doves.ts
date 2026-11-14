import { dotField, doubleFrame, dove, flourishRule, oliveBranch, ringsNode } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-doves",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بحمامتين", en: "Two doves wedding invitation" },
  note: { ar: "حمامتان متقابلتان تحملان بين منقاريهما غصن زيتون، فوق نص الدعوة. هادئة وتصلح لكل الأعمار.", en: "Two doves face each other holding an olive sprig between their beaks, above the invitation. Gentle, for any age." },
  tags: ["زفاف", "عرس", "حمام", "سلام", "زيتون", "wedding", "doves"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("sky", "سماوي", "Sky", inks.ivory, inks.navy, inks.sky, inks.olive, inks.navy),
    pal("sage", "مريمي", "Sage", inks.paper, inks.oliveDark, inks.sage, inks.olive, inks.oliveDark),
    pal("gold", "ذهبي", "Gold", inks.navy, inks.ivory, inks.gold, inks.sage, inks.navy),
  ],
  fonts: ["amiri", "arefruqaa", "katibeh", "reemkufi"],
  fields: weddingAr({ groom: "مجد", bride: "سارة", venue: "قاعة السلام، رام الله", families: "آل البرغوثي وآل عابدين" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), d = Math.min(W * 0.3, H * 0.17), dy = 14 * s + d * 0.6;
    const Y = (k: number) => dy + d * 0.5 + 12 * s + (H - dy - d * 0.5 - 22 * s) * k, max = W - 22 * s;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      g({ x: W / 2, y: 22 * z }, ringsNode(16 * z, 30 * z, 4, p.accent2, 0.3 * z, 0.35)),
      dotField(0, 0, W, H * 0.3, 5 * z, 0.5 * z, p.accent2, { fade: "down", opacity: 0.35 }),
      g({ x: cx - d * 0.62, y: dy }, dove(d, p.accent, p.soft)),
      g({ x: cx + d * 0.62, y: dy, scaleX: -1 }, dove(d, p.accent, p.soft)),
      g({ x: cx - d * 0.12, y: dy - d * 0.07, rotate: 12 }, oliveBranch(d * 0.3, p.accent2, null, { leaves: 5 })),
      line(val(ctx, "opening"), cx, Y(0), 4.2 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.75 }),
      line(val(ctx, "invite"), cx, Y(0.12), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.36), 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line("و", cx, Y(0.46), 5 * s, { font: "amiri", fill: p.accent2, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.62), 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.77), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.88), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.4 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
      doubleFrame(6 * z, 6 * z, W - 12 * z, H - 12 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.5 * z, thin: 0.2 * z, corner: "bracket", r: 3 * z }),
      flourishRule(W / 2, H * 0.47, W * 0.4, p.accent, z),
    );
  },
};
export default t;
