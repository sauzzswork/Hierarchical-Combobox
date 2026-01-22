import { useState, useCallback } from "react";

export function useCombobox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(null);
  }, []);

  return {
    isOpen,
    activeIndex,
    setActiveIndex,
    open,
    close
  };
}
