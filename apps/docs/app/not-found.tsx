"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="relative max-w-2xl w-full text-center">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
        </div>

        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] sm:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground/20 to-foreground/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl sm:text-8xl font-black text-primary animate-pulse">?</div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Looks like this component hasn&apos;t been generated yet. Let&apos;s get you back on
            track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-medium hover:bg-muted/50 transition-colors"
          >
            <Search className="h-4 w-4" />
            Browse Components
          </Link>
        </div>

        {/* Back link */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to previous page
        </button>

        {/* CLI hint - clean modern style */}
        <div className="mt-16 p-4 rounded-lg bg-muted/50 border border-border max-w-md mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            <code className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
              npx inam-ui
            </code>
            <span className="mx-2 text-border">—</span>
            Generate components instantly
          </p>
        </div>
      </div>
    </div>
  );
}
