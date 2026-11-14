import { starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-private-lessons",
  category: "posters",
  lang: "ar",
  title: { ar: "إعلان دروس خصوصية على ورقة دفتر", en: "Private lessons notice on notebook paper" },
  note: { ar: "ورقة دفتر مسطّرة بهامش أحمر وثقوب السلك في أعلاها، والمواد مكتوبة كقائمة بمربّعات صحّ. لمعلّمي الدروس الخصوصية والتوجيهي.", en: "A ruled notebook page with a red margin and spiral holes along the top, the subjects ticked off as a checklist. For private tutors and exam prep." },
  tags: ["دروس خصوصية", "توجيهي", "تدريس", "معلم", "مدرسة", "tutoring", "lessons"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("notebook", "دفتر", "Notebook", inks.white, inks.navy, inks.sky, inks.red, inks.navy),
    pal("cream", "قديم", "Old paper", inks.ivory, inks.black, inks.sand, inks.red, inks.black),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.sage, inks.terracotta, inks.oliveDark),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "دروس خصوصية", 18),
    tf("teacher", "المعلّم", "Teacher", "الأستاذ معاذ · خبرة ١٢ سنة"),
    lf("subjects", "المواد", "Subjects", [["المادة", "Subject"], ["الصف", "Grade"]], [["رياضيات", "توجيهي علمي وأدبي"], ["فيزياء", "الصف العاشر – توجيهي"], ["كيمياء", "توجيهي علمي"], ["تأسيس", "الصفوف ١–٦"]], 6),
    tf("note", "ملاحظة", "Note", "حصص فردية وجماعية · في البيت أو أونلاين"),
    tf("phone", "الهاتف", "Phone", "٠٥٩٧٠٠٠٠٠٠", 14),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 210, 297), s = u, pitch = 11 * s, list = rows(ctx, "subjects", 6), mx = W - 30 * s, top = 92 * s;
    const ruled = Array.from({ length: Math.floor((H - 30 * s) / pitch) }, (_, i) => `M0 ${26 * s + i * pitch} H${W}`).join(" ");
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      [[0.78, 0.6], [0.86, 0.66], [0.72, 0.7]].map(([x, y], i) => g({ x: W * x, y: H * y, rotate: i * 20, opacity: 0.35 }, path(starPath(5, 4 * z, 1.8 * z), { fill: p.accent2 }))),
      path(ruled, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }),
      rect(mx + 4 * s, -6, 0.6 * s, H + 12, { fill: p.accent2 }),
      Array.from({ length: 14 }, (_, i) => circle(16 * s + i * ((W - 32 * s) / 13), 10 * s, 2.4 * s, { fill: inks.grey })),
      line(val(ctx, "title"), cx, 52 * s, 22 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 40 * s }),
      line(val(ctx, "teacher"), cx, 72 * s, 8.4 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: W - 40 * s }),
      list.flatMap(([sub = "", grade = ""], i) => {
        const y = top + (i + 1) * pitch * 1.9;
        return [
          rect(mx - 9 * s, y - 7 * s, 7 * s, 7 * s, { fill: null, stroke: p.ink, strokeWidth: 0.6 * s }),
          path(`M${mx - 8 * s} ${y - 4 * s} l${2.5 * s} ${3 * s} l${5 * s} ${-8 * s}`, { fill: null, stroke: p.accent2, strokeWidth: 1.1 * s }),
          line(sub, mx - 14 * s, y, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.4 }),
          line(grade, 20 * s, y, 7 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "end", maxWidth: W * 0.36 }),
        ];
      }),
      line(val(ctx, "note"), cx, H - 50 * s, 7.4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 40 * s }),
      line(val(ctx, "phone"), cx, H - 24 * s, 17 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: W - 40 * s }),
    );
  },
};
export default t;
