// Auto-synced from CLI templates - DO NOT EDIT DIRECTLY
// Edit: packages/inam-ui-cli/src/templates/Radio.tsx
// Then run: npm run sync:templates

import React, { createContext, useContext, useId } from "react";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  /**
   * The name attribute for all radio inputs in the group
   */
  name: string;
  /**
   * The currently selected value
   */
  value?: string;
  /**
   * Callback fired when the selection changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes for the group container
   */
  className?: string;
  /**
   * Child Radio components
   */
  children: React.ReactNode;
}

/**
 * RadioGroup component that manages a group of Radio components.
 * Provides context for name, value, and onChange handling.
 *
 * @example
 * ```tsx
 * <RadioGroup name="width" value={selectedwidth} onChange={setSelectedwidth}>
 *   <Radio value="small" label="Small" />
 *   <Radio value="medium" label="Medium" />
 *   <Radio value="large" label="Large" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  disabled = false,
  className,
  children,
}) => {
  const contextValue: RadioGroupContextValue = {
    name,
    value,
    onChange,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        className={["space-y-2", className].filter(Boolean).join(" ")}
        role="radiogroup"
        aria-disabled={disabled}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type"
> {
  /**
   * The value of this radio option
   */
  value: string;
  /**
   * Label text for the radio button
   */
  label?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * width variant of the radio button
   */
  width?: "sm" | "md" | "lg";
  /**
   * Callback fired when this radio is selected (optional, usually handled by RadioGroup)
   */
  onChange?: (value: string) => void;
}

/**
 * Radio component that can be used standalone or within a RadioGroup.
 * Uses theme variables for consistent styling and includes proper accessibility features.
 *
 * @example
 * ```tsx
 * // Standalone usage
 * <Radio
 *   name="option"
 *   value="yes"
 *   checked={selected === 'yes'}
 *   onChange={setSelected}
 *   label="Yes"
 * />
 *
 * // Within RadioGroup (recommended)
 * <RadioGroup name="options" value={selected} onChange={setSelected}>
 *   <Radio value="option1" label="Option 1" />
 *   <Radio value="option2" label="Option 2" />
 * </RadioGroup>
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      className,
      width = "md",
      disabled: propDisabled,
      onChange: propOnChange,
      name: propName,
      checked: propChecked,
      id,
      ...props
    },
    ref
  ) => {
    const groupContext = useContext(RadioGroupContext);

    // Use group context values if available, otherwise use props
    const name = groupContext?.name || propName;
    const checked = groupContext ? groupContext.value === value : propChecked;
    const disabled = groupContext?.disabled || propDisabled;
    const onChange = groupContext?.onChange || propOnChange;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onChange?.(value);
      }
    };

    const widthClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const labelwidthClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const generatedId = useId();
    const radioId = id || `radio-${value}-${generatedId}`;

    return (
      <div className={["flex items-center gap-2", className].filter(Boolean).join(" ")}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={[
            // Base styles
            "peer appearance-none rounded-full border-2 border-input bg-background",
            "transition-all duration-200 ease-in-out",
            "cursor-pointer",
            // Focus styles
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            // Checked styles with radial gradient for dot
            "checked:border-primary",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Hover styles
            "hover:border-primary/60 disabled:hover:border-input",
            // Size classes
            widthClasses[width],
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            checked
              ? {
                  backgroundImage: `radial-gradient(circle, hsl(var(--primary)) ${width === "sm" ? "5px" : width === "lg" ? "9px" : "7px"}, transparent 0)`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : undefined
          }
          {...props}
        />

        {label && (
          <label
            htmlFor={radioId}
            className={[
              "cursor-pointer select-none text-foreground leading-none",
              disabled ? "cursor-not-allowed opacity-50" : "",
              labelwidthClasses[width],
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

Radio.displayName = "Radio";
