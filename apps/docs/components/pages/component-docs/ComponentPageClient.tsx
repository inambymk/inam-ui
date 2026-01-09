"use client";

import CopyButton from "@/components/CopyButton";
import { getComponent } from "@/components/pages/component-docs/componentLoader";
import { VariantGrid, PropsTable } from "@/components/pages/component-docs/shared";
import { ComponentNavigation } from "@/components/pages/component-docs/shared/ComponentNavigation";
import { ComponentConfig } from "@/components/pages/component-docs/types";
import {
  CheckboxWrapper,
  RadioWrapper,
  SwitchWrapper,
  CardWrapper,
  AlertWrapper,
} from "@/components/pages/component-docs/shared/ComponentWrappers";
import { Terminal, Keyboard, BookOpen, Info } from "lucide-react";

interface ComponentPageClientProps {
  slug: string;
  config: ComponentConfig;
}

// Map of components that need state wrappers
const INTERACTIVE_WRAPPERS: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ component: React.ComponentType<any>; [key: string]: any }>
> = {
  checkbox: CheckboxWrapper,
  radio: RadioWrapper,
  switch: SwitchWrapper,
  card: CardWrapper,
  alert: AlertWrapper,
};

function ComponentPreview({
  Component,
  defaultProps,
  slug,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
  defaultProps?: Record<string, unknown>;
  slug: string;
}) {
  const Wrapper = INTERACTIVE_WRAPPERS[slug];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Preview
      </h3>
      <div className="p-6 rounded-lg border border-border bg-background flex items-center justify-center">
        {Wrapper ? (
          <Wrapper component={Component} {...defaultProps} />
        ) : (
          <Component {...defaultProps} />
        )}
      </div>
    </div>
  );
}

function UsageExamples({ examples }: { examples: ComponentConfig["usageExamples"] }) {
  if (!examples || examples.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Usage Examples</h2>
      </div>
      <div className="space-y-6">
        {examples.map((example, index) => (
          <div key={index} className="space-y-3">
            <div>
              <h3 className="font-medium text-foreground">{example.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
            </div>
            <div className="relative">
              <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto">
                <code className="text-sm font-mono">{example.code}</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={example.code} variant="icon" contentType="usage-example" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccessibilityInfo({ accessibility }: { accessibility: ComponentConfig["accessibility"] }) {
  if (!accessibility) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Keyboard className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Accessibility</h2>
      </div>
      <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border">
        {accessibility.keyboard && accessibility.keyboard.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Keyboard Navigation</h3>
            <ul className="space-y-1">
              {accessibility.keyboard.map((key, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{key}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {accessibility.ariaLabels && accessibility.ariaLabels.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">ARIA Labels</h3>
            <ul className="space-y-1">
              {accessibility.ariaLabels.map((label, index) => (
                <li key={index} className="text-sm">
                  <code className="px-2 py-0.5 rounded bg-muted text-xs font-mono text-primary">
                    {label}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}

        {accessibility.screenReader && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Screen Reader</h3>
            <p className="text-sm text-muted-foreground">{accessibility.screenReader}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RelatedComponents({ related }: { related?: string[] }) {
  if (!related || related.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Related Components</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {related.map((slug) => (
          <a
            key={slug}
            href={`/components/${slug}`}
            className="px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted/50 hover:border-primary/30 text-sm font-medium text-foreground transition-colors"
          >
            {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
}

export function ComponentPageClient({ slug, config }: ComponentPageClientProps) {
  const Component = getComponent(slug);

  if (!Component) {
    return <div className="text-center py-12 text-muted-foreground">Component not found</div>;
  }

  const hasVariants = config.variants && config.variants.length > 0;
  const hasSizes = config.sizes && config.sizes.length > 0;
  const needsSimplePreview = !hasVariants && !hasSizes;
  const command = `npx inam-ui add ${slug}`;

  const Wrapper = INTERACTIVE_WRAPPERS[slug];

  return (
    <div className="space-y-8 pb-12">
      {/* Header with Metadata */}
      <header className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{config.name}</h1>
            {config.category && (
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
                {config.category}
              </span>
            )}
          </div>
          {config.metadata && (
            <div className="text-right text-sm text-muted-foreground">
              {config.metadata.version && <div>v{config.metadata.version}</div>}
              {config.metadata.status && <div className="capitalize">{config.metadata.status}</div>}
            </div>
          )}
        </div>
        <p className="text-muted-foreground max-w-2xl">{config.description}</p>
      </header>

      {/* Simple Preview for components without variants */}
      {needsSimplePreview && (
        <ComponentPreview Component={Component} defaultProps={config.defaultProps} slug={slug} />
      )}

      {/* Variant Previews */}
      {hasVariants && (
        <VariantGrid
          variants={config.variants!}
          renderVariant={(variant) =>
            Wrapper ? (
              <Wrapper component={Component} {...config.defaultProps} variant={variant} />
            ) : (
              <Component {...config.defaultProps} variant={variant} />
            )
          }
        />
      )}

      {/* Size Previews */}
      {hasSizes && (
        <VariantGrid
          variants={config.sizes!}
          renderVariant={(size) =>
            Wrapper ? (
              <Wrapper component={Component} {...config.defaultProps} size={size} />
            ) : (
              <Component {...config.defaultProps} size={size} />
            )
          }
          title="Sizes"
        />
      )}

      {/* CLI Command */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
        <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
        <code className="flex-1 text-sm font-mono text-foreground select-all">{command}</code>
        <CopyButton text={command} variant="icon" contentType="cli-command" />
      </div>

      {/* Usage Examples */}
      <UsageExamples examples={config.usageExamples} />

      {/* Accessibility */}
      <AccessibilityInfo accessibility={config.accessibility} />

      {/* Props Table */}
      <PropsTable props={config.props} />

      {/* Related Components */}
      <RelatedComponents related={config.relatedComponents} />

      {/* Navigation */}
      <ComponentNavigation currentSlug={slug} />
    </div>
  );
}
