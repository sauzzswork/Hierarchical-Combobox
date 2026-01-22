import type { TreeState } from "./state";
import type { TreeNodeId } from "./types";

/**
 * Returns all node IDs that should be visible for a search query,
 * including ancestors of matched nodes.
 */
export function getSearchVisibleNodeIds(
  state: TreeState,
  query: string
): Set<TreeNodeId> {
  const visible = new Set<TreeNodeId>();
  const q = query.trim().toLowerCase();

  if (!q) {
    // No search → everything visible
    for (const id of Object.keys(state.nodes)) {
      visible.add(id);
    }
    return visible;
  }

  for (const node of Object.values(state.nodes)) {
    if (node.label.toLowerCase().includes(q)) {
      let current: TreeNodeId | null = node.id;

      // Walk up ancestors
      while (current) {
        visible.add(current);
        current = state.nodes[current]?.parentId ?? null;
      }
    }
  }

  return visible;
}
