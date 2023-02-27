import { useEffect, useState } from "react";

const useViewportHeight = () => {
  const [throttle, setThrottle] = useState(false);
  const [viewportSize, setViewportSize] = useState(0);

  const syncHeight = () => {
    if (throttle) return;
    setThrottle(true);
    setTimeout(() => {
      setViewportSize(window.innerHeight);
      setThrottle(false);
    }, 300);
  };

  useEffect(() => {
    syncHeight();
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  return viewportSize;
};

export default useViewportHeight;
