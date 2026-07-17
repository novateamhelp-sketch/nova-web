import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { SERVICE_AREA_NAV_ITEMS } from "../../config/serviceAreas.config";
import { useSiteHeaderOffset } from "../../hooks/useSiteHeaderOffset";
import { getStateAbbrev } from "../../utils/slugify";
import { headerNavLinkClass } from "./headerNavStyles";

interface ServiceAreasNavDropdownProps {
  isActive: boolean;
}

const CLOSE_DELAY_MS = 400;
const HOVER_BRIDGE_PX = 24;

export const ServiceAreasNavDropdown = ({
  isActive,
}: ServiceAreasNavDropdownProps) => {
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
        to="/service-areas"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        className={({ isActive: routeActive }) =>
          `inline-flex items-center gap-1.5 ${headerNavLinkClass(isActive || routeActive)}`
        }
      >
        Service Areas
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
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_AREA_NAV_ITEMS.map((area) => (
                <li key={area.slug} className="min-w-0">
                  <Link
                    to={`/service-areas/${area.slug}`}
                    className="group/item flex w-full items-center gap-0"
                    onMouseEnter={openMenu}
                  >
                    <span className="category-icon-box category-icon-box--outline flex h-10 w-10 shrink-0 items-center justify-center rounded border border-gold bg-transparent text-xs font-bold text-gold border-[1.5px] transition-transform duration-500 ease-in-out group-hover/item:rotate-90">
                      {getStateAbbrev(area.stateName)}
                    </span>
                    <section
                      aria-label={area.stateName}
                      className="services-nav-item-label flex h-10 min-w-0 flex-1 items-center bg-[#1a1a1a]/95 px-3 text-sm font-semibold uppercase tracking-wide text-white transition group-hover/item:bg-white/5 group-hover/item:text-gold"
                    >
                      {area.stateName}
                    </section>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-b-xl border-t border-white/10 bg-[#141414]/95 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Residential & commercial coverage across the tri-state area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
