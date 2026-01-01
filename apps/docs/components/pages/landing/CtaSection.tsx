import Link from "next/link";
import { Github, Zap } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Ready to get started?
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
            Start building with Inam UI today
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of developers who have already shipped beautiful interfaces faster than
            ever before.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/components"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Link>

            <a
              href="https://github.com/manimkk/inam-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-border bg-card font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              <Github className="h-5 w-5" />
              Star on GitHub
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>MIT Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
