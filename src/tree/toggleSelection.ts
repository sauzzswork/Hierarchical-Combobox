import type { TreeState } from "./state";
import type { SelectionState } from "./selection";
import type { TreeNodeId } from "./types";
import { getDescendants } from "./getDescendants";

export function toggleSelection(
  state: TreeState,
  selection: SelectionState,
  nodeId: TreeNodeId
): SelectionState {
  const next = new Set(selection);
  const descendants = getDescendants(state, nodeId);

  const shouldSelect =
    descendants.length === 0
      ? !selection.has(nodeId)
      : descendants.some((id) => !selection.has(id));

  if (descendants.length === 0) {
    if (shouldSelect) next.add(nodeId);
    else next.delete(nodeId);
    return next;
  }

  for (const id of descendants) {
    if (shouldSelect) next.add(id);
    else next.delete(id);
  }

  return next;
}
