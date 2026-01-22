import type { TreeState } from "./state";
import type { TreeNode, TreeNodeData, TreeNodeId } from "./types";

/**
 * Expand or collapse a node
 */
export function toggleNode(
  state: TreeState,
  nodeId: TreeNodeId
): TreeState {
  const node = state.nodes[nodeId];
  if (!node) return state;

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [nodeId]: {
        ...node,
        isExpanded: !node.isExpanded
      }
    }
  };
}
