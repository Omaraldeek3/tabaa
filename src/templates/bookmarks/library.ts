import { dotField, doubleFrame, hatch } from "../../lib/motifs/index.ts";
import { path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "bookmarks-library",
  category: "bookmarks",
  lang: "ar",
  title: { ar: "فاصل مكتبة بجدول الإرجاع", en: "Library bookmark with a due-date table" },
  note: { ar: "فاصل للمكتبات العامة والمدرسية: رفّ كتب بأعقاب ملوّنة في الأعلى، وجدول فارغ لتواريخ الإرجاع، وساعات الدوام في الأسفل.", en: "A bookmark for public and school libraries: a shelf of coloured book spines at the top, an empty table for due dates, and opening hours at the foot." },
  tags: ["مكتبة", "فاصل", "إعارة", "كتب", "مدرسة", "library"],
  sizes: [more.bookmark, more.bookmarkW],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.ivory, inks.black, inks.terracotta, inks.teal, inks.mustard),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.navy, inks.orange, inks.sky),
    pal("green", "أخضر", "Green", inks.paper, inks.oliveDark, inks.olive, inks.red, inks.mustard),
  ],
  fonts: ["reemkufi", "kufam", "rakkas"],
  fields: [
    tf("name", "اسم المكتبة", "Library", "مكتبة بلدية البيرة", 22),
    tf("hours", "الدوام", "Hours", "السبت–الخميس ٨–٤"),
    tf("phone", "الهاتف", "Phone", "٠٢ ٢٤٠ ٠٠٠٠"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 50, 150), s = u, shelf = 34 * s, cols = [p.accent, p.accent2, p.soft, p.ink];
    const books = [[2, 4, 18], [6.6, 3.4, 22], [10.4, 5, 20], [16, 3, 16], [19.4, 4.2, 23], [24.2, 3.6, 19], [28.4, 5.4, 21], [34.4, 3.2, 17], [38, 4.6, 22], [43, 4, 20]].map(([x, w, h], i) => rect(x * s, shelf - h * s, w * s - 0.4 * s, h * s, { fill: cols[i % 4], r: 0.3 * s }));
    const rows = Array.from({ length: 8 }, (_, i) => rect(6 * s, 60 * s + i * 8 * s, W - 12 * s, 0.25 * s, { fill: p.ink, opacity: 0.6 }));
    return scene(W, H, p.paper,
      dotField(0, H * 0.78, W, H * 0.22, 3 * s, 0.4 * s, p.soft, { fade: "up", opacity: 0.4 }),
      hatch(-b, -b, W + 2 * b, shelf + b, 2 * s, p.soft, 0.15 * s, 0.25),
      books, rect(-b, shelf, W + 2 * b, 1.6 * s, { fill: p.ink }),
      line(val(ctx, "name"), cx, 46 * s, 4.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 10 * s }),
      line("تاريخ الإرجاع", cx, 56 * s, 3 * s, { font: "tajawal", weight: 800, fill: p.accent, safe: false }),
      rows, path(`M${cx} ${58 * s} V${124 * s}`, { fill: null, stroke: p.ink, strokeWidth: 0.25 * s, opacity: 0.6 }),
      line(val(ctx, "hours"), cx, 134 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 10 * s }),
      line(val(ctx, "phone"), cx, 140 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: W - 10 * s }),
      doubleFrame(2.4 * s, shelf + 2 * s, W - 4.8 * s, H - shelf - 4.4 * s, p.accent, p.paper, { gap: 1.2 * s, heavy: 0.3 * s, thin: 0.12 * s, corner: "bracket", r: 1.6 * s }),
    );
  },
};
export default t;
