import { useRef } from "react";
import { useCombobox } from "./useCombobox";

interface ComboboxProps {
  label: string;
  children: React.ReactNode;
}

export function Combobox({ label, children }: ComboboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, open, close } = useCombobox();

  return (
    <div className="relative w-80">
      <label className="block mb-1 text-sm">{label}</label>

      <input
        ref={inputRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="combobox-popup"
        className="w-full border border-border rounded-md px-2 py-1"
        onFocus={open}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            close();
            inputRef.current?.blur();
          }
        }}
      />

      {isOpen && (
        <div
          id="combobox-popup"
          role="listbox"
          className="absolute z-10 mt-1 w-full border border-border bg-surface rounded-md max-h-60 overflow-auto"
        >
          {children}
        </div>
      )}
    </div>
  );
}
