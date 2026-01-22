import type { TreeState } from "./state";
import type { TreeNodeId } from "./types";

export function getDescendants(
  state: TreeState,
  nodeId: TreeNodeId
): TreeNodeId[] {
  const result: TreeNodeId[] = [];
  const stack = [nodeId];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const node = state.nodes[current];

    if (!node) continue;

    for (const childId of node.childrenIds) {
      result.push(childId);
      stack.push(childId);
    }
  }

  return result;
}
