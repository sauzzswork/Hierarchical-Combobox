import { useMemo } from "react";

interface VirtualRowsArgs<T> {
  items: T[];
  rowHeight: number;
  containerHeight: number;
  scrollTop: number;
}

export function useVirtualRows<T>({
  items,
  rowHeight,
  containerHeight,
  scrollTop
}: VirtualRowsArgs<T>) {
  return useMemo(() => {
    const totalHeight = items.length * rowHeight;

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / rowHeight)
    );

    const visibleCount =
      Math.ceil(containerHeight / rowHeight) + 2;

    const endIndex = Math.min(
      items.length,
      startIndex + visibleCount
    );

    const offsetY = startIndex * rowHeight;

    return {
      virtualItems: items.slice(startIndex, endIndex),
      offsetY,
      totalHeight
    };
  }, [items, rowHeight, containerHeight, scrollTop]);
}
