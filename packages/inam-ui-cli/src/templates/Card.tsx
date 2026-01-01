import React from "react";

interface CardProps {
  /**
   * The variant of the card
   * @default 'default'
   */
  variant?: "default" | "outlined";
  /**
   * The padding of the card
   * @default 'md'
   */
  padding?: "none" | "sm" | "md" | "lg";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * The content of the card
   */
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * A flexible card component with header, content, and footer sections.
 *
 * @example
 * ```tsx
 * <Card variant="outlined" padding="md">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <button>Action</button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  className = "",
  children,
}) => {
  const baseStyles = "bg-card text-card-foreground rounded-lg";

  const variants = {
    default: "border border-border",
    outlined: "border-2 border-border",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const cardClasses = [baseStyles, variants[variant], paddings[padding], className]
    .filter(Boolean)
    .join(" ");

  return <div className={cardClasses}>{children}</div>;
};

/**
 * Card header component for displaying titles and actions
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ className = "", children }) => {
  return <div className={`flex flex-col space-y-1.5 pb-4 ${className}`}>{children}</div>;
};

/**
 * Card content component for the main body content
 */
export const CardContent: React.FC<CardContentProps> = ({ className = "", children }) => {
  return <div className={`text-sm ${className}`}>{children}</div>;
};

/**
 * Card footer component for actions and additional information
 */
export const CardFooter: React.FC<CardFooterProps> = ({ className = "", children }) => {
  return (
    <div className={`flex items-center justify-between pt-4 gap-2 ${className}`}>{children}</div>
  );
};

/**
 * Card title component with proper typography
 */
export const CardTitle: React.FC<CardTitleProps> = ({ className = "", children }) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight text-foreground ${className}`}
    >
      {children}
    </h3>
  );
};

/**
 * Card description component with muted text
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({ className = "", children }) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
};
