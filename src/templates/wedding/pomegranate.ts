import { pomegranate } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-pomegranate",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بالرمّانة", en: "Pomegranate wedding invitation" },
  note: { ar: "رمّانة مشقوقة تتناثر حولها حبّات، رمز الخير والبركة في الأعراس. ألوان دافئة وخط رقعة.", en: "A split pomegranate with seeds scattered round it, the old wedding sign of plenty. Warm colours and ruqaa lettering." },
  tags: ["زفاف", "عرس", "رمان", "بركة", "خير", "أحمر", "wedding", "pomegranate"],
  sizes: [sizes.a5, sizes.invite, sizes.a6],
  palettes: [
    pal("ruby", "ياقوتي", "Ruby", inks.ivory, inks.burgundy, inks.red, inks.olive, inks.blush),
    pal("cream", "قشدي", "Cream", inks.paper, inks.black, inks.terracotta, inks.oliveDark, inks.ivory),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.ivory, inks.rose, inks.sage, inks.blush),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri"],
  fields: weddingAr({ invite: "على بركة الله نتشرّف بدعوتكم لزفاف", groom: "حمزة", bride: "رنا", venue: "قاعة الرمانة، الخليل", families: "آل التميمي وآل الجعبري" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), size = Math.min(W * 0.36, H * 0.19), py = 16 * s + size * 0.62;
    const Y = (k: number) => py + size * 0.6 + 12 * s + (H - 7 - 6 * s - py - size * 0.6 - 12 * s) * k, max = W - 22 * s;
    const seeds = [[-0.9, 0.2], [0.95, 0.35], [-0.75, 0.75], [0.7, 0.85], [-1.2, -0.2], [1.15, -0.25]].map(([x, y], i) => circle(cx + x * size, py + y * size * 0.6, (0.9 + (i % 3) * 0.3) * s, { fill: p.accent }));
    return scene(W, H, p.paper,
      seeds,
      g({ x: cx, y: py }, pomegranate(size, p.accent, p.accent === inks.rose ? inks.burgundy : p.ink === inks.ivory ? inks.ivory : p.ink, p.soft, p.accent2)),
      line(val(ctx, "opening"), cx, Y(0), 4.2 * s, { font: "amiri", fill: p.accent2, maxWidth: max * 0.75 }),
      line(val(ctx, "invite"), cx, Y(0.12), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.36), 14 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, Y(0.46), 5 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.62), 14 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.77), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.88), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.4 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
