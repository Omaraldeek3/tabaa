import { beadRule, dotField, guillocheNode, scallopEdge } from "../../lib/motifs/index.ts";
import { circle, g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "bookmarks-reading-tracker",
  category: "bookmarks",
  lang: "ar",
  title: { ar: "فاصل «تحدّي القراءة» بمربّعات", en: "Reading challenge tracker bookmark" },
  note: { ar: "فاصل يتابع به الطالب قراءته: ثلاثون دائرة مرقّمة يلوّن واحدة عن كل يوم أو كتاب، واسمه وهدفه في الأعلى. لتحدّي القراءة في المدارس والمكتبات.", en: "A bookmark for keeping track: thirty numbered circles to colour in, one per day or book, with the reader's name and goal at the top. For school and library reading challenges." },
  tags: ["تحدي القراءة", "فاصل", "مدرسة", "قراءة", "أطفال", "reading tracker"],
  sizes: [more.bookmark, more.bookmarkW],
  palettes: [
    pal("bright", "مشرق", "Bright", inks.ivory, inks.navy, inks.orange, inks.teal, inks.sand),
    pal("mint", "نعناع", "Mint", inks.sage, inks.oliveDark, inks.terracotta, inks.ivory, inks.ivory),
    pal("pink", "زهري", "Pink", inks.blush, inks.burgundy, inks.rose, inks.teal, inks.ivory),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "تحدّي القراءة", 16),
    tf("goal", "الهدف", "Goal", "٣٠ يوماً · ٣٠ قصة", 22),
    tf("name", "اسم القارئ", "Reader", "يامن"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 50, 150), s = u, cols = 5, rows = 6, cell = (W - 10 * s) / cols, top = 44 * s;
    const digits = (n: number) => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
    const grid = Array.from({ length: cols * rows }, (_, i) => {
      const r = Math.floor(i / cols), c = cols - 1 - (i % cols), x = 5 * s + c * cell + cell / 2, y = top + r * cell * 1.32 + cell / 2;
      return [circle(x, y, cell * 0.4, { fill: null, stroke: [p.accent, p.accent2][r % 2], strokeWidth: 0.4 * s }), line(digits(i + 1), x, y + cell * 0.14, cell * 0.36, { font: "tajawal", weight: 700, fill: p.ink, safe: false })];
    });
    return scene(W, H, p.paper,
      dotField(0, H * 0.82, W, H * 0.18, 2.6 * s, 0.4 * s, p.accent, { fade: "up", opacity: 0.35 }),
      rect(-6, -6, W + 12, 30 * s + 6, { fill: p.accent }),
      line(val(ctx, "title"), cx, 16 * s, 6.4 * s, { font: ctx.font, weight: 700, fill: p.paper, maxWidth: W - 10 * s }),
      line(val(ctx, "goal"), cx, 24 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.paper, maxWidth: W - 10 * s }),
      grid,
      val(ctx, "name") ? rect(8 * s, 136 * s, W - 16 * s, 0.3 * s, { fill: p.ink }) : null,
      line(val(ctx, "name"), cx, 134 * s, 4.6 * s, { font: ctx.font, fill: p.ink, maxWidth: W - 14 * s }),
      guillocheNode(0, 0, W, 28 * s, inks.white, { waves: 3, amp: 0.8 * s, period: 10 * s, width: 0.12 * s, opacity: 0.25 }),
      scallopEdge(0, 28 * s, W, 1.4 * s, p.accent, -1),
      beadRule(5 * s, W - 5 * s, H - 6 * s, p.accent2, s, { bead: "diamond", pitch: 3 }),
    );
  },
};
export default t;
