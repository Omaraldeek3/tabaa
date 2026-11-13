import { khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-hall-entry",
  category: "tickets",
  lang: "ar",
  title: { ar: "بطاقة دخول قاعة أفراح", en: "Wedding hall entry card" },
  note: { ar: "بطاقة دخول أنيقة تُرفق مع الدعوة: إطار ذهبي بزوايا من النجمة الثمانية، «بطاقة دخول» في الوسط، ورقم الطاولة وعدد الأشخاص. للأعراس التي تحدّد عدد المدعوّين.", en: "An elegant entry card sent with the invitation: a gold frame with eight-point stars at the corners, 'entry card' in the middle, the table number and how many guests. For weddings with a set guest list." },
  tags: ["دخول", "قاعة", "عرس", "طاولة", "مدعوين", "entry card"],
  sizes: [more.ticketS, sizes.a6l],
  palettes: [
    pal("black", "أسود وذهبي", "Black and gold", inks.charcoal, inks.ivory, inks.gold, inks.gold, inks.grey),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.black, inks.goldDeep, inks.burgundy, inks.grey),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.gold, inks.sky, inks.sky),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: [
    tf("title", "العنوان", "Title", "بطاقة دخول", 16),
    tf("event", "المناسبة", "Occasion", "حفل زفاف عمر ومريم"),
    tf("guests", "عدد الأشخاص", "Guests", "لشخصين"),
    tf("table", "الطاولة", "Table", "طاولة ١٢"),
    tf("note", "ملاحظة", "Note", "يُرجى إبراز البطاقة عند المدخل · لا يُسمح باصطحاب الأطفال"),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 140, 50), m = 3.6 * s, max = W - 30 * s;
    const corners = [[m, m], [W - m, m], [m, H - m], [W - m, H - m]].map(([x, y]) => g({ x, y }, path(khatamPath(2.6 * s), { fill: p.accent })));
    return scene(W, H, p.paper,
      rect(m, m, W - 2 * m, H - 2 * m, { fill: null, stroke: p.accent, strokeWidth: 0.6 * s }),
      rect(m + 1.6 * s, m + 1.6 * s, W - 2 * m - 3.2 * s, H - 2 * m - 3.2 * s, { fill: null, stroke: p.accent, strokeWidth: 0.2 * s }),
      corners,
      line(val(ctx, "event"), cx, 13.4 * s, 3.4 * s, { font: "amiri", fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 26 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line([val(ctx, "guests"), val(ctx, "table")].filter(Boolean).join("  ·  "), cx, 34.4 * s, 4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "note"), cx, 41.4 * s, 2.5 * s, { font: "tajawal", fill: p.soft, maxWidth: max }),
    );
  },
};
export default t;
