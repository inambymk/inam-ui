"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  const navigation = {
    resources: [
      { name: "Components", href: "/components" },
      { name: "Themes", href: "/themes" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/inambymk/inam-ui",
        icon: Github,
      },
    ],
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-foreground uppercase tracking-tight">
                Inam <span className="text-primary">UI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A premium component system for React. No gradients, no fluff. Just pure, precise
              building blocks with a modern touch.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Inam UI. Built with precision.
          </p>
          <div className="flex gap-6">
            <Link
              href="/components"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              Components
            </Link>
            <Link
              href="/themes"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              Themes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
