"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { componentsMetadata } from "@/lib/components-data";
import { useAnalytics, TELEMETRY_EVENTS } from "@/lib/useAnalytics";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchContent({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  // Filter and sort components based on search query
  const filteredComponents = componentsMetadata
    .filter(
      (comp) =>
        comp.name.toLowerCase().includes(query.toLowerCase()) ||
        comp.description.toLowerCase().includes(query.toLowerCase()) ||
        comp.category.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: resetting selection when search results change
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      trackEvent(TELEMETRY_EVENTS.DOCS_SEARCH_PERFORMED, {
        query: query,
        results_count: filteredComponents.length,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [query, filteredComponents.length, trackEvent]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredComponents.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredComponents.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredComponents[selectedIndex]) {
            const selectedComp = filteredComponents[selectedIndex];

            trackEvent(TELEMETRY_EVENTS.DOCS_SEARCH_RESULT_CLICKED, {
              result_type: "component",
              result_name: selectedComp.name,
              result_slug: selectedComp.slug,
              via: "keyboard",
            });

            router.push(`/components/${selectedComp.slug}`);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [filteredComponents, selectedIndex, router, onClose, trackEvent]
  );

  return (
    <div
      className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      {/* Search Input */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          aria-label="Search components"
        />
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close search"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Results */}
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {filteredComponents.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>No components found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="space-y-1" role="listbox">
            {filteredComponents.map((comp, index) => (
              <Link
                key={comp.slug}
                href={`/components/${comp.slug}`}
                onClick={() => {
                  trackEvent(TELEMETRY_EVENTS.DOCS_SEARCH_RESULT_CLICKED, {
                    result_type: "component",
                    result_name: comp.name,
                    result_slug: comp.slug,
                    via: "click",
                  });
                  onClose();
                }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  index === selectedIndex ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
                }`}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    index === selectedIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="text-sm font-bold">{comp.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{comp.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{comp.description}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                  {comp.category}
                </span>
                {index === selectedIndex && (
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">↓</kbd>
            <span className="ml-1">Navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">↵</kbd>
            <span className="ml-1">Select</span>
          </span>
        </div>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">Esc</kbd>
          <span className="ml-1">Close</span>
        </span>
      </div>
    </div>
  );
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-background/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Search components"
    >
      <Suspense
        fallback={
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        }
      >
        <SearchContent onClose={onClose} />
      </Suspense>
    </div>
  );
}

/**
 * Hook to manage search dialog state with keyboard shortcut
 */
export function useSearchDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Register Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
}
