import { darbuka, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-tuhur",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة حفل طهور", en: "Circumcision party invitation" },
  note: { ar: "دعوة عرضية بطبلة كبيرة على جانب ونجوم ونقاط تتطاير منها، والنص على الجانب الآخر. لحفلات الطهور والزفّة.", en: "A landscape card with a big darbuka on one side throwing off stars and dots, and the text on the other. For circumcision parties and their zaffeh." },
  tags: ["طهور", "طهور الولد", "ختان", "حفلة", "طبلة", "زفة", "circumcision"],
  sizes: [sizes.a6l, more.a5l],
  palettes: [
    pal("festive", "فرح", "Festive", inks.ivory, inks.navy, inks.red, inks.mustard, inks.teal),
    pal("orange", "برتقالي", "Orange", inks.orange, inks.black, inks.black, inks.ivory, inks.ivory),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.mustard, inks.ivory, inks.red),
  ],
  fonts: ["lalezar", "rakkas", "marhey"],
  fields: [
    tf("title", "العنوان", "Title", "طهور حبيبنا", 18),
    tf("name", "اسم الطفل", "Child's name", "آدم", 14),
    tf("host", "الداعي", "Host", "يدعوكم أبو آدم وعائلته لمشاركتهم الفرحة"),
    tf("date", "التاريخ", "Date", "الخميس ٢٠ أيار"),
    tf("time", "الوقت", "Time", "الزفّة الساعة الخامسة عصراً"),
    tf("venue", "المكان", "Venue", "ساحة الحارة، دير البلح"),
  ],
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 148, 105), dh = H * 0.62, dx = W * 0.22, base = H * 0.86, x0 = W - 9 * s, tw = W * 0.56;
    const burst = [[-0.9, -0.95, 3], [0.7, -1.05, 2.4], [-0.2, -1.25, 2], [1.05, -0.7, 1.6], [-1.15, -0.55, 1.8]];
    return scene(W, H, p.paper,
      burst.map(([x, y, k], i) => g({ x: dx + x * dh * 0.4, y: base - dh + y * dh * 0.18, rotate: i * 23 }, path(starPath(5, k * s, k * 0.42 * s), { fill: i % 2 ? p.accent2 : p.accent }))),
      [[-0.55, -1.1], [0.35, -1.2], [0.95, -0.95], [-1, -0.8]].map(([x, y], i) => circle(dx + x * dh * 0.4, base - dh + y * dh * 0.08, (0.9 + i * 0.2) * s, { fill: p.soft })),
      g({ x: dx, y: base }, darbuka(dh, p.accent, p.paper === inks.ivory ? inks.sand : p.ink === inks.black ? inks.ivory : inks.paper, p.accent2)),
      line(val(ctx, "title"), x0, H * 0.24, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "name"), x0, H * 0.47, 16 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "host"), x0, H * 0.6, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "date"), x0, H * 0.71, 4.6 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "time"), x0, H * 0.79, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "venue"), x0, H * 0.87, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
    );
  },
};

export default t;
