"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllSlugs } from "@/components/pages/component-docs/registry";

interface ComponentNavigationProps {
  currentSlug: string;
}

export function ComponentNavigation({ currentSlug }: ComponentNavigationProps) {
  const allSlugs = getAllSlugs();
  const currentIndex = allSlugs.indexOf(currentSlug);

  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  // Capitalize slug for display
  const formatName = (slug: string) => slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="flex items-center justify-between pt-8 mt-12 border-t border-border">
      {/* Previous Component */}
      {previousSlug ? (
        <Link
          href={`/components/${previousSlug}`}
          className="group flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-all"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {formatName(previousSlug)}
            </span>
          </div>
        </Link>
      ) : (
        <div /> // Empty div for spacing
      )}

      {/* Next Component */}
      {nextSlug ? (
        <Link
          href={`/components/${nextSlug}`}
          className="group flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-all"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {formatName(nextSlug)}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      ) : (
        <div /> // Empty div for spacing
      )}
    </div>
  );
}
