"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { componentsMetadata } from "@/lib/components-data";
import { Search, ChevronDown, Layers, Layout, Bell, BarChart3, Settings2 } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Form: <Settings2 className="h-4 w-4" />,
  Layout: <Layout className="h-4 w-4" />,
  Overlay: <Layers className="h-4 w-4" />,
  Feedback: <Bell className="h-4 w-4" />,
  Progress: <BarChart3 className="h-4 w-4" />,
};

export function Sidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [collapsedCategories, setCollapsedCategories] = React.useState<Record<string, boolean>>({});

  const categories = ["Form", "Layout", "Overlay", "Feedback", "Progress"] as const;

  const filteredComponents = componentsMetadata.filter((comp) =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <aside className="sticky top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 border-r border-border bg-background/95 backdrop-blur-sm lg:block overflow-y-auto">
      <div className="flex flex-col gap-4 p-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full h-9 rounded-lg border border-border bg-muted/30 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* All Components Link */}
        <Link
          href="/components"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
            pathname === "/components"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <Layers className="h-4 w-4" />
          All Components
          <span className="ml-auto text-xs opacity-60">{componentsMetadata.length}</span>
        </Link>

        <div className="h-px bg-border" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {categories.map((category) => {
            const categoryComponents = filteredComponents.filter(
              (comp) => comp.category === category
            );

            if (categoryComponents.length === 0) return null;

            const isCollapsed = collapsedCategories[category];

            return (
              <div key={category}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all"
                >
                  <span className="text-primary/70">{categoryIcons[category]}</span>
                  <span>{category}</span>
                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-xs opacity-60">{categoryComponents.length}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                    />
                  </span>
                </button>

                {/* Category Items */}
                {!isCollapsed && (
                  <div className="ml-2 mt-1 space-y-0.5">
                    {categoryComponents.map((comp) => {
                      const isActive = pathname === `/components/${comp.slug}`;
                      return (
                        <Link
                          key={comp.slug}
                          href={`/components/${comp.slug}`}
                          className={`relative flex items-center px-3 py-1.5 text-sm rounded-lg transition-all ${
                            isActive
                              ? "text-primary font-medium bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full" />
                          )}
                          <span className="ml-1">{comp.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
