import { circle, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "programmes-programme",
  category: "programmes",
  lang: "ar",
  title: { ar: "برنامج فقرات الحفل بخط زمني", en: "Event running order with a timeline" },
  note: { ar: "برنامج الحفل على خطّ زمني عمودي: نقطة لكل فقرة، والوقت على جانب والفقرة على الآخر. يوزّع على الضيوف في الحفلات والمؤتمرات والأمسيات.", en: "The running order on a vertical timeline: a dot for each item, the time on one side and the item on the other. Handed to guests at parties, conferences and evenings." },
  tags: ["برنامج", "فقرات", "حفل", "مؤتمر", "خط زمني", "programme"],
  sizes: [sizes.a5, sizes.dl],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.ivory, inks.navy, inks.orange, inks.teal, inks.sand),
    pal("olive", "زيتي", "Olive", inks.paper, inks.oliveDark, inks.red, inks.olive, inks.sand),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.sky, inks.navy),
  ],
  fonts: ["reemkufi", "lalezar", "arefruqaa"],
  fields: [
    tf("title", "العنوان", "Title", "حفل تكريم المتفوّقين", 26),
    tf("sub", "التفاصيل", "Details", "الخميس ٢٠ حزيران · قاعة البلدية"),
    lf("items", "الفقرات", "Items", [["الوقت", "Time"], ["الفقرة", "Item"]], [["٥:٠٠", "استقبال الضيوف"], ["٥:٣٠", "آيات من الذكر الحكيم"], ["٥:٤٠", "النشيد الوطني"], ["٥:٥٠", "كلمة مدير التربية"], ["٦:١٠", "دبكة لفرقة المدرسة"], ["٦:٣٠", "توزيع الشهادات"], ["٧:٠٠", "ضيافة"]], 10),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), list = rows(ctx, "items", 10), top = 54 * s, pitch = Math.min(16 * s, (H - top - 14 * s) / Math.max(list.length, 1)), ax = W * 0.66;
    return scene(W, H, p.paper,
      line(val(ctx, "title"), cx, 24 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 20 * s }),
      line(val(ctx, "sub"), cx, 34 * s, 4.4 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: W - 20 * s }),
      list.length ? rect(ax - 0.3 * s, top - 4 * s, 0.6 * s, (list.length - 1) * pitch + 4 * s, { fill: p.accent2 }) : null,
      list.flatMap(([time = "", item = ""], i) => [
        circle(ax, top + i * pitch, 2 * s, { fill: p.accent }), circle(ax, top + i * pitch, 0.8 * s, { fill: p.paper }),
        line(time, ax + 6 * s, top + i * pitch + 1.6 * s, 4.6 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "end", maxWidth: W - ax - 14 * s }),
        line(item, ax - 6 * s, top + i * pitch + 1.6 * s, 4.8 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: ax - 16 * s }),
      ]),
    );
  },
};
export default t;
