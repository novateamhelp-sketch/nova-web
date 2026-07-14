import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SiteLogo } from "./SiteLogo";

const footerLinks = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
];

export const Footer = () => (
  <footer className="border-t border-theme-border-subtle bg-olive-bg-deep text-white/80">
    <Container className="py-12">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Link to="/" className="mb-4 inline-flex items-center gap-3">
            <SiteLogo showText alwaysShowText imageClassName="h-10 w-auto max-w-[180px] object-contain" />
          </Link>
          <p className="text-sm leading-relaxed">
            Professional outdoor lighting, landscaping, and hardscaping across
            New Jersey, New York, and Connecticut.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-olive-gold">
            Quick Links
          </p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm transition hover:text-olive-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-olive-gold">
            Contact
          </p>
          <ul className="space-y-2 text-sm">
            <li>Calls: 908-397-0275</li>
            <li>Messages: 908-370-2842</li>
            <li>
              <a
                href="mailto:novasales@novainc.com"
                className="transition hover:text-olive-gold"
              >
                novasales@novainc.com
              </a>
            </li>
            <li>Somerset County, New Jersey</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} LumiScape. All rights reserved.
      </div>
    </Container>
  </footer>
);
