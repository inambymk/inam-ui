import { VariantOption } from "../types";

interface VariantSelectorProps {
  variants: VariantOption[];
  selected: string;
  onChange: (variant: string) => void;
}

export function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selected === v.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
