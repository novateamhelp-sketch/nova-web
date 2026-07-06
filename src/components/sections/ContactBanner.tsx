import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";

export const ContactBanner = () => (
  <section className="contact-banner py-16 sm:py-20 lg:py-24" aria-labelledby="contact-banner-heading">
    <div className="contact-banner__glow contact-banner__glow--a" aria-hidden />
    <div className="contact-banner__glow contact-banner__glow--b" aria-hidden />
    <div className="contact-banner__vignette" aria-hidden />
    <div className="contact-banner__grid" aria-hidden />

    <Container className="relative z-10 text-center">
      <div className="relative mx-auto max-w-2xl">
        <div className="mb-7 flex items-center justify-center gap-3 sm:mb-8">
          <span className="contact-banner__eyebrow-line" aria-hidden />
          <p className="contact-banner__eyebrow">Get in touch</p>
          <span className="contact-banner__eyebrow-line" aria-hidden />
        </div>

        <h2 id="contact-banner-heading" className="contact-banner__title">
          Do you like{" "}
          <span className="contact-banner__title-accent">what you see?</span>
        </h2>

        <p className="contact-banner__subtitle">
          <span className="contact-banner__subtitle--short">
            Let&apos;s work together
          </span>
          <span className="contact-banner__subtitle--long">
            Let&apos;s work together to bring your outdoor lighting vision to
            life with precision and design excellence.
          </span>
        </p>

        <Link to="/contact" className="contact-banner__cta mt-9 sm:mt-10">
          Contact Us
          <ArrowRight
            className="contact-banner__cta-icon"
            size={16}
            strokeWidth={2.25}
            aria-hidden
          />
        </Link>
      </div>
    </Container>
  </section>
);
