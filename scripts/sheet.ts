/** Dev aid: render something to a PNG so it can be looked at.
 *  node --experimental-strip-types scripts/sheet.ts motifs out.png
 *  node --experimental-strip-types scripts/sheet.ts templates out.png [idFilter] */
import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { ink } from "../src/lib/color.ts";
import * as m from "../src/lib/motifs/index.ts";
import { renderSvg } from "../src/lib/render-svg.ts";
import { resolveScene } from "../src/lib/resolve.ts";
import { type SceneNode, g, scene } from "../src/lib/scene.ts";
import { useDiskFonts } from "../tests/setup.ts";

useDiskFonts();
const [mode, out = "sheet.png", filter = "", variant = ""] = process.argv.slice(2);
const red = ink("#b3261e"), olive = ink("#5b6b2f"), black = ink("#16130f"), gold = ink("#c9a24b"), paper = ink("#f4ecdc"), orangeInk = ink("#e8862a");
let svgs: string[] = [];

if (mode === "motifs") {
  const cells: SceneNode[] = [
    m.tatreezUnit("star", 40, [red, black]), m.tatreezUnit("rose", 40, [red, olive]), m.tatreezUnit("cypress", 40, [olive, red]), m.tatreezUnit("diamond", 40, [red, black]),
    g({ y: 10 }, m.tatreezBand("chain", 44, 8, [red, black])), g({ y: 10 }, m.tatreezBand("zigzag", 44, 8, [black, red])), g({ y: 10 }, m.tatreezBand("trees", 44, 8, [olive, red])), g({ y: 10 }, m.tatreezBand("lattice", 44, 6, [red, black])),
    m.tatreezFrame(44, 44, 7, [red, black]), m.tatreezFrame(44, 44, 7, [black, red], { style: "chain" }), m.tatreezFrame(44, 44, 7, [olive, red], { style: "stars" }), m.tatreezFrame(44, 44, 5, [red, black], { gap: 0.18 }),
    g({ x: 2, y: 25 }, m.oliveBranch(40, olive, black)), g({ x: 22, y: 22 }, m.oliveWreath(18, olive, black)), g({ x: 22, y: 14 }, m.poppy(18, red, black, { stem: olive })), g({ x: 22, y: 24 }, m.orange(26, orangeInk, olive, paper)),
    g({ x: 22, y: 12 }, m.watermelon(38, red, olive, paper, black)), g({ x: 22, y: 42 }, m.wheat(38, gold)), g({ x: 22, y: 22 }, m.crescentStar(14, gold)), g({ x: 22, y: 22 }, m.rays(16, 6, 20, red)),
    g({ x: 2, y: 4 }, m.arcade(3, 40, 36, black)), m.archWindow(44, 44, 6, olive), m.keffiyeh(44, 44, 5.5, black), g({ x: 3, y: 22 }, m.key(38, black)),
    g({ x: 22, y: 22 }, m.rings(36, gold)), g({ x: 22, y: 2 }, m.lantern(40, black, gold)), g({ x: 22, y: 22 }, m.ribbon(26, 8, red, black)), g({ x: 0, y: 8 }, m.jerusalem(44, 30, black, gold, paper)),
  ];
  const cols = 4, pitch = 50;
  const s = scene(cols * pitch + 6, Math.ceil(cells.length / cols) * pitch + 6, paper, cells.map((c, i) => g({ x: 6 + (i % cols) * pitch, y: 6 + Math.floor(i / cols) * pitch }, c)));
  svgs = [renderSvg(await resolveScene(s))];
} else {
  const { templates, sampleValues } = await import("../src/templates/registry.ts");
  for (const t of templates.filter(t => !filter || new RegExp(filter).test(t.id))) {
    const combos = variant === "all" ? t.palettes.flatMap(p => t.sizes.map(size => ({ p, size }))) : [{ p: t.palettes[Number(variant) || 0] ?? t.palettes[0], size: t.sizes[0] }];
    for (const { p, size } of combos) {
      const sc = t.render({ values: sampleValues(t), palette: p, font: t.fonts[0], size, safeMm: 5, bleedMm: 3 });
      svgs.push(renderSvg(await resolveScene(sc), { bleedMm: 0, idPrefix: `s${svgs.length}` }));
    }
  }
}

const px = (svg: string, h: number) => { const m = /viewBox="\S+ \S+ (\S+) (\S+)"/.exec(svg)!; return svg.replace(/width="[^"]+" height="[^"]+"/, `width="${Math.round((h * Number(m[1])) / Number(m[2]))}" height="${h}"`); };
const html = `<body style="margin:0;background:#8a8478;display:flex;flex-wrap:wrap;gap:24px;padding:24px;align-items:flex-start">${svgs.map(s => `<div style="box-shadow:0 6px 24px #0006;line-height:0">${px(s, mode === "motifs" ? 1400 : Number(process.env.SHEET_H) || 620)}</div>`).join("")}</body>`;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "msedge" });
const page = await browser.newPage({ viewport: { width: 1500, height: 900 } });
await page.setContent(html);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
await writeFile(out.replace(/\.png$/, ".html"), html);
console.log(`${svgs.length} sheet(s) -> ${out}`);
