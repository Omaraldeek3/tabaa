import { candle } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-candle",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق شمعة معطّرة", en: "Scented candle label" },
  note: { ar: "ملصق مربّع هادئ لكأس الشمعة: لهب واحد بهالة ضوء في الأعلى، والرائحة بخط أنيق، ومكوّنات العطر في سطر. للشموع اليدوية.", en: "A quiet square label for a candle jar: a single flame with a halo at the top, the scent in elegant type, and its notes on one line. For hand-poured candles." },
  tags: ["شمعة", "معطرة", "هدايا", "يدوي", "ملصق", "candle"],
  sizes: [more.sq60, { id: "80x80", label: { ar: "مربع ٨٠×٨٠ ملم", en: "Square 80×80 mm" }, widthMm: 80, heightMm: 80 }],
  palettes: [
    pal("cream", "قشدي", "Cream", inks.ivory, inks.black, inks.sand, inks.orange, inks.grey),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.paper, inks.gold, inks.grey),
    pal("rose", "وردي", "Rose", inks.blush, inks.burgundy, inks.ivory, inks.orange, inks.rose),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh"],
  fields: [
    tf("name", "الرائحة", "Scent", "زهر الليمون", 14),
    tf("notes", "المكوّنات", "Notes", "زهر ليمون · نعناع · مسك أبيض"),
    tf("maker", "الصانع", "Maker", "شموع نور · صُنع باليد"),
    tf("burn", "مدة الاشتعال", "Burn time", "٤٠ ساعة"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 60, 60), max = W - 12 * s;
    return scene(W, H, p.paper,
      rect(4 * s, 4 * s, W - 8 * s, H - 8 * s, { fill: null, stroke: p.ink, strokeWidth: 0.25 * s }),
      g({ x: cx, y: 22 * s }, candle(16 * s, p.accent, p.accent2, p.accent2)),
      line(val(ctx, "name"), cx, 33 * s, 7 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "notes"), cx, 39.4 * s, 2.5 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "maker"), cx, 46 * s, 2.6 * s, { font: "tajawal", weight: 700, fill: p.soft, maxWidth: max }),
      line(val(ctx, "burn"), cx, 51 * s, 2.4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
