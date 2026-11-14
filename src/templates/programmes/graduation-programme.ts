import { g, path, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "programmes-graduation-programme",
  category: "programmes",
  lang: "ar",
  title: { ar: "كتيّب حفل التخرّج بأسماء الخرّيجين", en: "Graduation booklet with the graduates' names" },
  note: { ar: "ورقة طولية لحفل التخرّج: قبّعة تخرّج بشرّابتها في الأعلى، واسم الدفعة، وأسماء الخرّيجين في عمودين. للمدارس والجامعات والدورات.", en: "A tall sheet for a graduation: a mortarboard with its tassel at the top, the class name, and the graduates listed in two columns. For schools, universities and courses." },
  tags: ["تخرج", "خريجين", "دفعة", "حفل", "أسماء", "graduation"],
  sizes: [sizes.dl, sizes.a5],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.goldDeep, inks.navy, inks.sky),
    pal("burgundy", "خمري", "Burgundy", inks.ivory, inks.burgundy, inks.goldDeep, inks.burgundy, inks.blush),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.gold, inks.ivory, inks.grey),
  ],
  fonts: ["arefruqaa", "reemkufi", "amiri"],
  fields: [
    tf("school", "المدرسة", "School", "مدرسة بنات الخليل الثانوية"),
    tf("class", "الدفعة", "Class", "دفعة الأمل ٢٠٢٧", 22),
    lf("names", "الخرّيجون", "Graduates", [["الاسم", "Name"]], ["آية الجعبري", "بيسان عمرو", "تالا الشريف", "جنى أبو سنينة", "دانة النتشة", "رهف القواسمي", "سجى التميمي", "شهد إدريس", "غدير الزرو", "لين الحموري", "مريم سدر", "نور الهيموني"].map(n => [n]), 24),
    tf("date", "التاريخ", "Date", "السبت ١٥ تموز ٢٠٢٧"),
  ],
  safeMm: 5,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 99, 210), s = u, names = rows(ctx, "names", 24), half = Math.ceil(names.length / 2), top = 72 * s, pitch = Math.min(12 * s, (H - top - 22 * s) / Math.max(half, 1));
    const cap = g({ x: cx, y: 24 * s },
      path(`M${-18 * s} 0 L0 ${-8 * s} L${18 * s} 0 L0 ${8 * s} Z`, { fill: p.accent2 }),
      path(`M${-10 * s} ${4 * s} V${11 * s} C${-6 * s} ${15 * s} ${6 * s} ${15 * s} ${10 * s} ${11 * s} V${4 * s} Z`, { fill: p.accent2 }),
      path(`M0 0 L${14 * s} ${4 * s} V${12 * s}`, { fill: null, stroke: p.accent, strokeWidth: 0.6 * s }), rect(13 * s, 12 * s, 2 * s, 4 * s, { fill: p.accent }));
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, 3 * s + b, { fill: p.accent }), rect(-b, H - 3 * s, W + 2 * b, 3 * s + b, { fill: p.accent }),
      cap,
      line(val(ctx, "school"), cx, 48 * s, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 14 * s }),
      line(val(ctx, "class"), cx, 60 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: W - 14 * s }),
      names.flatMap(([n = ""], i) => [line(n, i < half ? W * 0.74 : W * 0.26, top + (i % half) * pitch + 4 * s, 4.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: W * 0.42 })]),
      line(val(ctx, "date"), cx, H - 10 * s, 3.6 * s, { font: "amiri", fill: p.ink, maxWidth: W - 14 * s }),
    );
  },
};
export default t;
