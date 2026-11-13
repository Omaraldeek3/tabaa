/** Every template on the site. The list below is written by scripts/registry.mjs
 *  from the files under src/templates/<category>/; do not edit it by hand. */
import wedding_tatreezFrame from "./wedding/tatreez-frame.ts";
import wedding_jerusalemArch from "./wedding/jerusalem-arch.ts";
import wedding_cypressColumns from "./wedding/cypress-columns.ts";
import wedding_keffiyehBand from "./wedding/keffiyeh-band.ts";
import wedding_modernKufi from "./wedding/modern-kufi.ts";
import wedding_oliveWreath from "./wedding/olive-wreath.ts";
import wedding_orangeGrove from "./wedding/orange-grove.ts";
import wedding_poppyField from "./wedding/poppy-field.ts";
import wedding_saveTheDate from "./wedding/save-the-date.ts";
import wedding_starLattice from "./wedding/star-lattice.ts";
import wedding_enArch from "./wedding/en-arch.ts";
import wedding_enOliveBranch from "./wedding/en-olive-branch.ts";
import occasions_hennaNight from "./occasions/henna-night.ts";
import occasions_birthdayParty from "./occasions/birthday-party.ts";
import occasions_condolenceThanks from "./occasions/condolence-thanks.ts";
import occasions_engagementRings from "./occasions/engagement-rings.ts";
import occasions_graduation from "./occasions/graduation.ts";
import occasions_hajjMabrour from "./occasions/hajj-mabrour.ts";
import occasions_newHome from "./occasions/new-home.ts";
import occasions_newborn from "./occasions/newborn.ts";
import posters_oliveHarvest from "./posters/olive-harvest.ts";
import posters_heritageNight from "./posters/heritage-night.ts";
import posters_shopSale from "./posters/shop-sale.ts";
import cards_kufiMonogram from "./cards/kufi-monogram.ts";
import cards_enKeffiyeh from "./cards/en-keffiyeh.ts";
import menus_falafelShop from "./menus/falafel-shop.ts";
import labels_oliveOil from "./labels/olive-oil.ts";
import greetings_eidCrescent from "./greetings/eid-crescent.ts";
import greetings_ramadanLantern from "./greetings/ramadan-lantern.ts";
import certificates_tatreezHonor from "./certificates/tatreez-honor.ts";
import type { RenderContext, Template, Values } from "./types.ts";

export const templates: Template[] = [
  wedding_tatreezFrame,
  wedding_jerusalemArch,
  wedding_cypressColumns,
  wedding_keffiyehBand,
  wedding_modernKufi,
  wedding_oliveWreath,
  wedding_orangeGrove,
  wedding_poppyField,
  wedding_saveTheDate,
  wedding_starLattice,
  wedding_enArch,
  wedding_enOliveBranch,
  occasions_hennaNight,
  occasions_birthdayParty,
  occasions_condolenceThanks,
  occasions_engagementRings,
  occasions_graduation,
  occasions_hajjMabrour,
  occasions_newHome,
  occasions_newborn,
  posters_oliveHarvest,
  posters_heritageNight,
  posters_shopSale,
  cards_kufiMonogram,
  cards_enKeffiyeh,
  menus_falafelShop,
  labels_oliveOil,
  greetings_eidCrescent,
  greetings_ramadanLantern,
  certificates_tatreezHonor,
];

export const getTemplate = (id: string): Template | undefined => templates.find(t => t.id === id);

export function sampleValues(t: Template): Values {
  return Object.fromEntries(t.fields.map(f => [f.id, f.kind === "list" ? f.sample.map(r => [...r]) : f.sample]));
}

/** The context a template is drawn with when the visitor has changed nothing. */
export function defaultContext(t: Template, over: Partial<RenderContext> = {}): RenderContext {
  return { values: sampleValues(t), palette: t.palettes[0], font: t.fonts[0], size: t.sizes[0], safeMm: t.safeMm ?? 5, bleedMm: 3, ...over };
}
