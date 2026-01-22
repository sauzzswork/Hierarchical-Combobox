import { Combobox } from "./combobox/Combobox";
import { TreeView } from "./tree/TreeView";

export default function App() {
  return (
    <div className="p-6">
      <Combobox label="Select items">
        <TreeView />
      </Combobox>
    </div>
  );
}

