import React, { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style of the badge.
   *
   * @default "default"
   */
  variant?: "default" | "primary" | "secondary" | "destructive";

  /**
   * Size (controls padding and font size).
   *
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * If true, the badge will be fully rounded (pill shape).
   *
   * @default false
   */
  pill?: boolean;

  /**
   * Badge content.
   */
  children: React.ReactNode;
}

/**
 * Badge
 *
 * A small, non interactive label used to display status, categories, or metadata.
 * This is a purely visual component   no icons, no loading, no hover or click behavior.
 *
 * Uses Tailwind design tokens such as:
 * `bg muted`, `text muted foreground`, `bg primary`, `text primary foreground`,
 * `bg secondary`, `text secondary foreground`, `bg destructive`, `text destructive foreground`.
 *
 *
 *
 * ### Basic
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * ```
 *
 * ### Sizes
 * ```tsx
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
 * <Badge size="lg">Large</Badge>
 * ```
 *
 * ### Pill
 * ```tsx
 * <Badge pill>New</Badge>
 * <Badge pill variant="primary">Pro</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  pill = false,
  children,
  className = "",
  ...props
}) => {
  const base = "inline flex items center font medium select none";

  const variants = {
    default: "bg muted text muted foreground",
    primary: "bg primary text primary foreground",
    secondary: "bg secondary text secondary foreground",
    destructive: "bg destructive text destructive foreground",
  };

  const sizes = {
    sm: "px 2 py 0.5 text xs",
    md: "px 2.5 py 1 text sm",
    lg: "px 3 py 1.5 text base",
  };

  const radius = pill ? "rounded full" : "rounded md";

  return (
    <span
      className={`${base} ${variants[variant]} ${sizes[size]} ${radius} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
