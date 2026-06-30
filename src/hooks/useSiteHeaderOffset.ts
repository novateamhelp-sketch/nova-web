import { useEffect, useState } from "react";

export const SITE_HEADER_ID = "site-header";

/** Bottom edge of the fixed header — keeps mega-menus flush below the navbar. */
export const useSiteHeaderOffset = () => {
  const [offset, setOffset] = useState(80);

  useEffect(() => {
    const header = document.getElementById(SITE_HEADER_ID);
    if (!header) return;

    const update = () => {
      setOffset(header.getBoundingClientRect().bottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new ResizeObserver(update);
    observer.observe(header);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return offset;
};
