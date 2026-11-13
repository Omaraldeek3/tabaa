import { crescentPath, polygonPath, starPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-octagon-dome",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بالمثمّن والقبة", en: "Octagon and dome wedding invitation" },
  note: { ar: "النص داخل مثمّن بخطين، تعلوه قبة بهلال، على هيئة قبة الصخرة. داكنة وفاخرة.", en: "The text sits inside a double-lined octagon crowned with a dome and crescent, after the Dome of the Rock. Dark and formal." },
  tags: ["زفاف", "عرس", "القدس", "قبة الصخرة", "مثمن", "ذهبي", "wedding", "dome"],
  sizes: [sizes.a5, sizes.square15, sizes.dl],
  palettes: [
    pal("lapis", "لازوردي", "Lapis", inks.navy, inks.ivory, inks.gold, inks.teal, inks.sky),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.goldDeep, inks.navy),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.navy, inks.goldDeep, inks.teal, inks.sand),
  ],
  fonts: ["amiri", "arefruqaa", "reemkufi"],
  fields: weddingAr({ groom: "عمر", bride: "مريم", venue: "قاعة باب الزاهرة، القدس", families: "آل الحسيني وآل النشاشيبي" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), cy = H * 0.56, r = Math.min(W * 0.44, H * 0.34), apo = r * Math.cos(Math.PI / 8);
    const R = r * 0.3, top = cy - apo, max = r * 1.3;
    const Y = (k: number) => cy - apo * 0.7 + apo * 1.5 * k;
    return scene(W, H, p.paper,
      g({ x: cx, y: top }, rect(-R * 1.08, -R * 0.18, R * 2.16, R * 0.18, { fill: p.accent }), path(`M${-R} ${-R * 0.18} A${R} ${R} 0 0 1 ${R} ${-R * 0.18} Z`, { fill: p.accent }),
        rect(-0.3 * s, -R * 1.36, 0.6 * s, R * 0.2, { fill: p.accent }), g({ y: -R * 1.5, rotate: -90 }, path(crescentPath(2.4 * s, 0.5), { fill: p.accent }))),
      g({ x: cx, y: cy }, path(polygonPath(8, r), { fill: null, stroke: p.accent, strokeWidth: 0.7 * s }), path(polygonPath(8, r - 3 * s), { fill: null, stroke: p.accent, strokeWidth: 0.22 * s }),
        Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4 - Math.PI / 2; return g({ x: (r - 1.5 * s) * Math.cos(a), y: (r - 1.5 * s) * Math.sin(a) }, path(starPath(4, 1.2 * s, 0.4 * s), { fill: p.accent2 })); })),
      line(val(ctx, "opening"), cx, Y(0.02), 4.4 * s, { font: "amiri", fill: p.accent, maxWidth: max * 0.7 }),
      line(val(ctx, "invite"), cx, Y(0.13), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.9 }),
      line(val(ctx, "groom"), cx, Y(0.35), 15 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, Y(0.44), 5.5 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.6), 15 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.74), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max * 0.95 }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.84), 4.2 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.85 }),
      line(val(ctx, "families"), cx, Math.min(H - 9 * s, cy + r + 9 * s), 4.8 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: W - 20 * s }),
    );
  },
};
export default t;
