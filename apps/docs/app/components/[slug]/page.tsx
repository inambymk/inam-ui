import { notFound } from "next/navigation";
import { Metadata } from "next";
import { componentsMetadata } from "@/lib/components-data";
import { getComponentApi } from "@/lib/component-api-data";
import { generateComponentMetadata } from "@/lib/seo";
import ComponentPageClient from "@/components/ComponentPage";

export async function generateStaticParams() {
  return componentsMetadata.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateComponentMetadata(slug);
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const metadata = componentsMetadata.find((c) => c.slug === slug);
  const apiData = getComponentApi(slug);

  if (!metadata) {
    notFound();
  }

  const installCommand = `npx inam-ui add ${slug}`;

  // Get prev/next components for navigation
  const currentIndex = componentsMetadata.findIndex((c) => c.slug === slug);
  const prevComponent = currentIndex > 0 ? componentsMetadata[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < componentsMetadata.length - 1 ? componentsMetadata[currentIndex + 1] : null;

  return (
    <ComponentPageClient
      slug={slug}
      metadata={metadata}
      apiData={apiData}
      installCommand={installCommand}
      prevComponent={prevComponent}
      nextComponent={nextComponent}
    />
  );
}
