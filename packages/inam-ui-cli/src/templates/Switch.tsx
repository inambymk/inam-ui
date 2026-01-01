import React, { useId } from "react";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type"
> {
  /**
   * Whether the switch is checked/on
   */
  checked?: boolean;
  /**
   * Callback fired when the switch state changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * Label text for the switch
   */
  label?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * width variant of the switch
   */
  width?: "sm" | "md" | "lg";
  /**
   * Description text shown below the label
   */
  description?: string;
}

/**
 * Switch component for toggling between on/off states.
 * Uses theme variables for consistent styling and includes smooth animations and proper accessibility features.
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 *   description="Receive email notifications for important updates"
 * />
 * ```
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      label,
      className,
      width = "md",
      description,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked);
    };

    const widthClasses = {
      sm: {
        track: "h-4 w-7",
        thumb: "h-3 w-3",
        translate: "translate-x-3",
        label: "text-sm",
        description: "text-xs",
      },
      md: {
        track: "h-5 w-9",
        thumb: "h-4 w-4",
        translate: "translate-x-4",
        label: "text-base",
        description: "text-sm",
      },
      lg: {
        track: "h-6 w-11",
        thumb: "h-5 w-5",
        translate: "translate-x-5",
        label: "text-lg",
        description: "text-base",
      },
    };

    const generatedId = useId();
    const switchId = id || `switch-${generatedId}`;

    return (
      <div className={["flex items-start space-x-3", className].filter(Boolean).join(" ")}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only peer"
            role="switch"
            aria-checked={checked}
            {...props}
          />

          {/* Switch track */}
          <div
            className={[
              // Base track styles
              "relative inline-flex items-center rounded-full border-2 border-transparent",
              "transition-colors duration-200 ease-in-out cursor-pointer",
              // Background colors
              "bg-input peer-checked:bg-primary",
              // Focus styles
              "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2",
              // Disabled styles
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              // width classes
              widthClasses[width].track,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Switch thumb */}
            <div
              className={[
                // Base thumb styles
                "inline-block rounded-full bg-background shadow-sm transform transition-transform duration-200 ease-in-out",
                "ring-0",
                // Position based on checked state and size
                checked
                  ? width === "sm"
                    ? "translate-x-3"
                    : width === "lg"
                      ? "translate-x-5"
                      : "translate-x-4" // md
                  : "translate-x-0.5",
                // Size classes
                widthClasses[width].thumb,
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={switchId}
                className={[
                  "cursor-pointer select-none font-medium text-foreground",
                  "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  widthClasses[width].label,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={[
                  "text-muted-foreground mt-0.5",
                  "peer-disabled:opacity-50",
                  widthClasses[width].description,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
