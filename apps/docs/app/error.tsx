"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="relative max-w-lg w-full text-center">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />
        </div>

        {/* Error icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-mono text-muted-foreground">
              !
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground">
            An unexpected error occurred while rendering this page. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-muted-foreground/60 bg-muted/50 px-3 py-1.5 rounded-lg inline-block">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-foreground font-medium hover:bg-muted/50 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        {/* Technical details (collapsible in production) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left bg-muted/30 rounded-xl border border-border p-4">
            <summary className="text-sm font-medium text-foreground cursor-pointer">
              Error Details (Development Only)
            </summary>
            <pre className="mt-3 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono">
              {error.message}
              {error.stack && (
                <>
                  {"\n\n"}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
