import { crescentPath, dotField, doubleFrame, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, line, linesOf, more, pal, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "bookmarks-poem",
  category: "bookmarks",
  lang: "ar",
  title: { ar: "فاصل كتاب ببيت شعر", en: "Bookmark with a line of poetry" },
  note: { ar: "فاصل طولي: هلال صغير في الأعلى، وأبيات الشعر سطراً تحت سطر على طول الفاصل، واسم الشاعر في الأسفل بين خطّين. هدية لمحبّي الكتب.", en: "A tall bookmark: a small crescent at the top, the verse line under line down its length, the poet's name at the foot between two rules. A gift for book lovers." },
  tags: ["فاصل", "كتاب", "شعر", "قراءة", "هدية", "bookmark", "poetry"],
  sizes: [more.bookmark, more.bookmarkW],
  palettes: [
    pal("ink", "حبر", "Ink", inks.ivory, inks.black, inks.red, inks.grey, inks.sand),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.mustard, inks.sky, inks.navy),
    pal("sage", "مريمي", "Sage", inks.sage, inks.oliveDark, inks.burgundy, inks.oliveDark, inks.ivory),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh"],
  fields: [
    ml("verse", "الأبيات", "Verse", "ونحن نحبّ الحياة\nإذا ما استطعنا\nإليها سبيلا", 5),
    tf("poet", "الشاعر", "Poet", "محمود درويش", 18),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 50, 150), s = u, lines = linesOf(val(ctx, "verse"), 5);
    return scene(W, H, p.paper,
      dotField(0, 0, W, H * 0.3, 3 * s, 0.4 * s, p.accent, { fade: "down", opacity: 0.25 }),
      starTile(0, H * 0.82, W, H * 0.18, 6 * s, 0.9 * s, p.accent, 0.12),
      circle(cx, 8 * s, 2.2 * s, { fill: null, stroke: p.soft, strokeWidth: 0.4 * s }),
      g({ x: cx, y: 22 * s, rotate: -90 }, path(crescentPath(5 * s, 0.45), { fill: p.accent })),
      stack(lines, cx, 44 * s, 6.6 * s, Math.min(15 * s, 80 * s / Math.max(lines.length, 1)), { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 10 * s }),
      val(ctx, "poet") ? [rect(cx - 12 * s, 128 * s, 24 * s, 0.3 * s, { fill: p.accent2 }), rect(cx - 12 * s, 140 * s, 24 * s, 0.3 * s, { fill: p.accent2 })] : null,
      line(val(ctx, "poet"), cx, 136.4 * s, 4 * s, { font: "amiri", fill: p.accent, maxWidth: W - 12 * s }),
      doubleFrame(2.4 * s, 2.4 * s, W - 4.8 * s, H - 4.8 * s, p.accent, p.paper, { gap: 1.2 * s, heavy: 0.3 * s, thin: 0.12 * s, corner: "dot", r: 1.4 * s }),
    );
  },
};
export default t;
