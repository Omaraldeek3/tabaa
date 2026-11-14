import { burstLines, dotField, poppy } from "../../lib/motifs/index.ts";
import { circle, g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-poppy-field",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بحقل الحنّون", en: "Poppy field wedding invitation" },
  note: { ar: "شقائق النعمان تصعد من أسفل الدعوة كحقل ربيعي، والأسماء بخط رقعة أحمر. لأعراس الربيع.", en: "Poppies rise from the foot of the card like a spring field, with the names in red ruqaa. For spring weddings." },
  tags: ["زفاف", "عرس", "حنون", "شقائق النعمان", "ربيع", "wedding", "poppy"],
  sizes: [sizes.a5, sizes.invite, sizes.a6],
  palettes: [
    pal("spring", "ربيع", "Spring", inks.ivory, inks.black, inks.red, inks.olive, inks.grey),
    pal("dusk", "غسق", "Dusk", inks.navy, inks.ivory, inks.rose, inks.sage, inks.sky),
    pal("sand", "رمل", "Sand", inks.sand, inks.oliveDark, inks.terracotta, inks.oliveDark, inks.grey),
  ],
  fonts: ["arefruqaa", "amiri", "lateef", "rakkas"],
  fields: [
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "بفرح كبير ندعوكم إلى زفاف" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "مجد", maxLength: 20 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "ياسمين", maxLength: 20 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ٩ نيسان ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "الخامسة عصراً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "منتزه البلد، طولكرم" },
    { id: "families", kind: "text", label: { ar: "العائلتان", en: "Families" }, sample: "آل جرّار وآل عبد الهادي" },
  ],
  render(ctx) {
    const { W, H, p, b, v, s, cx } = dims(ctx, 148, 210), max = W - 34 * s;
    const field = [[0.08, 30, 15], [0.2, 52, 19], [0.33, 26, 13], [0.46, 44, 17], [0.6, 28, 14], [0.72, 54, 20], [0.86, 34, 15], [0.95, 22, 12]] as const;
    const heart = p.ink === inks.ivory ? inks.night : inks.black;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      g({ x: W * 0.82, y: H * 0.1 }, circle(0, 0, 9 * z, { fill: p.accent2, opacity: 0.25 }), burstLines(24, 11 * z, 17 * z, p.accent2, 0.4 * z, 0.5)),
      dotField(0, H * 0.4, W, H * 0.3, 5 * z, 0.4 * z, p.accent2, { fade: "down", opacity: 0.3 }),
      rect(-b, H - 9 * v, W + 2 * b, 9 * v + b, { fill: p.accent2 }),
      field.map(([x, h, d]) => g({ x: x * W, y: H - h * v - 6 * v }, poppy(d * s, p.accent, heart, { stem: p.accent2, stemLength: h * v + 8 * v }))),
      line(val(ctx, "invite"), cx, 34 * v, 5.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, 62 * v, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, 75 * v, 8 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, 97 * v, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      rect(cx - 14 * s, 106 * v, 28 * s, 0.3 * s, { fill: p.ink }),
      line(val(ctx, "date"), cx, 118 * v, 6.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, 127 * v, 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, 137 * v, 4.8 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
    );
  },
};
export default t;
