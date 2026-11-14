import { dotRing, khatamPath, oliveBranch, rosetteLines, tatreezBand } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-made-in-palestine",
  category: "stickers",
  lang: "ar",
  title: { ar: "ستيكر «صُنع في فلسطين»", en: "Made in Palestine sticker" },
  note: { ar: "شارة دائرية للمنتجات: غصن زيتون وشريط تطريز بالأحمر والأخضر، و«صُنع في فلسطين» بخط عريض. للمنتجات اليدوية والمحلية.", en: "A round badge for products: an olive branch and a red and green tatreez band, with the words in heavy type. For handmade and local goods." },
  tags: ["صنع في فلسطين", "منتج وطني", "ستيكر", "شارة", "محلي", "made in palestine"],
  sizes: [sizes.round50, sizes.round70, sizes.round90],
  shape: "round",
  palettes: [
    pal("flag", "أحمر وأخضر", "Red and green", inks.ivory, inks.black, inks.red, inks.olive, inks.black),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.red, inks.sage, inks.ivory),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.red, inks.oliveDark, inks.black),
  ],
  fonts: ["lalezar", "reemkufi", "rakkas"],
  fields: [
    tf("top", "السطر العلوي", "Top line", "صُنع في", 12),
    tf("main", "الكلمة", "Main word", "فلسطين", 10),
    tf("maker", "الصانع", "Maker", "بأيدي نساء الخليل", 22),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 50, 50), k = W / 50, c = W / 2;
    return scene(W, W, p.paper,
      g({ x: c, y: c }, circle(0, 0, W / 2 - 4 * k, { fill: p.accent2, opacity: 0.08 }), rosetteLines(W / 2 - 4.4 * k, p.ink, { rings: 2, lobes: 24, width: 0.12 * k, opacity: 0.3 })),
      circle(c, c, W / 2 - 2.6 * k, { fill: null, stroke: p.ink, strokeWidth: 0.8 * k }),
      g({ x: c - 15 * k, y: 26.6 * k }, tatreezBand("chain", 30 * k, 3.6 * k, [p.accent, p.accent2])),
      g({ x: c - 8 * k, y: 12.4 * k, rotate: -8 }, oliveBranch(16 * k, p.accent2, p.ink, { leaves: 5, olives: 2 })),
      line(val(ctx, "top"), cx, 19.6 * k, 3.6 * k, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: 24 * k }),
      line(val(ctx, "main"), cx, 38.4 * k, 9 * k, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: 32 * k }),
      line(val(ctx, "maker"), cx, 43.4 * k, 2.4 * k, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 22 * k }),
      g({ x: c, y: c }, dotRing(W / 2 - 1.4 * k, 56, 0.28 * k, p.accent)),
      [c - 17 * k, c + 17 * k].map(x => g({ x, y: 27.6 * k }, path(khatamPath(1.4 * k), { fill: p.accent }))),
    );
  },
};
export default t;
