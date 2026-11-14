import { dotField, doubleFrame, flourishRule, khatamPath, rings } from "../../lib/motifs/index.ts";
import { g, path, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-star-lattice",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بشبكة النجوم", en: "Star lattice wedding invitation" },
  note: { ar: "ثلث علوي من نجوم مثمّنة متراصّة كبلاط البيوت القديمة، وتحته النص على أرضية هادئة.", en: "The top third is tiled with eight-pointed stars like old house floors; the text sits below on calm ground." },
  tags: ["زفاف", "عرس", "نجمة", "بلاط", "هندسي", "wedding", "geometric"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("tile", "بلاط", "Tile", inks.paper, inks.navy, inks.teal, inks.mustard, inks.sand),
    pal("rose", "ورد", "Rose", inks.blush, inks.burgundy, inks.rose, inks.gold, inks.paper),
    pal("moss", "طحلب", "Moss", inks.ivory, inks.oliveDark, inks.olive, inks.terracotta, inks.sage),
  ],
  fonts: ["amiri", "arefruqaa", "reemkufi", "lateef"],
  fields: [
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "يسرّنا دعوتكم لحضور حفل زفاف" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "باسل", maxLength: 18 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "رزان", maxLength: 18 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "السبت ٣ تموز ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "الثامنة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "فندق الواحة، أريحا" },
    { id: "families", kind: "text", label: { ar: "العائلتان", en: "Families" }, sample: "آل النتشة وآل القواسمي" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 210), max = W - 30 * s, top = H * 0.34, cell = W / 6;
    const tiles: SceneNode[] = [];
    for (let r = -1; r * cell < top + cell; r++) for (let c = 0; c <= 6; c++)
      tiles.push(g({ x: c * cell, y: r * cell + cell / 2 }, path(khatamPath(cell * 0.46), { fill: (r + c) % 2 ? p.accent2 : p.paper })));
    const y = (k: number) => top + (H - top) * k;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      dotField(0, H * 0.4, W, H * 0.6, 5 * z, 0.4 * z, p.accent2, { fade: "up", opacity: 0.25 }),
      rect(-b, -b, W + 2 * b, top + b, { fill: p.accent }), tiles,
      rect(-b, top, W + 2 * b, H - top + b, { fill: p.paper }), rect(-b, top, W + 2 * b, 1.6 * s, { fill: p.accent2 }),
      g({ x: cx, y: top }, path(khatamPath(13 * s), { fill: p.paper }), path(khatamPath(11.4 * s), { fill: null, stroke: p.accent2, strokeWidth: 0.35 * s }), rings(15 * s, p.accent)),
      line(val(ctx, "invite"), cx, y(0.2), 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["groom", "bride"], "  و  "), cx, y(0.42), 21 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      rect(cx - 16 * s, y(0.5), 32 * s, 0.3 * s, { fill: p.accent2 }),
      line(val(ctx, "date"), cx, y(0.62), 6.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, y(0.72), 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, y(0.86), 4.8 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
      doubleFrame(8 * z, H * 0.4, W - 16 * z, H * 0.6 - 8 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "khatam", r: 2.4 * z }),
      flourishRule(W / 2, H * 0.71, W * 0.36, p.accent2, z * 0.8),
    );
  },
};
export default t;
