import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** When false, animation can reset when leaving the viewport */
  once?: boolean;
}

export const useInView = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
  once = true,
}: UseInViewOptions = {}) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
};
