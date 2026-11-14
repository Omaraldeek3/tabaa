import { dotField, guillocheNode, keffiyeh, khatamPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const modernKufi: Template = {
  id: "wedding-modern-kufi",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف عصرية بالكوفي", en: "Modern Kufi wedding invitation" },
  note: { ar: "دعوة عصرية بلوحة لون كبيرة: الاسمان بحرف كوفي عريض، والتاريخ بأرقام كبيرة في شريط سفلي.", en: "A modern invitation with a large colour panel: both names in heavy Kufi and the date in large numerals along the foot." },
  tags: ["زفاف", "عرس", "عصري", "كوفي", "بسيط", "wedding", "modern"],
  sizes: [sizes.square15, sizes.a5, sizes.a6],
  palettes: [
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.black, inks.sand),
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.olive, inks.mustard, inks.sage),
    pal("sea", "بحر", "Sea", inks.white, inks.navy, inks.teal, inks.mustard, inks.sky),
    pal("ink", "حبر", "Ink", inks.paper, inks.black, inks.black, inks.red, inks.sand),
  ],
  fonts: ["kufam", "reemkufi", "cairo", "lalezar"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "حفل زفاف", maxLength: 24 },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "عمر", maxLength: 16 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "دانة", maxLength: 16 },
    { id: "date", kind: "text", label: { ar: "التاريخ بالأرقام", en: "Date in numerals" }, sample: "١٨ . ٠٩ . ٢٠٢٧", maxLength: 20 },
    { id: "day", kind: "text", label: { ar: "اليوم والوقت", en: "Day and time" }, sample: "السبت، السابعة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "حديقة البيارة، أريحا" },
    { id: "note", kind: "text", label: { ar: "ملاحظة", en: "Note" }, sample: "حضوركم يكمل فرحتنا" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 0.5;
    const s = Math.min(W / 150, H / 150), m = 12 * s, right = W - m, max = W - 2 * m;
    const panelH = H * 0.6, stripe = 7 * s, foot = H - panelH - stripe;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      guillocheNode(0, 0, W, H * 0.6, p.paper, { waves: 8, amp: 1.4 * z, period: 18 * z, width: 0.15 * z, opacity: 0.12 }),
      dotField(0, H * 0.72, W, H * 0.28, 5 * z, 0.5 * z, p.accent, { fade: "up", opacity: 0.25 }),
      rect(-b, -b, W + 2 * b, panelH + b, { fill: p.accent }),
      g({ x: -b, y: panelH }, rect(0, 0, W + 2 * b, stripe, { fill: p.ink }), g({ opacity: 0.5 }, keffiyeh(W + 2 * b, stripe, stripe / 2, p.paper, 0.12))),
      g({ x: m + 7 * s, y: m + 7 * s }, path(khatamPath(7 * s), { fill: null, stroke: inks.paper, strokeWidth: 0.4 * s }), path(khatamPath(2.6 * s), { fill: p.accent2 })),
      line(val(ctx, "kicker"), right, m + 9 * s, 6 * s, { font: "tajawal", weight: 700, fill: inks.paper, align: "start", maxWidth: max - 22 * s }),
      line(val(ctx, "groom"), right, panelH * 0.52, 30 * s, { font: ctx.font, weight: 800, fill: inks.paper, align: "start", maxWidth: max - 22 * s }),
      line(val(ctx, "bride"), right, panelH * 0.9, 30 * s, { font: ctx.font, weight: 800, fill: p.accent2 === inks.black ? inks.black : p.accent2, align: "start", maxWidth: max }),
      line("و", m, panelH * 0.52, 18 * s, { font: ctx.font, weight: 800, fill: inks.paper, align: "end", safe: false }),
      line(val(ctx, "date"), right, panelH + stripe + foot * 0.4, 13 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max * 0.56 }),
      line(val(ctx, "day"), m, panelH + stripe + foot * 0.28, 5 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "end", maxWidth: max * 0.4 }),
      line(val(ctx, "venue"), m, panelH + stripe + foot * 0.44, 5 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "end", maxWidth: max * 0.4 }),
      rect(m, panelH + stripe + foot * 0.58, max, 0.4 * s, { fill: p.ink }),
      line(val(ctx, "note"), right, panelH + stripe + foot * 0.8, 5 * s, { font: "tajawal", weight: 500, fill: p.accent === inks.black ? p.accent2 : p.accent, align: "start", maxWidth: max }),
    );
  },
};

export default modernKufi;
