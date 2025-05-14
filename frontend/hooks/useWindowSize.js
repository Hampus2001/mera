import { useEffect, useState } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const [isDesktop, setIsDesktop] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      setIsDesktop(window.innerWidth > 768);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
}
