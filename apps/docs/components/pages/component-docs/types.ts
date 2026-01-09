// Shared types for component documentation system
// This file contains all TypeScript interfaces used across the docs

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface VariantOption {
  value: string;
  label?: string;
}

export interface ComponentConfig {
  slug: string;
  name: string;
  description: string;
  category?: "Form" | "Layout" | "Feedback" | "Progress" | "Data";
  metadata?: {
    version?: string;
    status?: "stable" | "beta" | "experimental";
  };
  props: PropDefinition[];
  variants?: VariantOption[];
  sizes?: VariantOption[];
  defaultProps?: Record<string, unknown>;
  usageExamples?: {
    title: string;
    description: string;
    code: string;
  }[];
  accessibility?: {
    keyboard?: string[];
    ariaLabels?: string[];
    screenReader?: string;
  };
  relatedComponents?: string[];
}
