import type { TreeNode } from "./types";

interface TreeRowProps {
  node: TreeNode;
  depth: number;
  selectionState: "checked" | "unchecked" | "indeterminate";
  onToggle: () => void;
  onSelect: () => void;
}

export function TreeRow({
  node,
  depth,
  selectionState,
  onToggle,
  onSelect
}: TreeRowProps) {
  return (
    <div
      id={`tree-node-${node.id}`}
      role="treeitem"
      aria-expanded={node.hasChildren ? node.isExpanded : undefined}
      className="flex items-center h-row px-2 text-sm"
      style={{ paddingLeft: depth * 16 }}
    >
      <input
        type="checkbox"
        tabIndex={-1}
        checked={selectionState === "checked"}
        ref={(el) => {
          if (el) {
            el.indeterminate =
              selectionState === "indeterminate";
          }
        }}
        onChange={onSelect}
      />

      {node.hasChildren && (
        <button
          type="button"
          tabIndex={-1}
          className="mx-1 w-4 text-xs"
          onClick={onToggle}
        >
          {node.isExpanded ? "▾" : "▸"}
        </button>
      )}

      <span>{node.label}</span>
    </div>
  );
}
