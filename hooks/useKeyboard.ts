import { useState, useEffect } from "react";

export function useKeyboard() {
  const [keys, setKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.key]: true }));
    const handleUp = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.key]: false }));

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keys;
}
