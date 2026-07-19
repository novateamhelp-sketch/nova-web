import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Phone, X } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useCategoriesNav } from "../../context/CategoriesNavContext";
import { SERVICE_AREA_NAV_ITEMS } from "../../config/serviceAreas.config";
import {
  CONTACT_FALLBACK,
  useSiteSettings,
} from "../../hooks/useSiteSettings";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
];

export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [serviceAreasOpen, setServiceAreasOpen] = useState(false);
  const { menuCategories } = useCategoriesNav();
  const { data: settings } = useSiteSettings();
  const phoneCalls =
    settings?.phoneCalls?.trim() || CONTACT_FALLBACK.phoneCalls;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 transition-all duration-500 ease-in-out ${
          open ? "opacity-100 backdrop-blur-[2px]" : "opacity-0 backdrop-blur-none"
        }`}
        onClick={onClose}
        aria-label="Close menu overlay"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-olive-bg-deep p-6 shadow-xl transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-bold text-gold">Menu</p>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-none text-white transition hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) =>
            link.to === "/services" ? (
              <div key={link.to}>
                <div className="flex items-center gap-1">
                  <NavLink
                    to="/services"
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      `min-h-11 flex-1 rounded-none px-3 py-3 text-base font-medium transition ${
                        isActive
                          ? "bg-forest text-gold"
                          : "text-white/80 hover:bg-forest hover:text-white"
                      }`
                    }
                  >
                    Services
                  </NavLink>
                  {menuCategories.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex min-h-11 min-w-11 items-center justify-center rounded-none text-white/80 hover:bg-forest"
                      aria-expanded={servicesOpen}
                      aria-label="Toggle service categories"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : null}
                </div>
                {servicesOpen && menuCategories.length > 0 ? (
                  <ul className="mb-2 ml-3 space-y-1 border-l border-white/10 pl-3">
                    {menuCategories.map((category) => (
                      <li key={category._id}>
                        <Link
                          to={`/services/${category.slug}`}
                          onClick={onClose}
                          className="block rounded-none px-3 py-2 text-sm text-white/75 hover:bg-forest hover:text-gold"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : link.to === "/service-areas" ? (
              <div key="service-areas">
                <div className="flex items-center gap-1">
                  <NavLink
                    to="/service-areas"
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      `min-h-11 flex-1 rounded-none px-3 py-3 text-base font-medium transition ${
                        isActive
                          ? "bg-forest text-gold"
                          : "text-white/80 hover:bg-forest hover:text-white"
                      }`
                    }
                  >
                    Service Areas
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => setServiceAreasOpen((v) => !v)}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-none text-white/80 hover:bg-forest"
                    aria-expanded={serviceAreasOpen}
                    aria-label="Toggle service area states"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition ${serviceAreasOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                {serviceAreasOpen ? (
                  <ul className="mb-2 ml-3 space-y-1 border-l border-white/10 pl-3">
                    {SERVICE_AREA_NAV_ITEMS.map((area) => (
                      <li key={area.slug}>
                        <Link
                          to={`/service-areas/${area.slug}`}
                          onClick={onClose}
                          className="block rounded-none px-3 py-2 text-sm text-white/75 hover:bg-forest hover:text-gold"
                        >
                          {area.stateName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `min-h-11 rounded-none px-3 py-3 text-base font-medium transition ${
                    isActive
                      ? "bg-forest text-gold"
                      : "text-white/80 hover:bg-forest hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <a
            href={`tel:${phoneCalls.replace(/\D/g, "")}`}
            className="flex min-h-11 items-center gap-2 text-sm text-white/80"
          >
            <Phone size={18} strokeWidth={1.75} />
            {phoneCalls}
          </a>
          <ButtonLink
            to="/contact"
            className="min-h-11 w-full"
            onClick={onClose}
          >
            Free Consultation
          </ButtonLink>
        </div>
      </aside>
    </div>
  );
};
