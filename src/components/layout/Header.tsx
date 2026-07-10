import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { SiteLogo } from "./SiteLogo";
import { ServicesNavDropdown } from "./ServicesNavDropdown";
import { ServiceAreasNavDropdown } from "./ServiceAreasNavDropdown";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useHeaderScroll } from "../../hooks/useHeaderScroll";
import { SITE_HEADER_ID } from "../../hooks/useSiteHeaderOffset";
import { isHeroHeaderRoute } from "../../utils/heroHeaderRoutes";
import { headerNavLinkClass } from "./headerNavStyles";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const heroHeader = isHeroHeaderRoute(pathname);
  const scrolled = useHeaderScroll(heroHeader);
  const transparentHeader = heroHeader && !scrolled;
  const servicesActive =
    pathname === "/services" || pathname.startsWith("/services/");
  const serviceAreasActive =
    pathname === "/service-areas" || pathname.startsWith("/service-areas/");
  const isSolid = !transparentHeader;

  return (
    <>
      <header
        id={SITE_HEADER_ID}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isSolid
            ? "border-b border-olive-muted/50 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-md"
            : "bg-transparent py-5 lg:py-6"
        }`}
        style={
          isSolid
            ? { backgroundColor: "color-mix(in srgb, var(--olive-bg-deep) 92%, transparent)" }
            : undefined
        }
      >
        <Container>
          <div className="flex h-14 min-w-0 items-center justify-between gap-2 transition-all duration-500 sm:gap-3 lg:gap-4 lg:h-16">
            <Link to="/" className="flex min-w-0 shrink items-center py-1">
              <SiteLogo imageClassName="h-10 w-auto max-w-[min(100%,9.5rem)] object-contain sm:h-12 sm:max-w-[12rem] lg:h-14 lg:max-w-[220px] xl:h-16 xl:max-w-[300px]" />
            </Link>

            <nav className="hidden h-full min-w-0 items-center gap-5 lg:flex xl:gap-8">
              <NavLink to="/" end className={({ isActive }) => headerNavLinkClass(isActive)}>
                Home
              </NavLink>

              <ServicesNavDropdown isActive={servicesActive} />

              {navLinks.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => headerNavLinkClass(isActive)}
                >
                  {link.label}
                </NavLink>
              ))}

              <ServiceAreasNavDropdown isActive={serviceAreasActive} />
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-3 xl:gap-4">
              <div className="hidden sm:block">
                <ButtonLink
                  to="/contact"
                  variant={transparentHeader ? "outline" : "primary"}
                  className={`whitespace-nowrap transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${
                    transparentHeader
                      ? "!border-white/70 !text-white hover:!bg-white/10 hover:!text-olive-gold"
                      : ""
                  }`}
                >
                  Free Estimate
                </ButtonLink>
              </div>
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              <button
                type="button"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-none text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95 lg:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <Menu size={22} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
