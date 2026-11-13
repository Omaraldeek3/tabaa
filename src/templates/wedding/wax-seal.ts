import { waxSeal } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-wax-seal",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بلسان الظرف والختم", en: "Envelope flap and wax seal wedding invitation" },
  note: { ar: "لسان ظرف ينزل من أعلى الورقة ويُغلق بختم شمع عليه الحرفان الأولان من الاسمين.", en: "An envelope flap comes down from the top of the card, closed with a wax seal carrying the couple's first letters." },
  tags: ["زفاف", "عرس", "ظرف", "ختم", "شمع", "حروف", "wedding", "seal"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("kraft", "ورق كرافت", "Kraft", inks.ivory, inks.black, inks.sand, inks.red, inks.paper),
    pal("navy", "كحلي", "Navy", inks.ivory, inks.navy, inks.navy, inks.gold, inks.ivory),
    pal("olive", "زيتي", "Olive", inks.paper, inks.oliveDark, inks.sage, inks.burgundy, inks.paper),
  ],
  fonts: ["arefruqaa", "amiri", "rakkas"],
  fields: weddingAr({ groom: "فادي", bride: "لمى", venue: "فندق الجراند، الناصرة", families: "آل زعبي وآل سليمان" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 210), tip = Math.min(H * 0.34, W * 0.5), r = 13 * s;
    const initials = [val(ctx, "groom"), val(ctx, "bride")].map(x => [...x][0] ?? "").filter(Boolean).join(" ");
    const Y = (k: number) => tip + r + 12 * s + (H - 7 - 6 * s - tip - r - 12 * s) * k, max = W - 22 * s;
    return scene(W, H, p.paper,
      path(`M${-b} ${-b} H${W + b} V${4 * s} L${cx} ${tip} L${-b} ${4 * s} Z`, { fill: p.accent }),
      path(`M${-b} ${4 * s} L${cx} ${tip} L${W + b} ${4 * s}`, { fill: null, stroke: p.ink, strokeWidth: 0.25 * s, opacity: 0.4 }),
      g({ x: cx, y: tip }, waxSeal(r, p.accent2, p.soft)),
      line(initials, cx, tip + r * 0.3, r * 0.7, { font: ctx.font, weight: 700, fill: p.soft, maxWidth: r * 1.2 }),
      line(val(ctx, "opening"), cx, Y(0), 4.2 * s, { font: "amiri", fill: p.accent2, maxWidth: max * 0.75 }),
      line(val(ctx, "invite"), cx, Y(0.12), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.36), 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line("و", cx, Y(0.46), 5 * s, { font: "amiri", fill: p.accent2, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.62), 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.77), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.88), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.4 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
