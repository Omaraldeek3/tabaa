import { beadRule, dotRing, flourishRule, guillocheNode, khatamPath, rosetteLines, tatreezBand, tatreezUnit } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-letterhead",
  category: "stationery",
  lang: "ar",
  title: { ar: "ورق رسمي بشريط تطريز جانبي", en: "Letterhead with a side tatreez strip" },
  note: { ar: "ورقة مراسلات رسمية: شريط تطريز رفيع ينزل على طول الحافة اليمنى، والاسم والتخصّص في الرأس، وبيانات التواصل في التذييل، والمساحة الباقية فارغة للكتابة.", en: "Official letter paper: a narrow tatreez strip runs down the right edge, the name and line of work at the head, contacts in the footer, and the rest left blank to write on." },
  tags: ["ورق رسمي", "مراسلات", "شركة", "جمعية", "ترويسة", "letterhead"],
  sizes: [sizes.a4],
  palettes: [
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.olive, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.navy, inks.red, inks.grey),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.olive, inks.red, inks.grey),
  ],
  fonts: ["reemkufi", "arefruqaa", "kufam", "amiri"],
  fields: [
    tf("name", "الاسم", "Name", "جمعية سيدات بيت ساحور الخيرية", 36),
    tf("line", "التخصّص", "Line of work", "تطريز · تعليم · تمكين اقتصادي"),
    tf("reg", "رقم التسجيل", "Registration", "مسجّلة لدى وزارة الداخلية برقم ٢٠٤٥"),
    tf("address", "العنوان", "Address", "شارع الشبيبة، بيت ساحور"),
    tf("phone", "الهاتف", "Phone", "٠٢ ٢٧٧ ٠٠٠٠"),
    tf("email", "البريد", "Email", "info@example.ps"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 210, 297), R = W - 26 * s, max = W - 50 * s;
    return scene(W, H, p.paper,
      guillocheNode(0, 8 * s, W - 22 * s, 48 * s, p.accent2, { waves: 6, amp: 1.4 * s, period: 20 * s, width: 0.15 * s, opacity: 0.25 }),
      g({ x: W / 2 - 8 * s, y: H / 2 + 10 * s, opacity: 0.06 }, path(khatamPath(60 * s), { fill: p.accent }), path(khatamPath(46 * s), { fill: p.paper }), rosetteLines(40 * s, p.accent, { rings: 6, lobes: 16, width: 0.6 * s }), g({ x: -12 * s, y: -12 * s }, tatreezUnit("star", 24 * s, [p.accent]))),
      g({ x: W - 10 * s, y: -b }, g({ rotate: 90 }, tatreezBand("chain", H + 2 * b, 10 * s, [p.accent, p.accent2]))),
      rect(W - 22 * s, -b, 0.4 * s, H + 2 * b, { fill: p.accent2 }),
      g({ x: 30 * s, y: 30 * s }, circle(0, 0, 11 * s, { fill: p.accent }), dotRing(9 * s, 28, 0.4 * s, p.paper), circle(0, 0, 7 * s, { fill: null, stroke: p.paper, strokeWidth: 0.3 * s }), tatreezUnit("star", 9 * s, [p.paper]).children.length ? g({ x: -4.5 * s, y: -4.5 * s }, tatreezUnit("star", 9 * s, [p.paper])) : null),
      line(val(ctx, "name"), R, 30 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      line(val(ctx, "line"), R, 39 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      flourishRule((R + 18 * s) / 2, 46 * s, R - 18 * s, p.accent, s),
      line(val(ctx, "reg"), R, 52 * s, 3 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
      beadRule(18 * s, R, H - 26 * s, p.accent2, s, { centre: true, pitch: 5 }),
      line(joined(ctx, ["address", "phone", "email"]), (R + 18 * s) / 2, H - 17 * s, 3.4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: R - 26 * s }),
    );
  },
};
export default t;
