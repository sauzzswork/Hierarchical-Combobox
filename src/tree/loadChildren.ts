import type { LoadChildren } from "./loader";
import type { TreeState } from "./state";
import type { TreeNode, TreeNodeId } from "./types";

/**
 * Load children for a node (or root if nodeId is null)
 */
export async function loadNodeChildren(
  state: TreeState,
  nodeId: TreeNodeId | null,
  loadChildren: LoadChildren
): Promise<TreeState> {
  // --------------------
  // ROOT LOADING
  // --------------------
  if (nodeId === null) {
    const children = await loadChildren(null);

    const newNodes: Record<TreeNodeId, TreeNode> = {};
    const rootIds: TreeNodeId[] = [];

    for (const child of children) {
      newNodes[child.id] = {
        ...child,
        parentId: null,
        childrenIds: [],
        isExpanded: false,
        isLoading: false,
        error: null
      };
      rootIds.push(child.id);
    }

    return {
      nodes: {
        ...state.nodes,
        ...newNodes
      },
      rootIds
    };
  }

  // --------------------
  // CHILD NODE LOADING
  // --------------------
  const parentNode = state.nodes[nodeId];
  if (!parentNode || parentNode.isLoading) {
    return state;
  }

  // Mark loading
  const loadingParent: TreeNode = {
    ...parentNode,
    isLoading: true,
    error: null
  };

  let nextState: TreeState = {
    ...state,
    nodes: {
      ...state.nodes,
      [nodeId]: loadingParent
    }
  };

  try {
    const children = await loadChildren(nodeId);

    const newNodes: Record<TreeNodeId, TreeNode> = {};
    const childIds: TreeNodeId[] = [];

    for (const child of children) {
      newNodes[child.id] = {
        ...child,
        parentId: nodeId,
        childrenIds: [],
        isExpanded: false,
        isLoading: false,
        error: null
      };
      childIds.push(child.id);
    }

    const updatedParent: TreeNode = {
      ...loadingParent,
      isLoading: false,
      childrenIds: childIds
    };

    return {
      nodes: {
        ...nextState.nodes,
        ...newNodes,
        [nodeId]: updatedParent
      },
      rootIds: nextState.rootIds
    };
  } catch (err) {
    const erroredParent: TreeNode = {
      ...parentNode,
      isLoading: false,
      error:
        err instanceof Error
          ? err.message
          : "Failed to load"
    };

    return {
      ...state,
      nodes: {
        ...state.nodes,
        [nodeId]: erroredParent
      }
    };
  }
}
