import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

interface LegalDocumentLayoutProps {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

export const LegalDocumentLayout = ({
  eyebrow,
  title,
  effectiveDate,
  children,
}: LegalDocumentLayoutProps) => (
  <Section tone="white" size="lg" className="pt-8 sm:pt-10">
    <Container className="max-w-3xl">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="font-serif text-3xl font-bold tracking-tight text-forest-dark sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 font-sans text-sm text-sage">
        Effective date: {effectiveDate}
      </p>
      <div className="legal-prose mt-10 space-y-8 font-sans text-sm leading-relaxed text-sage sm:text-base sm:leading-7">
        {children}
      </div>
      <p className="mt-12 border-t border-theme-border-subtle pt-6 text-sm text-muted">
        <Link to="/contact" className="font-semibold text-theme-accent hover:underline">
          Contact us
        </Link>
        {" · "}
        <Link to="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        {" · "}
        <Link to="/terms" className="hover:underline">
          Terms of Service
        </Link>
        {" · "}
        <Link to="/accessibility" className="hover:underline">
          Accessibility
        </Link>
      </p>
    </Container>
  </Section>
);

export const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section>
    <h2 className="mb-3 font-serif text-xl font-bold text-forest-dark sm:text-2xl">
      {title}
    </h2>
    <div className="space-y-3">{children}</div>
  </section>
);
