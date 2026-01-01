"use client";

import React from "react";
import { PropDetail } from "@/lib/component-api-data";

interface PropsTableProps {
  props: PropDetail[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto my-6 rounded-lg border bg-card">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50 transition-colors">
              <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[150px]">
                Prop
              </th>
              <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[200px]">
                Type
              </th>
              <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[100px]">
                Default
              </th>
              <th className="h-12 px-4 font-medium text-muted-foreground align-middle">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-b transition-colors hover:bg-muted/30">
                <td className="p-4 align-middle">
                  <code className="text-primary font-mono font-bold">
                    {prop.name}
                    {prop.required && <span className="text-destructive ml-1">*</span>}
                  </code>
                </td>
                <td className="p-4 align-middle">
                  <code className="text-secondary-foreground text-xs bg-secondary px-1.5 py-0.5 rounded break-all">
                    {prop.type}
                  </code>
                </td>
                <td className="p-4 align-middle">
                  {prop.defaultValue ? (
                    <code className="text-muted-foreground text-xs font-mono">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span className="text-muted-foreground text-xs italic">none</span>
                  )}
                </td>
                <td className="p-4 align-middle text-muted-foreground leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden my-6 space-y-4">
        {props.map((prop) => (
          <div
            key={prop.name}
            className="rounded-lg border bg-card p-4 space-y-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <code className="text-primary font-mono font-bold text-sm">
                {prop.name}
                {prop.required && <span className="text-destructive ml-1">*</span>}
              </code>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Type</div>
                <code className="text-secondary-foreground text-xs bg-secondary px-1.5 py-0.5 rounded break-all">
                  {prop.type}
                </code>
              </div>

              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Default</div>
                {prop.defaultValue ? (
                  <code className="text-muted-foreground text-xs font-mono">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-muted-foreground text-xs italic">none</span>
                )}
              </div>

              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Description</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
