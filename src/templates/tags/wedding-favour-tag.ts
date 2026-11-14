import { archPath, beadRule, dotField, dove, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tags-wedding-favour-tag",
  category: "tags",
  lang: "ar",
  title: { ar: "بطاقة شكر لتوزيعات العرس", en: "Wedding favour thank-you tag" },
  note: { ar: "بطاقة صغيرة تُعلّق على أكياس التوزيعات: قوس رفيع وحمامة، «شكراً لمشاركتكم فرحتنا» والاسمان. للأعراس والخطوبات والعقيقة.", en: "A small tag tied to favour bags: a fine arch and a dove, a line of thanks and both names. For weddings, engagements and aqiqa." },
  tags: ["توزيعات", "شكر", "عرس", "خطوبة", "تاغ", "favour tag"],
  sizes: [more.tagS, more.tag],
  palettes: [
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.burgundy, inks.goldDeep, inks.rose, inks.sand),
    pal("sage", "مريمي", "Sage", inks.white, inks.oliveDark, inks.sage, inks.goldDeep, inks.sage),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.gold, inks.sky, inks.sky),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh"],
  fields: [
    tf("thanks", "الشكر", "Thanks", "شكراً لمشاركتكم فرحتنا"),
    tf("names", "الاسمان", "Names", "يوسف وسلمى", 18),
    tf("date", "التاريخ", "Date", "١٨ حزيران ٢٠٢٧", 16),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 45, 75), s = u, m = 4 * s;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 6 * s, 0.8 * s, p.accent, 0.08),
      dotField(m, H * 0.7, W - 2 * m, H * 0.25, 2.4 * s, 0.3 * s, p.accent, { fade: "up", opacity: 0.35 }),
      circle(cx, 6.4 * s, 2 * s, { fill: null, stroke: p.accent, strokeWidth: 0.5 * s }),
      g({ x: m, y: 12 * s }, path(archPath(W - 2 * m, H - 12 * s - m, 0.5), { fill: null, stroke: p.accent, strokeWidth: 0.4 * s })),
      g({ x: cx, y: 25 * s }, dove(14 * s, p.accent2, p.paper)),
      line(val(ctx, "thanks"), cx, 40 * s, 3.4 * s, { font: "amiri", fill: p.ink, maxWidth: W - 12 * s }),
      line(val(ctx, "names"), cx, 52 * s, 7 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: W - 12 * s }),
      line(val(ctx, "date"), cx, 60 * s, 2.8 * s, { font: "amiri", fill: p.ink, maxWidth: W - 14 * s }),
      beadRule(m + 3 * s, W - m - 3 * s, H - m - 3 * s, p.accent, s, { bead: "dot", pitch: 2.2 }),
    );
  },
};
export default t;
