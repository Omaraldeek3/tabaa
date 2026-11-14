import { dotField, doubleFrame, flourishRule, studdedDoor } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { weddingAr } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-old-door",
  category: "wedding",
  lang: "ar",
  title: { ar: "دعوة زفاف بباب الدار القديم", en: "Old house door wedding invitation" },
  note: { ar: "باب خشبي مقوّس بمسامير نحاسية وسط جدار من الحجر، كأبواب البلدة القديمة. «بيتنا مفتوح لكم».", en: "An arched wooden door with brass studs set in a stone wall, like the doors of the old city: our house is open to you." },
  tags: ["زفاف", "عرس", "باب", "بلدة قديمة", "حجر", "بيت", "wedding", "door"],
  sizes: [sizes.a5, sizes.invite, sizes.dl],
  palettes: [
    pal("oak", "سنديان", "Oak", inks.sand, inks.black, inks.terracotta, inks.gold, inks.paper),
    pal("blue", "باب أزرق", "Blue door", inks.ivory, inks.navy, inks.teal, inks.gold, inks.sand),
    pal("green", "باب أخضر", "Green door", inks.paper, inks.oliveDark, inks.olive, inks.mustard, inks.sand),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: weddingAr({ invite: "بيتنا مفتوح لكم في فرح", groom: "طارق", bride: "هبة", venue: "دار العائلة، البلدة القديمة، نابلس", families: "آل طوقان وآل الشكعة" }),
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 148, 210), dw = Math.min(W * 0.36, H * 0.17), dh = dw * 1.55, floor = 10 * s + dh;
    const blocks: string[] = [], bh = 6 * s, bw = 14 * s;
    for (let j = 0; j * bh < floor + b; j++) for (let i = -1; i * bw < W + b; i++) blocks.push(`M${i * bw + (j % 2) * bw / 2 + 0.4 * s} ${-b + j * bh + 0.4 * s} h${bw - 0.8 * s} v${bh - 0.8 * s} h${-bw + 0.8 * s} Z`);
    const Y = (k: number) => floor + 16 * s + (H - floor - 26 * s) * k, max = W - 22 * s;
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      dotField(0, H * 0.4, W, H * 0.6, 5 * z, 0.4 * z, p.accent, { fade: "up", opacity: 0.25 }),
      rect(-b, -b, W + 2 * b, floor + b, { fill: p.soft }),
      path(blocks.join(" "), { fill: p.paper, opacity: 0.55 }),
      g({ x: cx - dw / 2 - 2.4 * s, y: 10 * s - 2.4 * s }, path(`M0 ${dh + 2.4 * s} V${dw / 2 + 2.4 * s} A${dw / 2 + 2.4 * s} ${dw / 2 + 2.4 * s} 0 0 1 ${dw + 4.8 * s} ${dw / 2 + 2.4 * s} V${dh + 2.4 * s} Z`, { fill: p.ink, opacity: 0.15 })),
      g({ x: cx - dw / 2, y: 10 * s }, studdedDoor(dw, dh, p.accent, p.accent2, p.ink)),
      rect(-b, floor, W + 2 * b, 2.4 * s, { fill: p.ink }), rect(cx - dw * 0.7, floor, dw * 1.4, 4 * s, { fill: p.ink }),
      line(val(ctx, "opening"), cx, Y(0), 4 * s, { font: "amiri", fill: p.accent, maxWidth: max * 0.75 }),
      line(val(ctx, "invite"), cx, Y(0.12), 4.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line([val(ctx, "groom"), val(ctx, "bride")].filter(Boolean).join(" و "), cx, Y(0.4), 13 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "date"), cx, Y(0.6), 5.4 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, Y(0.74), 4.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "families"), cx, Y(1), 4.6 * s, { font: "amiri", weight: 700, fill: p.accent, maxWidth: max }),
      doubleFrame(8 * z, H * 0.37, W - 16 * z, H * 0.63 - 8 * z, p.accent, p.paper, { gap: 2 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "khatam", r: 2.4 * z }),
      flourishRule(W / 2, H * 0.665, W * 0.4, p.accent, z),
    );
  },
};
export default t;
