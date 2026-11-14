import { dotField, guillocheNode, microphone } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-symposium",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر ندوة ومحاضرة", en: "Symposium and talk poster" },
  note: { ar: "بوستر جادّ لندوة أو محاضرة: عنوان كبير على اليمين، ميكروفون على المنبر، وشريط سفلي بأسماء المتحدثين وصفاتهم.", en: "A serious poster for a talk or panel: a big title on the right, a microphone on its stand, and a lower strip listing speakers and their roles." },
  tags: ["ندوة", "محاضرة", "مؤتمر", "حوار", "متحدثون", "talk", "panel"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("slate", "رمادي", "Slate", inks.ivory, inks.black, inks.teal, inks.navy, inks.sand),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.mustard, inks.ivory, inks.night),
    pal("brick", "قرميدي", "Brick", inks.paper, inks.black, inks.terracotta, inks.black, inks.sand),
  ],
  fonts: ["reemkufi", "kufam", "cairo", "amiri"],
  fields: [
    tf("kicker", "النوع", "Kind", "ندوة حوارية"),
    tf("title", "العنوان", "Title", "الذكاء الاصطناعي", 24),
    tf("title2", "تكملة العنوان", "Title, second line", "وسوق العمل الفلسطيني", 30),
    lf("speakers", "المتحدثون", "Speakers", [["الاسم", "Name"], ["الصفة", "Role"]], [["د. رنا خوري", "جامعة بيرزيت"], ["م. سامي عودة", "مؤسس شركة ناشئة"], ["أ. ليلى حسن", "مديرة الموارد البشرية"]], 4),
    tf("date", "التاريخ", "Date", "الثلاثاء ١١ آذار · الخامسة مساءً"),
    tf("venue", "المكان", "Venue", "قاعة غرفة التجارة، الخليل"),
    tf("note", "ملاحظة", "Note", "الدخول مجاني · بثّ مباشر على صفحتنا"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 297, 420), R = W - 22 * s, band = H * 0.6, list = rows(ctx, "speakers", 4), pitch = (H - band - 70 * s) / 4;
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      dotField(W * 0.5, 0, W * 0.5, H * 0.55, 8 * z, 0.8 * z, p.accent, { fade: "left", opacity: 0.15 }),
      guillocheNode(0, H * 0.6, W, H * 0.4, p.paper, { waves: 8, amp: 1.4 * z, period: 26 * z, width: 0.25 * z, opacity: 0.12 }),
      rect(-b, band, W + 2 * b, H - band + b, { fill: p.accent }),
      g({ x: W * 0.2, y: band }, microphone(H * 0.36, p.ink, p.paper)),
      line(val(ctx, "kicker"), R, 50 * s, 11 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "title"), R, 104 * s, 30 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.66 }),
      line(val(ctx, "title2"), R, 140 * s, 20 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.66 }),
      line(val(ctx, "date"), R, 180 * s, 9 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      line(val(ctx, "venue"), R, 198 * s, 8 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      list.flatMap(([name = "", role = ""], i) => [
        line(name, R, band + 26 * s + i * pitch, 11 * s, { font: ctx.font, weight: 700, fill: p.paper === inks.navy ? inks.navy : inks.white, align: "start", maxWidth: W * 0.5 }),
        line(role, 22 * s, band + 26 * s + i * pitch, 7.5 * s, { font: "tajawal", weight: 500, fill: p.paper === inks.navy ? inks.navy : inks.white, align: "end", maxWidth: W * 0.36 }),
      ]),
      line(val(ctx, "note"), W / 2, H - 20 * s, 7 * s, { font: "tajawal", weight: 700, fill: p.paper === inks.navy ? inks.navy : inks.white, maxWidth: W - 40 * s }),
    );
  },
};
export default t;
