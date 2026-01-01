"use client";

import { useState, useEffect } from "react";
import { getComponentApi } from "@/lib/component-api-data";
import ComponentDisplay, { getComponentCode } from "@/components/component-displays";
import CopyButton from "@/components/CopyButton";
import { PropsTable } from "@/components/PropsTable";
import Link from "next/link";

interface ComponentPageProps {
  slug: string;
  metadata: {
    slug: string;
    name: string;
    description: string;
    category: string;
  };
  apiData: ReturnType<typeof getComponentApi>;
  installCommand: string;
  prevComponent: { slug: string; name: string } | null;
  nextComponent: { slug: string; name: string } | null;
}

export default function ComponentPage({
  slug,
  metadata,
  apiData,
  installCommand,
  prevComponent,
  nextComponent,
}: ComponentPageProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  // Listen for variant selection events from ComponentDisplay
  useEffect(() => {
    const handleVariantChange = (event: CustomEvent<{ variant: string | null }>) => {
      setSelectedVariant(event.detail.variant);
    };

    window.addEventListener(
      "variantChange" as keyof WindowEventMap,
      handleVariantChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "variantChange" as keyof WindowEventMap,
        handleVariantChange as EventListener
      );
    };
  }, []);

  // Parse selected variant to get variant/size
  const getSelectedCode = () => {
    if (!selectedVariant) return null;

    if (selectedVariant.startsWith("variant-")) {
      const variant = selectedVariant.replace("variant-", "");
      return getComponentCode(slug, variant, undefined);
    }

    if (selectedVariant.startsWith("size-")) {
      const size = selectedVariant.replace("size-", "");
      return getComponentCode(slug, undefined, size);
    }

    return null;
  };

  const selectedCode = getSelectedCode();

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href="/components"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Components
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium text-foreground">{metadata.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {metadata.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {metadata.description}
            </p>
          </div>
          <span className="self-start px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20">
            {metadata.category}
          </span>
        </div>

        {/* Theme customization link */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary/80 transition-colors w-fit">
          <Link href="/themes" className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Want to customize this color? Check our Theming Guide
          </Link>
        </div>
      </header>

      {/* Preview Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Preview</h2>
          <p className="text-xs text-muted-foreground">Click any variant to see code below</p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 sm:p-6 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] [background-size:16px_16px] bg-card/30 overflow-x-auto">
            <ComponentDisplay slug={slug} onVariantChange={setSelectedVariant} />
          </div>
        </div>
      </section>

      {/* Quick Install */}
      <section className="flex flex-col gap-3 p-3 sm:p-4 rounded-xl bg-muted/30 border border-border">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Quick Install</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex-1 overflow-hidden font-mono text-xs sm:text-sm">
            <div className="bg-card p-2 rounded-md overflow-x-auto">
              <code className="text-foreground whitespace-nowrap">{installCommand}</code>
            </div>
          </div>
          <CopyButton text={installCommand} variant="icon" />
        </div>
      </section>

      {/* Usage Examples - Show selected variant code first if available */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Usage</h2>
        <div className="space-y-4">
          {/* Selected variant code */}
          {selectedCode && (
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-medium text-foreground">Selected Variant</h3>
                <p className="text-xs text-muted-foreground">
                  Code for the variant you selected in the preview
                </p>
              </div>
              <div className="relative group">
                <pre className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto max-w-full">
                  <code className="block">{selectedCode}</code>
                </pre>
                <div className="absolute right-2 sm:right-3 top-2 sm:top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={selectedCode} variant="icon" />
                </div>
              </div>
            </div>
          )}

          {/* API examples */}
          {apiData?.examples && apiData.examples.length > 0 && (
            <>
              {apiData.examples.map((example, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{example.title}</h3>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                  </div>
                  <div className="relative group">
                    <pre className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto max-w-full">
                      <code className="block">{example.code}</code>
                    </pre>
                    <div className="absolute right-2 sm:right-3 top-2 sm:top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={example.code} variant="icon" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">API Reference</h2>
        {apiData ? (
          <PropsTable props={apiData.props} />
        ) : (
          <div className="p-6 sm:p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">API documentation coming soon</p>
          </div>
        )}
      </section>

      {/* Navigation */}
      <nav className="flex items-center justify-between pt-6 border-t border-border gap-4">
        {prevComponent ? (
          <Link
            href={`/components/${prevComponent.slug}`}
            className="group flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="truncate">{prevComponent.name}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextComponent && (
          <Link
            href={`/components/${nextComponent.slug}`}
            className="group flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="truncate">{nextComponent.name}</span>
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
}
