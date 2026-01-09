// Auto-synced from CLI templates - DO NOT EDIT DIRECTLY
// Edit: packages/inam-ui-cli/src/templates/Checkbox.tsx
// Then run: npm run sync:templates

import React, { useId } from "react";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Callback fired when the checkbox state changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * Checkbox component with support for checked and unchecked states.
 * Uses theme variables for consistent styling and includes proper accessibility features.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onChange, label, className, disabled, id, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked);
    };

    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <div className={["flex items-center gap-2", className].filter(Boolean).join(" ")}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={[
            // Base styles
            "peer appearance-none h-4 w-4 rounded border-2 border-input bg-background",
            "transition-all duration-200 ease-in-out",
            "cursor-pointer",
            // Focus styles
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            // Checked styles with background image for checkmark (centered SVG)
            "checked:bg-primary checked:border-primary",
            "checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA4LjVMNi41IDExTDEyIDUuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]",
            "checked:bg-center checked:bg-no-repeat",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Hover styles
            "hover:border-primary/60 disabled:hover:border-input",
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {label && (
          <label
            htmlFor={checkboxId}
            className={[
              "cursor-pointer select-none text-foreground text-base leading-none",
              disabled ? "cursor-not-allowed opacity-50" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
