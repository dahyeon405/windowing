import { useEffect, useState } from "react";

export const useScrollDetector = (element: HTMLElement | Window) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [throttle, setThrottle] = useState(false);

  useEffect(() => {
    const updateScrollPosition = (element: HTMLElement | Window) => {
      if (element === window) setScrollPosition(window.scrollY);
      else setScrollPosition((element as HTMLElement).scrollTop);
    };

    const onScroll = () => {
      if (throttle) return;
      setThrottle(true);
      setTimeout(() => {
        updateScrollPosition(element);
        setThrottle(false);
      }, 300);
    };

    element.addEventListener("scroll", onScroll);

    return () => {
      if (element) element.removeEventListener("scroll", onScroll);
    };
  }, [element]);

  return scrollPosition;
};
