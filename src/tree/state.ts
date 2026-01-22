import type { TreeNode, TreeNodeId } from "./types";

export interface TreeState {
  nodes: Record<TreeNodeId, TreeNode>;
  rootIds: TreeNodeId[];
}
