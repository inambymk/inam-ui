"use client";

import { Palette, Sparkles, Box } from "lucide-react";
import { useColorTheme, type ColorTheme } from "@/components/ThemeProvider";

const themes = [
  { id: "indigo", name: "Indigo", color: "hsl(239 84% 67%)" },
  { id: "purple", name: "Purple", color: "hsl(280 87% 65%)" },
  { id: "rose", name: "Rose", color: "hsl(330 81% 60%)" },
  { id: "crimson", name: "Crimson", color: "hsl(348 83% 58%)" },
  { id: "orange", name: "Orange", color: "hsl(25 95% 53%)" },
  { id: "amber", name: "Amber", color: "hsl(38 92% 50%)" },
  { id: "teal", name: "Teal", color: "hsl(173 80% 40%)" },
  { id: "green", name: "Green", color: "hsl(142 76% 45%)" },
] as const;

const ThemeShowcase = () => {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden border-y border-border/40">
      {/* BACKGROUND ELEMENTS (No gradients) */}
      <div className="absolute left-0 top-0 w-[40%] h-full bg-foreground/[0.01] border-r border-border/10 hidden xl:block" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT: CONTENT & LABELS */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary font-mono text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                <Palette className="h-3 w-3" /> System.Themer
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-foreground uppercase leading-[0.9] tracking-tighter mb-8">
                Infinite <br />
                <span className="text-primary italic">Atmosphere.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-tight max-w-md">
                Switch between curated palettes or define your own. Our system adapts instantly,
                maintaining perfect contrast and accessibility.
              </p>
            </div>

            {/* THEME CONTROL STRIP */}
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => {
                const isActive = colorTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setColorTheme(theme.id as ColorTheme)}
                    className={`relative p-1.5 transition-all duration-300 rounded-full group ${
                      isActive ? "bg-primary ring-4 ring-primary/20" : "bg-muted/40 hover:bg-muted"
                    }`}
                    title={theme.name}
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-background/20"
                      style={{ backgroundColor: theme.color }}
                    />
                    {isActive && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] font-mono font-bold uppercase rounded pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground">
                        {theme.name}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl border border-border/40">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-mono font-black uppercase text-foreground">
                  Variable Sync
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl border border-border/40">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span className="text-xs font-mono font-black uppercase text-foreground">
                  A11y Validated
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: THE STAGE */}
          <div className="relative">
            {/* The Stage Frame */}
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square bg-card border-[12px] md:border-[24px] border-muted/50 rounded-[3rem] p-8 md:p-12 flex flex-col justify-between shadow-2xl overflow-hidden transition-colors duration-500">
              {/* Animated Title in Stage */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-primary rounded-full" />
                  <div className="h-2 w-8 bg-muted rounded-full" />
                </div>
                <Box className="w-8 h-8 text-primary" />
              </div>

              {/* Mock Component Display */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest opacity-50">
                    Theme_Selection.Active
                  </div>
                  <div className="h-12 w-full bg-primary flex items-center justify-center rounded-2xl">
                    <span className="text-primary-foreground font-black uppercase">
                      Primary Action
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-muted/40 border border-muted-foreground/10 rounded-3xl p-4 flex flex-col justify-end">
                    <div className="h-2 w-1/2 bg-foreground/10 rounded-full" />
                  </div>
                  <div className="h-24 bg-primary/20 border-2 border-primary/40 rounded-3xl p-4 flex flex-col justify-end">
                    <div className="h-2 w-1/2 bg-primary rounded-full" />
                  </div>
                </div>
              </div>

              {/* Stage Footer */}
              <div className="flex justify-between items-center pt-8 border-t border-muted">
                <span className="text-[9px] font-mono text-muted-foreground font-bold">
                  SYSTEM_RENDER_V1
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Absolute Decorative Specs */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[.5em] hidden md:block">
                Atmospheric_Buffer_Overflow
              </div>
            </div>

            {/* Offset Shadow Card (Static) */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full border border-border/60 rounded-[3.5rem] bg-transparent hidden lg:block" />
          </div>
        </div>

        {/* Learn More link */}
        <div className="mt-20 flex justify-center">
          <a
            href="/themes"
            className="group flex gap-4 items-center bg-foreground text-background px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform active:scale-95"
          >
            Master the variable system
            <div className="w-6 h-6 rounded-full border border-background/20 flex items-center justify-center bg-primary">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThemeShowcase;
