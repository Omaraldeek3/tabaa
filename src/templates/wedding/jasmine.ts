import { jasmine, leafPath } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-jasmine",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بالفلّ والياسمين", en: "Jasmine wedding invitation" },
  note: { ar: "غصنان من الفلّ والياسمين يتدلّيان من زاويتين متقابلتين، كياسمينة على سور بيت. خفيفة وبيضاء.", en: "Two sprays of jasmine trail in from opposite corners, like jasmine over a garden wall. Light and white." },
  tags: ["زفاف", "عرس", "ياسمين", "فل", "زهور", "أبيض", "wedding", "jasmine"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("white", "أبيض", "White", inks.white, inks.oliveDark, inks.ivory, inks.olive, inks.mustard),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.white, inks.sage, inks.mustard),
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.white, inks.olive, inks.mustard),
  ],
  fonts: ["arefruqaa", "amiri", "marhey", "katibeh"],
  fields: weddingAr({ invite: "بفرح يغمر القلب ندعوكم لزفاف", groom: "باسل", bride: "ياسمين", venue: "حديقة الدار، عكا", families: "آل شعبان وآل عثمان" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), max = W - 30 * s;
    const spray = (sign: number): SceneNode[] => {
      const out: SceneNode[] = [];
      for (let i = 0; i < 8; i++) {
        const k = i / 7, x = sign > 0 ? 8 * s + k * 44 * s : W - 8 * s - k * 44 * s, y = sign > 0 ? 6 * s + Math.sin(k * 2.6) * 22 * s + k * 6 * s : H - 6 * s - Math.sin(k * 2.6) * 22 * s - k * 6 * s;
        out.push(g({ x, y, rotate: i * 37 + (sign > 0 ? 0 : 180) }, path(leafPath(7.5 * s, 2.2 * s), { fill: p.accent2 })));
        if (i % 2 === 0 || i === 7) out.push(g({ x: x + 2 * s, y: y + 2 * s * sign }, jasmine((10 - i * 0.5) * s, p.accent, p.soft, i * 29, p.accent2)));
      }
      return out;
    };
    const Y = (k: number) => 44 * s + (H - 92 * s) * k;
    return scene(W, H, p.paper,
      spray(1), spray(-1),
      line(val(ctx, "opening"), cx, Y(0), 4.2 * s, { font: "amiri", fill: p.accent2, maxWidth: max * 0.7 }),
      line(val(ctx, "invite"), cx, Y(0.12), 5 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.37), 16 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line("و", cx, Y(0.47), 5.5 * s, { font: "amiri", fill: p.accent2, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.64), 16 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.8), 5.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.9), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.4 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
