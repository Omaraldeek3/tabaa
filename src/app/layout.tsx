import type { Metadata, Viewport } from "next";
import { Footer, Header } from "../components/Chrome";
import { LangProvider } from "../components/Lang";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "طبعة — قوالب مطبوعات عربية وفلسطينية جاهزة للمطبعة", template: "%s — طبعة" },
  description: "مكتبة مجانية لقوالب المطبوعات العربية والفلسطينية: دعوات أعراس، بوسترات، كروت أعمال، قوائم طعام، ملصقات وشهادات. اكتب نصّك ونزّل PDF بألوان CMYK وهامش قص.",
  applicationName: "Tabaa",
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#b3261e", width: "device-width", initialScale: 1 };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LangProvider>
          <a className="skip" href="#main">تخطَّ إلى المحتوى</a>
          <Header />
          <div id="main">{children}</div>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
