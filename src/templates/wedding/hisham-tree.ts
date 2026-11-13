import { mosaicTree } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-hisham-tree",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بشجرة الحياة الفسيفسائية", en: "Mosaic tree of life wedding invitation" },
  note: { ar: "شجرة من مكعّبات الفسيفساء كشجرة الحياة في قصر هشام بأريحا، وإطار من المكعّبات حول الورقة.", en: "A tree built of mosaic tesserae like the tree of life at Hisham's Palace in Jericho, with a border of tesserae round the page." },
  tags: ["زفاف", "عرس", "فسيفساء", "أريحا", "قصر هشام", "شجرة", "wedding", "mosaic"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("stone", "حجر", "Stone", inks.sand, inks.black, inks.olive, inks.terracotta, inks.oliveDark),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.oliveDark, inks.olive, inks.red, inks.sage),
    pal("dusk", "مغيب", "Dusk", inks.charcoal, inks.paper, inks.sage, inks.orange, inks.olive),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: weddingAr({ groom: "خليل", bride: "رهف", venue: "منتجع أريحا", families: "آل عريقات وآل حمدان" }),
  safeMm: 9,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), m = 5.4 * s, t = 2.6 * s, size = Math.min(W * 0.5, H * 0.3);
    const border: string[][] = [[], []];
    const run = (x0: number, y0: number, dx: number, dy: number, n: number) => { for (let i = 0; i < n; i++) border[i % 2].push(`M${x0 + dx * i * t * 1.25} ${y0 + dy * i * t * 1.25} h${t} v${t} h${-t} Z`); };
    const nx = Math.floor((W - 2 * m) / (t * 1.25)), ny = Math.floor((H - 2 * m) / (t * 1.25));
    run(m, m, 1, 0, nx); run(m, H - m - t, 1, 0, nx); run(m, m + t * 1.25, 0, 1, ny - 1); run(W - m - t - ((W - 2 * m) - nx * t * 1.25) + 0.25 * t, m + t * 1.25, 0, 1, ny - 1);
    const top = m + 7 * s, foot = top + size, Y = (k: number) => foot + 9 * s + (H - foot - 24 * s) * k, max = W - 30 * s;
    return scene(W, H, p.paper,
      path(border[0].join(" "), { fill: p.accent }), path(border[1].join(" "), { fill: p.accent2 }),
      g({ x: cx, y: foot }, mosaicTree(size, p.accent, p.soft, p.ink, p.accent2)),
      line(val(ctx, "opening"), cx, Y(0), 4.2 * s, { font: "amiri", fill: p.accent2, maxWidth: max * 0.8 }),
      line(val(ctx, "invite"), cx, Y(0.11), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line([val(ctx, "groom"), val(ctx, "bride")].filter(Boolean).join(" و "), cx, Y(0.42), 15 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.62), 5.6 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.76), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.6 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
