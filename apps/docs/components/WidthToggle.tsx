"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export default function WidthToggle() {
  const [isFullWidth, setIsFullWidth] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("docs-width-preference");
    return saved === "full";
  });
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: setting mounted flag for hydration safety
    setMounted(true);
  }, []);

  const toggle = () => {
    const newValue = !isFullWidth;
    setIsFullWidth(newValue);
    localStorage.setItem("docs-width-preference", newValue ? "full" : "7xl");
    window.dispatchEvent(new CustomEvent("width-preference-change"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center justify-center h-10 w-10 rounded-xl border border-border bg-card shadow-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
      aria-label={isFullWidth ? "Switch to default width" : "Switch to full width"}
      title={isFullWidth ? "Default width (7xl)" : "Full width"}
    >
      {isFullWidth ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
    </button>
  );
}

export function useWidthPreference() {
  const [isFullWidth, setIsFullWidth] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("docs-width-preference");
    return saved === "full";
  });
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // Changed useEffect to useLayoutEffect for setMounted
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: setting mounted flag for hydration safety
    setMounted(true);
  }, []);

  useEffect(() => {
    // Kept useEffect for event listeners
    const handleChange = () => {
      const saved = localStorage.getItem("docs-width-preference");
      setIsFullWidth(saved === "full");
    };

    window.addEventListener("storage", handleChange);
    window.addEventListener("width-preference-change", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("width-preference-change", handleChange);
    };
  }, []);

  return { isFullWidth, mounted };
}
