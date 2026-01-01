"use client";

import { Suspense, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "inam-ui/templates/Card";
import { VariantSelector, PreviewContainer, CodeDisplay } from "../shared";
import { VariantOption } from "../types";

const variants: VariantOption[] = [
  { id: "default", label: "Default" },
  { id: "outlined", label: "Outlined" },
];

const getCardCode = (variant: string): string => {
  switch (variant) {
    case "outlined":
      return `<Card variant="outlined" padding="lg">
  <CardHeader>
    <CardTitle>Notification Preferences</CardTitle>
    <CardDescription>Choose how you want to be notified</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-3 rounded-lg">
        <input type="checkbox" className="mt-0.5 rounded" defaultChecked />
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">Email Updates</p>
          <p className="text-xs text-muted-foreground">
            Get notified about important updates via email
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-3 rounded-lg">
        <input type="checkbox" className="mt-0.5 rounded" />
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">Push Notifications</p>
          <p className="text-xs text-muted-foreground">
            Receive real-time alerts on your device
          </p>
        </div>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
      Save Preferences
    </button>
  </CardFooter>
</Card>`;
    default:
      return `<Card variant="default" padding="lg">
  <CardHeader>
    <CardTitle>Project Dashboard</CardTitle>
    <CardDescription>Overview of current project metrics</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">Completion Rate</span>
        <span className="text-sm font-semibold">80%</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">Active Tasks</span>
        <span className="text-sm font-semibold">12 tasks</span>
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-muted-foreground">Team Size</span>
        <span className="text-sm font-semibold">6 members</span>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
      View Full Report
    </button>
  </CardFooter>
</Card>`;
  }
};

export function CardDisplay() {
  const [selectedVariant, setSelectedVariant] = useState<string>("default");

  return (
    <Suspense fallback={<div className="h-40 animate-pulse bg-muted/50 rounded-lg" />}>
      <div className="space-y-6">
        <VariantSelector
          variants={variants}
          selected={selectedVariant}
          onChange={setSelectedVariant}
        />

        <PreviewContainer>
          {selectedVariant === "default" && (
            <Card variant="default" padding="lg" className="max-w-md">
              <CardHeader>
                <CardTitle>Project Dashboard</CardTitle>
                <CardDescription>Overview of current project metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="text-sm font-semibold">80%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Active Tasks</span>
                    <span className="text-sm font-semibold">12 tasks</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Team Size</span>
                    <span className="text-sm font-semibold">6 members</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  View Full Report
                </button>
              </CardFooter>
            </Card>
          )}

          {selectedVariant === "outlined" && (
            <Card variant="outlined" padding="lg" className="max-w-md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <input type="checkbox" className="mt-0.5 rounded border-input" defaultChecked />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Email Updates</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified about important updates via email
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <input type="checkbox" className="mt-0.5 rounded border-input" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive real-time alerts on your device
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Save Preferences
                </button>
              </CardFooter>
            </Card>
          )}
        </PreviewContainer>

        <CodeDisplay code={getCardCode(selectedVariant)} />
      </div>
    </Suspense>
  );
}
