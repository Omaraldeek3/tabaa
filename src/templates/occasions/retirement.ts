import { clockFace } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-retirement",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة حفل تقاعد", en: "Retirement party invitation" },
  note: { ar: "ساعة حائط كبيرة لعقاربها حرية أخيراً، وسنوات الخدمة في شريط. لتكريم معلّم أو موظّف عند تقاعده.", en: "A big wall clock whose hands are finally free, with the years of service on a band. To honour a teacher or colleague on retiring." },
  tags: ["تقاعد", "تكريم", "وداع", "خدمة", "ساعة", "retirement"],
  sizes: [sizes.a6, sizes.a5],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.paper, inks.black, inks.olive, inks.red, inks.ivory),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.mustard, inks.mustard, inks.ivory),
    pal("terracotta", "فخّاري", "Clay", inks.ivory, inks.black, inks.terracotta, inks.teal, inks.paper),
  ],
  fonts: ["reemkufi", "rakkas", "lalezar"],
  fields: [
    tf("title", "العنوان", "Title", "تقاعد سعيد", 18),
    tf("name", "الاسم", "Name", "الأستاذ نبيل عوض", 26),
    tf("years", "سنوات الخدمة", "Service", "٣٤ عاماً من العطاء في مدرسة ذكور القرية"),
    tf("invite", "الدعوة", "Invitation", "يدعوكم زملاؤه وطلابه لحفل تكريمه"),
    tf("date", "التاريخ", "Date", "الخميس ٢٧ حزيران"),
    tf("time", "الوقت", "Time", "الحادية عشرة صباحاً"),
    tf("venue", "المكان", "Venue", "قاعة المدرسة"),
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, r = Math.min(W * 0.28, H * 0.19), cy = 9 + 14 * s + r;
    return scene(W, H, p.paper,
      line(val(ctx, "title"), cx, 9 + 8 * s, 7 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      g({ x: cx, y: cy }, clockFace(r, p.paper === inks.navy ? inks.ivory : inks.white, inks.black, p.accent2, 4, 0)),
      line(val(ctx, "name"), cx, cy + r + 13 * s, 8.5 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      val(ctx, "years") ? rect(-b, cy + r + 18 * s, W + 2 * b, 9 * s, { fill: p.accent }) : null,
      line(val(ctx, "years"), cx, cy + r + 24 * s, 3.8 * s, { font: "tajawal", weight: 800, fill: p.paper === inks.navy ? inks.navy : p.soft, maxWidth: max }),
      line(val(ctx, "invite"), cx, cy + r + 34 * s, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, cy + r + 42 * s, 4.4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Math.min(H - 7 - 2 * s, cy + r + 49 * s), 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
