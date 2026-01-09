// Auto-synced from CLI templates - DO NOT EDIT DIRECTLY
// Edit: packages/inam-ui-cli/src/templates/Alert.tsx
// Then run: npm run sync:templates

"use client";

import React, { HTMLAttributes, useState, useEffect } from "react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The variant/type of alert
   * @default 'primary'
   */
  variant?: "primary" | "info" | "success" | "warning" | "destructive";
  /**
   * Title text for the alert
   */
  title?: string;
  /**
   * Description/message text
   */
  description?: string;
  /**
   * Icon to display on the left side
   */
  icon?: React.ReactNode;
  /**
   * If true, the alert can be dismissed
   * @default false
   */
  closable?: boolean;
  /**
   * Callback when the alert is closed
   */
  onClose?: () => void;
  /**
   * Auto-dismiss timeout in milliseconds (0 = no auto-dismiss)
   * @default 0
   */
  autoClose?: number;
  /**
   * The content of the alert
   */
  children?: React.ReactNode;
}

/**
 * A customizable alert/toast component for notifications and messages.
 * Uses theme colors configured in tailwind config.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success" description="Operation completed" />
 * <Alert variant="destructive" title="Error" closable onClose={handleClose} />
 * <Alert variant="warning" autoClose={3000}>Warning message</Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  variant = "primary",
  title = "Alert",
  description,
  icon,
  closable = true,
  onClose,
  autoClose = 0,
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const variantStyles = {
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    info: "bg-blue-300/10 border-blue-400/10 text-blue-900 dark:bg-blue-300/10 dark:border-blue-600/10 dark:text-blue-900",
    success:
      "bg-green-300/10 border-green-500/10 text-green-900 dark:bg-green-300/10 dark:border-green-600/10 dark:text-green-900",
    warning:
      "bg-yellow-300/10 border-yellow-200/10 text-yellow-900 dark:bg-yellow-200/10 dark:border-yellow-600/10 dark:text-yellow-900",
    destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
  };

  const titleStyles = {
    primary: "text-primary",
    info: "text-blue-900 dark:text-blue-900",
    success: "text-green-900 dark:text-green-900",
    warning: "text-yellow-900 dark:text-yellow-900",
    destructive: "text-destructive",
  };

  const descriptionStyles = {
    primary: "text-primary/80",
    info: "text-blue-800 dark:text-blue-800",
    success: "text-green-800 dark:text-green-800",
    warning: "text-yellow-800 dark:text-yellow-800",
    destructive: "text-destructive/80",
  };

  const iconStyles = {
    primary: "text-primary",
    info: "text-blue-600 dark:text-blue-600",
    success: "text-green-600 dark:text-green-600",
    warning: "text-yellow-600 dark:text-yellow-600",
    destructive: "text-destructive",
  };

  return (
    <div
      className={`border rounded-md p-4 ${variantStyles[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex gap-3">
        {icon && <div className={`flex-shrink-0 ${iconStyles[variant]}`}>{icon}</div>}

        <div className="flex-1">
          {title && <h3 className={`font-semibold mb-1 ${titleStyles[variant]}`}>{title}</h3>}
          {description && <p className={`text-sm ${descriptionStyles[variant]}`}>{description}</p>}
        </div>

        {closable && (
          <button
            onClick={handleClose}
            className={`flex-shrink-0 text-lg leading-none opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-sm cursor-pointer ${iconStyles[variant]}`}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
