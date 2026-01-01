"use client";

import { Suspense, useState, useMemo } from "react";
import { PreviewContainer, CodeDisplay } from "../shared";
import { getComponent } from "../utils/getComponent";
import { getComponentCode, getDefaultProps } from "../utils";

export function CheckboxDisplay() {
  const [checked, setChecked] = useState(false);
  const Component = useMemo(() => getComponent("checkbox"), []) as React.FC<
    Record<string, unknown>
  >;
  const defaultProps = getDefaultProps("checkbox");
  const code = getComponentCode("checkbox");

  return (
    <Suspense fallback={<div className="h-16 animate-pulse bg-muted/50 rounded-lg" />}>
      <div className="space-y-4">
        <PreviewContainer centered>
          <Component {...defaultProps} checked={checked} onChange={setChecked} />
        </PreviewContainer>
        <CodeDisplay code={code} />
      </div>
    </Suspense>
  );
}
