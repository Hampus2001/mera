import { useEffect, useState } from "react";

export function useWindowSize() {
  const getSize = () => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [{ width, height }, setSize] = useState(getSize());

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }
    window.addEventListener("resize", handleResize);
    // Set initial size in case it changed before mount
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height };
}
