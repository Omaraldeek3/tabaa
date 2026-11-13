import { oliveBranch, oliveWreath, rings, tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const oliveWreathInvite: Template = {
  id: "wedding-olive-wreath",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بإكليل الزيتون", en: "Olive wreath wedding invitation" },
  note: { ar: "دعوة هادئة: خاتمان داخل إكليل زيتون، والاسمان على سطر واحد. تناسب الأعراس الصيفية في البساتين.", en: "A calm invitation: two rings inside an olive wreath and both names on one line. Suits summer weddings in the orchard." },
  tags: ["زفاف", "عرس", "زيتون", "إكليل", "هادئ", "wedding", "olive"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("grove", "كرم", "Grove", inks.ivory, inks.oliveDark, inks.olive, inks.goldDeep, inks.sage),
    pal("sand", "رمل", "Sand", inks.sand, inks.black, inks.oliveDark, inks.terracotta, inks.grey),
    pal("blush", "خوخ", "Blush", inks.blush, inks.burgundy, inks.olive, inks.rose, inks.rose),
    pal("deep", "عميق", "Deep", inks.oliveDark, inks.ivory, inks.sage, inks.gold, inks.olive),
  ],
  fonts: ["amiri", "arefruqaa", "lateef", "reemkufi"],
  fields: [
    { id: "opening", kind: "text", label: { ar: "الافتتاح", en: "Opening" }, sample: "ومن آياته أن خلق لكم من أنفسكم أزواجاً" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "كريم", maxLength: 18 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "سلمى", maxLength: 18 },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "يسعدنا حضوركم لمشاركتنا فرحة العمر" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "السبت ٢٤ تموز ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "السادسة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "بستان الزيتون، جنين" },
    { id: "families", kind: "text", label: { ar: "العائلتان", en: "Families" }, sample: "عائلة الصالح · عائلة حمدان" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette;
    const s = Math.min(W / 148, H / 210), v = H / 210, cx = W / 2, max = W - 32 * s;
    const wy = 52 * v, r = Math.min(27 * s, wy - 14 * s);
    const names = [val(ctx, "groom"), val(ctx, "bride")].filter(Boolean).join("  و  ");
    return scene(W, H, p.paper,
      rect(8 * s, 8 * s, W - 16 * s, H - 16 * s, { fill: null, stroke: p.accent2, strokeWidth: 0.3 * s }),
      rect(10 * s, 10 * s, W - 20 * s, H - 20 * s, { fill: null, stroke: p.accent2, strokeWidth: 0.12 * s }),
      g({ x: cx, y: wy }, oliveWreath(r, p.accent, p.ink, { leaves: 13, open: 34 }), rings(r * 0.95, p.accent2)),
      line(val(ctx, "opening"), cx, wy + r + 17 * v, 4.6 * s, { font: "amiri", fill: p.accent2, maxWidth: max }),
      line(names, cx, wy + r + 43 * v, 21 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      g({ x: cx - 30 * s, y: wy + r + 51 * v }, tatreezBand("dots", 60 * s, 1 * s, [p.accent2])),
      line(val(ctx, "invite"), cx, wy + r + 65 * v, 5.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, wy + r + 82 * v, 7.4 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
      line([val(ctx, "time"), val(ctx, "venue")].filter(Boolean).join("  ·  "), cx, wy + r + 92 * v, 5.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      g({ x: cx - 34 * s, y: H - 26 * v, scaleX: -1 }, oliveBranch(20 * s, p.accent, null, { leaves: 6 })),
      g({ x: cx + 34 * s, y: H - 26 * v }, oliveBranch(20 * s, p.accent, null, { leaves: 6 })),
      line(val(ctx, "families"), cx, H - 24.5 * v, 4.6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: 60 * s }),
    );
  },
};

export default oliveWreathInvite;
