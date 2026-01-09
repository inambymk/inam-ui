import { notFound } from "next/navigation";
import { getConfigBySlug } from "@/components/pages/component-docs/registry";
import { ComponentPageClient } from "../../../components/pages/component-docs/ComponentPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getConfigBySlug(slug);

  if (!config) {
    notFound();
  }

  return <ComponentPageClient slug={slug} config={config} />;
}
