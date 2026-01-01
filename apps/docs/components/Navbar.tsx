"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Command } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ThemeSelector from "./ThemeSelector";
import { useWidthPreference } from "./WidthToggle";
import SearchDialog, { useSearchDialog } from "./SearchDialog";

export default function Navbar() {
  const pathname = usePathname();
  const { isFullWidth } = useWidthPreference();
  const { isOpen, open, close } = useSearchDialog();

  const isActive = (path: string) => {
    if (path === "/components") {
      return pathname?.startsWith("/components");
    }
    return pathname === path;
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        role="banner"
      >
        <div
          className={`${isFullWidth ? "max-w-full px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"} flex h-16 items-center justify-between`}
        >
          {/* Logo & Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-2.5" aria-label="Inam UI Home">
              <div className="relative h-9 w-9 flex items-center justify-center transition-all group-hover:scale-105">
                <img
                  src="/inam.svg"
                  alt=""
                  className="h-full w-full object-contain dark:invert"
                  aria-hidden="true"
                />
              </div>
              <span className="text-lg font-bold tracking-tight hidden sm:block">
                Inam <span className="text-primary">UI</span>
              </span>
            </Link>

            <nav
              className="hidden md:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              <Link
                href="/components"
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive("/components")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                aria-current={isActive("/components") ? "page" : undefined}
              >
                Components
              </Link>
              <a
                href="https://github.com/manimkk/inam-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-lg flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={open}
              className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-primary/30 transition-all text-sm"
              aria-label="Search components (press Command K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>

            {/* Mobile search button */}
            <button
              onClick={open}
              className="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Search components"
            >
              <Search className="h-4 w-4" />
            </button>

            <ThemeSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog isOpen={isOpen} onClose={close} />
    </>
  );
}
