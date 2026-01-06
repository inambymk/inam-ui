"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Terminal } from "lucide-react";
import { componentsMetadata } from "@/lib/components-data";
import { useAnalytics, TELEMETRY_EVENTS } from "@/lib/useAnalytics";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx inam-ui add button";
  const { trackEvent } = useAnalytics();

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);

    trackEvent(TELEMETRY_EVENTS.DOCS_INSTALL_COMMAND_COPIED, {
      command: command,
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-background border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted text-xs font-medium text-foreground mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              v0.1.1 Now Available
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Build better <br />
              <span className="text-primary">interfaces</span> fast.
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-lg mb-10">
              A curated collection of premium, accessible React components. Copy and paste into your
              apps. Open source and free forever.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/components"
                onClick={() =>
                  trackEvent(TELEMETRY_EVENTS.DOCS_CTA_CLICKED, {
                    location: "hero",
                    destination: "/components",
                  })
                }
                className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                Browse Components
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-foreground/80 font-medium">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{componentsMetadata.length}+ Components</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>TypeScript Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unique Terminal */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            {/* Terminal Window */}
            <div className="relative rounded-xl bg-[#1e1e1e] border border-neutral-800 shadow-2xl overflow-hidden">
              {/* Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#252525] border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 opacity-60">
                  <Terminal className="h-3 w-3" />
                  bash
                </div>
                <div className="w-10" /> {/* Spacer for balance */}
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm sm:text-base leading-relaxed text-neutral-300 min-h-[140px] flex flex-col justify-center">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">$</span>
                    <span className="text-white">npx</span>
                    <span className="text-white">inam-ui</span>
                    <span className="text-primary">add</span>
                    <span className="text-primary">button</span>
                    <span className="w-2 h-5 bg-primary animate-pulse ml-1" />
                  </div>

                  <button
                    onClick={copyCommand}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white"
                    aria-label="Copy command"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative minimal accent behind */}
            <div className="absolute -z-10 -bottom-6 -right-6 h-full w-full rounded-xl border border-border/60 bg-transparent" />
          </div>
        </div>

        {/* Theme Hint - Subtle indicator */}
        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <svg
            className="h-4 w-4 text-primary animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <span className="font-medium">Fully customizable</span>
          <span className="hidden sm:inline">—</span>
          <span className="hidden sm:inline">See your components in any color palette</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
