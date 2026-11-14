import { dottedLine, guillocheNode, heartbeat, khatamPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
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
      guillocheNode(-b, 4 * s, W + 2 * b, 38 * s, p.accent2, { waves: 4, amp: 1.2 * s, period: 16 * s, width: 0.15 * s, opacity: 0.45 }),
      g({ x: L + 12 * s, y: 22 * s }, circle(0, 0, 10 * s, { fill: p.accent }), rect(-2 * s, -6.5 * s, 4 * s, 13 * s, { fill: p.paper, r: 0.6 * s }), rect(-6.5 * s, -2 * s, 13 * s, 4 * s, { fill: p.paper, r: 0.6 * s }), circle(0, 0, 8.4 * s, { fill: null, stroke: p.paper, strokeWidth: 0.3 * s })),
      Array.from({ length: Math.max(0, Math.floor((H - 30 * s - 92 * s) / (9 * s))) }, (_, i) => dottedLine(L + 22 * s, R, 96 * s + i * 9 * s, p.accent2, s)),
      g({ x: W / 2, y: (H + 70 * s) / 2, opacity: 0.05 }, path(khatamPath(40 * s), { fill: p.accent }), path(khatamPath(30 * s), { fill: p.paper }), path(khatamPath(18 * s), { fill: p.accent })),
      g({ x: L, y: H - 30 * s }, path(heartbeat(R - L, 4 * s), { fill: null, stroke: p.accent, strokeWidth: 0.45 * s })),
      line(val(ctx, "doctor"), R, 20 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: W * 0.7 }),
      line(val(ctx, "speciality"), R, 28 * s, 3.6 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.75 }),
      line(val(ctx, "board"), R, 34 * s, 2.8 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: W * 0.75 }),
      rect(L, 39 * s, R - L, 0.5 * s, { fill: p.accent }), rect(L, 40.6 * s, R - L, 0.2 * s, { fill: p.accent2 }),
      blank("المريض:", R, 50 * s, (R - L) * 0.62), blank("العمر:", L + (R - L) * 0.34, 50 * s, (R - L) * 0.34),
      blank("التاريخ:", L + (R - L) * 0.34, 60 * s, (R - L) * 0.34),
      line("℞", L + 4 * s, 82 * s, 20 * s, { font: "inter", weight: 700, fill: p.accent2, align: "end", dir: "ltr", safe: false }),
      line(joined(ctx, ["address", "phone", "hours"]), (R + L) / 2, H - 16 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: R - L }),
      rect(-b, H - 4 * s, W + 2 * b, 4 * s + b, { fill: p.accent }),
    );
  },
};
export default t;
