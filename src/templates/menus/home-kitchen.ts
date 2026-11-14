import { dotField, oliveBranch, tatreezFrame } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-home-kitchen",
  category: "menus",
  lang: "ar",
  title: { ar: "قائمة طبخات اليوم", en: "Dish of the day menu" },
  note: { ar: "ورقة صغيرة بإطار تطريز لطبخات الأسبوع: مسخّن ومقلوبة ومفتول. للمطابخ البيتية ومطاعم الأكل البلدي.", en: "A small sheet in a tatreez frame for the week's home dishes: musakhan, maqluba and maftoul. For home kitchens and country-food restaurants." },
  tags: ["قائمة", "منيو", "طبخ بيتي", "مسخن", "مقلوبة", "بلدي", "طبخة اليوم", "menu", "home cooking"],
  sizes: [sizes.a5, sizes.a4],
  palettes: [
    pal("taboon", "طابون", "Taboon", inks.paper, inks.black, inks.terracotta, inks.olive, inks.sand),
    pal("sumac", "سمّاق", "Sumac", inks.ivory, inks.burgundy, inks.burgundy, inks.goldDeep, inks.blush),
    pal("zaatar", "زعتر", "Zaatar", inks.ivory, inks.oliveDark, inks.olive, inks.terracotta, inks.sage),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri", "lalezar"],
  fields: [
    { id: "name", kind: "text", label: { ar: "اسم المطبخ", en: "Kitchen name" }, sample: "مطبخ ستّي", maxLength: 24 },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "طبخات هذا الأسبوع" },
    { id: "list", kind: "list", label: { ar: "الطبخات", en: "Dishes" }, columns: [{ ar: "اليوم والطبخة", en: "Day and dish" }, { ar: "السعر", en: "Price" }], maxRows: 7,
      sample: [["السبت: مسخّن", "٣٥"], ["الأحد: مقلوبة باذنجان", "٣٠"], ["الاثنين: مفتول", "٣٠"], ["الثلاثاء: ملوخية", "٢٨"], ["الأربعاء: منسف", "٤٥"], ["الخميس: محاشي", "٣٥"]] },
    { id: "note", kind: "text", label: { ar: "ملاحظة", en: "Note" }, sample: "الوجبة تكفي شخصين · مع سلطة ولبن" },
    { id: "contact", kind: "text", label: { ar: "للطلب", en: "To order" }, sample: "اطلب قبل ١١ صباحاً · ٠٥٦٨ ٥٥٥ ٦٦٦" },
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, v, s, cx } = dims(ctx, 148, 210), inset = 6 * s, band = 7 * s, m = inset + band + 9 * s, top = 78 * v, pitch = Math.min(14.5 * v, (H - top - 52 * v) / 7);
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      dotField(14 * z, 14 * z, W - 28 * z, H - 28 * z, 5 * z, 0.35 * z, p.accent, { opacity: 0.1 }),
      g({ x: inset, y: inset }, tatreezFrame(W - 2 * inset, H - 2 * inset, band, [p.accent, p.accent2], { style: "stars" })),
      line(val(ctx, "name"), cx, 42 * v, 17 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: W - 2 * m }),
      g({ x: cx - 16 * s, y: 51 * v }, oliveBranch(32 * s, p.accent2, null, { leaves: 9, bend: 0.06 })),
      line(val(ctx, "title"), cx, 64 * v, 6 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: W - 2 * m }),
      priceList(ctx, "list", { nameX: W - m, priceX: m, top: top + 4 * v, pitch, size: 6 * s, max: 7, ink: p.ink, priceInk: p.accent, rule: p.soft }),
      rect(cx - 14 * s, H - 46 * v, 28 * s, 0.4 * s, { fill: p.accent2 }),
      line(val(ctx, "note"), cx, H - 37 * v, 4.4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: W - 2 * m }),
      line(val(ctx, "contact"), cx, H - 28 * v, 5 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.goldDeep ? p.accent : p.accent2, maxWidth: W - 2 * m }),
    );
  },
};
export default t;
