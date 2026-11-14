import { rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-prescription",
  category: "stationery",
  lang: "ar",
  title: { ar: "ورقة وصفة طبية (روشتة)", en: "Doctor's prescription pad" },
  note: { ar: "روشتة الطبيب: الاسم والتخصّص بالعربية في الرأس، وعلامة ℞ كبيرة باهتة في الزاوية، وخانات اسم المريض وعمره والتاريخ، وتذييل بالعنوان والهاتف. تُطبع دفتراً.", en: "A doctor's prescription sheet: name and speciality at the head, a large pale ℞ in the corner, spaces for patient, age and date, and a footer with address and phone. Printed as a pad." },
  tags: ["روشتة", "وصفة", "طبيب", "عيادة", "دفتر", "prescription"],
  sizes: [sizes.a5, sizes.a6],
  palettes: [
    pal("teal", "فيروزي", "Teal", inks.white, inks.navy, inks.teal, inks.sky, inks.grey),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.olive, inks.sage, inks.grey),
    pal("blue", "أزرق", "Blue", inks.white, inks.navy, inks.navy, inks.sky, inks.grey),
  ],
  fonts: ["reemkufi", "cairo", "amiri"],
  fields: [
    tf("doctor", "الطبيب", "Doctor", "د. سمر الأحمد", 26),
    tf("speciality", "التخصّص", "Speciality", "أخصّائية أمراض الأطفال وحديثي الولادة"),
    tf("board", "الشهادة", "Board", "البورد الأردني · عضو نقابة الأطباء"),
    tf("address", "العنوان", "Address", "مجمّع النور الطبي، جنين"),
    tf("phone", "الهاتف", "Phone", "٠٤ ٢٥٠ ٠٠٠٠"),
    tf("hours", "الدوام", "Hours", "٩ – ٥ عدا الجمعة"),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 148, 210), R = W - 12 * s, L = 12 * s;
    const blank = (label: string, x: number, y: number, w: number) => [line(label, x, y, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", safe: false }), rect(x - w, y + 1 * s, w - 16 * s, 0.25 * s, { fill: p.soft })];
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, 4 * s + b, { fill: p.accent }),
      line(val(ctx, "doctor"), R, 20 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: W * 0.7 }),
      line(val(ctx, "speciality"), R, 28 * s, 3.6 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.75 }),
      line(val(ctx, "board"), R, 34 * s, 2.8 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: W * 0.75 }),
      rect(L, 39 * s, R - L, 0.5 * s, { fill: p.accent }),
      blank("المريض:", R, 50 * s, (R - L) * 0.62), blank("العمر:", L + (R - L) * 0.34, 50 * s, (R - L) * 0.34),
      blank("التاريخ:", L + (R - L) * 0.34, 60 * s, (R - L) * 0.34),
      line("℞", L + 4 * s, 82 * s, 20 * s, { font: "inter", weight: 700, fill: p.accent2, align: "end", dir: "ltr", safe: false }),
      rect(L, H - 26 * s, R - L, 0.3 * s, { fill: p.soft }),
      line(joined(ctx, ["address", "phone", "hours"]), (R + L) / 2, H - 16 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: R - L }),
      rect(-b, H - 4 * s, W + 2 * b, 4 * s + b, { fill: p.accent }),
    );
  },
};
export default t;
