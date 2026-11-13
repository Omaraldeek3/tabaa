import type { Metadata } from "next";
import { Library } from "../../components/Library";

export const metadata: Metadata = { title: "المكتبة", description: "كل قوالب طبعة: دعوات أعراس، بوسترات، كروت أعمال، قوائم طعام، ملصقات، تهاني وشهادات." };

export default function Page() {
  return <Library />;
}
