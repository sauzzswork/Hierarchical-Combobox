import type { TreeState } from "./state";
import type { TreeNodeId } from "./types";
import type { FlattenedTreeNode } from "./flatten";

export function flattenTreeWithVisibility(
  state: TreeState,
  visibleIds: Set<TreeNodeId>
): FlattenedTreeNode[] {
  const result: FlattenedTreeNode[] = [];

  function walk(nodeId: TreeNodeId, depth: number) {
    const node = state.nodes[nodeId];
    if (!node) return;

    if (!visibleIds.has(nodeId)) return;

    result.push({ id: nodeId, depth });

    for (const childId of node.childrenIds) {
      walk(childId, depth + 1);
    }
  }

  for (const rootId of state.rootIds) {
    walk(rootId, 0);
  }

  return result;
}
