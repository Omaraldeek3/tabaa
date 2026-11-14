import { burstLines, doubleFrame, guillocheNode, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tags-en-gift-tag",
  category: "tags",
  lang: "en",
  title: { ar: "بطاقة هدية إنجليزية بالنجوم", en: "Starry gift tag" },
  note: { ar: "بطاقة هدية إنجليزية: سماء من النجوم الصغيرة المتفاوتة تملأ نصفها العلوي، و«For you» بخط سيريف مائل. للأعياد والمناسبات.", en: "An English gift tag: a sky of little stars of different sizes fills the top half, with the words in serif italic. For holidays and occasions." },
  tags: ["gift tag", "english", "stars", "present", "holiday", "هدية", "إنجليزي"],
  sizes: [more.tagS, more.tag],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.sky, inks.ivory),
    pal("red", "أحمر", "Red", inks.red, inks.ivory, inks.mustard, inks.ivory, inks.ivory),
    pal("white", "أبيض", "White", inks.white, inks.navy, inks.goldDeep, inks.sky, inks.navy),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("title", "العبارة", "Words", "For you", 12),
    tf("to", "إلى", "To", "Dear Lina"),
    tf("from", "من", "From", "with love, Sami"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 45, 75), s = u;
    const stars = Array.from({ length: 18 }, (_, i) => g({ x: W * (((i * 37) % 100) / 100), y: 12 * s + 26 * s * (((i * 59) % 100) / 100), rotate: i * 13 }, path(starPath(i % 3 ? 4 : 5, (0.8 + (i % 4) * 0.45) * s, (0.3 + (i % 4) * 0.15) * s), { fill: i % 3 ? p.accent : p.accent2 })));
    return scene(W, H, p.paper,
      g({ x: cx, y: H * 0.42, opacity: 0.12 }, burstLines(48, 4 * s, W, p.accent, 0.25 * s)),
      guillocheNode(0, H * 0.82, W, H * 0.18, p.accent, { waves: 2, amp: 0.8 * s, period: 10 * s, width: 0.15 * s, opacity: 0.4 }),
      circle(cx, 6 * s, 2 * s, { fill: null, stroke: p.soft, strokeWidth: 0.5 * s }),
      stars,
      line(val(ctx, "title"), cx, 50 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 9 * s }),
      line(val(ctx, "to"), cx, 59 * s, 3.2 * s, { font: "inter", weight: 500, fill: p.ink, maxWidth: W - 9 * s }),
      line(val(ctx, "from"), cx, 65 * s, 3 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: W - 9 * s }),
      doubleFrame(2.4 * s, 2.4 * s, W - 4.8 * s, H - 4.8 * s, p.accent, p.paper, { gap: 1.2 * s, heavy: 0.3 * s, thin: 0.12 * s, corner: "dot", r: 1.4 * s }),
    );
  },
};
export default t;
