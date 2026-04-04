import type { PropDef } from "@/lib/registry";

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        This component inherits props from its underlying Radix UI primitive.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground w-1/5">
              Prop
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground w-1/3">
              Type
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground w-1/6">
              Default
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={i < props.length - 1 ? "border-b" : ""}
            >
              <td className="px-4 py-3 align-top">
                <div className="flex items-center gap-1.5">
                  <code className="text-xs font-mono font-medium text-foreground bg-muted px-1.5 py-0.5 rounded">
                    {prop.name}
                  </code>
                  {prop.required && (
                    <span className="text-destructive text-xs font-medium">
                      *
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="text-xs font-mono text-primary break-all">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                {prop.defaultValue ? (
                  <code className="text-xs font-mono text-muted-foreground">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
