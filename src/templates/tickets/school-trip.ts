import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import { tearLine } from "../ticket-kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-school-trip",
  category: "tickets",
  lang: "ar",
  title: { ar: "تذكرة رحلة مدرسية بالباص", en: "School trip ticket with a bus" },
  note: { ar: "باص رحلات أصفر على طريق منقّط من المدرسة إلى الوجهة، وكعب لاسم الطالب وصفّه يُسلَّم للمعلّم. للرحلات المدرسية والكشفية.", en: "A yellow coach on a dotted road from school to the destination, with a stub for the pupil's name and class handed to the teacher. For school and scout trips." },
  tags: ["رحلة", "مدرسة", "باص", "طلاب", "كشافة", "school trip"],
  sizes: [more.ticket, more.ticketS],
  palettes: [
    pal("sky", "سماء", "Sky", inks.sky, inks.navy, inks.mustard, inks.red, inks.white),
    pal("green", "أخضر", "Green", inks.sage, inks.oliveDark, inks.mustard, inks.terracotta, inks.ivory),
    pal("paper", "ورق", "Paper", inks.ivory, inks.navy, inks.orange, inks.teal, inks.sand),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "رحلة إلى أريحا", 20),
    tf("school", "المدرسة", "School", "مدرسة ذكور بيت أمّر الأساسية"),
    tf("date", "الموعد", "When", "الخميس ١٠ نيسان · التجمّع ٧ صباحاً"),
    tf("price", "الرسوم", "Fee", "الاشتراك ٣٠ شيكل شامل الغداء"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 160, 60), stub = W * 0.26, R = W - 6 * s, bw = 34 * s, bx = stub + 8 * s, by = H - 12 * s, tw = W - stub - bw - 22 * s;
    const bus = g({ x: bx, y: by },
      rect(0, -16 * s, bw, 14 * s, { fill: p.accent, r: 2 * s }),
      [0, 1, 2, 3].map(i => rect(3 * s + i * 6.6 * s, -13.6 * s, 5 * s, 5 * s, { fill: p.soft, r: 0.6 * s })),
      rect(bw - 6 * s, -13.6 * s, 4 * s, 9 * s, { fill: p.soft, r: 0.6 * s }),
      rect(0, -5.2 * s, bw, 1 * s, { fill: p.accent2 }),
      [7 * s, bw - 7 * s].map(x => g({}, circle(x, -1.6 * s, 2.6 * s, { fill: p.ink }), circle(x, -1.6 * s, 1 * s, { fill: p.soft }))));
    return scene(W, H, p.paper,
      path(Array.from({ length: 14 }, (_, i) => `M${stub + 4 * s + i * 4 * s} ${by + 2 * s} h${2 * s}`).join(" "), { fill: null, stroke: p.ink, strokeWidth: 0.5 * s }),
      bus,
      tearLine(stub, H, p.ink, p.soft, s),
      line(val(ctx, "title"), R, 18 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "school"), R, 26 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: tw }),
      line(val(ctx, "date"), R, 36 * s, 3.4 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "price"), R, 43 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      [18, 30, 42].map((y, i) => [rect(5 * s, y * s, stub - 10 * s, 0.25 * s, { fill: p.ink }), line(["اسم الطالب", "الصف", "توقيع وليّ الأمر"][i], stub - 5 * s, y * s - 1.2 * s, 2.3 * s, { font: "tajawal", fill: p.ink, align: "start", safe: false })]),
    );
  },
};
export default t;
