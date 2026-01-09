"use client";

import { Button } from "@/components/ui/Button";
import { useState, ComponentType } from "react";

// Base props interface for all wrappers
interface BaseWrapperProps {
  component: ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

// Checkable component props
interface CheckableWrapperProps extends BaseWrapperProps {
  component: ComponentType<{
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    [key: string]: unknown;
  }>;
}

// Children component props
interface ChildrenWrapperProps extends BaseWrapperProps {
  component: ComponentType<{
    children?: React.ReactNode;
    className?: string;
    variant?: string;
    [key: string]: unknown;
  }>;
  variant?: string;
}

// Variant component props
interface VariantWrapperProps extends BaseWrapperProps {
  component: ComponentType<{
    variant?: string;
    className?: string;
    [key: string]: unknown;
  }>;
  variant?: string;
}

export function CheckboxWrapper({ component: Component, ...props }: CheckableWrapperProps) {
  const [checked, setChecked] = useState(false);
  return <Component {...props} checked={checked} onChange={setChecked} />;
}

export function RadioWrapper({ component: Component, ...props }: CheckableWrapperProps) {
  const [selected, setSelected] = useState(false);
  return <Component {...props} checked={selected} onChange={() => setSelected(!selected)} />;
}

export function SwitchWrapper({ component: Component, ...props }: CheckableWrapperProps) {
  const [checked, setChecked] = useState(false);
  return <Component {...props} checked={checked} onChange={setChecked} />;
}

export function CardWrapper({ component: Component, variant, ...props }: ChildrenWrapperProps) {
  // Outline variant: Team Collaboration card
  if (variant === "outline") {
    return (
      <Component {...props} variant={variant}>
        <div className="flex flex-col space-y-1.5 pb-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight text-foreground">
            Team Collaboration
          </h3>
          <p className="text-sm text-muted-foreground">Work together seamlessly with your team</p>
        </div>
        <div className="text-sm space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Real-time collaboration tools</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Shared workspaces and files</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Team activity dashboard</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 gap-2">
          <span className="text-sm text-muted-foreground">Free</span>
          <Button variant="outline" className="whitespace-nowrap">
            Learn More
          </Button>
        </div>
      </Component>
    );
  }

  // Default variant: Premium Features pricing card
  return (
    <Component {...props} variant={variant}>
      <div className="flex flex-col space-y-1.5 pb-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight text-foreground">
          Premium Features
        </h3>
        <p className="text-sm text-muted-foreground">Unlock the full potential of your workspace</p>
      </div>
      <div className="text-sm space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span>
          <span>Unlimited projects and team members</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span>
          <span>Advanced analytics and reporting</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span>
          <span>Priority support and updates</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 gap-2">
        <span className="text-sm text-muted-foreground">$29/month</span>
        <Button className="whitespace-nowrap">Start</Button>
      </div>
    </Component>
  );
}

export function AlertWrapper({ component: Component, variant, ...props }: VariantWrapperProps) {
  return (
    <div className="w-full">
      <Component {...props} variant={variant || "primary"} className="w-full" />
      <div className="text-[10px] text-muted-foreground mt-2 text-center">
        <span className="font-mono font-medium">variant=&quot;{variant || "primary"}&quot;</span>
      </div>
    </div>
  );
}
