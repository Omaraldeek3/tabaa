import { rect, scene } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, line, linesOf, more, pal, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "bookmarks-en-quote",
  category: "bookmarks",
  lang: "en",
  title: { ar: "فاصل كتاب إنجليزي باقتباس", en: "Quote bookmark" },
  note: { ar: "فاصل إنجليزي: علامة تنصيص ضخمة في الأعلى، والاقتباس بحروف سيريف مائلة، واسم الكاتب تحته، وشريط لون في الأسفل.", en: "An English bookmark: a giant quotation mark at the top, the quote in serif italic, the author beneath, and a colour band at the foot." },
  tags: ["bookmark", "english", "quote", "reading", "gift", "فاصل", "إنجليزي", "اقتباس"],
  sizes: [more.bookmark, more.bookmarkW],
  palettes: [
    pal("cream", "قشدي", "Cream", inks.ivory, inks.black, inks.terracotta, inks.terracotta, inks.grey),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.mustard, inks.mustard, inks.sky),
    pal("sage", "مريمي", "Sage", inks.sage, inks.oliveDark, inks.ivory, inks.oliveDark, inks.oliveDark),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    ml("quote", "الاقتباس", "Quote", "A reader lives\na thousand lives\nbefore he dies.", 6),
    tf("author", "الكاتب", "Author", "— George R. R. Martin", 26),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 50, 150), s = u, lines = linesOf(val(ctx, "quote"), 6);
    return scene(W, H, p.paper,
      line("“", cx, 44 * s, 40 * s, { font: "playfairdisplay", weight: 700, fill: p.accent, safe: false }),
      stack(lines, cx, 58 * s, 5.4 * s, Math.min(10 * s, 60 * s / Math.max(lines.length, 1)), { font: ctx.font, fill: p.ink, maxWidth: W - 10 * s }),
      line(val(ctx, "author"), cx, 126 * s, 3 * s, { font: "inter", weight: 600, fill: p.ink, maxWidth: W - 10 * s }),
      rect(-b, H - 12 * s, W + 2 * b, 12 * s + b, { fill: p.accent2 }),
    );
  },
};
export default t;
