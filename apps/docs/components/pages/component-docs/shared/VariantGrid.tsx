"use client";

import { ReactNode } from "react";

interface VariantGridProps {
  variants: { value: string; label?: string }[];
  renderVariant: (variant: string) => ReactNode;
  title?: string;
}

export function VariantGrid({ variants, renderVariant, title = "Variants" }: VariantGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((v) => (
          <div
            key={v.value}
            className="group flex flex-col rounded-2xl border-2 border-border/60 bg-gradient-to-br from-card via-card to-muted/20 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative p-8 flex items-center justify-center min-h-[120px] bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm">
              {renderVariant(v.value)}
              {/* Decorative corner accent */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
            </div>
            <div className="px-4 py-3 border-t-2 border-border/60 bg-card/80 backdrop-blur-sm">
              <span className="text-xs font-mono text-muted-foreground font-semibold tracking-wide">
                {v.label || v.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
