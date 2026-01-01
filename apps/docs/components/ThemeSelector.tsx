"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Palette } from "lucide-react";
import { useColorTheme } from "./ThemeProvider";

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

type ColorThemeId = (typeof themes)[number]["id"];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { colorTheme, setColorTheme } = useColorTheme();

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: setting mounted flag for hydration safety
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectTheme = (themeId: ColorThemeId) => {
    setColorTheme(themeId);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <button className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-muted/30 text-muted-foreground">
        <Palette className="h-4 w-4" />
      </button>
    );
  }

  const currentTheme = themes.find((t) => t.id === colorTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-primary/30 transition-all"
        aria-label="Select theme color"
        title="Change accent color"
      >
        <div
          className="h-4 w-4 rounded-full border-2 border-current"
          style={{ backgroundColor: currentTheme.color }}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border bg-card p-2 shadow-xl z-50">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
            Accent Color
          </div>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                colorTheme === theme.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.color }} />
              {theme.name}
              {colorTheme === theme.id && (
                <svg
                  className="h-4 w-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
