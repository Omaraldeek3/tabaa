import { archPath, crescentPath, jerusalem, starPath } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const jerusalemArch: Template = {
  id: "wedding-jerusalem-arch",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بقوس مقدسي", en: "Jerusalem arch wedding invitation" },
  note: { ar: "دعوة فاخرة داكنة: النص داخل قوس مدبّب بخطين ذهبيين، وأفق القدس عند قاعدته. تطبع جميلة بحبر ذهبي أو على ورق أسود.", en: "A dark, formal invitation: the text sits in a pointed arch drawn in two gold lines, with the Jerusalem skyline at its foot. Lovely in gold ink or on black stock." },
  tags: ["زفاف", "عرس", "القدس", "قوس", "ذهبي", "فاخر", "wedding", "jerusalem"],
  sizes: [sizes.a5, sizes.dl, sizes.invite],
  palettes: [
    pal("gold", "ذهب", "Gold", inks.charcoal, inks.paper, inks.gold, inks.goldDeep, inks.black),
    pal("navy", "كحلي", "Navy", inks.night, inks.ivory, inks.gold, inks.goldDeep, inks.navy),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.paper, inks.gold, inks.goldDeep, inks.black),
    pal("stone", "حجر", "Stone", inks.ivory, inks.black, inks.goldDeep, inks.gold, inks.sand),
  ],
  fonts: ["arefruqaa", "amiri", "rakkas", "reemkufi"],
  fields: [
    { id: "opening", kind: "text", label: { ar: "الافتتاح", en: "Opening" }, sample: "بسم الله الرحمن الرحيم" },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "نتشرّف بدعوتكم لحضور زفاف" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "أحمد", maxLength: 22 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "نور", maxLength: 22 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الخميس ٥ آب ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "الثامنة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "قاعة القصر، بيت لحم" },
    { id: "families", kind: "text", label: { ar: "العائلتان", en: "Families" }, sample: "آل عودة وآل منصور" },
  ],
  safeMm: 6,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 0.5;
    const s = Math.min(W / 148, H / 210), cx = W / 2, m = 12 * s;
    const aw = W - 2 * m, top = m + 4 * s, ah = H - top - m - 14 * s, inner = 3 * s;
    const max = aw - 26 * s, skyH = Math.min(aw * 0.3, ah * 0.2), baseY = top + ah;
    const stars: SceneNode[] = [[-0.22, 0.2], [0.2, 0.16], [-0.3, 0.33], [0.3, 0.3], [0, 0.11]].map(([x, y]) => g({ x: cx + x * aw, y: top + y * ah }, path(starPath(4, 1.5 * s, 0.45 * s), { fill: p.accent, opacity: 0.8 })));
    // Text starts below the arch's shoulders, where it is at full width.
    const y0 = top + Math.min(ah * 0.3, aw * 0.5), step = (baseY - skyH - 8 * s - y0) / 100;
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      g({ x: m, y: top }, path(archPath(aw, ah, 0.74), { fill: null, stroke: p.accent, strokeWidth: 0.55 * s })),
      g({ x: m + inner, y: top + inner * 1.5 }, path(archPath(aw - 2 * inner, ah - inner * 1.5, 0.74), { fill: null, stroke: p.accent, strokeWidth: 0.18 * s })),
      stars,
      g({ x: cx, y: top + ah * 0.2, rotate: -90 }, path(crescentPath(4.2 * s, 0.5), { fill: p.accent })),
      g({ x: m + inner + 0.2 * s, y: baseY - skyH }, jerusalem(aw - 2 * inner - 0.4 * s, skyH, p.accent2, p.accent, p.paper)),
      line(val(ctx, "opening"), cx, y0, 4.8 * s, { font: "amiri", fill: p.accent, maxWidth: max * 0.7 }),
      line(val(ctx, "invite"), cx, y0 + 13 * step, 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.85 }),
      line(val(ctx, "groom"), cx, y0 + 37 * step, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line("و", cx, y0 + 48 * step, 7 * s, { font: "amiri", fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, y0 + 66 * step, 22 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      rect(cx - 16 * s, y0 + 74 * step, 32 * s, 0.25 * s, { fill: p.accent }),
      line(val(ctx, "date"), cx, y0 + 85 * step, 6.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line([val(ctx, "time"), val(ctx, "venue")].filter(Boolean).join("  ·  "), cx, y0 + 95 * step, 5 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, H - m - 2 * s, 5 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: aw }),
    );
  },
};

export default jerusalemArch;
