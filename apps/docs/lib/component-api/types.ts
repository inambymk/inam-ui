/**
 * Shared types for component API documentation
 */

export interface PropDetail {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentApiData {
  slug: string;
  name: string;
  props: PropDetail[];
  examples: {
    title: string;
    description: string;
    code: string;
  }[];
}
