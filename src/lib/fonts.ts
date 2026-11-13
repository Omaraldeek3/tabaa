/** The fonts templates may use. All are OFL; each folder under public/fonts
 *  carries its licence file. */
export type L10n = { ar: string; en: string };
export type FontStyle = "naskh" | "kufi" | "ruqaa" | "display" | "sans" | "latin";
export type FontFile = { weight: number; path: string; variable?: [number, number] };
export type FontDef = { id: string; family: string; name: L10n; style: FontStyle; scripts: ("ar" | "en")[]; files: FontFile[] };

const one = (id: string, file: string, weight = 400): FontFile => ({ weight, path: `fonts/${id}/${file}` });
const variable = (id: string, file: string, min: number, max: number): FontFile => ({ weight: 400, path: `fonts/${id}/${file}`, variable: [min, max] });

export const fonts: FontDef[] = [
  { id: "amiri", family: "Amiri", name: { ar: "أميري", en: "Amiri" }, style: "naskh", scripts: ["ar", "en"], files: [one("amiri", "Amiri-Regular.ttf"), one("amiri", "Amiri-Bold.ttf", 700)] },
  { id: "lateef", family: "Lateef", name: { ar: "لطيف", en: "Lateef" }, style: "naskh", scripts: ["ar", "en"], files: [one("lateef", "Lateef-Regular.ttf"), one("lateef", "Lateef-Bold.ttf", 700)] },
  { id: "arefruqaa", family: "Aref Ruqaa", name: { ar: "عارف رقعة", en: "Aref Ruqaa" }, style: "ruqaa", scripts: ["ar", "en"], files: [one("arefruqaa", "ArefRuqaa-Regular.ttf"), one("arefruqaa", "ArefRuqaa-Bold.ttf", 700)] },
  { id: "reemkufi", family: "Reem Kufi", name: { ar: "ريم كوفي", en: "Reem Kufi" }, style: "kufi", scripts: ["ar", "en"], files: [variable("reemkufi", "ReemKufi.ttf", 400, 700)] },
  { id: "kufam", family: "Kufam", name: { ar: "كوفام", en: "Kufam" }, style: "kufi", scripts: ["ar", "en"], files: [variable("kufam", "Kufam.ttf", 400, 900)] },
  { id: "cairo", family: "Cairo", name: { ar: "القاهرة", en: "Cairo" }, style: "sans", scripts: ["ar", "en"], files: [variable("cairo", "Cairo.ttf", 200, 1000)] },
  { id: "tajawal", family: "Tajawal", name: { ar: "تجوّل", en: "Tajawal" }, style: "sans", scripts: ["ar", "en"], files: [one("tajawal", "Tajawal-Regular.ttf"), one("tajawal", "Tajawal-Medium.ttf", 500), one("tajawal", "Tajawal-Bold.ttf", 700), one("tajawal", "Tajawal-ExtraBold.ttf", 800)] },
  { id: "almarai", family: "Almarai", name: { ar: "المراعي", en: "Almarai" }, style: "sans", scripts: ["ar", "en"], files: [one("almarai", "Almarai-Regular.ttf"), one("almarai", "Almarai-Bold.ttf", 700), one("almarai", "Almarai-ExtraBold.ttf", 800)] },
  { id: "rakkas", family: "Rakkas", name: { ar: "رقّاص", en: "Rakkas" }, style: "display", scripts: ["ar", "en"], files: [one("rakkas", "Rakkas-Regular.ttf")] },
  { id: "lalezar", family: "Lalezar", name: { ar: "لاله‌زار", en: "Lalezar" }, style: "display", scripts: ["ar", "en"], files: [one("lalezar", "Lalezar-Regular.ttf")] },
  { id: "katibeh", family: "Katibeh", name: { ar: "كاتبة", en: "Katibeh" }, style: "display", scripts: ["ar", "en"], files: [one("katibeh", "Katibeh-Regular.ttf")] },
  { id: "jomhuria", family: "Jomhuria", name: { ar: "جمهورية", en: "Jomhuria" }, style: "display", scripts: ["ar", "en"], files: [one("jomhuria", "Jomhuria-Regular.ttf")] },
  { id: "marhey", family: "Marhey", name: { ar: "مرحي", en: "Marhey" }, style: "display", scripts: ["ar", "en"], files: [variable("marhey", "Marhey.ttf", 300, 700)] },
  { id: "inter", family: "Inter", name: { ar: "إنتر", en: "Inter" }, style: "latin", scripts: ["en"], files: [variable("inter", "Inter.ttf", 100, 900)] },
  { id: "playfairdisplay", family: "Playfair Display", name: { ar: "بلايفير", en: "Playfair Display" }, style: "latin", scripts: ["en"], files: [variable("playfairdisplay", "PlayfairDisplay.ttf", 400, 900)] },
];

export function getFont(id: string): FontDef {
  const font = fonts.find(f => f.id === id);
  if (!font) throw new Error(`Unknown font: ${id}`);
  return font;
}

/** The file to use for a requested weight, and the weight it will really give. */
export function pickFile(font: FontDef, weight = 400): { file: FontFile; weight: number } {
  const v = font.files.find(f => f.variable);
  if (v?.variable) return { file: v, weight: Math.min(v.variable[1], Math.max(v.variable[0], weight)) };
  const file = [...font.files].sort((a, b) => Math.abs(a.weight - weight) - Math.abs(b.weight - weight) || a.weight - b.weight)[0];
  return { file, weight: file.weight };
}

type Loader = (path: string) => Promise<ArrayBuffer>;
let loader: Loader = async path => {
  const base = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) || "";
  const res = await fetch(`${base}/${path}`);
  if (!res.ok) throw new Error(`Font failed to load: ${path}`);
  return res.arrayBuffer();
};
const cache = new Map<string, Promise<ArrayBuffer>>();

/** Tests swap in a filesystem loader. */
export function setFontLoader(next: Loader): void { loader = next; cache.clear(); }

export function loadFontFile(path: string): Promise<ArrayBuffer> {
  let hit = cache.get(path);
  if (!hit) {
    hit = loader(path);
    cache.set(path, hit);
    hit.catch(() => cache.delete(path));
  }
  return hit;
}
