import { beadRule, cementTiles, flourishRule, khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-jaffa-tiles",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف ببلاط يافا", en: "Jaffa floor tile wedding invitation" },
  note: { ar: "شريطان من البلاط الإسمنتي الملوّن الذي فُرشت به بيوت يافا القديمة، والنص على أرضية سادة بينهما.", en: "Two bands of the painted cement tiles that floored old Jaffa houses, with the text on plain ground between them." },
  tags: ["زفاف", "عرس", "بلاط", "يافا", "بيت قديم", "تراث", "wedding", "tiles"],
  sizes: [sizes.a5, sizes.invite, sizes.dl],
  palettes: [
    pal("sea", "بحري", "Sea blue", inks.ivory, inks.navy, inks.teal, inks.navy, inks.sky),
    pal("ochre", "مغرة", "Ochre", inks.paper, inks.black, inks.terracotta, inks.black, inks.sand),
    pal("garden", "حديقة", "Garden", inks.ivory, inks.oliveDark, inks.olive, inks.mustard, inks.sage),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi", "rakkas"],
  fields: weddingAr({ groom: "يوسف", bride: "سلمى", venue: "بيت العائلة، يافا", families: "آل الدجاني وآل أبو شحادة" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 210), cell = 17 * s, top = Math.round((H * 0.25) / cell) * cell, bot = cell * 1.5;
    const Y = (k: number) => top + 4 * s + (H - bot - top - 8 * s) * k, max = W - 22 * s;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      g({ x: W / 2, y: H * 0.5, opacity: 0.07 }, path(khatamPath(44 * z), { fill: p.accent }), path(khatamPath(34 * z), { fill: p.paper })),
      rect(-b, -b, W + 2 * b, top + b, { fill: p.soft }),
      g({ x: -b, y: -b }, cementTiles(W + 2 * b, top + b, cell, p.accent, p.accent2, p.ink)),
      rect(-b, H - bot, W + 2 * b, bot + b, { fill: p.soft }),
      g({ x: -b, y: H - bot }, cementTiles(W + 2 * b, bot + b, cell * 0.75, p.accent, p.accent2, p.ink)),
      rect(-b, top, W + 2 * b, 1.2 * s, { fill: p.ink }), rect(-b, H - bot - 1.2 * s, W + 2 * b, 1.2 * s, { fill: p.ink }),
      line(val(ctx, "opening"), cx, Y(0.09), 4.4 * s, { font: "amiri", fill: p.accent, maxWidth: max * 0.8 }),
      line(val(ctx, "invite"), cx, Y(0.19), 5 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.41), 16 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, Y(0.5), 6 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.67), 16 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.8), 5.8 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.88), 4.6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(0.98), 4.6 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
      flourishRule(W / 2, H * 0.68, W * 0.44, p.accent, z),
      [H * 0.29].map(y => beadRule(W / 2 - 40 * z, W / 2 + 40 * z, y, p.accent, z, { bead: "dot", pitch: 3 })),
    );
  },
};
export default t;
