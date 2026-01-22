import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "../Combobox";
import { TreeView } from "../../tree/TreeView";

const meta: Meta<typeof Combobox> = {
  title: "Components/HierarchicalCombobox",
  component: Combobox,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Combobox>;

/* -------------------------------
   DEFAULT / HAPPY PATH
-------------------------------- */
export const Default: Story = {
  render: () => (
    <Combobox label="Select items">
      <TreeView />
    </Combobox>
  )
};

/* -------------------------------
   KEYBOARD-ONLY USAGE
-------------------------------- */
export const KeyboardOnly: Story = {
  render: () => (
    <Combobox label="Keyboard only (Tab + Arrows)">
      <TreeView />
    </Combobox>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use Tab to focus, Arrow keys to navigate, Space/Enter to select."
      }
    }
  }
};

/* -------------------------------
   EMPTY STATE
-------------------------------- */
export const EmptyTree: Story = {
  render: () => (
    <Combobox label="Empty tree">
      <div className="p-2 text-sm text-gray-500">
        No items available
      </div>
    </Combobox>
  )
};

/* -------------------------------
   LOADING STATE
-------------------------------- */
export const LoadingState: Story = {
  render: () => (
    <Combobox label="Loading">
      <div className="p-2 text-sm text-gray-400">
        Loading nodes…
      </div>
    </Combobox>
  )
};

/* -------------------------------
   ERROR STATE
-------------------------------- */
export const ErrorState: Story = {
  render: () => (
    <Combobox label="Error">
      <div className="p-2 text-sm text-red-600">
        Failed to load data
      </div>
    </Combobox>
  )
};
