import { tatreezBand, tatreezUnit } from "../../lib/motifs/index.ts";
import { type SceneNode, g, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-cypress-columns",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بعمودي السرو", en: "Cypress columns wedding invitation" },
  note: { ar: "عمودان من شجر السرو المطرّز على جانبي الدعوة، كما على صدر الثوب. تناسب المقاس الطولي DL.", en: "Two columns of stitched cypress trees flank the text, as on the chest panel of a thobe. Suits the tall DL size." },
  tags: ["زفاف", "عرس", "سرو", "تطريز", "ثوب", "wedding", "tatreez", "cypress"],
  sizes: [sizes.dl, sizes.a5, sizes.invite],
  palettes: [
    pal("thobe", "ثوب", "Thobe", inks.black, inks.paper, inks.red, inks.gold, inks.sand),
    pal("linen", "كتّان", "Linen", inks.paper, inks.black, inks.red, inks.olive, inks.grey),
    pal("indigo", "نيلي", "Indigo", inks.night, inks.ivory, inks.rose, inks.mustard, inks.sky),
  ],
  fonts: ["amiri", "arefruqaa", "lateef", "reemkufi"],
  fields: [
    { id: "opening", kind: "text", label: { ar: "الافتتاح", en: "Opening" }, sample: "بسم الله الرحمن الرحيم" },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "ندعوكم لحضور زفاف" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "طارق", maxLength: 16 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "آية", maxLength: 16 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ٦ آب ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "السابعة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "قاعة الكرمل، حيفا" },
    { id: "families", kind: "text", label: { ar: "العائلتان", en: "Families" }, sample: "آل زعبي وآل خوري" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 99, 210), unit = Math.min(13 * s, W * 0.13), m = 5 * s, max = W - 2 * (m + unit + 6 * s);
    const n = Math.floor((H - 30 * s) / (unit * 1.12)), gap = (H - 30 * s - n * unit) / Math.max(1, n - 1);
    const column = (x: number): SceneNode[] => Array.from({ length: n }, (_, i) => g({ x, y: 15 * s + i * (unit + gap) }, tatreezUnit(i % 3 === 1 ? "rose" : "cypress", unit, [p.accent, p.accent2])));
    const y = (k: number) => 15 * s + (H - 30 * s) * k;
    return scene(W, H, p.paper,
      g({ x: -b, y: 5 * s }, tatreezBand("chain", W + 2 * b, 5 * s, [p.accent, p.accent2])),
      g({ x: -b, y: H - 10 * s }, tatreezBand("chain", W + 2 * b, 5 * s, [p.accent, p.accent2])),
      column(m), column(W - m - unit),
      line(val(ctx, "opening"), cx, y(0.09), 4.2 * s, { font: "amiri", fill: p.accent2, maxWidth: max }),
      line(val(ctx, "invite"), cx, y(0.2), 5 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, y(0.36), 17 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, y(0.43), 7 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, y(0.55), 17 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      g({ x: cx - 3.5 * s, y: y(0.6) }, tatreezUnit("diamond", 7 * s, [p.accent2, p.accent])),
      line(val(ctx, "date"), cx, y(0.74), 5.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "time"), cx, y(0.8), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, y(0.86), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, y(0.95), 4.2 * s, { font: "amiri", weight: 700, fill: p.accent2 === inks.olive ? p.accent : p.accent2, maxWidth: max }),
    );
  },
};
export default t;
