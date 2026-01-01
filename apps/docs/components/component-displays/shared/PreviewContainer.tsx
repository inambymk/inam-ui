import { ReactNode } from "react";

interface PreviewContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "2xl";
  minHeight?: string;
  centered?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  "2xl": "max-w-2xl",
};

export function PreviewContainer({
  children,
  maxWidth = "md",
  minHeight,
  centered = false,
}: PreviewContainerProps) {
  return (
    <div
      className={`p-8 rounded-xl bg-background border border-border ${minHeight || ""} ${
        centered ? "flex items-center justify-center" : ""
      }`}
    >
      <div
        className={`${maxWidthClasses[maxWidth]} ${centered ? "" : "mx-auto"} ${minHeight ? "space-y-4" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
