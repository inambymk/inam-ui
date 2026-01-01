import Link from "next/link";
import { ComponentMetadata } from "@/lib/components-data";
import { ArrowRight } from "lucide-react";

interface ComponentPreviewProps {
  featuredComponents: ComponentMetadata[];
}

const ComponentPreview = ({ featuredComponents }: ComponentPreviewProps) => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Beautiful, accessible
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                components out of the box
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              From buttons to modals, all the building blocks you need for modern interfaces.
            </p>
          </div>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            View all components
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredComponents.map((comp) => (
            <Link
              key={comp.slug}
              href={`/components/${comp.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {comp.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {comp.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  View component
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/components"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary/5 border border-border text-foreground font-medium hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            Explore all components
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComponentPreview;
