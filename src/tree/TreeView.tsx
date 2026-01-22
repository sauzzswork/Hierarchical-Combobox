import { useEffect, useState } from "react";

import type { TreeState } from "./state";
import type { SelectionState } from "./selection";

import { flattenTree } from "./flatten";
import { flattenTreeWithVisibility } from "./flattenWithVisibility";
import { getSearchVisibleNodeIds } from "./search";

import { loadNodeChildren } from "./loadChildren";
import { toggleNode } from "./actions";
import { mockLoadChildren } from "./mockLoader";

import { getNodeSelectionState } from "./getSelectionState";
import { toggleSelection } from "./toggleSelection";

import { TreeRow } from "./TreeRow";
import { useVirtualRows } from "../virtualization/useVirtualRows";

const ROW_HEIGHT = 32;
const CONTAINER_HEIGHT = 240;

export function TreeView() {
  const [tree, setTree] = useState<TreeState>({
    nodes: {},
    rootIds: []
  });

  const [selection, setSelection] = useState<SelectionState>(
    new Set()
  );

  const [query, setQuery] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // --------------------
  // LOAD ROOT NODES
  // --------------------
  useEffect(() => {
    loadNodeChildren(tree, null, mockLoadChildren).then(
      setTree
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------
  // SEARCH + FLATTENING
  // --------------------
  const visibleIds = getSearchVisibleNodeIds(tree, query);

  const flattened = query
    ? flattenTreeWithVisibility(tree, visibleIds)
    : flattenTree(tree);

  const maxIndex = flattened.length - 1;
  const activeItem = flattened[activeIndex];

  // --------------------
  // VIRTUALIZATION
  // --------------------
  const { virtualItems, offsetY, totalHeight } =
    useVirtualRows({
      items: flattened,
      rowHeight: ROW_HEIGHT,
      containerHeight: CONTAINER_HEIGHT,
      scrollTop
    });

  // --------------------
  // KEYBOARD HANDLER
  // --------------------
  function onKeyDown(e: React.KeyboardEvent) {
    if (!activeItem) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, maxIndex));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;

      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        e.preventDefault();
        setActiveIndex(maxIndex);
        break;

      case "ArrowRight": {
        e.preventDefault();
        const node = tree.nodes[activeItem.id];
        if (node?.hasChildren && !node.isExpanded) {
          loadNodeChildren(
            tree,
            activeItem.id,
            mockLoadChildren
          ).then((next) =>
            setTree(toggleNode(next, activeItem.id))
          );
        }
        break;
      }

      case "ArrowLeft": {
        e.preventDefault();
        const node = tree.nodes[activeItem.id];
        if (node?.isExpanded) {
          setTree(toggleNode(tree, activeItem.id));
        }
        break;
      }

      case "Enter":
      case " ":
        e.preventDefault();
        setSelection(
          toggleSelection(tree, selection, activeItem.id)
        );
        break;
    }
  }

  return (
    <div className="w-full">
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
        }}
        className="mb-2 w-full border border-border rounded-md px-2 py-1 text-sm"
      />

      {/* TREE VIEW */}
      <div
        tabIndex={0}
        role="tree"
        aria-activedescendant={
          activeItem
            ? `tree-node-${activeItem.id}`
            : undefined
        }
        style={{ height: CONTAINER_HEIGHT }}
        className="relative overflow-auto outline-none"
        onKeyDown={onKeyDown}
        onScroll={(e) =>
          setScrollTop(e.currentTarget.scrollTop)
        }
      >
        <div
          style={{ height: totalHeight }}
          className="relative"
        >
          <div
            style={{
              transform: `translateY(${offsetY}px)`
            }}
          >
            {virtualItems.map(({ id, depth }) => {
              const node = tree.nodes[id];
              if (!node) return null;

              const selectionState =
                getNodeSelectionState(
                  tree,
                  selection,
                  id
                );

              return (
                <TreeRow
                  key={id}
                  node={node}
                  depth={depth}
                  selectionState={selectionState}
                  onToggle={async () => {
                    if (
                      node.hasChildren &&
                      node.childrenIds.length === 0
                    ) {
                      const next =
                        await loadNodeChildren(
                          tree,
                          id,
                          mockLoadChildren
                        );
                      setTree(toggleNode(next, id));
                    } else {
                      setTree(toggleNode(tree, id));
                    }
                  }}
                  onSelect={() => {
                    setSelection(
                      toggleSelection(
                        tree,
                        selection,
                        id
                      )
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
