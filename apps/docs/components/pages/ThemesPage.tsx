"use client";

import { useColorTheme } from "@/components/ThemeProvider";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAnalytics, TELEMETRY_EVENTS } from "@/lib/useAnalytics";

// --- Theme Data Extraction ---

const commonLight = {
  background: "hsl(0 0% 100%)",
  foreground: "hsl(222 47% 11%)",
  card: "hsl(0 0% 100%)",
  cardForeground: "hsl(222 47% 11%)",
  popover: "hsl(0 0% 100%)",
  popoverForeground: "hsl(222 47% 11%)",
  secondary: "hsl(210 20% 96%)",
  secondaryForeground: "hsl(222 47% 11%)",
  muted: "hsl(210 20% 96%)",
  mutedForeground: "hsl(215 16% 47%)",
  destructive: "hsl(0 84% 60%)",
  destructiveForeground: "hsl(0 0% 100%)",
  border: "hsl(214 32% 91%)",
  input: "hsl(214 32% 91%)",
  radius: "0.625rem",
};

const commonDark = {
  background: "hsl(222 47% 6%)",
  foreground: "hsl(210 20% 98%)",
  card: "hsl(222 47% 8%)",
  cardForeground: "hsl(210 20% 98%)",
  popover: "hsl(222 47% 8%)",
  popoverForeground: "hsl(210 20% 98%)",
  secondary: "hsl(217 33% 17%)",
  secondaryForeground: "hsl(210 20% 98%)",
  muted: "hsl(217 33% 17%)",
  mutedForeground: "hsl(215 20% 65%)",
  destructive: "hsl(0 72% 55%)",
  destructiveForeground: "hsl(210 20% 98%)",
  border: "hsl(217 33% 17%)",
  input: "hsl(217 33% 17%)",
};

const themesConfig = {
  indigo: {
    name: "Indigo",
    color: "hsl(239 84% 67%)",
    light: {
      primary: "hsl(239 84% 67%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(243 75% 59%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(239 84% 67%)",
      glowColor: "rgba(99, 102, 241, 0.2)",
    },
    dark: {
      primary: "hsl(239 84% 72%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(243 75% 64%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(239 84% 72%)",
      glowColor: "rgba(129, 140, 248, 0.15)",
    },
  },
  purple: {
    name: "Purple",
    color: "hsl(280 87% 65%)",
    light: {
      primary: "hsl(280 87% 65%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(291 84% 61%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(280 87% 65%)",
      glowColor: "rgba(168, 85, 247, 0.2)",
    },
    dark: {
      primary: "hsl(280 87% 70%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(291 84% 66%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(280 87% 70%)",
      glowColor: "rgba(192, 132, 252, 0.15)",
    },
  },
  rose: {
    name: "Rose",
    color: "hsl(330 81% 60%)",
    light: {
      primary: "hsl(330 81% 60%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(338 76% 59%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(330 81% 60%)",
      glowColor: "rgba(244, 63, 94, 0.2)",
    },
    dark: {
      primary: "hsl(330 81% 65%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(338 76% 64%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(330 81% 65%)",
      glowColor: "rgba(251, 113, 133, 0.15)",
    },
  },
  crimson: {
    name: "Crimson",
    color: "hsl(348 83% 58%)",
    light: {
      primary: "hsl(348 83% 58%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(355 90% 61%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(348 83% 58%)",
      glowColor: "rgba(225, 29, 72, 0.2)",
    },
    dark: {
      primary: "hsl(348 83% 63%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(355 90% 66%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(348 83% 63%)",
      glowColor: "rgba(244, 63, 94, 0.15)",
    },
  },
  orange: {
    name: "Orange",
    color: "hsl(25 95% 53%)",
    light: {
      primary: "hsl(25 95% 53%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(35 95% 50%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(25 95% 53%)",
      glowColor: "rgba(249, 115, 22, 0.2)",
    },
    dark: {
      primary: "hsl(25 95% 58%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(35 95% 55%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(25 95% 58%)",
      glowColor: "rgba(251, 146, 60, 0.15)",
    },
  },
  amber: {
    name: "Amber",
    color: "hsl(38 92% 50%)",
    light: {
      primary: "hsl(38 92% 50%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(43 96% 56%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(38 92% 50%)",
      glowColor: "rgba(251, 191, 36, 0.2)",
    },
    dark: {
      primary: "hsl(38 92% 55%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(43 96% 61%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(38 92% 55%)",
      glowColor: "rgba(252, 211, 77, 0.15)",
    },
  },
  teal: {
    name: "Teal",
    color: "hsl(173 80% 40%)",
    light: {
      primary: "hsl(173 80% 40%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(180 77% 47%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(173 80% 40%)",
      glowColor: "rgba(20, 184, 166, 0.2)",
    },
    dark: {
      primary: "hsl(173 80% 45%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(180 77% 52%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(173 80% 45%)",
      glowColor: "rgba(45, 212, 191, 0.15)",
    },
  },
  green: {
    name: "Green",
    color: "hsl(142 76% 45%)",
    light: {
      primary: "hsl(142 76% 40%)",
      primaryForeground: "hsl(0 0% 100%)",
      accent: "hsl(152 70% 45%)",
      accentForeground: "hsl(0 0% 100%)",
      ring: "hsl(142 76% 40%)",
      glowColor: "rgba(34, 197, 94, 0.2)",
    },
    dark: {
      primary: "hsl(142 76% 50%)",
      primaryForeground: "hsl(222 47% 6%)",
      accent: "hsl(152 70% 50%)",
      accentForeground: "hsl(222 47% 6%)",
      ring: "hsl(142 76% 50%)",
      glowColor: "rgba(74, 222, 128, 0.15)",
    },
  },
} as const;

type ThemeKey = keyof typeof themesConfig;

export default function ThemesPage() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const { trackEvent } = useAnalytics();

  // Local state for the configuration viewer
  const [selectedConfigTheme, setSelectedConfigTheme] = useState<ThemeKey>(
    (Object.keys(themesConfig).includes(colorTheme) ? colorTheme : "indigo") as ThemeKey
  );

  const [activeTab, setActiveTab] = useState<"v4" | "v3">("v4");

  const handleThemeSelect = (themeId: ThemeKey) => {
    setColorTheme(themeId);
    setSelectedConfigTheme(themeId);

    trackEvent(TELEMETRY_EVENTS.DOCS_THEME_PRESET_SELECTED, {
      theme_id: themeId,
      theme_name: themesConfig[themeId].name,
    });
  };

  const themeData = themesConfig[selectedConfigTheme];

  const renderV4Code = () => {
    return `@import "tailwindcss";

@theme {
  --font-sans: "Inter", var(--font-geist-sans), ui-sans-serif, system-ui;
  --font-mono: "JetBrains Mono", var(--font-geist-mono), ui-monospace, monospace;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.4s ease-out;
  --animate-pulse-glow: pulse-glow 2s ease-in-out infinite;

  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--accordion-content-height); }
  }

  @keyframes accordion-up {
    from { height: var(--accordion-content-height); }
    to { height: 0; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px var(--glow-color, ${themeData.light.glowColor}); }
    50% { box-shadow: 0 0 40px var(--glow-color, ${themeData.light.glowColor.replace("0.2", "0.3").replace("0.15", "0.25")}); }
  }
}

@layer base {

  /* ===== LIGHT MODE (${themeData.name}) ===== */
  :root {
    --background: ${commonLight.background};
    --foreground: ${commonLight.foreground};
    --card: ${commonLight.card};
    --card-foreground: ${commonLight.cardForeground};
    --popover: ${commonLight.popover};
    --popover-foreground: ${commonLight.popoverForeground};
    --secondary: ${commonLight.secondary};
    --secondary-foreground: ${commonLight.secondaryForeground};
    --muted: ${commonLight.muted};
    --muted-foreground: ${commonLight.mutedForeground};
    --destructive: ${commonLight.destructive};
    --destructive-foreground: ${commonLight.destructiveForeground};
    --border: ${commonLight.border};
    --input: ${commonLight.input};
    --radius: ${commonLight.radius};

    /* Theme Specific */
    --primary: ${themeData.light.primary};
    --primary-foreground: ${themeData.light.primaryForeground};
    --accent: ${themeData.light.accent};
    --accent-foreground: ${themeData.light.accentForeground};
    --ring: ${themeData.light.ring};
    --glow-color: ${themeData.light.glowColor};
  }

  /* ===== DARK MODE (${themeData.name}) ===== */
  .dark {
    --background: ${commonDark.background};
    --foreground: ${commonDark.foreground};
    --card: ${commonDark.card};
    --card-foreground: ${commonDark.cardForeground};
    --popover: ${commonDark.popover};
    --popover-foreground: ${commonDark.popoverForeground};
    --secondary: ${commonDark.secondary};
    --secondary-foreground: ${commonDark.secondaryForeground};
    --muted: ${commonDark.muted};
    --muted-foreground: ${commonDark.mutedForeground};
    --destructive: ${commonDark.destructive};
    --destructive-foreground: ${commonDark.destructiveForeground};
    --border: ${commonDark.border};
    --input: ${commonDark.input};

    /* Theme Specific */
    --primary: ${themeData.dark.primary};
    --primary-foreground: ${themeData.dark.primaryForeground};
    --accent: ${themeData.dark.accent};
    --accent-foreground: ${themeData.dark.accentForeground};
    --ring: ${themeData.dark.ring};
    --glow-color: ${themeData.dark.glowColor};
  }

  * {
    border-color: var(--border);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .brand-glow {
    box-shadow: 0 0 30px var(--glow-color);
  }

  .brand-glow-hover:hover {
    box-shadow: 0 0 40px var(--glow-color);
  }
}`;
  };

  const renderV3Code = () => {
    return `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px var(--glow-color)" },
          "50%": { boxShadow: "0 0 40px var(--glow-color)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

/* 
 * NOTE: For v3, you also need to add the CSS variables 
 * to your globals.css file (similar to v4 'base' layer but without @theme).
 * Use the variables shown in the v4 tab under '@layer base'.
 */`;
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 max-w-4xl space-y-16">
      {/* Header */}
      <div className="space-y-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Theme Configuration
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn how to customize the look and feel of your application with Inam UI&apos;s flexible
          theming system.
        </p>
      </div>

      {/* Available Themes Selection */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <h2 className="text-2xl font-semibold text-foreground">Choose a Theme</h2>
          <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
            Preview & Copy
          </div>
        </div>
        <p className="text-muted-foreground">
          Select a theme to preview it on this site and generate the configuration code below.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(themesConfig) as [ThemeKey, (typeof themesConfig)[ThemeKey]][]).map(
            ([id, theme]) => {
              const isSelected = selectedConfigTheme === id;
              return (
                <button
                  key={id}
                  onClick={() => handleThemeSelect(id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border transition-all text-left group relative overflow-hidden",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-full border border-border shadow-sm shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}
                  >
                    {theme.name}
                  </span>
                  {/* Check icon removed as requested */}
                </button>
              );
            }
          )}
        </div>
      </section>

      {/* Configuration Tabs */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <h2 className="text-2xl font-semibold text-foreground">Configuration</h2>
        </div>

        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex p-1 gap-1 bg-muted/50 rounded-lg w-full sm:w-fit border border-border/50">
            <button
              onClick={() => {
                setActiveTab("v4");
                trackEvent(TELEMETRY_EVENTS.DOCS_THEME_TAB_CHANGED, { tab: "v4" });
              }}
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === "v4"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50 "
              )}
            >
              Tailwind CSS v4.0
            </button>
            <button
              onClick={() => {
                setActiveTab("v3");
                trackEvent(TELEMETRY_EVENTS.DOCS_THEME_TAB_CHANGED, { tab: "v3" });
              }}
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === "v3"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Tailwind CSS v3.x
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {activeTab === "v4"
                  ? "Copy this code into your app/globals.css file:"
                  : "Copy this code into your tailwind.config.ts (or .js) file:"}
              </p>
              <div className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-muted/50 border border-border">
                {activeTab === "v4" ? "app/globals.css" : "tailwind.config.ts"}
              </div>
            </div>

            <div className="relative group rounded-xl border border-border bg-[#0d1117] overflow-hidden shadow-sm">
              <div className="absolute right-3 top-3 z-10">
                <CopyButton
                  text={activeTab === "v4" ? renderV4Code() : renderV3Code()}
                  contentType="theme_config"
                />
              </div>
              <pre className="p-4 sm:p-6 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed custom-scrollbar">
                <code>{activeTab === "v4" ? renderV4Code() : renderV3Code()}</code>
              </pre>
            </div>

            <p className="text-xs text-muted-foreground italic">
              * Values are automatically updated based on the theme selected above.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
