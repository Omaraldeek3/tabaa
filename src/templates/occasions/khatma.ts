import { archPath, khatamPath, quranStand } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-khatma",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة حفل ختم القرآن", en: "Quran completion party invitation" },
  note: { ar: "مصحف مفتوح على رحل خشبي تحت قوس، لحفل ختمة طفل أو حافظ. هادئة بالأخضر والذهبي.", en: "An open Quran on a wooden stand beneath an arch, for a child's or a hafiz's completion party. Quiet green and gold." },
  tags: ["ختمة", "ختم القرآن", "حفظ", "قرآن", "حافظ", "مصحف", "quran"],
  sizes: [sizes.a5, sizes.a6, sizes.square15],
  palettes: [
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.goldDeep, inks.olive, inks.sand),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.sky, inks.paper),
    pal("teal", "فيروزي", "Teal", inks.paper, inks.teal, inks.goldDeep, inks.teal, inks.ivory),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: [
    tf("verse", "آية", "Verse", "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"),
    tf("title", "العنوان", "Title", "حفل ختم القرآن الكريم", 26),
    tf("lead", "التمهيد", "Lead-in", "بفضل الله أتمّ ابننا حفظ كتاب الله"),
    tf("name", "اسم الحافظ", "Hafiz", "عبد الرحمن", 20),
    tf("date", "التاريخ", "Date", "الجمعة ٢٧ رمضان بعد صلاة التراويح"),
    tf("venue", "المكان", "Venue", "مسجد الأنصار، الخليل"),
    tf("host", "الداعي", "Host", "والده ووالدته يتشرّفان بحضوركم"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), m = 11 * s, aw = W - 2 * m, ah = H - 2 * m, qw = Math.min(aw * 0.5, H * 0.24), qy = m + aw * 0.38 + qw * 0.9;
    const Y = (k: number) => qy + 12 * s + (H - m - 10 * s - qy - 12 * s) * k, max = aw - 18 * s;
    return scene(W, H, p.paper,
      g({ x: m, y: m }, path(archPath(aw, ah, 0.5), { fill: null, stroke: p.accent, strokeWidth: 0.7 * s }), g({ x: 2.5 * s, y: 2.5 * s }, path(archPath(aw - 5 * s, ah - 5 * s, 0.5), { fill: null, stroke: p.accent, strokeWidth: 0.2 * s }))),
      g({ x: cx, y: m + 10 * s }, path(khatamPath(4 * s), { fill: p.accent }), path(khatamPath(1.6 * s), { fill: p.paper })),
      line(val(ctx, "verse"), cx, m + aw * 0.22, 5.4 * s, { font: "amiri", fill: p.accent2, maxWidth: max * 0.8 }),
      g({ x: cx, y: qy }, quranStand(qw, p.accent, p.soft, p.ink)),
      line(val(ctx, "title"), cx, Y(0), 8.5 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "lead"), cx, Y(0.17), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, Y(0.42), 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.6), 4.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, Y(0.72), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["host"]), cx, Y(1), 4.2 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
