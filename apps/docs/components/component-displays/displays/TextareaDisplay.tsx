"use client";

import { Suspense, useState } from "react";
import { Textarea } from "inam-ui/templates/Textarea";
import { VariantSelector, PreviewContainer, CodeDisplay } from "../shared";
import { VariantOption } from "../types";

const variants: VariantOption[] = [
  { id: "basic", label: "Basic" },
  { id: "states", label: "States" },
];

const getTextareaCode = (variant: string): string => {
  switch (variant) {
    case "states":
      return `{/* States */}
<Textarea label="With Error" error="This field is required" />
<Textarea label="With Helper" helperText="Optional helper text" />
<Textarea label="Disabled" disabled value="Cannot edit" />`;
    default:
      return `<Textarea
  label="Message"
  placeholder="Enter your message"
  helperText="We'll get back to you soon"
/>`;
  }
};

export function TextareaDisplay() {
  const [selectedVariant, setSelectedVariant] = useState<string>("basic");

  return (
    <Suspense fallback={<div className="h-40 animate-pulse bg-muted/50 rounded-lg" />}>
      <div className="space-y-6">
        <VariantSelector
          variants={variants}
          selected={selectedVariant}
          onChange={setSelectedVariant}
        />

        <PreviewContainer>
          {selectedVariant === "basic" && (
            <Textarea
              label="Message"
              placeholder="Enter your message"
              helperText="We'll get back to you soon"
            />
          )}

          {selectedVariant === "states" && (
            <>
              <Textarea label="With Error" error="This field is required" />
              <Textarea label="With Helper" helperText="Optional helper text" />
              <Textarea label="Disabled" disabled value="Cannot edit" />
            </>
          )}
        </PreviewContainer>

        <CodeDisplay code={getTextareaCode(selectedVariant)} />
      </div>
    </Suspense>
  );
}
