import type { TreeNodeData, TreeNodeId } from "./types";

/**
 * Async loader function
 * Loads children for a given parent node
 */
export type LoadChildren = (
  parentId: TreeNodeId | null
) => Promise<TreeNodeData[]>;
