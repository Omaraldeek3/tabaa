/** Renders one template's first palette to review/<id>-<tag>.png for side-by-side review. */
import { writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { renderSvg } from "../src/lib/render-svg.ts";
import { resolveScene } from "../src/lib/resolve.ts";
import { defaultContext, templates } from "../src/templates/registry.ts";
import { useDiskFonts } from "../tests/setup.ts";

useDiskFonts();
const [id, tag = "new"] = process.argv.slice(2);
const t = templates.find(x => x.id === id)!;
const svg = renderSvg(await resolveScene(t.render(defaultContext(t, { bleedMm: 0 }))), { idPrefix: t.id });
await writeFile(`review/${id}-${tag}.png`, new Resvg(svg, { fitTo: { mode: "width", value: 1400 }, background: "white" }).render().asPng());
console.log("ok", id, tag);
