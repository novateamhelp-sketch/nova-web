import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 32;

/** Solid header once the user scrolls past the hero on pages with a transparent header. */
export const useHeaderScroll = (enabled: boolean) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setScrolled(false);
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  return scrolled;
};
