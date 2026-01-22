import type { TreeNodeId } from "./types";

/**
 * A single visible row in the tree
 */
export interface FlattenedTreeNode {
  id: TreeNodeId;
  depth: number;
}
import type { TreeState } from "./state";
import type { TreeNode } from "./types";

/**
 * Flatten expanded tree into a linear list
 */
export function flattenTree(
  state: TreeState
): FlattenedTreeNode[] {
  const result: FlattenedTreeNode[] = [];

  function walk(nodeId: string, depth: number) {
    const node: TreeNode | undefined = state.nodes[nodeId];
    if (!node) return;

    result.push({ id: nodeId, depth });

    if (node.isExpanded) {
      for (const childId of node.childrenIds) {
        walk(childId, depth + 1);
      }
    }
  }

  for (const rootId of state.rootIds) {
    walk(rootId, 0);
  }

  return result;
}
