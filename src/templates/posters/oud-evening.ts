import { dotRing, oud } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-oud-evening",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر أمسية عود", en: "Oud evening poster" },
  note: { ar: "عود كبير مائل يقطع البوستر، وحلقات نقاط خلف قمرته كأنها صدى الصوت. لأمسيات الطرب والموسيقى العربية.", en: "A big oud cuts across the poster with rings of dots behind its rosette like an echo. For tarab nights and Arabic music." },
  tags: ["عود", "موسيقى", "طرب", "أمسية", "حفلة", "music", "oud"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.terracotta, inks.gold, inks.goldDeep),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.ivory, inks.goldDeep, inks.mustard, inks.blush),
    pal("paper", "ورق", "Paper", inks.paper, inks.black, inks.terracotta, inks.red, inks.goldDeep),
  ],
  fonts: ["arefruqaa", "rakkas", "lalezar", "reemkufi"],
  fields: [
    tf("kicker", "سطر علوي", "Kicker", "أمسية طرب أصيل"),
    tf("title", "العنوان", "Title", "ليالي العود", 16),
    tf("artist", "العازف", "Artist", "مع الفنان سليم الخطيب وفرقته"),
    tf("date", "التاريخ", "Date", "الجمعة ١٤ تشرين الثاني"),
    tf("time", "الوقت", "Time", "الثامنة مساءً"),
    tf("venue", "المكان", "Venue", "مسرح القصبة، رام الله"),
    tf("tickets", "التذاكر", "Tickets", "التذكرة ٥٠ شيكل · الحجز ٠٥٩٩٠٠٠٠٠٠"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 40 * s, oh = H * 0.6, ox = W * 0.4, oy = H * 0.5;
    return scene(W, H, p.paper,
      g({ x: ox, y: oy }, dotRing(oh * 0.2, 40, 1.1 * s, p.accent2), dotRing(oh * 0.27, 52, 0.8 * s, p.accent2), dotRing(oh * 0.34, 64, 0.6 * s, p.accent2)),
      g({ x: ox, y: oy }, oud(oh, p.accent, p.soft, p.paper)),
      line(val(ctx, "kicker"), W - 22 * s, 40 * s, 9 * s, { font: "amiri", fill: p.accent2, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "title"), W - 22 * s, 82 * s, 40 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.7 }),
      line(val(ctx, "artist"), W - 22 * s, 108 * s, 9 * s, { font: "amiri", weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      rect(-b, H - 82 * s, W + 2 * b, 0.8 * s, { fill: p.accent2 }),
      line(val(ctx, "date"), cx, H - 60 * s, 12 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, H - 42 * s, 8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "tickets"), cx, H - 26 * s, 6.4 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
