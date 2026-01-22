/** Unique identifier for a tree node */
export type TreeNodeId = string;

/** Raw node shape returned from async loader */
export interface TreeNodeData {
  id: TreeNodeId;
  label: string;
  hasChildren: boolean;
}

/** Internal normalized tree node */
export interface TreeNode extends TreeNodeData {
  parentId: TreeNodeId | null;
  childrenIds: TreeNodeId[];
  isExpanded: boolean;
  isLoading: boolean;
  error: string | null;
}
