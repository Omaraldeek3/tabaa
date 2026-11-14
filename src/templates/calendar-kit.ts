/** Calendar arithmetic for the calendar templates: weeks start on Saturday,
 *  as on most Palestinian wall calendars. */
export const monthsAr = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"];
export const daysAr = ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];
export const toArabicDigits = (v: string | number) => String(v).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
export const toLatinDigits = (v: string) => v.replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

/** A year typed in either digit set, clamped to something sensible. */
export function parseYear(v: string, fallback = 2028): number {
  const n = Number.parseInt(toLatinDigits(v).replace(/\D/g, ""), 10);
  return Number.isFinite(n) && n >= 1900 && n <= 2200 ? n : fallback;
}

/** Day cells of a month: [column 0..6 from Saturday, week row, day number]. */
export function monthCells(year: number, month: number): [number, number, number][] {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay(), offset = (first + 1) % 7; // Saturday = 0
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return Array.from({ length: days }, (_, i) => [(offset + i) % 7, Math.floor((offset + i) / 7), i + 1]);
}
