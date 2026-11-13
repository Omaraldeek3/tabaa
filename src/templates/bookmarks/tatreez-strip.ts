import { tatreezUnit } from "../../lib/motifs/index.ts";
import { circle, g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "bookmarks-tatreez-strip",
  category: "bookmarks",
  lang: "ar",
  title: { ar: "فاصل كتاب بعمود تطريز", en: "Tatreez column bookmark" },
  note: { ar: "عمود من وحدات التطريز (سرو ونجمة ووردة) يتكرّر على طول الفاصل كشريط على كمّ الثوب، واسم صغير في الأسفل.", en: "A column of tatreez units (cypress, star and rose) repeats down the bookmark like a band on a thobe sleeve, with a small name at the foot." },
  tags: ["فاصل", "تطريز", "سرو", "كتاب", "ثوب", "bookmark", "tatreez"],
  sizes: [more.bookmark, more.bookmarkW],
  palettes: [
    pal("red", "أحمر", "Red", inks.ivory, inks.black, inks.red, inks.olive, inks.black),
    pal("black", "ثوب", "Thobe", inks.charcoal, inks.ivory, inks.red, inks.mustard, inks.ivory),
    pal("indigo", "نيلي", "Indigo", inks.navy, inks.ivory, inks.red, inks.gold, inks.ivory),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri"],
  fields: [
    tf("name", "الاسم", "Name", "مكتبة ريم", 16),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 50, 150), s = u, size = 22 * s, order = ["cypress", "star", "rose", "cypress", "star"] as const;
    return scene(W, H, p.paper,
      circle(cx, 7 * s, 2.2 * s, { fill: null, stroke: p.soft, strokeWidth: 0.4 * s }),
      rect(cx - size / 2 - 2 * s, 13 * s, 0.5 * s, 112 * s, { fill: p.accent }), rect(cx + size / 2 + 1.5 * s, 13 * s, 0.5 * s, 112 * s, { fill: p.accent }),
      order.map((n, i) => g({ x: cx - size / 2, y: 14 * s + i * size }, tatreezUnit(n, size * 0.98, [i % 2 ? p.accent2 : p.accent, p.accent2]))),
      line(val(ctx, "name"), cx, 138 * s, 5 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 10 * s }),
    );
  },
};
export default t;
