import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SiteLogo } from "./SiteLogo";
import {
  CONTACT_FALLBACK,
  useSiteSettings,
} from "../../hooks/useSiteSettings";

const footerLinks = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
];

export const Footer = () => {
  const { data: settings } = useSiteSettings();

  const phoneCalls = settings?.phoneCalls?.trim() || CONTACT_FALLBACK.phoneCalls;
  const phoneMessages =
    settings?.phoneMessages?.trim() || CONTACT_FALLBACK.phoneMessages;
  const email = settings?.email?.trim() || CONTACT_FALLBACK.email;
  const location = settings?.location?.trim() || CONTACT_FALLBACK.location;
  const siteName = settings?.siteName?.trim() || "LumiScape";

  return (
    <footer className="border-t border-theme-border-subtle bg-olive-bg-deep text-white/80">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-3">
              <SiteLogo
                showText
                alwaysShowText
                imageClassName="h-10 w-auto max-w-[180px] object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Professional outdoor lighting, landscaping, and hardscaping across
              New Jersey, New York, and Pennsylvania.
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
              <li>
                Calls:{" "}
                <a
                  href={`tel:${phoneCalls.replace(/\D/g, "")}`}
                  className="transition hover:text-olive-gold"
                >
                  {phoneCalls}
                </a>
              </li>
              <li>
                Messages:{" "}
                <a
                  href={`tel:${phoneMessages.replace(/\D/g, "")}`}
                  className="transition hover:text-olive-gold"
                >
                  {phoneMessages}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="transition hover:text-olive-gold"
                >
                  {email}
                </a>
              </li>
              <li>{location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};
