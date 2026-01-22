import type { TreeNode, TreeNodeData, TreeNodeId } from "./types";
import type { TreeState } from "./state";

export function createInitialTreeState(
  roots: TreeNodeData[]
): TreeState {
  const nodes: Record<TreeNodeId, TreeNode> = {};
  const rootIds: TreeNodeId[] = [];

  for (const root of roots) {
    nodes[root.id] = {
      ...root,
      parentId: null,
      childrenIds: [],
      isExpanded: false,
      isLoading: false,
      error: null
    };

    rootIds.push(root.id);
  }

  return { nodes, rootIds };
}
