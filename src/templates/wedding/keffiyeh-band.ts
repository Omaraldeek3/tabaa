import { keffiyeh, khatamPath, starTile, tatreezUnit } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-keffiyeh-band",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بشريطي كوفية", en: "Keffiyeh band wedding invitation" },
  note: { ar: "أبيض وأسود بلمسة حمراء: شريطا كوفية أعلى الدعوة وأسفلها، والاسمان بكوفي واضح.", en: "Black and white with a touch of red: keffiyeh bands at head and foot, and the names in clear Kufi." },
  tags: ["زفاف", "عرس", "كوفية", "أبيض وأسود", "wedding", "keffiyeh"],
  sizes: [sizes.a5, sizes.invite, sizes.dl],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.white, inks.black, inks.black, inks.red, inks.grey),
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.oliveDark, inks.terracotta, inks.grey),
    pal("wine", "نبيذي", "Wine", inks.paper, inks.burgundy, inks.burgundy, inks.goldDeep, inks.grey),
  ],
  fonts: ["reemkufi", "kufam", "amiri", "cairo"],
  fields: [
    { id: "opening", kind: "text", label: { ar: "الافتتاح", en: "Opening" }, sample: "بسم الله الرحمن الرحيم" },
    { id: "hosts", kind: "text", label: { ar: "أصحاب الدعوة", en: "Hosts" }, sample: "آل الشوّا وآل الدجاني" },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "يتشرّفون بدعوتكم لحضور حفل زفاف ولديهما" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "خالد", maxLength: 20 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "هبة", maxLength: 20 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الخميس ١٩ آب ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "السابعة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "قاعة الأندلس، غزة" },
  ],
  render(ctx) {
    const { W, H, p, b, v, s, cx } = dims(ctx, 148, 210), max = W - 30 * s, band = 26 * v;
    const strip = (y: number) => g({ x: -b, y }, rect(0, 0, W + 2 * b, band + b, { fill: p.accent }), keffiyeh(W + 2 * b, band + b, 6 * s, inks.paper, 0.13));
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      starTile(0, H * 0.14, W, H * 0.72, 10 * z, 1.2 * z, p.accent, 0.06),
      strip(-b), strip(H - band),
      rect(-b, band, W + 2 * b, 1.4 * s, { fill: p.accent2 }), rect(-b, H - band - 1.4 * s, W + 2 * b, 1.4 * s, { fill: p.accent2 }),
      line(val(ctx, "opening"), cx, band + 16 * v, 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "hosts"), cx, band + 30 * v, 6.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "invite"), cx, band + 40 * v, 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, band + 66 * v, 19 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx - 4 * s, y: band + 72 * v }, tatreezUnit("diamond", 8 * s, [p.accent2, p.ink])),
      line(val(ctx, "bride"), cx, band + 101 * v, 19 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, band + 121 * v, 6.4 * s, { font: "amiri", weight: 700, fill: p.accent2, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, band + 131 * v, 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      [16 * z, W - 16 * z].map(x => g({ x, y: H * 0.5 }, path(khatamPath(3 * z), { fill: p.accent }), circle(0, 0, 1 * z, { fill: p.paper }))),
    );
  },
};
export default t;
