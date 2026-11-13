/** Short builders for template fields, and the field sets several templates share. */
import type { Field, ListField, MultilineField, TextField } from "./types.ts";

export const tf = (id: string, ar: string, en: string, sample: string, maxLength?: number): TextField =>
  ({ id, kind: "text", label: { ar, en }, sample, ...(maxLength ? { maxLength } : {}) });
export const ml = (id: string, ar: string, en: string, sample: string, maxLines: number): MultilineField =>
  ({ id, kind: "multiline", label: { ar, en }, sample, maxLines });
export const lf = (id: string, ar: string, en: string, columns: [string, string][], sample: string[][], maxRows: number): ListField =>
  ({ id, kind: "list", label: { ar, en }, columns: columns.map(([a, e]) => ({ ar: a, en: e })), sample, maxRows });

/** The fields an Arabic wedding invitation needs. Pass samples to make each card its own. */
export function weddingAr(s: Partial<Record<"opening" | "invite" | "groom" | "bride" | "date" | "time" | "venue" | "families", string>> = {}): Field[] {
  return [
    tf("opening", "الافتتاح", "Opening", s.opening ?? "بسم الله الرحمن الرحيم"),
    tf("invite", "نص الدعوة", "Invitation line", s.invite ?? "يتشرّفون بدعوتكم لحضور حفل زفاف"),
    tf("groom", "العريس", "Groom", s.groom ?? "محمد", 22),
    tf("bride", "العروس", "Bride", s.bride ?? "ليان", 22),
    tf("date", "التاريخ", "Date", s.date ?? "الجمعة ١٨ حزيران ٢٠٢٧"),
    tf("time", "الوقت", "Time", s.time ?? "السابعة مساءً"),
    tf("venue", "المكان", "Venue", s.venue ?? "قاعة الياسمين، نابلس"),
    tf("families", "العائلتان", "Families", s.families ?? "آل الخطيب وآل النابلسي"),
  ];
}

/** The fields an Arabic business card needs. */
export function cardAr(s: { name: string; role: string; phone: string; email?: string; address: string }, extra: ReturnType<typeof tf>[] = []): Field[] {
  return [
    tf("name", "الاسم", "Name", s.name, 32),
    tf("role", "المهنة", "Role", s.role),
    tf("phone", "الهاتف", "Phone", s.phone),
    ...(s.email ? [tf("email", "البريد", "Email", s.email)] : []),
    tf("address", "العنوان", "Address", s.address),
    ...extra,
  ];
}

/** A priced list: item and price columns. */
export const priced = (id: string, ar: string, en: string, sample: string[][], maxRows: number): ListField =>
  lf(id, ar, en, [["الصنف", "Item"], ["السعر", "Price"]], sample, maxRows);

/** The fields an Arabic certificate needs. */
export function certAr(s: { org: string; title: string; lead: string; name: string; reason: string; date: string; sign1: string; sign2: string }): Field[] {
  return [
    tf("org", "الجهة", "Organisation", s.org),
    tf("title", "العنوان", "Title", s.title, 26),
    tf("lead", "تمهيد", "Lead-in", s.lead),
    tf("name", "الاسم", "Recipient", s.name, 36),
    ml("reason", "النص", "Text", s.reason, 3),
    tf("date", "التاريخ", "Date", s.date),
    tf("sign1", "التوقيع الأول", "First signature", s.sign1),
    tf("sign2", "التوقيع الثاني", "Second signature", s.sign2),
  ];
}
