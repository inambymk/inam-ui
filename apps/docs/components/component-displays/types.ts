export interface ComponentDisplayProps {
  slug: string;
  onVariantChange?: (variant: string | null) => void;
}

export interface VariantOption {
  id: string;
  label: string;
}

export interface DisplayComponentProps {
  slug: string;
}
