import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
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
            <ul className="grid gap-3 sm:grid-cols-3">
              {SERVICE_AREA_NAV_ITEMS.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/service-areas/${area.slug}`}
                    className="group/item flex h-full flex-col gap-2 border border-white/10 px-4 py-4 transition hover:border-gold/40 hover:bg-white/5"
                    onMouseEnter={openMenu}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 bg-gold/10 text-xs font-bold text-gold">
                        {getStateAbbrev(area.stateName)}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-wide text-white transition group-hover/item:text-gold">
                        {area.stateName}
                      </span>
                    </div>
                    <p className="flex items-start gap-1.5 text-xs leading-relaxed text-white/55">
                      <MapPin
                        size={12}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0"
                        aria-hidden
                      />
                      {area.counties.join(", ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-b-xl border-t border-white/10 bg-[#141414]/95 py-3 text-center">
            <Link
              to="/service-areas"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:text-gold"
              onMouseEnter={openMenu}
            >
              View all service areas →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
