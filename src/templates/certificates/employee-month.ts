import { rosette } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { certAr, tf } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-employee-month",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة موظف الشهر بالوسام", en: "Employee of the month certificate" },
  note: { ar: "شهادة عصرية بشريط جانبي داكن يتدلّى منه وسام بشريطين، واسم الشهر بحروف كبيرة. للشركات والمحلات والمستشفيات.", en: "A modern certificate with a dark side band from which a ribbon rosette hangs, and the month in large letters. For companies, shops and hospitals." },
  tags: ["موظف الشهر", "تميز", "شركة", "وسام", "شهادة", "employee"],
  sizes: [sizes.a4l],
  palettes: [
    pal("corporate", "شركات", "Corporate", inks.white, inks.navy, inks.navy, inks.goldDeep, inks.red),
    pal("teal", "فيروزي", "Teal", inks.white, inks.black, inks.teal, inks.goldDeep, inks.orange),
    pal("charcoal", "فحمي", "Charcoal", inks.ivory, inks.black, inks.charcoal, inks.gold, inks.red),
  ],
  fonts: ["kufam", "reemkufi", "cairo"],
  fields: [tf("month", "الشهر", "Month", "تشرين الأول ٢٠٢٧", 22), ...certAr({ org: "شركة جوّال · فرع نابلس", title: "موظف الشهر", lead: "يسرّ الإدارة أن تكرّم", name: "مهند صلاح", reason: "لالتزامه وروحه الإيجابية ورضا الزبائن عن خدمته\nأنت مثال يُحتذى", date: "٣١ تشرين الأول ٢٠٢٧", sign1: "مدير الفرع", sign2: "الموارد البشرية" })],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 297, 210), band = W * 0.28, R = W - 24 * s, tw = W - band - 46 * s;
    const sign = (label: string, x: number) => label ? [rect(x - 24 * s, 170 * s, 48 * s, 0.4 * s, { fill: p.ink }), line(label, x, 177 * s, 4.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 48 * s })] : [];
    return scene(W, H, p.paper,
      rect(-b, -b, band + b, H + 2 * b, { fill: p.accent }),
      rect(band / 2 - 4 * s, -b, 8 * s, 70 * s + b, { fill: p.soft }),
      g({ x: band / 2, y: 82 * s }, rosette(24 * s, p.accent2, p.soft, p.paper)),
      line(val(ctx, "month"), band / 2, 150 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.paper, maxWidth: band - 20 * s }),
      line(val(ctx, "org"), R, 34 * s, 6.4 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "title"), R, 64 * s, 24 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      rect(R - 40 * s, 72 * s, 40 * s, 1.2 * s, { fill: p.accent2 }),
      line(val(ctx, "lead"), R, 88 * s, 6 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "name"), R, 108 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      stack(linesOf(val(ctx, "reason"), 3), R, 124 * s, 5.6 * s, 9 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "date"), R, 156 * s, 4.6 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: tw * 0.5 }),
      sign(val(ctx, "sign1"), R - 26 * s), sign(val(ctx, "sign2"), R - 96 * s),
    );
  },
};
export default t;
