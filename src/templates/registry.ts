/** Every template on the site. A new one is its own file plus one line here. */
import kufiMonogram from "./cards/kufi-monogram.ts";
import tatreezHonor from "./certificates/tatreez-honor.ts";
import eidCrescent from "./greetings/eid-crescent.ts";
import oliveOil from "./labels/olive-oil.ts";
import falafelShop from "./menus/falafel-shop.ts";
import hennaNight from "./occasions/henna-night.ts";
import oliveHarvest from "./posters/olive-harvest.ts";
import type { RenderContext, Template, Values } from "./types.ts";
import tatreezFrame from "./wedding/tatreez-frame.ts";

export const templates: Template[] = [
  tatreezFrame,
  hennaNight,
  oliveHarvest,
  kufiMonogram,
  falafelShop,
  oliveOil,
  eidCrescent,
  tatreezHonor,
];

export const getTemplate = (id: string): Template | undefined => templates.find(t => t.id === id);

export function sampleValues(t: Template): Values {
  return Object.fromEntries(t.fields.map(f => [f.id, f.kind === "list" ? f.sample.map(r => [...r]) : f.sample]));
}

/** The context a template is drawn with when the visitor has changed nothing. */
export function defaultContext(t: Template, over: Partial<RenderContext> = {}): RenderContext {
  return { values: sampleValues(t), palette: t.palettes[0], font: t.fonts[0], size: t.sizes[0], safeMm: t.safeMm ?? 5, bleedMm: 3, ...over };
}
