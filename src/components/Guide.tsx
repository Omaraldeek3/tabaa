"use client";

import Link from "next/link";
import { TatreezRule } from "./Chrome";
import { useLang } from "./Lang";

type Row = { what: { ar: string; en: string }; paper: { ar: string; en: string }; note: { ar: string; en: string } };
const papers: Row[] = [
  { what: { ar: "دعوات الأعراس والمناسبات", en: "Wedding and occasion invitations" }, paper: { ar: "كرتون ٣٠٠ إلى ٣٥٠ غرام، مطفي أو مخملي", en: "300 to 350 gsm card, matt or soft-touch" }, note: { ar: "اطلب عيّنة قبل طباعة الكمية، فالألوان الداكنة تتغيّر مع نوع الورق.", en: "Ask for a proof before the full run; dark colours shift with the stock." } },
  { what: { ar: "كروت الأعمال", en: "Business cards" }, paper: { ar: "كرتون ٣٥٠ غرام مع سلوفان مطفي", en: "350 gsm card with matt lamination" }, note: { ar: "المقاس الشائع ٨٥×٥٥ ملم. اسأل المطبعة عن مقاسها قبل التنزيل.", en: "85×55 mm is the common size. Ask your printer which they cut before downloading." } },
  { what: { ar: "البوسترات", en: "Posters" }, paper: { ar: "ورق ١٥٠ إلى ٢٠٠ غرام لامع أو مطفي", en: "150 to 200 gsm paper, gloss or matt" }, note: { ar: "للتعليق الخارجي اطلب ورقاً مقاوماً للماء أو بنراً.", en: "For outdoor use ask for water-resistant stock or a banner." } },
  { what: { ar: "قوائم الطعام", en: "Menus" }, paper: { ar: "كرتون ٢٥٠ إلى ٣٠٠ غرام مع سلوفان", en: "250 to 300 gsm card, laminated" }, note: { ar: "السلوفان يحمي القائمة من الزيت والماء.", en: "Lamination keeps oil and water off the menu." } },
  { what: { ar: "ملصقات المنتجات", en: "Product labels" }, paper: { ar: "ورق لاصق أو فينيل لاصق مع قص بالقالب", en: "Adhesive paper or vinyl, die-cut" }, note: { ar: "لقناني الزيت اختر فينيل مقاوماً للزيت.", en: "For oil bottles choose an oil-resistant vinyl." } },
  { what: { ar: "الشهادات", en: "Certificates" }, paper: { ar: "ورق ٢٠٠ إلى ٢٥٠ غرام عاجي", en: "200 to 250 gsm ivory paper" }, note: { ar: "تصلح للطباعة على طابعة مكتبية جيدة بلا هامش قص.", en: "Fine on a good office printer; set bleed to 0." } },
];

const say = {
  ar: ["الملف PDF فيكتور بمقاس القص النهائي، ومعه هامش قص ٣ ملم وعلامات قص.", "الألوان CMYK، والنصوص محوّلة إلى مسارات.", "أريد عيّنة مطبوعة واحدة قبل الكمية.", "الكمية، نوع الورق ووزنه، والسلوفان إن وجد."],
  en: ["The file is a vector PDF at final trim size, with 3 mm bleed and crop marks.", "Colour is CMYK and all text is outlined.", "I would like one printed proof before the run.", "Quantity, paper type and weight, and lamination if any."],
};

export function Guide() {
  const { t, lang, pick } = useLang();
  const ar = lang === "ar";
  return (
    <main className="paper guide">
      <div className="wrap guide-wrap">
        <h1 className="page-title">{t("guideTitle")}</h1>
        <p className="section-lead">{t("guideLead")}</p>
        <TatreezRule height={12} />

        <h2>{ar ? "هامش القص والمنطقة الآمنة" : "Bleed and the safe area"}</h2>
        <p>{ar
          ? "المطبعة تطبع على ورقة أكبر ثم تقصّها، والمقص لا يقع على الخط نفسه كل مرة. لذلك تمتد خلفية التصميم ٣ ملم خارج حد القص (هذا هامش القص)، ويبقى النص بعيداً عن الحافة داخل المنطقة الآمنة. طبعة تضبط الاثنين لك."
          : "A print shop prints on a larger sheet and then cuts it, and the blade never lands on exactly the same line. So the background runs 3 mm past the trim (the bleed) and text stays away from the edge, inside the safe area. Tabaa sets both for you."}</p>
        <p>{ar
          ? "إن كنت ستطبع على طابعة البيت أو المكتب، اجعل هامش القص ٠ وأطفئ علامات القص، فيخرج الملف بالمقاس النهائي تماماً."
          : "If you are printing on a home or office printer, set bleed to 0 and switch crop marks off; the file then comes out at exactly the final size."}</p>

        <h2>{ar ? "الألوان" : "Colour"}</h2>
        <p>{ar
          ? "ملف PDF يخرج بألوان CMYK، وهي أحبار المطابع. الشاشة تعرض بالضوء والورق يعكسه، فتوقّع أن تكون الألوان على الورق أهدأ قليلاً مما تراه، خاصة الأحمر والأخضر الزاهيين. صورة PNG وملف SVG يخرجان بألوان الشاشة RGB، وهما للمشاركة والتعديل لا للمطبعة."
          : "The PDF is in CMYK, the inks presses use. A screen shows light and paper reflects it, so expect colours on paper to be a little calmer than on screen, bright reds and greens most of all. The PNG and SVG are in screen RGB; they are for sharing and editing, not for the press."}</p>

        <h2>{ar ? "أي ورق أطلب؟" : "Which paper to ask for"}</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>{ar ? "المطبوعة" : "Item"}</th><th>{ar ? "الورق المقترح" : "Suggested stock"}</th><th>{ar ? "ملاحظة" : "Note"}</th></tr></thead>
            <tbody>{papers.map(r => <tr key={r.what.en}><td>{pick(r.what)}</td><td>{pick(r.paper)}</td><td>{pick(r.note)}</td></tr>)}</tbody>
          </table>
        </div>

        <h2>{ar ? "ماذا أقول لصاحب المطبعة؟" : "What to tell the printer"}</h2>
        <ul className="say">{say[lang].map(line => <li key={line}>{line}</li>)}</ul>

        <h2>{ar ? "ملف SVG للقص والتعديل" : "The SVG, for cutting and editing"}</h2>
        <p>{ar
          ? "ملف SVG يفتح في CorelDRAW وIllustrator وInkscape وLightBurn، وكل حروفه مسارات. استعمله إن أردت تعديل التصميم بنفسك أو قصّه أو حفره بالليزر."
          : "The SVG opens in CorelDRAW, Illustrator, Inkscape and LightBurn, and every letter is an outline. Use it to edit the design yourself, or to cut or engrave it with a laser."}</p>

        <p><Link href="/library/" className="btn btn-red">{t("heroCta")}</Link></p>
      </div>
    </main>
  );
}
