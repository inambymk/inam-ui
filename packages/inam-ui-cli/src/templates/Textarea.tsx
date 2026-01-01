import React, { TextareaHTMLAttributes, useId } from "react";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * Label for the textarea field
   */
  label?: string;
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  /**
   * Error message displayed below the textarea
   */
  error?: string;
  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /**
   * If true, the textarea will show as disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the textarea field is required
   * @default false
   */
  required?: boolean;
  /**
   * If true, the textarea will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * A simple textarea component with label and validation states.
 * Uses theme colors configured in tailwind config for automatic dark/light mode support.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter your description"
 *   rows={4}
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      resize = "vertical",
      disabled = false,
      required = false,
      fullWidth = false,
      className = "",
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;

    // Base styles
    const baseStyles =
      "w-full bg-background text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none border border-input rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background hover:border-ring";

    // Fixed size (md)
    const sizeStyles = "px-3 py-2 text-base";

    // Resize styles
    const resizeStyles = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    // State-based styles
    const stateStyles = error
      ? "border-destructive focus:border-destructive focus:ring-destructive"
      : "";

    const disabledStyles = disabled
      ? "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:border-muted"
      : "";

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          className={`${baseStyles} ${sizeStyles} ${resizeStyles[resize]} ${stateStyles} ${disabledStyles} ${className}`}
          {...props}
        />

        {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}

        {helperText && !error && (
          <p className="text-sm text-muted-foreground mt-1.5">{helperText}</p>
        )}
      </div>
    );
  }
);
