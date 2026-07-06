import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";

export const IlluminateMissionBanner = () => (
  <section className="home-flow-cream relative overflow-hidden py-12 text-forest-dark sm:py-14 lg:py-16">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
      }}
      aria-hidden
    />

    <Container className="relative">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8 xl:gap-10">
        <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
              About Nova · Since 2025
            </p>
          </div>

          <h2 className="font-serif font-bold leading-[1.08] tracking-tight text-forest-dark">
            <span className="block text-[2rem] sm:text-4xl lg:text-[2.75rem]">
              Illuminate Your Outdoors with
            </span>
            <span className="mt-2 block text-[2rem] italic text-theme-accent sm:mt-3 sm:text-4xl lg:text-[2.75rem]">
              Nova Outdoor Lighting
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="slide-right">
          <div className="home-mission-split-right p-6 shadow-[var(--theme-shadow-card)] sm:p-7 lg:p-8">
            <div className="text-body space-y-3 font-sans text-sm font-medium leading-relaxed tracking-[0.02em] sm:space-y-3.5 sm:text-base sm:leading-7">
              <p>
                At{" "}
                <strong className="font-semibold text-forest-dark">
                  Nova Outdoor Lighting
                </strong>
                , we specialize in transforming outdoor spaces with stunning
                lighting, landscaping, and hardscaping solutions. Our mission is to
                enhance the beauty, safety, and functionality of your property
                through custom designs and eco-friendly practices.
              </p>

              <p>
                With years of expertise, a customer-first approach, and a passion
                for quality, we bring your vision to life—whether it&apos;s elegant
                lighting, vibrant landscapes, or durable hardscape features.
              </p>

              <p>
                Let us light up your world! Contact us today to start creating
                unforgettable outdoor experiences.
              </p>
            </div>

            <div className="group mt-5 sm:mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-theme-accent transition-all duration-300 hover:gap-3"
              >
                Contact us today
              </Link>
              <div
                className="mt-4 h-px w-10 bg-theme-accent/30 transition-all duration-500 group-hover:w-20 group-hover:bg-theme-accent"
                aria-hidden
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Container>
  </section>
);
