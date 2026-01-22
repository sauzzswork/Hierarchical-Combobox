import type { LoadChildren } from "./loader";

export const mockLoadChildren: LoadChildren = async (
  parentId
) => {
  await new Promise((r) => setTimeout(r, 500));

  const depth = parentId ? parentId.split(".").length : 0;

  if (depth > 3) return [];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: parentId ? `${parentId}.${i}` : `${i}`,
    label: parentId
      ? `Node ${parentId}.${i}`
      : `Node ${i}`,
    hasChildren: depth < 3
  }));
};
