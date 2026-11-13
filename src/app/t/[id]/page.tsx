import type { Metadata } from "next";
import { Editor } from "../../../components/Editor";
import { getTemplate, templates } from "../../../templates/registry";

export function generateStaticParams() {
  return templates.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const t = getTemplate((await params).id);
  return t ? { title: t.title.ar, description: t.note.ar } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <Editor id={(await params).id} />;
}
