"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useLayoutEffect } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: setting mounted flag for hydration safety
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-muted/30 text-muted-foreground">
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-primary/30 transition-all"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
