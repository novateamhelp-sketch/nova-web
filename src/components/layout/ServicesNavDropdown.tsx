import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useCategoriesNav } from "../../context/CategoriesNavContext";
import { useSiteHeaderOffset } from "../../hooks/useSiteHeaderOffset";
import { CategoryIconBox } from "../ui/CategoryIconBox";
import { headerNavLinkClass } from "./headerNavStyles";

interface ServicesNavDropdownProps {
  isActive: boolean;
}

const CLOSE_DELAY_MS = 400;
/** Invisible strip overlapping the header bottom so the cursor can reach the panel */
const HOVER_BRIDGE_PX = 24;

export const ServicesNavDropdown = ({ isActive }: ServicesNavDropdownProps) => {
  const { menuCategories } = useCategoriesNav();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerOffset = useSiteHeaderOffset();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <div className="relative flex h-full items-center">
      <NavLink
        to="/services"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        className={({ isActive: routeActive }) =>
          `inline-flex items-center gap-1.5 ${headerNavLinkClass(isActive || routeActive)}`
        }
      >
        Services
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </NavLink>

      <div
        className={`layout-x fixed inset-x-0 z-60 flex flex-col justify-start transition-opacity duration-200 ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        style={{ top: headerOffset - HOVER_BRIDGE_PX }}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div className="shrink-0" style={{ height: HOVER_BRIDGE_PX }} aria-hidden />
        <div className="w-full overflow-hidden rounded-b-xl border border-gold/40 border-t-2 border-t-gold bg-[#1a1a1a]/95 shadow-2xl backdrop-blur-md">
          <div className="px-6 py-8 sm:px-8">
            {menuCategories.length > 0 ? (
              <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {menuCategories.map((category) => (
                  <li key={category._id} className="min-w-0">
                    <Link
                      to={`/services/${category.slug}`}
                      className="group/item flex w-full items-center gap-0"
                      onMouseEnter={openMenu}
                    >
                      <CategoryIconBox
                        category={category}
                        variant="outline"
                        className="border-[1.5px] transition-transform duration-500 ease-in-out group-hover/item:rotate-90"
                      />
                      <section
                        aria-label={category.name}
                        className="services-nav-item-label flex h-10 min-w-0 flex-1 items-center bg-[#1a1a1a]/95 px-3 text-sm font-semibold uppercase tracking-wide text-white transition group-hover/item:bg-white/5 group-hover/item:text-gold"
                      >
                        {category.name}
                      </section>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-4 text-center">
                <p className="text-sm text-white/70">
                  Service categories will appear here once added in the admin
                  panel.
                </p>
                <Link
                  to="/services"
                  className="mt-3 inline-block text-sm font-semibold text-gold hover:text-gold-light"
                  onMouseEnter={openMenu}
                >
                  View services page →
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-b-xl border-t border-white/10 bg-[#141414]/95 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              All our services are residential and commercial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
