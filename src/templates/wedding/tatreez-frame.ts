import { khatamPath, tatreezBand, tatreezFrame } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const tatreezFrameInvite: Template = {
  id: "wedding-tatreez-frame",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بإطار تطريز", en: "Tatreez frame wedding invitation" },
  note: { ar: "دعوة كلاسيكية يحيط بها إطار تطريز فلاحي، تناسب الطباعة على ورق مقوّى ٣٠٠ غرام.", en: "A classic invitation inside a fallahi cross-stitch frame; prints well on 300 gsm card." },
  tags: ["زفاف", "عرس", "تطريز", "فلسطيني", "كلاسيكي", "wedding", "tatreez"],
  sizes: [sizes.a5, sizes.invite, sizes.a6],
  palettes: [
    pal("thobe", "ثوب", "Thobe", inks.paper, inks.black, inks.red, inks.black, inks.sand),
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.olive, inks.goldDeep, inks.sage),
    pal("night", "ليل", "Night", inks.charcoal, inks.paper, inks.gold, inks.paper, inks.goldDeep),
    pal("rose", "ورد", "Rose", inks.blush, inks.burgundy, inks.rose, inks.burgundy, inks.rose),
  ],
  fonts: ["arefruqaa", "amiri", "lateef", "reemkufi", "rakkas"],
  fields: [
    { id: "opening", kind: "text", label: { ar: "الافتتاح", en: "Opening" }, sample: "بسم الله الرحمن الرحيم" },
    { id: "hosts", kind: "text", label: { ar: "أصحاب الدعوة", en: "Hosts" }, sample: "آل الخطيب وآل النجّار" },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "يتشرّفون بدعوتكم لحضور حفل زفاف" },
    { id: "groom", kind: "text", label: { ar: "العريس", en: "Groom" }, sample: "يوسف", maxLength: 24 },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "ليلى", maxLength: 24 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ١٢ حزيران ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "الساعة السابعة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "قاعة الياسمين، نابلس" },
    { id: "closing", kind: "text", label: { ar: "الختام", en: "Closing" }, sample: "دامت دياركم عامرة بالأفراح" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette;
    const u = W / 148, v = H / 210, s = Math.min(u, v), cx = W / 2;
    const inset = 7 * s, band = 8.4 * s, max = W - 2 * (inset + band + 6 * s);
    const body = "amiri";
    const bandLen = 58 * s;
    return scene(W, H, p.paper,
      g({ x: inset, y: inset }, tatreezFrame(W - 2 * inset, H - 2 * inset, band, [p.accent, p.accent2])),
      g({ x: cx, y: 34 * v }, path(khatamPath(4.2 * s), { fill: p.accent }), path(khatamPath(1.8 * s), { fill: p.paper })),
      line(val(ctx, "opening"), cx, 50 * v, 5.4 * s, { font: body, fill: p.ink, maxWidth: max }),
      line(val(ctx, "hosts"), cx, 65 * v, 7 * s, { font: body, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "invite"), cx, 76 * v, 5.2 * s, { font: body, fill: p.ink, maxWidth: max }),
      line(val(ctx, "groom"), cx, 100 * v, 19 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      rect(cx - 22 * s, 110.2 * v, 15 * s, 0.3 * s, { fill: p.soft }), rect(cx + 7 * s, 110.2 * v, 15 * s, 0.3 * s, { fill: p.soft }),
      line("و", cx, 113.5 * v, 9 * s, { font: body, weight: 700, fill: p.ink, safe: false }),
      line(val(ctx, "bride"), cx, 136 * v, 19 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      g({ x: cx - bandLen / 2, y: 145 * v }, tatreezBand("chain", bandLen, 4.6 * s, [p.accent, p.accent2])),
      line(val(ctx, "date"), cx, 162 * v, 6.4 * s, { font: body, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "time"), cx, 171 * v, 5.2 * s, { font: body, fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, 180 * v, 5.6 * s, { font: body, fill: p.ink, maxWidth: max }),
      line(val(ctx, "closing"), cx, 189.5 * v, 4.4 * s, { font: body, fill: p.accent, maxWidth: max }),
    );
  },
};

export default tatreezFrameInvite;
