import { tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
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
      g({ x: W - 10 * s, y: -b }, g({ rotate: 90 }, tatreezBand("chain", H + 2 * b, 10 * s, [p.accent, p.accent2]))),
      line(val(ctx, "name"), R, 30 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      line(val(ctx, "line"), R, 39 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      rect(18 * s, 46 * s, R - 18 * s, 0.4 * s, { fill: p.accent }),
      line(val(ctx, "reg"), R, 52 * s, 3 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
      rect(18 * s, H - 26 * s, R - 18 * s, 0.3 * s, { fill: p.soft }),
      line(joined(ctx, ["address", "phone", "email"]), (R + 18 * s) / 2, H - 17 * s, 3.4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: R - 26 * s }),
    );
  },
};
export default t;
