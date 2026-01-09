import { PropDefinition } from "../types";

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Props</h3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 font-medium text-foreground">Name</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Type</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Default</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr
                key={prop.name}
                className={index !== props.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-4 py-3">
                  <code className="text-primary font-mono text-xs bg-primary/5 px-1.5 py-0.5 rounded">
                    {prop.name}
                    {prop.required && <span className="text-destructive ml-0.5">*</span>}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="font-mono text-xs text-muted-foreground">{prop.type}</code>
                </td>
                <td className="px-4 py-3">
                  <code className="font-mono text-xs text-muted-foreground">
                    {prop.defaultValue || "—"}
                  </code>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
