"use client";

import Link from "next/link";
import { Github, ArrowRight } from "lucide-react";
import { useAnalytics, TELEMETRY_EVENTS } from "@/lib/useAnalytics";

const CtaSection = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section className="relative py-12 lg:py-16 bg-background overflow-hidden px-4">
      {/* MASSIVE DECORATIVE SHAPE (No gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-foreground opacity-[0.02] rounded-full -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          {/* THE MAIN BLOCK */}
          <div className="relative bg-foreground text-background rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 lg:p-16 flex flex-col items-center text-center overflow-hidden shadow-2xl">
            {/* Internal Accent Block (Solid) */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary rounded-bl-[4rem] md:rounded-bl-[6rem] -z-0" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-background/10 border border-background/20 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-12 backdrop-blur-sm">
                Ready for the system?
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
                Start <br />
                <span className="text-primary italic">Building.</span>
              </h2>

              <p className="max-w-xl text-md md:text-xl opacity-60 font-medium leading-tight mb-10 px-4">
                Join the architects of the modern web. Download the CLI and start crafting
                high-precision interfaces in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8 w-full justify-center">
                <Link
                  href="/components"
                  onClick={() =>
                    trackEvent(TELEMETRY_EVENTS.DOCS_CTA_CLICKED, {
                      location: "cta_section",
                      destination: "/components",
                    })
                  }
                  className="group/btn relative h-20 px-16 bg-primary text-primary-foreground font-black text-2xl uppercase rounded-full flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                >
                  Initialize Now
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-3 transition-transform" />
                </Link>

                <a
                  href="https://github.com/inambymk/inam-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent(TELEMETRY_EVENTS.DOCS_CTA_CLICKED, {
                      location: "cta_section",
                      destination: "github",
                    })
                  }
                  className="flex items-center gap-4 group/git"
                >
                  <div className="h-20 w-20 bg-background/10 border border-background/20 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Github className="w-8 h-8 text-background" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-black uppercase tracking-widest opacity-40">
                      Open Source
                    </span>
                    <span className="text-sm font-bold flex items-center gap-2 group-hover/git:text-primary transition-colors">
                      View on GitHub
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Technical specs in block */}
            <div className="absolute bottom-12 left-12 text-[10px] font-mono text-background/20 uppercase vertical-rl tracking-[1em] hidden md:block">
              Inam_Core.System_Output_Active
            </div>
          </div>

          {/* Floating Geometric Elements (No gradients) */}
          <div className="absolute -top-12 -left-12 w-48 h-48 border-[20px] border-primary/10 rounded-full -z-10 bg-transparent" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-foreground/5 rounded-[2rem] -z-10 rotate-45" />
        </div>

        {/* Footer info row */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-border/40 pt-12 opacity-50">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                MIT Specification
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Zero Registry bloat
              </span>
            </div>
          </div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">
            The Precision Standard. © 2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
