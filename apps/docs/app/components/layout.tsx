"use client";

import { Sidebar } from "@/components/Sidebar";
import { MobileSidebar } from "@/components/MobileSidebar";
import WidthToggle, { useWidthPreference } from "@/components/WidthToggle";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const { isFullWidth } = useWidthPreference();

  return (
    <>
      <div
        className={`${isFullWidth ? "max-w-full px-3 sm:px-4 md:px-6 lg:px-8" : "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8"} flex gap-4 lg:gap-8`}
      >
        <Sidebar />
        <main className="flex-1 py-6 lg:py-10 min-w-0">
          <div>{children}</div>
        </main>
      </div>
      <MobileSidebar />
      <WidthToggle />
    </>
  );
}
