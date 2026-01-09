// Auto-synced from CLI templates - DO NOT EDIT DIRECTLY
// Edit: packages/inam-ui-cli/src/templates/Spinner.tsx
// Then run: npm run sync:templates

import React from "react";

interface SpinnerProps {
  /**
   * The width of the spinner
   * @default 'md'
   */
  width?: "sm" | "md" | "lg";
  /**
   * The variant/color scheme of the spinner
   * @default 'default'
   */
  variant?: "default" | "primary";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Accessible label for screen readers
   * @default 'Loading...'
   */
  label?: string;
}

/**
 * A loading spinner component with circular style.
 * Uses theme colors for consistency and includes proper accessibility support.
 *
 * @example
 * ```tsx
 * // Default spinner
 * <Spinner width="md" variant="primary" />
 *
 * // Small spinner
 * <Spinner width="sm" variant="default" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  width = "md",
  variant = "default",
  className = "",
  label = "Loading...",
}) => {
  // width configurations
  const widthConfig = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Color variants using theme variables
  const colorVariants = {
    default: "text-foreground",
    primary: "text-primary",
  };

  const currentWidth = widthConfig[width];
  const currentColor = colorVariants[variant];

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className={`animate-spin ${currentWidth} ${currentColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="img"
        aria-label={label}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};
