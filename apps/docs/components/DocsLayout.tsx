"use client";

import React from "react";
import { Sidebar } from "./Sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto flex gap-0 lg:gap-8">
      <Sidebar />
      <main className="flex-1 lg:pl-64 py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
