import { candle, doubleFrame, flourishRule, ringsNode, starTile } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-zaffeh-candles",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بشموع الزفّة", en: "Zaffeh candles wedding invitation" },
  note: { ar: "صفّ من الشموع المضاءة أسفل الدعوة كشموع الزفّة التي تتقدّم العروسين، على ورق داكن.", en: "A row of lit candles across the foot of the card, like the candles carried ahead of the couple in the zaffeh, on dark stock." },
  tags: ["زفاف", "عرس", "زفة", "شموع", "ليل", "wedding", "candles"],
  sizes: [sizes.a5, sizes.invite, sizes.a6l],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.orange, inks.ivory),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.ivory, inks.gold, inks.mustard, inks.blush),
    pal("black", "أسود", "Black", inks.charcoal, inks.paper, inks.goldDeep, inks.orange, inks.paper),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri", "lalezar"],
  fields: weddingAr({ invite: "ندعوكم لمشاركتنا زفّة", groom: "علاء", bride: "ديما", venue: "قاعة الفردوس، جنين", families: "آل السعدي وآل جرار" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 210), n = 9, floor = H - 9 * s, tall = Math.min(H * 0.26, W * 0.24);
    const textBottom = floor - tall * 1.3 - 5 * s, Y = (k: number) => 8 + 4.5 * s + (textBottom - 8 - 4.5 * s) * k, max = W - 22 * s;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H * 0.7, 12 * z, 1.2 * z, p.accent, 0.08),
      g({ x: W / 2, y: H * 0.9, opacity: 0.18 }, ringsNode(20 * z, 60 * z, 6, p.accent, 0.4 * z)),
      Array.from({ length: n }, (_, i) => { const k = i / (n - 1), h = tall * (0.45 + 0.55 * Math.sin(Math.PI * k)); return g({ x: W * (0.1 + 0.8 * k), y: floor }, candle(h, p.soft, p.accent2, p.accent)); }),
      rect(-b, floor, W + 2 * b, 0.6 * s, { fill: p.accent }),
      line(val(ctx, "opening"), cx, Y(0), 4.2 * s, { font: "amiri", fill: p.accent, maxWidth: max * 0.7 }),
      line(val(ctx, "invite"), cx, Y(0.14), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, Y(0.38), 14 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, Y(0.48), 5 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, Y(0.64), 14 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.79), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.9), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.4 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
      doubleFrame(6 * z, 6 * z, W - 12 * z, H - 12 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "star", r: 2.4 * z }),
      flourishRule(W / 2, H * 0.48, W * 0.36, p.accent, z * 0.8),
    );
  },
};
export default t;
