import { doubleFrame, rosetteLines, starTile, tatreezFrame, tatreezUnit } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-qabbeh-panel",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بقبّة الثوب", en: "Thobe chest panel wedding invitation" },
  note: { ar: "مربّع مطرّز كقبّة صدر الثوب الفلسطيني: نجوم وورود داخل إطار، والدعوة تحته كأنها ذيل الثوب.", en: "A stitched square like the chest panel of a Palestinian thobe, stars and roses in a frame, with the invitation hanging below it." },
  tags: ["زفاف", "عرس", "تطريز", "ثوب", "قبة", "فلسطيني", "wedding", "thobe"],
  sizes: [sizes.a5, sizes.invite, sizes.dl],
  palettes: [
    pal("black", "ثوب أسود", "Black thobe", inks.charcoal, inks.ivory, inks.red, inks.mustard, inks.olive),
    pal("linen", "كتّان", "Linen", inks.ivory, inks.black, inks.red, inks.olive, inks.sand),
    pal("indigo", "نيلي", "Indigo", inks.navy, inks.ivory, inks.red, inks.gold, inks.sky),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri"],
  fields: weddingAr({ groom: "سامر", bride: "تالا", venue: "حديقة البلدية، بيت جالا", families: "آل قسيس وآل زغبي" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 210), q = Math.min(W * 0.56, H * 0.33), band = q * 0.13, top = 10 * s, u = (q - 2 * band - 4 * s) / 2;
    const Y = (k: number) => top + q + 12 * s + (H - 7 - 6 * s - top - q - 12 * s) * k, max = W - 22 * s;
    const units = [["star", 0, 0], ["rose", 1, 0], ["rose", 0, 1], ["star", 1, 1]] as const;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      starTile(0, H * 0.3, W, H * 0.7, 12 * z, 1.4 * z, p.accent, 0.07),
      g({ x: W / 2, y: H * 0.62, opacity: 0.1 }, rosetteLines(34 * z, p.accent, { rings: 4, lobes: 14, width: 0.3 * z })),
      rect(cx - 0.3 * s, -b, 0.6 * s, top + b, { fill: p.accent }),
      g({ x: cx - q / 2, y: top }, tatreezFrame(q, q, band, [p.accent, p.accent2], { style: "stars" }),
        units.map(([n, i, j]) => g({ x: band + 2 * s + i * u, y: band + 2 * s + j * u }, tatreezUnit(n, u * 0.94, [i === j ? p.accent : p.accent2, p.soft])))),
      [-1, 1].map(d => rect(cx + d * q * 0.5 - (d > 0 ? 0.5 * s : 0), top + q, 0.5 * s, 8 * s, { fill: p.accent })),
      line(val(ctx, "opening"), cx, Y(0.02), 4.2 * s, { font: "amiri", fill: p.accent2, maxWidth: max * 0.8 }),
      line(val(ctx, "invite"), cx, Y(0.13), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.34), 13 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, Y(0.43), 5 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.58), 13 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.73), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.84), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.6 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
      doubleFrame(6 * z, 6 * z, W - 12 * z, H - 12 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.5 * z, thin: 0.2 * z, corner: "khatam", r: 2.4 * z }),
    );
  },
};
export default t;
