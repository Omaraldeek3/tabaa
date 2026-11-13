/** Shared builder for the Palestinian city prints: each city brings its own
 *  landmark, palettes and words; the layout is one of four compositions. */
import { archPath } from "../lib/motifs/index.ts";
import { type GroupNode, g, path, rect, scene } from "../lib/scene.ts";
import type { Palette, Template } from "./types.ts";
import { tf } from "./fields.ts";
import { dims, inks, line, sizes, val } from "./kit.ts";

type Layout = "top" | "bottom" | "arch" | "band";
type Draw = (w: number, h: number, p: Palette) => GroupNode;

export function cityPrint(o: {
  slug: string; ar: string; en: string; noteAr: string; noteEn: string; tags: string[];
  nick: string; line: string; coords: string; palettes: Palette[]; fonts: string[]; layout: Layout; draw: Draw;
}): Template {
  return {
    id: `cities-${o.slug}`,
    category: "cities",
    lang: "ar",
    title: { ar: `لوحة ${o.ar}`, en: `${o.en} print` },
    note: { ar: o.noteAr, en: o.noteEn },
    tags: [o.ar, "مدن فلسطين", "لوحة", "فلسطين", "بوستر", "city", o.en.toLowerCase(), ...o.tags],
    sizes: [sizes.a3, sizes.a4, sizes.poster5070],
    palettes: o.palettes,
    fonts: o.fonts,
    fields: [
      tf("name", "اسم المدينة", "City", o.ar, 14),
      tf("nick", "اللقب", "Byname", o.nick),
      tf("line", "سطر", "Line", o.line),
      tf("coords", "الإحداثيات", "Coordinates", o.coords),
    ],
    safeMm: 12,
    render(ctx) {
      const { W, H, p, b, s, cx } = dims(ctx, 297, 420), max = W - 50 * s;
      // Pale accents (sand, sky...) are for the drawing; the byname needs a strong ink.
      const nickInk = [inks.sand, inks.ivory, inks.sky, inks.blush, inks.paper, inks.sage].includes(p.accent) ? p.ink : p.accent;
      const words = (nameY: number, nickY: number, lineY: number, coordY: number, size = 70) => [
        line(val(ctx, "name"), cx, nameY, size * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
        line(val(ctx, "nick"), cx, nickY, 11 * s, { font: "tajawal", weight: 800, fill: nickInk, maxWidth: max }),
        line(val(ctx, "line"), cx, lineY, 8.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
        line(val(ctx, "coords"), cx, coordY, 5.4 * s, { font: "inter", weight: 600, fill: p.soft, maxWidth: max, tracking: 1 * s }),
      ];
      if (o.layout === "top") return scene(W, H, p.paper,
        g({ x: 24 * s, y: 30 * s }, o.draw(W - 48 * s, H * 0.5, p)),
        words(H * 0.5 + 100 * s, H * 0.5 + 122 * s, H * 0.5 + 142 * s, H - 24 * s));
      if (o.layout === "bottom") return scene(W, H, p.paper,
        g({ x: -b, y: H * 0.46 }, o.draw(W + 2 * b, H * 0.54 + b, p)),
        words(110 * s, 134 * s, 154 * s, 28 * s, 76));
      if (o.layout === "arch") {
        const aw = W - 80 * s, ah = H * 0.56, ax = 40 * s, ay = 36 * s;
        return scene(W, H, p.paper,
          g({ x: ax, y: ay }, path(archPath(aw, ah, 0.5), { fill: p.accent2 })),
          g({ x: ax + 14 * s, y: ay + 30 * s }, o.draw(aw - 28 * s, ah - 30 * s, p)),
          g({ x: ax - 4 * s, y: ay - 4 * s }, path(archPath(aw + 8 * s, ah + 4 * s, 0.5), { fill: null, stroke: p.ink, strokeWidth: 1.2 * s })),
          words(ay + ah + 72 * s, ay + ah + 94 * s, ay + ah + 113 * s, H - 22 * s, 48));
      }
      const band = H * 0.42;
      return scene(W, H, p.paper,
        rect(-b, H * 0.3, W + 2 * b, band, { fill: p.accent2 }),
        g({ x: 30 * s, y: H * 0.3 + 10 * s }, o.draw(W - 60 * s, band - 10 * s, p)),
        words(H * 0.22, H * 0.3 + band + 30 * s, H * 0.3 + band + 50 * s, H - 24 * s, 64));
    },
  };
}
