import { rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-now-hiring",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر «مطلوب موظفين»", en: "Now hiring poster" },
  note: { ar: "كلمة «مطلوب» بحروف ضخمة على خطّين مائلين كشريط تحذير، وقائمة الوظائف مرقّمة تحتها. للمحلات والمطاعم والشركات.", en: "The word «wanted» in huge letters over hazard stripes, with the open jobs numbered below. For shops, restaurants and firms." },
  tags: ["مطلوب", "وظائف", "توظيف", "عمل", "شاغر", "hiring", "jobs"],
  sizes: [sizes.a3, sizes.a4, sizes.a5],
  palettes: [
    pal("hazard", "تنبيه", "Hazard", inks.mustard, inks.black, inks.black, inks.ivory, inks.mustard),
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.black, inks.white),
    pal("blue", "أزرق", "Blue", inks.ivory, inks.navy, inks.navy, inks.orange, inks.ivory),
  ],
  fonts: ["lalezar", "kufam", "jomhuria"],
  fields: [
    tf("title", "العنوان", "Title", "مطلوب", 10),
    tf("company", "الجهة", "Employer", "لمطعم «زيت وزعتر» في نابلس"),
    lf("jobs", "الوظائف", "Jobs", [["الوظيفة", "Job"], ["الشرط", "Requirement"]], [["شيف مشاوي", "خبرة سنتين"], ["مساعد مطبخ", "بدون خبرة"], ["كاشير", "يجيد الحاسوب"], ["عامل توصيل", "رخصة دراجة"]], 6),
    tf("perks", "المزايا", "Perks", "راتب ممتاز · وجبة يومية · تأمين صحي"),
    tf("contact", "التواصل", "Contact", "أرسل سيرتك على واتساب ٠٥٦٩٠٠٠٠٠٠"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 40 * s, jobs = rows(ctx, "jobs", 6), top = 150 * s, pitch = 26 * s;
    const stripes = Array.from({ length: Math.ceil((W + 2 * b) / (14 * s)) + 4 }, (_, i) => `M${-b + i * 14 * s - 20 * s} ${108 * s} l${7 * s} 0 l${-12 * s} ${12 * s} l${-7 * s} 0 Z`).join(" ");
    return scene(W, H, p.paper,
      line(val(ctx, "title"), cx, 92 * s, 84 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      rect(-b, 108 * s, W + 2 * b, 12 * s, { fill: p.accent }),
      { type: "path", d: stripes, fill: p.paper === inks.mustard ? inks.mustard : p.accent2 },
      line(val(ctx, "company"), cx, 138 * s, 10 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      jobs.flatMap(([job = "", req = ""], i) => [
        rect(W - 34 * s, top + 8 * s + i * pitch, 12 * s, 12 * s, { fill: p.accent }),
        line(String(i + 1).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]), W - 28 * s, top + 17.6 * s + i * pitch, 8 * s, { font: "tajawal", weight: 800, fill: p.paper === inks.mustard ? inks.mustard : p.paper, safe: false }),
        line(job, W - 40 * s, top + 19 * s + i * pitch, 12 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.5 }),
        line(req, 22 * s, top + 18 * s + i * pitch, 7.5 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "end", maxWidth: W * 0.3 }),
      ]),
      line(val(ctx, "perks"), cx, H - 54 * s, 9 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      val(ctx, "contact") ? rect(-b, Math.min(H - 40 * s, H - 13 - 19 * s), W + 2 * b, 60 * s + b, { fill: p.accent }) : null,
      line(val(ctx, "contact"), cx, H - 13 - 5 * s, 10 * s, { font: "tajawal", weight: 800, fill: p.paper === inks.mustard ? inks.mustard : p.paper, maxWidth: max }),
    );
  },
};
export default t;
