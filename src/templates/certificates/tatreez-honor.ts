import { khatamPath, oliveBranch, scallopPath, tatreezBand, tatreezFrame } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const tatreezHonor: Template = {
  id: "certificates-tatreez-honor",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة شكر وتقدير بإطار تطريز", en: "Tatreez certificate of appreciation" },
  note: { ar: "شهادة عرضية بإطار نجوم مطرّزة وختم ذهبي وتوقيعين. للمدارس والجمعيات والنوادي.", en: "A landscape certificate with a stitched star frame, a gold seal and two signatures. For schools, societies and clubs." },
  tags: ["شهادة", "شكر", "تقدير", "تكريم", "مدرسة", "certificate"],
  sizes: [sizes.a4l],
  palettes: [
    pal("thobe", "ثوب", "Thobe", inks.ivory, inks.black, inks.red, inks.goldDeep, inks.grey),
    pal("olive", "زيتون", "Olive", inks.paper, inks.oliveDark, inks.olive, inks.goldDeep, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.navy, inks.goldDeep, inks.grey),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi", "rakkas"],
  fields: [
    { id: "org", kind: "text", label: { ar: "الجهة", en: "Organisation" }, sample: "جمعية الشباب الثقافية · القدس" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "شهادة شكر وتقدير", maxLength: 30 },
    { id: "lead", kind: "text", label: { ar: "تمهيد", en: "Lead-in" }, sample: "تتشرّف الجمعية بمنح هذه الشهادة إلى" },
    { id: "name", kind: "text", label: { ar: "الاسم", en: "Recipient" }, sample: "مريم عبد الرحمن القاسم", maxLength: 40 },
    { id: "reason", kind: "multiline", label: { ar: "السبب", en: "Reason" }, sample: "تقديراً لجهودها المتميزة في تنظيم معرض التراث الفلسطيني السنوي\nمتمنّين لها دوام العطاء والنجاح", maxLines: 3 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "حُرّرت في ٣٠ أيار ٢٠٢٧" },
    { id: "sign1", kind: "text", label: { ar: "التوقيع الأول", en: "First signature" }, sample: "رئيس الجمعية" },
    { id: "sign2", kind: "text", label: { ar: "التوقيع الثاني", en: "Second signature" }, sample: "منسّق النشاط" },
  ],
  safeMm: 8,
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, cx = W / 2;
    const inset = 9, band = 10, max = W - 2 * (inset + band + 16), body = "amiri";
    const sign = (label: string, x: number) => label ? [rect(x - 30, 177, 60, 0.35, { fill: p.ink }), line(label, x, 184, 4.8, { font: body, fill: p.ink, maxWidth: 60 })] : [];
    return scene(W, H, p.paper,
      g({ x: inset, y: inset }, tatreezFrame(W - 2 * inset, H - 2 * inset, band, [p.accent, p.accent2], { style: "stars" })),
      line(val(ctx, "org"), cx, 40, 5.4, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 67, 24, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max * 0.82 }),
      g({ x: cx - 45, y: 73 }, tatreezBand("chain", 90, 4.4, [p.accent2, p.accent])),
      line(val(ctx, "lead"), cx, 92, 6.2, { font: body, fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 114, 17, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max * 0.8 }),
      g({ x: cx - 96, y: 112, scaleX: -1 }, oliveBranch(28, p.accent2, null, { leaves: 7 })),
      g({ x: cx + 96, y: 112 }, oliveBranch(28, p.accent2, null, { leaves: 7 })),
      stack(linesOf(val(ctx, "reason"), 3), cx, 131, 5.8, 9, { font: body, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, 163, 4.6, { font: body, fill: p.soft, maxWidth: 70 }),
      sign(val(ctx, "sign1"), W - 78), sign(val(ctx, "sign2"), 78),
      g({ x: cx, y: 180 }, path(scallopPath(11, 18), { fill: p.accent2 }), path(khatamPath(7.4), { fill: p.paper }), path(khatamPath(5.2), { fill: p.accent }), path(khatamPath(2), { fill: inks.ivory })),
    );
  },
};

export default tatreezHonor;
