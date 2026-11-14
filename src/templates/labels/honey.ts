import { scallopPath, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const hex = (r: number) => `M${r} 0 L${r / 2} ${r * 0.866} L${-r / 2} ${r * 0.866} L${-r} 0 L${-r / 2} ${-r * 0.866} L${r / 2} ${-r * 0.866} Z`;

const t: Template = {
  id: "labels-honey",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق عسل بخلايا سداسية", en: "Honey label with honeycomb" },
  note: { ar: "ملصق دائري مسنّن بخلايا نحل سداسية في أعلاه، للعسل والدبس والمربّيات.", en: "A round toothed label with a honeycomb across the top, for honey, molasses and jams." },
  tags: ["عسل", "نحل", "دبس", "مربى", "ملصق", "دائري", "label", "honey"],
  sizes: [sizes.round70, sizes.round50, sizes.round90],
  shape: "round",
  palettes: [
    pal("honey", "عسل", "Honey", inks.mustard, inks.black, inks.black, inks.goldDeep, inks.ivory),
    pal("carob", "خرّوب", "Carob", inks.burgundy, inks.black, inks.burgundy, inks.goldDeep, inks.paper),
    pal("thyme", "زعتر", "Thyme", inks.olive, inks.oliveDark, inks.oliveDark, inks.goldDeep, inks.ivory),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa", "reemkufi"],
  fields: [
    { id: "top", kind: "text", label: { ar: "السطر العلوي", en: "Top line" }, sample: "طبيعي ١٠٠٪", maxLength: 18 },
    { id: "name", kind: "text", label: { ar: "اسم المنتج", en: "Product name" }, sample: "عسل سدر", maxLength: 16 },
    { id: "origin", kind: "text", label: { ar: "المنشأ", en: "Origin" }, sample: "من مناحل طوباس", maxLength: 24 },
    { id: "weight", kind: "text", label: { ar: "الوزن", en: "Weight" }, sample: "١ كغم", maxLength: 10 },
    { id: "year", kind: "text", label: { ar: "الموسم", en: "Season" }, sample: "قطفة ٢٠٢٧", maxLength: 14 },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, b } = dims(ctx, 70, 70), s = W / 70, c = W / 2, R = W / 2 - 4 * s, hr = 4.2 * s;
    const comb: SceneNode[] = [];
    for (let row = 0; row < 2; row++) for (let col = -3; col <= 3; col++) {
      const x = c + col * hr * 1.5, y = 13 * s + row * hr * 1.732 + (Math.abs(col) % 2 ? hr * 0.866 : 0);
      if (Math.hypot(x - c, y - c) < R - hr * 1.5) comb.push(g({ x, y }, path(hex(hr * 0.88), { fill: (row + col) % 3 === 0 ? p.accent2 : null, stroke: p.accent2, strokeWidth: 0.35 * s })));
    }
    const z = W / 70;
    return scene(W, W, p.paper,
      starTile(0, 0, W, W, 5 * z, 0.6 * z, p.ink, 0.06),
      rect(-b, -b, W + 2 * b, W + 2 * b, { fill: p.paper }),
      g({ x: c, y: c }, path(scallopPath(R, 28, 0.1), { fill: p.soft }), circle(0, 0, R * 0.9, { fill: null, stroke: p.accent2, strokeWidth: 0.25 * s })),
      comb,
      line(val(ctx, "top"), c, 33 * s, 3.3 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: 34 * s }),
      line(val(ctx, "name"), c, 45.6 * s, 12 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 44 * s }),
      line(val(ctx, "origin"), c, 52 * s, 3.3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: 36 * s }),
      line(joined(ctx, ["weight", "year"]), c, 57.6 * s, 3 * s, { font: "tajawal", weight: 800, fill: p.accent === inks.black ? p.accent2 : p.accent, maxWidth: 26 * s }),
    );
  },
};
export default t;
