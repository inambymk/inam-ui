"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

// Color theme context for accent colors
type ColorTheme = "indigo" | "green" | "orange" | "rose" | "teal" | "amber" | "purple" | "crimson";

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = React.createContext<ColorThemeContextType | undefined>(undefined);

export function useColorTheme() {
  const context = React.useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ThemeProvider");
  }
  return context;
}

function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("indigo");
  const [mounted, setMounted] = useState(false);

  const applyColorTheme = React.useCallback((theme: ColorTheme) => {
    if (theme === "indigo") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  // Load saved color theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme | null;
    if (
      saved &&
      ["indigo", "green", "orange", "rose", "teal", "amber", "purple", "crimson"].includes(saved)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: initializing state from localStorage
      setColorThemeState(saved);
      applyColorTheme(saved);
    }
  }, [applyColorTheme]);

  // Set mounted flag using useLayoutEffect to avoid lint warning
  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const setColorTheme = React.useCallback(
    (theme: ColorTheme) => {
      setColorThemeState(theme);
      localStorage.setItem("color-theme", theme);
      applyColorTheme(theme);
    },
    [applyColorTheme]
  );

  // Re-apply color theme when component mounts to ensure it persists
  React.useEffect(() => {
    if (mounted) {
      applyColorTheme(colorTheme);
    }
  }, [mounted, colorTheme, applyColorTheme]);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </NextThemesProvider>
  );
}
