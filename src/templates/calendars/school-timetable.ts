import { dotField, doubleFrame, starTile } from "../../lib/motifs/index.ts";
import { rect, scene, type SceneNode } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "calendars-school-timetable",
  category: "calendars",
  lang: "ar",
  title: { ar: "برنامج الحصص المدرسي", en: "School timetable" },
  note: { ar: "جدول الحصص الأسبوعي: الأيام صفوف والحصص أعمدة، كل مادة في مربّع بلون فاتح، واسم الطالب وصفّه في الأعلى. يُعلّق فوق مكتب الدراسة.", en: "The weekly lesson timetable: days as rows and periods as columns, each subject in a pale box, with the pupil's name and class at the top. Hangs over the study desk." },
  tags: ["برنامج", "حصص", "مدرسة", "جدول", "طلاب", "timetable"],
  sizes: [sizes.a4l],
  palettes: [
    pal("bright", "مشرق", "Bright", inks.white, inks.navy, inks.orange, inks.sky, inks.mustard),
    pal("mint", "نعناع", "Mint", inks.ivory, inks.oliveDark, inks.teal, inks.sage, inks.mustard),
    pal("pink", "زهري", "Pink", inks.white, inks.burgundy, inks.rose, inks.blush, inks.sky),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("title", "العنوان", "Title", "برنامجي الدراسي", 20),
    tf("pupil", "الطالب", "Pupil", "ليان · الصف الرابع (أ)"),
    lf("week", "الأسبوع", "Week", [["اليوم", "Day"], ["١", "1"], ["٢", "2"], ["٣", "3"], ["٤", "4"], ["٥", "5"], ["٦", "6"]], [
      ["الأحد", "عربي", "رياضيات", "علوم", "إنجليزي", "تربية إسلامية", "فن"],
      ["الإثنين", "رياضيات", "عربي", "اجتماعيات", "علوم", "رياضة", "إنجليزي"],
      ["الثلاثاء", "عربي", "إنجليزي", "رياضيات", "تكنولوجيا", "علوم", "موسيقى"],
      ["الأربعاء", "علوم", "عربي", "رياضيات", "تربية إسلامية", "إنجليزي", "مكتبة"],
      ["الخميس", "رياضيات", "عربي", "إنجليزي", "اجتماعيات", "رياضة", "نشاط"],
    ], 6),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 297, 210), week = rows(ctx, "week", 6), mx = 14 * s, top = 52 * s, cols = 7, cw = (W - 2 * mx) / cols, rh = Math.min(24 * s, (H - top - 14 * s) / Math.max(week.length, 1));
    const tints = [p.accent2, p.soft, p.accent2, p.soft];
    const nodes: (SceneNode | null)[] = [];
    for (let j = 0; j < cols; j++) {
      const x = W - mx - (j + 1) * cw;
      nodes.push(rect(x + 0.6 * s, top - 11 * s, cw - 1.2 * s, 9 * s, { fill: p.accent, r: 1.4 * s }));
      nodes.push(line(j ? "الحصة " + "١٢٣٤٥٦"[j - 1] : "اليوم", x + cw / 2, top - 4.6 * s, 4 * s, { font: ctx.font, weight: 700, fill: inks.white, safe: false }));
    }
    week.forEach((row, i) => row.slice(0, cols).forEach((cell, j) => {
      const x = W - mx - (j + 1) * cw, y = top + i * rh;
      nodes.push(rect(x + 0.6 * s, y + 0.6 * s, cw - 1.2 * s, rh - 1.2 * s, { fill: j ? tints[(i + j) % 4] : p.ink, opacity: j ? 0.35 : 1, r: 1.4 * s }));
      if (cell) nodes.push(line(cell, x + cw / 2, y + rh * 0.6, (j ? 4.6 : 5) * s, { font: j ? "tajawal" : ctx.font, weight: 700, fill: j ? p.ink : p.paper, maxWidth: cw - 4 * s }));
    }));
    return scene(W, H, p.paper,
      dotField(0, 0, W, 44 * s, 4 * s, 0.5 * s, p.accent, { fade: "down", opacity: 0.25 }),
      starTile(0, H - 14 * s, W, 14 * s, 9 * s, 1.2 * s, p.accent, 0.08),
      line(val(ctx, "title"), W - mx, 26 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.5 }),
      line(val(ctx, "pupil"), mx, 26 * s, 6 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "end", maxWidth: W * 0.4 }),
      nodes,
      doubleFrame(5 * s, 5 * s, W - 10 * s, H - 10 * s, p.accent, p.paper, { gap: 1.8 * s, heavy: 0.5 * s, thin: 0.2 * s, corner: "star", r: 3 * s }),
    );
  },
};
export default t;
