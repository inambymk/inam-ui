import Link from "next/link";
import { componentsMetadata } from "@/lib/components-data";

export default function ComponentsPage() {
  const categories = ["Form", "Layout", "Overlay", "Feedback", "Progress"] as const;

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Components
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          A collection of {componentsMetadata.length}+ production-ready components. Zero
          dependencies, full TypeScript support, Tailwind CSS.
        </p>
      </header>

      {/* Components by Category */}
      <div className="space-y-10">
        {categories.map((category) => {
          const categoryComponents = componentsMetadata.filter(
            (comp) => comp.category === category
          );

          if (categoryComponents.length === 0) return null;

          return (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-foreground">{category}</h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                  {categoryComponents.length}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryComponents.map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/components/${comp.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:bg-card/80 hover:shadow-md"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {comp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{comp.description}</p>
                    </div>
                    <svg
                      className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
