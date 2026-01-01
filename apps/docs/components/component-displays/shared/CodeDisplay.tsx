import CopyButton from "../../CopyButton";

interface CodeDisplayProps {
  code: string;
}

export function CodeDisplay({ code }: CodeDisplayProps) {
  return (
    <div className="relative group">
      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} variant="icon" />
      </div>
    </div>
  );
}
