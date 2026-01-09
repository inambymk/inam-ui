"use client";

import { useState, useCallback } from "react";
import { Check, Copy, ClipboardCopy } from "lucide-react";
import { useAnalytics, TELEMETRY_EVENTS } from "@/lib/useAnalytics";

interface CopyButtonProps {
  text: string;
  variant?: "default" | "icon" | "minimal";
  className?: string;
  contentType?: string;
}

export default function CopyButton({
  text,
  variant = "default",
  className = "",
  contentType = "code",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setIsAnimating(true);

      // Track the copy event
      trackEvent(TELEMETRY_EVENTS.DOCS_CODE_COPIED, {
        content_type: contentType,
        content_length: text.length,
        content_preview: text.length > 50 ? text.substring(0, 50) + "..." : text,
      });

      setTimeout(() => {
        setCopied(false);
        setIsAnimating(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }, [text, contentType, trackEvent]);

  const baseClasses =
    "relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background";

  if (variant === "minimal") {
    return (
      <button
        onClick={handleCopy}
        className={`${baseClasses} p-1.5 rounded text-muted-foreground hover:text-foreground ${className}`}
        title={copied ? "Copied!" : "Copy to clipboard"}
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleCopy}
        className={`${baseClasses} p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground ${className}`}
        title={copied ? "Copied!" : "Copy to clipboard"}
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        <div className="relative h-4 w-4">
          {/* Copy icon with fade out */}
          <Copy
            className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
              copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          />
          {/* Check icon with fade in and bounce */}
          <Check
            className={`absolute inset-0 h-4 w-4 text-green-500 transition-all duration-200 ${
              copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />
        </div>
      </button>
    );
  }

  // Default variant with "Copied!" text
  return (
    <button
      onClick={handleCopy}
      className={`${baseClasses} gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted/50 text-sm font-medium ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      <div className="relative h-4 w-4">
        <ClipboardCopy
          className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
            copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
          }`}
        />
        <Check
          className={`absolute inset-0 h-4 w-4 text-green-500 transition-all duration-200 ${
            copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        />
      </div>
      <span
        className={`transition-all duration-200 ${
          isAnimating ? "text-green-500" : "text-foreground"
        }`}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}
