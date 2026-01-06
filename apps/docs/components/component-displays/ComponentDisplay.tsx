"use client";

import { Suspense, useMemo, useState } from "react";
import { getComponentApi } from "@/lib/component-api-data";
import { ComponentDisplayProps } from "./types";
import { getComponent, getComponentCode, getDefaultProps, needsSpecialHandling } from "./utils";
import { TextareaDisplay, CardDisplay, CheckboxDisplay } from "./displays";
import { CodeDisplay, PreviewContainer } from "./shared";
import { useAnalytics, TELEMETRY_EVENTS } from "@/lib/useAnalytics";

// Registry for custom component displays
const customDisplays: Record<string, React.ComponentType> = {
  textarea: TextareaDisplay,
  card: CardDisplay,
  checkbox: CheckboxDisplay,
};

export default function ComponentDisplay({ slug, onVariantChange }: ComponentDisplayProps) {
  const Component = useMemo(() => getComponent(slug), [slug]) as React.FC<Record<string, unknown>>;
  const apiData = getComponentApi(slug);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  const variantProp = apiData?.props.find((p) => p.name === "variant");
  const sizeProp = apiData?.props.find((p) => p.name === "size" || p.name === "width");

  const variants = useMemo(() => {
    if (!variantProp?.type) return [];
    return variantProp.type
      .split("|")
      .map((v) => v.trim().replace(/'/g, ""))
      .filter((v) => v && v !== "undefined");
  }, [variantProp]);

  const sizes = useMemo(() => {
    if (!sizeProp?.type) return [];
    return sizeProp.type
      .split("|")
      .map((s) => s.trim().replace(/'/g, ""))
      .filter((s) => s && s !== "undefined");
  }, [sizeProp]);

  // Check if there's a custom display for this component
  const CustomDisplay = customDisplays[slug];
  if (CustomDisplay) {
    return <CustomDisplay />;
  }

  // Interactive components - generic handling
  if (needsSpecialHandling(slug) && !["card", "textarea"].includes(slug)) {
    const code = getComponentCode(slug);
    return (
      <Suspense fallback={<div className="h-16 animate-pulse bg-muted/50 rounded-lg" />}>
        <div className="space-y-4">
          <div className="p-8 rounded-xl bg-background border border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-sm font-medium">Interactive Component</p>
              <p className="text-xs mt-1">Requires user interaction - see code below</p>
            </div>
          </div>
          <CodeDisplay code={code} />
        </div>
      </Suspense>
    );
  }

  const hasVariants = variants.length > 0;
  const hasSizes = sizes.length > 0;

  // Simple component without variants or sizes
  if (!hasVariants && !hasSizes) {
    const defaultProps = getDefaultProps(slug);
    const code = getComponentCode(slug);

    return (
      <Suspense fallback={<div className="h-16 animate-pulse bg-muted/50 rounded-lg" />}>
        <div className="space-y-4">
          <PreviewContainer centered>
            <Component {...defaultProps} />
          </PreviewContainer>
          <CodeDisplay code={code} />
        </div>
      </Suspense>
    );
  }

  // Component with variants and/or sizes
  return (
    <Suspense fallback={<div className="h-40 animate-pulse bg-muted/50 rounded-lg" />}>
      <div className="space-y-8">
        {/* Variants */}
        {hasVariants && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Variants
              </h4>
            </div>
            <div
              className={
                slug === "alert"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                  : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
              }
            >
              {variants.map((v) => {
                const props = getDefaultProps(slug, v, undefined);
                const isSelected = selectedVariant === `variant-${v}`;
                return (
                  <button
                    key={v}
                    onClick={() => {
                      const newVariant = isSelected ? null : `variant-${v}`;
                      setSelectedVariant(newVariant);
                      onVariantChange?.(newVariant);

                      if (newVariant) {
                        trackEvent(TELEMETRY_EVENTS.DOCS_VARIANT_SELECTED, {
                          slug,
                          variant: v,
                          type: "variant",
                        });
                      }
                    }}
                    className={`flex flex-col rounded-xl border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    <div className="p-4 flex items-center justify-center min-h-[60px]">
                      <Component {...props} />
                    </div>
                    <div className="px-3 py-2 border-t border-inherit bg-muted/30 rounded-b-xl">
                      <span className="text-xs font-mono text-muted-foreground">{v}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sizes */}
        {hasSizes && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Sizes
            </h4>
            <div className="flex flex-wrap gap-4 items-end">
              {sizes.map((s) => {
                const props = getDefaultProps(slug, undefined, s);
                const isSelected = selectedVariant === `size-${s}`;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      const newVariant = isSelected ? null : `size-${s}`;
                      setSelectedVariant(newVariant);
                      onVariantChange?.(newVariant);

                      if (newVariant) {
                        trackEvent(TELEMETRY_EVENTS.DOCS_VARIANT_SELECTED, {
                          slug,
                          size: s,
                          type: "size",
                        });
                      }
                    }}
                    className={`flex flex-col items-center rounded-xl border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    <div className="p-4 flex items-center justify-center">
                      <Component {...props} />
                    </div>
                    <div className="px-3 py-2 border-t border-inherit bg-muted/30 rounded-b-xl w-full text-center">
                      <span className="text-xs font-mono text-muted-foreground">{s}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
