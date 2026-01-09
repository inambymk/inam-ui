// Auto-synced from CLI templates - DO NOT EDIT DIRECTLY
// Edit: packages/inam-ui-cli/src/templates/Button.tsx
// Then run: npm run sync:templates

import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style of the button.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "success" | "destructive" | "outline" | "ghost" | "link";

  /**
   * If true, the button takes full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * If true, shows a spinner and disables the button.
   * @default false
   */
  isLoading?: boolean;

  children: React.ReactNode;
}

/**
 * Button
 *
 * A simple, themeable button with variants and sizes.
 *
 * Uses Tailwind design tokens such as:
 * `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`,
 * `bg-destructive`, `text-destructive-foreground`,
 * `border-input`, `bg-background`, `text-foreground`, `bg-accent`, `text-accent-foreground`,
 * `focus:ring-ring`, `focus:ring-offset-background`.
 *
 * Notes:
 * - `success` uses a simple green palette by default. You can replace it with your own token
 *   (e.g. `bg-success text-success-foreground`) when you add one.
 *
 * Accessibility:
 * - Uses native `<button>` semantics.
 * - Sets `aria-busy` when `isLoading` is true.
 * - Disables the button while loading.
 *
 * ---
 *
 * ### Basic
 * ```tsx
 * <Button>Click me</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 * <Button variant="link">Link</Button>
 * ```
 *
 * ### Semantic variants
 * ```tsx
 * <Button variant="success">Save</Button>
 * <Button variant="destructive">Delete</Button>
 * ```
 *
 *
 * ### Full width
 * ```tsx
 * <Button fullWidth>Continue</Button>
 * ```
 *
 * ### Loading
 * ```tsx
 * <Button isLoading>Saving</Button>
 * <Button isLoading variant="secondary">Loading...</Button>
 * ```
 *
 * ### Form submit
 * ```tsx
 * <form>
 *   <Button type="submit">Submit</Button>
 * </form>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
    success: "bg-success text-success-foreground hover:bg-success/90 active:bg-success/95",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
    outline:
      "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
    ghost:
      "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
    link: "bg-transparent text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/90",
  } as const;

  const widthClass = fullWidth ? "w-full" : "";
  const loadingClass = isLoading ? "opacity-80 cursor-not-allowed gap-2" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} px-4 py-2 text-base ${widthClass} ${loadingClass} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      )}
      {children}
    </button>
  );
};
