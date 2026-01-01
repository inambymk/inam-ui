"use client";

import React from "react";

interface ComponentTabsProps {
  tabs: {
    label: string;
    value: string;
    content: React.ReactNode;
  }[];
}

export function ComponentTabs({ tabs }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].value);

  return (
    <div className="w-full space-y-6">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
              activeTab === tab.value
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs.find((t) => t.value === activeTab)?.content}</div>
    </div>
  );
}
