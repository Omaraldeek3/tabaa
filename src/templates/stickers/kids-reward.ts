import { rays } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-kids-reward",
  category: "stickers",
  lang: "ar",
  title: { ar: "ستيكر مكافأة «أحسنت» للأطفال", en: "Well done reward sticker for kids" },
  note: { ar: "شمس مبتسمة بأشعّة ملوّنة وكلمة «أحسنت» تحتها، ستيكر صغير يلصقه المعلّم على الدفتر أو القميص. للمدارس والروضات.", en: "A smiling sun with coloured rays and a word of praise below, a small sticker a teacher puts on an exercise book or shirt. For schools and kindergartens." },
  tags: ["أحسنت", "مكافأة", "أطفال", "مدرسة", "روضة", "ستيكر", "reward"],
  sizes: [more.round40, sizes.round50],
  shape: "round",
  palettes: [
    pal("sun", "شمس", "Sun", inks.white, inks.navy, inks.mustard, inks.orange, inks.red),
    pal("sky", "سماء", "Sky", inks.sky, inks.navy, inks.mustard, inks.white, inks.red),
    pal("mint", "نعناع", "Mint", inks.sage, inks.oliveDark, inks.mustard, inks.white, inks.terracotta),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("word", "الكلمة", "Word", "أحسنت!", 8),
    tf("name", "الاسم", "Name", "", 12),
  ],
  safeMm: 3,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 40, 40), k = W / 40, c = W / 2, sy = 15 * k;
    return scene(W, W, p.paper,
      g({ x: c, y: sy }, rays(14, 6.6 * k, 10.6 * k, p.accent2, 0.6), circle(0, 0, 6 * k, { fill: p.accent }),
        circle(-2 * k, -1 * k, 0.7 * k, { fill: p.ink }), circle(2 * k, -1 * k, 0.7 * k, { fill: p.ink }),
        path(`M${-2.6 * k} ${1.4 * k} Q0 ${4 * k} ${2.6 * k} ${1.4 * k}`, { fill: null, stroke: p.ink, strokeWidth: 0.5 * k }),
        circle(-3.6 * k, 1.2 * k, 0.9 * k, { fill: p.soft, opacity: 0.5 }), circle(3.6 * k, 1.2 * k, 0.9 * k, { fill: p.soft, opacity: 0.5 })),
      line(val(ctx, "word"), cx, 32 * k, 6.4 * k, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 26 * k }),
      line(val(ctx, "name"), cx, 36 * k, 2.4 * k, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 18 * k }),
    );
  },
};
export default t;
