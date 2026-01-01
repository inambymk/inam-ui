"use client";

import { useState } from "react";
import { Palette, Sparkles } from "lucide-react";
import { useColorTheme } from "@/components/ThemeProvider";

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
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-muted/10 to-background border-y border-border/40 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--primary)_0%,transparent_50%)] opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,var(--accent)_0%,transparent_50%)] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Palette className="h-4 w-4" />
            Fully Customizable
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            See Your Components in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mt-2">
              Every Color Palette
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Switch themes instantly and preview how all components adapt to your chosen color
            scheme. Perfect for maintaining brand consistency across your entire application.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="/themes"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
            >
              <Palette className="h-4 w-4" />
              Learn how to configure themes
            </a>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {themes.map((theme) => {
            const isActive = colorTheme === theme.id;
            const isHovered = hoveredTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => setColorTheme(theme.id as (typeof themes)[number]["id"])}
                onMouseEnter={() => setHoveredTheme(theme.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                    : "border-border bg-card hover:shadow-md"
                }`}
              >
                {/* Theme color preview */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl border-2 transition-all duration-300`}
                    style={{
                      backgroundColor: theme.color,
                      borderColor: theme.color,
                    }}
                  />
                  <div className="flex-1 text-left">
                    <div
                      className="font-semibold text-foreground transition-colors"
                      style={{
                        color: theme.color,
                      }}
                    >
                      {theme.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {theme.id === colorTheme ? "Active" : "Click to preview"}
                    </div>
                  </div>
                </div>

                {/* Mini component preview */}
                <div className="space-y-2">
                  <div
                    className="h-8 rounded-lg transition-colors"
                    style={{ backgroundColor: theme.color, opacity: 0.9 }}
                  />
                  <div className="flex gap-2">
                    <div
                      className="h-6 flex-1 rounded-md transition-colors"
                      style={{ backgroundColor: theme.color, opacity: 0.6 }}
                    />
                    <div
                      className="h-6 flex-1 rounded-md transition-colors"
                      style={{ backgroundColor: theme.color, opacity: 0.3 }}
                    />
                  </div>
                </div>

                {/* Hover glow effect */}
                {(isActive || isHovered) && (
                  <div
                    className="absolute inset-0 rounded-2xl -z-10 blur-xl opacity-20 transition-opacity"
                    style={{ backgroundColor: theme.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Instant Preview</h3>
              <p className="text-sm text-muted-foreground">
                See all components update in real-time as you switch themes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Full Control</h3>
              <p className="text-sm text-muted-foreground">
                Customize colors in your code to match your exact brand
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Zero Config</h3>
              <p className="text-sm text-muted-foreground">
                Works out of the box with Tailwind CSS theming
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeShowcase;
