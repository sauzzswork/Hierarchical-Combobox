import type { TreeState } from "./state";
import type { SelectionState } from "./selection";
import type { TreeNodeId } from "./types";
import { getDescendants } from "./getDescendants";

export function getNodeSelectionState(
  state: TreeState,
  selection: SelectionState,
  nodeId: TreeNodeId
): "checked" | "unchecked" | "indeterminate" {
  const descendants = getDescendants(state, nodeId);

  if (descendants.length === 0) {
    return selection.has(nodeId)
      ? "checked"
      : "unchecked";
  }

  let selectedCount = 0;

  for (const id of descendants) {
    if (selection.has(id)) {
      selectedCount++;
    }
  }

  if (selectedCount === 0) return "unchecked";
  if (selectedCount === descendants.length)
    return "checked";

  return "indeterminate";
}
