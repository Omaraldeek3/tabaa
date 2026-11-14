import { dotField, khatamPath, oliveWreath, tatreezBand } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-seasons-wreath",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة «كل عام وأنتم بخير»", en: "Season's greetings wreath card" },
  note: { ar: "إكليل زيتون كبير يحيط بالتهنئة، وشريطا تطريز أعلى وأسفل. لرأس السنة والأعياد كلها ولتهاني الشركات.", en: "A large olive wreath round the greeting, with tatreez bands at head and foot. For the new year, every feast, and company greetings." },
  tags: ["كل عام وأنتم بخير", "رأس السنة", "أعياد", "ميلاد", "تهنئة", "شركات", "greetings", "new year"],
  sizes: [sizes.square12, sizes.a6, sizes.a5],
  palettes: [
    pal("olive", "زيتون", "Olive", inks.ivory, inks.oliveDark, inks.olive, inks.red, inks.goldDeep),
    pal("snow", "ثلج", "Snow", inks.navy, inks.ivory, inks.sage, inks.gold, inks.gold),
    pal("berry", "توت", "Berry", inks.burgundy, inks.paper, inks.sage, inks.gold, inks.gold),
  ],
  fonts: ["arefruqaa", "amiri", "rakkas", "reemkufi"],
  fields: [
    { id: "title", kind: "text", label: { ar: "التهنئة", en: "Greeting" }, sample: "كل عام وأنتم بخير", maxLength: 26 },
    { id: "year", kind: "text", label: { ar: "السنة أو المناسبة", en: "Year or occasion" }, sample: "٢٠٢٨", maxLength: 16 },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "عام خير وسلام وحرية" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "أسرة مطبعة النور" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 120, 120), band = 6 * s, r = Math.min(W * 0.36, (H - 2 * band) * 0.3), cy = band + 10 * s + r * 1.02, max = W - 22 * s;
    const y = (k: number) => cy + r * 1.1 + (H - band - cy - r * 1.1) * k;
    const z = Math.min(W, H) / 120;
    return scene(W, H, p.paper,
      dotField(14 * z, 14 * z, W - 28 * z, H - 28 * z, 5 * z, 0.35 * z, p.accent, { opacity: 0.1 }),
      g({ x: -b, y: -b }, tatreezBand("chain", W + 2 * b, band + b, [p.accent2, p.accent])),
      g({ x: -b, y: H - band }, tatreezBand("chain", W + 2 * b, band + b, [p.accent2, p.accent])),
      g({ x: cx, y: cy }, oliveWreath(r, p.accent, p.accent2, { leaves: 14, open: 30 })),
      g({ x: cx, y: cy - r * 0.42 }, path(khatamPath(2.4 * s), { fill: p.accent2 })),
      line(val(ctx, "title"), cx, cy + r * 0.08, 10.5 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: r * 1.5 }),
      line(val(ctx, "year"), cx, cy + r * 0.44, 8.6 * s, { font: "tajawal", weight: 800, fill: p.soft, maxWidth: r * 1.1 }),
      line(val(ctx, "message"), cx, y(0.36), 5 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, y(0.72), 4.4 * s, { font: "amiri", weight: 700, fill: p.soft === inks.goldDeep ? p.accent2 : p.soft, maxWidth: max }),
      [[10, H / z * 0.5], [W / z - 10, H / z * 0.5]].map(([x, y]) => g({ x: x * z, y: y * z }, path(khatamPath(2.4 * z), { fill: p.accent }), circle(0, 0, 0.8 * z, { fill: p.paper }))),
    );
  },
};
export default t;
