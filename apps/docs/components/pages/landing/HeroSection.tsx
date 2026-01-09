"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
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
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-background overflow-hidden px-6 md:px-12">
      {/* --- BACKGROUND DECORATION (SOLID ONLY, NO GRADIENTS) --- */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-foreground/[0.02] -skew-x-12 transform origin-top translate-x-20 hidden lg:block" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COMPONENT: BOLD TYPOGRAPHY */}
        <div className="lg:col-span-8 flex flex-col items-start gap-8">
          {/* Version Label */}
          <div className="flex items-center space-x-2 px-4 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase mb-4 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
            <span>Core v0.1.2 Released</span>
          </div>

          {/* Headline: The Kinetic Split */}
          <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black leading-[0.8] tracking-tighter text-foreground uppercase select-none">
            Build <br className="hidden md:block" />
            <span className="text-primary italic">Faster.</span> <br className="hidden md:block" />
            Better <br className="hidden md:block" />
            <span className="inline-block relative">
              UX.
              <div className="absolute -bottom-2 left-0 w-full h-4 md:h-8 bg-primary/20 -z-10 rounded-full" />
            </span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-medium leading-tight">
            A premium component system for React. No gradients, no fluff. Just pure, precise
            building blocks with a modern touch.
          </p>

          <div className="flex flex-wrap gap-6 mt-4">
            <Link
              href="/components"
              onClick={() =>
                trackEvent(TELEMETRY_EVENTS.DOCS_CTA_CLICKED, {
                  location: "hero",
                  destination: "/components",
                })
              }
              className="group h-16 px-12 bg-primary text-primary-foreground font-black text-xl flex items-center gap-3 rounded-2xl hover:translate-x-2 hover:-translate-y-1 transition-all active:scale-95 shadow-[0_8px_0_rgb(var(--primary-foreground)/0.1)]"
            >
              Get Started
              <ArrowRight className="w-6 h-6 border-2 border-primary-foreground rounded-full p-0.5" />
            </Link>
          </div>
        </div>

        {/* RIGHT COMPONENT: THE COMMAND BLOCK */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* CLI Anchor */}
          <div className="relative aspect-square md:aspect-auto md:min-h-[380px] flex flex-col justify-end p-8 bg-foreground text-background overflow-hidden group rounded-[2.5rem] shadow-2xl">
            {/* Visual interest: Geometric static blocks (Softened) */}
            <div className="absolute top-8 right-8 w-20 h-20 bg-primary rounded-3xl rotate-12" />
            <div className="absolute top-24 right-16 w-12 h-12 bg-primary/40 rounded-2xl -rotate-12" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="w-16 h-1.5 my-4 bg-background rounded-full" />
              <h3 className="text-4xl md:text-5xl font-black leading-none">
                CLI <br />
                DRIVEN.
              </h3>
              <p className="text-sm font-mono opacity-60">
                Setup and add components in seconds. Optimized for Tailwind.
              </p>

              <div
                onClick={copyCommand}
                className="mt-6 flex flex-col bg-background/10 border border-background/20 p-5 font-mono text-sm cursor-pointer hover:bg-background/20 transition-all group/cli rounded-2xl"
              >
                <div className="flex items-center justify-between mb-3 opacity-40 text-[10px] font-bold">
                  <span>TERMINAL EXECUTION</span>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-background" />
                    <span className="w-2 h-2 rounded-full bg-background" />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-background font-bold text-base">
                  <span className="text-primary">$</span>
                  <code>{command}</code>
                  <div className="ml-auto opacity-40 group-hover/cli:opacity-100 transition-opacity">
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 border border-background/40 rounded p-0.5" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature List: Simple Solid Tags (Softened) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="px-5 py-4 border border-border flex items-center justify-between font-mono text-[10px] uppercase font-bold text-muted-foreground group hover:border-foreground hover:text-foreground transition-colors cursor-default rounded-2xl">
              <span>TypeScript</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
            </div>
            <div className="px-5 py-4 border border-border flex items-center justify-between font-mono text-[10px] uppercase font-bold text-muted-foreground group hover:border-foreground hover:text-foreground transition-colors cursor-default rounded-2xl">
              <span>Accessible</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
            </div>
            <div className="px-5 py-4 border border-border flex items-center justify-between font-mono text-[10px] uppercase font-bold text-muted-foreground group hover:border-foreground hover:text-foreground transition-colors cursor-default rounded-2xl">
              <span>Themable</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
            </div>
            <div className="px-5 py-4 border border-border flex items-center justify-between font-mono text-[10px] uppercase font-bold text-muted-foreground group hover:border-foreground hover:text-foreground transition-colors cursor-default rounded-2xl">
              <span>Open Source</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical running text */}
      <div className="absolute left-6 bottom-16 hidden xl:block">
        <div className="text-[9px] font-mono font-black text-foreground/10 rotate-180 vertical-rl uppercase tracking-[0.5em] select-none">
          Inam.UI.Standard.Library.System.V1
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
