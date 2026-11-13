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
import posters_bookFair from "./posters/book-fair.ts";
import posters_footballCup from "./posters/football-cup.ts";
import posters_grandOpening from "./posters/grand-opening.ts";
import posters_heritageNight from "./posters/heritage-night.ts";
import posters_landDay from "./posters/land-day.ts";
import posters_orangeSeason from "./posters/orange-season.ts";
import posters_shopSale from "./posters/shop-sale.ts";
import posters_tatreezWorkshop from "./posters/tatreez-workshop.ts";
import posters_enFilmNight from "./posters/en-film-night.ts";
import cards_kufiMonogram from "./cards/kufi-monogram.ts";
import cards_archTall from "./cards/arch-tall.ts";
import cards_craftStamp from "./cards/craft-stamp.ts";
import cards_darkGold from "./cards/dark-gold.ts";
import cards_oliveMinimal from "./cards/olive-minimal.ts";
import cards_tatreezEdge from "./cards/tatreez-edge.ts";
import cards_enBlock from "./cards/en-block.ts";
import cards_enKeffiyeh from "./cards/en-keffiyeh.ts";
import menus_falafelShop from "./menus/falafel-shop.ts";
import menus_coffeeHouse from "./menus/coffee-house.ts";
import menus_grillHouse from "./menus/grill-house.ts";
import menus_homeKitchen from "./menus/home-kitchen.ts";
import menus_sweetsShop from "./menus/sweets-shop.ts";
import menus_enCafe from "./menus/en-cafe.ts";
import labels_oliveOil from "./labels/olive-oil.ts";
import labels_datesBox from "./labels/dates-box.ts";
import labels_honey from "./labels/honey.ts";
import labels_nabulsiSoap from "./labels/nabulsi-soap.ts";
import labels_zaatar from "./labels/zaatar.ts";
import labels_enHandmade from "./labels/en-handmade.ts";
import greetings_eidCrescent from "./greetings/eid-crescent.ts";
import greetings_mabrouk from "./greetings/mabrouk.ts";
import greetings_ramadanLantern from "./greetings/ramadan-lantern.ts";
import greetings_seasonsWreath from "./greetings/seasons-wreath.ts";
import greetings_thankYou from "./greetings/thank-you.ts";
import greetings_enEid from "./greetings/en-eid.ts";
import certificates_tatreezHonor from "./certificates/tatreez-honor.ts";
import certificates_courseArch from "./certificates/course-arch.ts";
import certificates_oliveModern from "./certificates/olive-modern.ts";
import certificates_enAchievement from "./certificates/en-achievement.ts";
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
  posters_bookFair,
  posters_footballCup,
  posters_grandOpening,
  posters_heritageNight,
  posters_landDay,
  posters_orangeSeason,
  posters_shopSale,
  posters_tatreezWorkshop,
  posters_enFilmNight,
  cards_kufiMonogram,
  cards_archTall,
  cards_craftStamp,
  cards_darkGold,
  cards_oliveMinimal,
  cards_tatreezEdge,
  cards_enBlock,
  cards_enKeffiyeh,
  menus_falafelShop,
  menus_coffeeHouse,
  menus_grillHouse,
  menus_homeKitchen,
  menus_sweetsShop,
  menus_enCafe,
  labels_oliveOil,
  labels_datesBox,
  labels_honey,
  labels_nabulsiSoap,
  labels_zaatar,
  labels_enHandmade,
  greetings_eidCrescent,
  greetings_mabrouk,
  greetings_ramadanLantern,
  greetings_seasonsWreath,
  greetings_thankYou,
  greetings_enEid,
  certificates_tatreezHonor,
  certificates_courseArch,
  certificates_oliveModern,
  certificates_enAchievement,
];

export const getTemplate = (id: string): Template | undefined => templates.find(t => t.id === id);

export function sampleValues(t: Template): Values {
  return Object.fromEntries(t.fields.map(f => [f.id, f.kind === "list" ? f.sample.map(r => [...r]) : f.sample]));
}

/** The context a template is drawn with when the visitor has changed nothing. */
export function defaultContext(t: Template, over: Partial<RenderContext> = {}): RenderContext {
  return { values: sampleValues(t), palette: t.palettes[0], font: t.fonts[0], size: t.sizes[0], safeMm: t.safeMm ?? 5, bleedMm: 3, ...over };
}
