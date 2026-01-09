// Auto-synced from CLI templates - DO NOT EDIT DIRECTLY
// Edit: packages/inam-ui-cli/src/templates/Input.tsx
// Then run: npm run sync:templates

import React, { InputHTMLAttributes, useId } from "react";

/**
 * Props for the Input component.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Label displayed above the input.
   * If provided, it will be associated with the input for accessibility.
   */
  label?: string;

  /**
   * Helper text displayed below the input when there is no error.
   * Useful for hints or instructions.
   */
  helperText?: string;

  /**
   * Error message displayed below the input.
   * When set, the input is marked as invalid.
   */
  error?: string;

  /**
   * Disables the input field.
   * @default false
   */
  disabled?: boolean;

  /**
   * Marks the input as required.
   * This adds native browser validation and updates accessibility attributes.
   * @default false
   */
  required?: boolean;

  /**
   * If true, the input will stretch to fill its container.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Input
 *
 * A clean, accessible, and minimal text input for Version 1.
 * Supports labels, helper text, error states, and required fields.
 *
 * This component is designed to be:
 * - Keyboard accessible
 * - Screen reader friendly
 * - Easily extensible for future versions
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      disabled = false,
      required = false,
      fullWidth = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;

    const helperId = `${inputId}-help`;
    const errorId = `${inputId}-error`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    const baseStyles =
      "w-full bg-background text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none";

    const outlinedStyles =
      "border border-input rounded-md px-3 py-2 text-base focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background hover:border-ring";

    const errorStyles = error
      ? "border-destructive focus:ring-destructive focus:border-destructive"
      : "";

    const disabledStyles = disabled
      ? "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:border-muted"
      : "";

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${baseStyles} ${outlinedStyles} ${errorStyles} ${disabledStyles} ${className}`}
          {...props}
        />

        {error ? (
          <p id={errorId} className="text-sm text-destructive mt-1.5">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-muted-foreground mt-1.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
