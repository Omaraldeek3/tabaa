import type { Metadata } from "next";
import { Guide } from "../../components/Guide";

export const metadata: Metadata = { title: "دليل الطباعة", description: "هامش القص، المنطقة الآمنة، ألوان CMYK، أي ورق تطلب وماذا تقول لصاحب المطبعة." };

export default function Page() {
  return <Guide />;
}
