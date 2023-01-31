import { RefObject, useEffect, useState } from "react";

const useScrollDetector = (element: RefObject<HTMLDivElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [throttle, setThrottle] = useState(false);

  useEffect(() => {
    const target = element && element.current ? element.current : window;
    const updateScrollPosition = (target: HTMLElement | Window) => {
      if (target === window) setScrollPosition(window.scrollY);
      else setScrollPosition((target as HTMLElement).scrollTop);
    };

    const onScroll = () => {
      if (throttle) return;
      setThrottle(true);
      setTimeout(() => {
        updateScrollPosition(target);
        setThrottle(false);
      }, 300);
    };

    target.addEventListener("scroll", onScroll);

    return () => {
      if (target) target.removeEventListener("scroll", onScroll);
    };
  }, [element?.current]);

  return scrollPosition;
};

export default useScrollDetector;
