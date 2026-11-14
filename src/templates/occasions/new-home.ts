import { archPath, dotField, doubleFrame, key, starTile, tatreezBand } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-new-home",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة مباركة البيت الجديد", en: "New home invitation" },
  note: { ar: "مفتاح قديم معلّق في باب بقوس: دعوة لمباركة بيت جديد، أو بطاقة تهنئة لمن سكن بيته.", en: "An old key hanging in an arched doorway: an invitation to bless a new home, or a card for someone who has just moved in." },
  tags: ["بيت جديد", "مباركة", "منزل", "مفتاح", "سكن", "housewarming", "home"],
  sizes: [sizes.a6, sizes.a5, sizes.square12],
  palettes: [
    pal("door", "باب", "Door", inks.paper, inks.black, inks.teal, inks.terracotta, inks.sand),
    pal("stone", "حجر", "Stone", inks.sand, inks.black, inks.oliveDark, inks.red, inks.paper),
    pal("blue", "أزرق", "Blue", inks.ivory, inks.navy, inks.navy, inks.goldDeep, inks.sky),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "amiri"],
  fields: [
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "مبارك البيت الجديد", maxLength: 26 },
    { id: "invite", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "البيت بيتكم، شرّفونا على فنجان قهوة" },
    { id: "family", kind: "text", label: { ar: "العائلة", en: "Family" }, sample: "عائلة أبو غوش" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الجمعة ٢ نيسان" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "بعد صلاة العصر" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "حي الطيرة، عمارة الزيتونة، الطابق الثالث" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 20 * s, dw = 40 * s, dh = H * 0.4, dy = H * 0.07, y = (k: number) => dy + dh + (H - dy - dh) * k;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H * 0.36, 8 * z, 1 * z, p.ink, 0.06),
      dotField(0, H * 0.45, W, H * 0.55, 4 * z, 0.35 * z, p.accent2, { fade: "up", opacity: 0.2 }),
      rect(-b, -b, W + 2 * b, dy + dh + b, { fill: p.soft }),
      g({ x: cx - dw / 2 - 3 * s, y: dy - 3 * s }, path(archPath(dw + 6 * s, dh + 3 * s, 0.66), { fill: p.paper })),
      g({ x: cx - dw / 2, y: dy }, path(archPath(dw, dh, 0.66), { fill: p.accent })),
      rect(cx - 0.25 * s, dy + dh * 0.3, 0.5 * s, dh * 0.7, { fill: p.paper, opacity: 0.5 }),
      g({ x: cx, y: dy + dh * 0.34, rotate: 90 }, key(dh * 0.46, inks.mustard)),
      g({ x: -b, y: dy + dh }, tatreezBand("zigzag", W + 2 * b, 4.6 * s, [p.ink, p.accent2])),
      line(val(ctx, "title"), cx, y(0.25), 13 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "invite"), cx, y(0.39), 4.6 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "family"), cx, y(0.52), 6.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      rect(cx - 10 * s, y(0.58), 20 * s, 0.3 * s, { fill: p.accent2 }),
      line(joined(ctx, ["date", "time"]), cx, y(0.7), 5 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "address"), cx, y(0.8), 4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      doubleFrame(5 * z, H * 0.41, W - 10 * z, H * 0.59 - 5 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.35 * z, thin: 0.15 * z, corner: "diamond", r: 2 * z }),
    );
  },
};
export default t;
