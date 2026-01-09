"use client";

import Link from "next/link";
import { ComponentMetadata } from "@/lib/components-data";
import { ArrowRight, ArrowUpRight, Plus, Hash } from "lucide-react";

interface ComponentPreviewProps {
  featuredComponents: ComponentMetadata[];
}

const ComponentPreview = ({ featuredComponents }: ComponentPreviewProps) => {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute right-[5%] top-0 h-full w-[1px] bg-border/20 hidden xl:block" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20 border-b border-border/40 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 bg-primary/20 border-2 border-primary/40 rounded-full flex items-center justify-center text-primary">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-black uppercase tracking-[0.4em] text-muted-foreground">
                The.Component.Directory
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground uppercase leading-[0.8] tracking-tighter">
              The <br />
              <span className="text-primary italic underline decoration-primary/20 underline-offset-8 decoration-8 pt-4 inline-block">
                Directory.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className="max-w-xs text-muted-foreground font-medium leading-tight">
              Each module is an isolated piece of logic and design, ready to be dropped into your
              architectural stack.
            </p>
            <Link
              href="/components"
              className="group flex gap-2 items-center text-foreground font-black uppercase text-xs tracking-widest border-b-2 border-primary/40 pb-1 hover:border-primary transition-colors"
            >
              Access Full Library
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* BRUTALIST GRID: EXHIBIT FRAMES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredComponents.map((comp, idx) => (
            <Link
              key={comp.slug}
              href={`/components/${comp.slug}`}
              className={`group relative aspect-[4/5] bg-card border border-border/60 rounded-[3rem] p-10 flex flex-col justify-between transition-all duration-500 hover:border-primary/50 hover:-rotate-1 active:scale-95 ${
                idx % 2 === 1 ? "md:translate-y-12" : ""
              }`}
            >
              {/* Internal Framing */}
              <div className="absolute inset-4 border border-foreground/[0.03] rounded-[2.5rem] pointer-events-none" />

              <div className="relative flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-primary mb-1">
                    0{idx + 1}
                  </span>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                    {comp.name}
                  </h3>
                </div>
                <Hash className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>

              {/* Mock Visual (Technical) */}
              <div className="relative h-40 w-full bg-muted/20 border border-muted-foreground/10 rounded-2xl flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all">
                <div className="w-full space-y-3">
                  <div className="h-2 w-full bg-foreground/10 rounded-full" />
                  <div className="h-2 w-3/4 bg-primary/40 rounded-full" />
                  <div className="h-2 w-1/2 bg-foreground/5 rounded-full" />
                  <div className="pt-4 flex gap-2">
                    <div className="h-6 w-12 bg-primary/20 rounded-lg" />
                    <div className="h-6 w-6 bg-muted rounded-full" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <p className="text-sm text-muted-foreground font-medium mb-6 line-clamp-2 leading-snug">
                  {comp.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                  Inspect Build{" "}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Subtle kinetic overlay (No gradient) */}
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
            </Link>
          ))}
        </div>

        {/* FINAL CALLOUT (Simple & Large) */}
        <div className="mt-40 flex flex-col items-center">
          <div className="h-20 w-[1px] bg-primary mb-8" />
          <Link
            href="/components"
            className="group relative h-20 px-16 bg-foreground text-background font-black text-2xl uppercase rounded-full flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
          >
            System Complete
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
          </Link>
          <div className="mt-8 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.8em]">
            Explore.Every.Module
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentPreview;
