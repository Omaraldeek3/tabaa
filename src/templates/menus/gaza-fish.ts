import { beadRule, dotField, fish } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-gaza-fish",
  category: "menus",
  lang: "ar",
  title: { ar: "منيو مطعم سمك على البحر", en: "Seafood restaurant menu" },
  note: { ar: "سرب من الأسماك يسبح في رأس المنيو فوق موجات متكرّرة، والأصناف بالكيلو تحت. لمطاعم السمك ومحلات الصيّادين على شاطئ غزة ويافا وعكا.", en: "A shoal of fish swims across the head of the menu over rolling waves, with the catch priced by the kilo below. For fish restaurants and fishmongers by the sea." },
  tags: ["منيو", "سمك", "بحر", "غزة", "مأكولات بحرية", "صيادين", "fish"],
  sizes: [sizes.a4, sizes.a3],
  palettes: [
    pal("sea", "بحر", "Sea", inks.ivory, inks.navy, inks.teal, inks.sky, inks.sky),
    pal("deep", "عميق", "Deep", inks.navy, inks.ivory, inks.sky, inks.orange, inks.teal),
    pal("sand", "رمل", "Sand", inks.sand, inks.navy, inks.terracotta, inks.teal, inks.ivory),
  ],
  fonts: ["lalezar", "rakkas", "reemkufi"],
  fields: [
    tf("name", "اسم المطعم", "Restaurant name", "مطعم الصيّاد", 18),
    tf("tagline", "الشعار", "Tagline", "من مركب الصيد إلى صحنك"),
    priced("list", "الأصناف", "Items", [["لوكس مشوي (كيلو)", "٨٠"], ["بوري مقلي (كيلو)", "٦٠"], ["سردين (كيلو)", "٣٥"], ["قريدس بالثوم", "٧٠"], ["صيادية سمك", "٤٥"], ["زبدية جمبري غزاوية", "٥٥"], ["سلطة دقّة", "٨"]], 9),
    tf("footer", "التذييل", "Footer", "شارع الرشيد على البحر، غزة"),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, u, v, cx } = dims(ctx, 210, 297), s = u, bandH = 96 * v, top = bandH + 52 * v;
    const waves = [0, 1, 2].map(k => `M${-b} ${bandH - 14 * v + k * 5 * v} ` + Array.from({ length: 30 }, (_, i) => `q${4 * s} ${-3 * v} ${8 * s} 0`).join(" ")).join(" ");
    const shoal = [[0.2, 0.32, 30, 1], [0.48, 0.22, 22, 0], [0.74, 0.36, 26, 1], [0.34, 0.56, 18, 0], [0.62, 0.6, 20, 1], [0.86, 0.18, 14, 0]];
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      dotField(0, H * 0.33, W, H * 0.67, 5 * z, 0.4 * z, p.accent, { fade: "down", opacity: 0.12 }),
      [0.06, 0.12, 0.18].map((y, i) => g({ x: 0, y: H * y + 4 * z }, path(`M0 0 ${Array.from({ length: 14 }, (_, k) => `Q${(k * 16 + 4) * z} ${-2 * z} ${(k * 16 + 8) * z} 0 T${(k + 1) * 16 * z} 0`).join(" ")}`, { fill: null, stroke: p.paper, strokeWidth: 0.3 * z, opacity: 0.25 - i * 0.05 }))),
      rect(-b, -b, W + 2 * b, bandH + b, { fill: p.accent }),
      shoal.map(([x, y, w, k]) => g({ x: W * x, y: bandH * y }, fish(w * s, k ? p.soft : p.paper, p.accent2, p.accent))),
      path(waves, { fill: null, stroke: p.paper, strokeWidth: 0.8 * s }),
      line(val(ctx, "name"), cx, bandH + 24 * v, 20 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 30 * s }),
      line(val(ctx, "tagline"), cx, bandH + 36 * v, 7 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: W - 30 * s }),
      priceList(ctx, "list", { nameX: W - 24 * s, priceX: 24 * s, top, pitch: Math.min(16 * v, (H - top - 26 * v) / 9), size: 8.4 * s, max: 9, ink: p.ink, priceInk: p.accent, rule: p.accent2 }),
      line(val(ctx, "footer"), cx, H - 14 * v, 5.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 30 * s }),
      beadRule(14 * z, W - 14 * z, H - 24 * z, p.accent, z, { bead: "dot", pitch: 4 }),
    );
  },
};
export default t;
