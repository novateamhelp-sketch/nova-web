import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Award, FileBadge, Handshake, Leaf, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { DisplayTitle } from "../components/ui/DisplayTitle";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { PageHeroBanner } from "../components/sections/PageHeroBanner";
import { PageHeroScrollStack } from "../components/sections/PageHeroScrollStack";
import { usePageMeta } from "../hooks/usePageMeta";
import { usePublicData } from "../hooks/usePublicData";
import * as publicService from "../services/public.service";
import { PAGE_SEO } from "../utils/siteMeta";
import { ABOUT_HERO_BANNER_KEY } from "../utils/styleAssetMedia";
import { splitDisplayTitle } from "../utils/titleDisplay";
import { renderSerifTitleText } from "../utils/serifTitleText";

const ABOUT_COMPANY_DESCRIPTION =
  "Design, installation, and maintenance for residential and commercial outdoor spaces across New Jersey, New York, and Pennsylvania.";

const ABOUT_COMPANY_BENEFITS = [
  "Landscape lighting, hardscaping, and architectural illumination for gardens, patios, pathways, and facades.",
  "Personalized services for residential and commercial properties tailored to each client's vision.",
  "Expert design, installation, and maintenance with energy-efficient, cutting-edge technology.",
  "Enhanced atmosphere, nighttime security, and architectural beauty on every project.",
];

const MISSION =
  "To provide lighting, landscaping, and hardscaping solutions that combine innovative design, energy efficiency, and top-quality materials to enhance the beauty and security of any outdoor space.";

const VISION =
  "To be the leading company in outdoor lighting design and installation in our region, recognized for excellence in every project and our commitment to customer satisfaction.";

const COMPANY_AFFILIATION =
  "LumiScape is a branch of work belonging to M.M.J.J. Services LLC.";

const LICENSE_CERTIFICATION = "13VH09395800";
const POLICY_NUMBER = "10143566941";

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Award,
    title: "Top-Tier Quality",
    text: "We use top-tier materials and technology to ensure durability and efficiency.",
  },
  {
    icon: Sparkles,
    title: "Creative Innovation",
    text: "We implement the latest trends in design and technology in every project.",
  },
  {
    icon: Handshake,
    title: "Client Commitment",
    text: "We strive to exceed our clients' expectations with customized solutions and exceptional service.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Solutions",
    text: "We promote the use of energy-efficient lighting and eco-friendly practices in our designs.",
  },
];

export const About = () => {
  usePageMeta({
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
  });

  const fetchAssets = useCallback(async () => {
    const styleAssets = await publicService.getStyleAssets().catch(() => []);
    return { styleAssets };
  }, []);

  const { data } = usePublicData("about-style-assets", fetchAssets);

  return (
    <>
      <PageHeroScrollStack>
        <PageHeroBanner
          imageKey={ABOUT_HERO_BANNER_KEY}
          styleAssets={data?.styleAssets}
          eyebrow="About Us"
          title="LumiScape"
          imageAlt="LumiScape landscape and architectural illumination"
        />

        <section className="hero-scroll-over-panel relative overflow-hidden bg-theme-warm py-12 text-forest-dark sm:py-14 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
            }}
            aria-hidden
          />

          <Container className="relative">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
                <div className="mb-6 flex items-center gap-3 sm:mb-8">
                  <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
                    Who we are
                  </p>
                </div>

                <h2 className="font-serif font-bold leading-[1.04] tracking-tight text-forest-dark">
                  <span className="block text-[2.35rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                    About our
                  </span>
                  <span className="mt-2 block text-[2.5rem] italic theme-accent-gradient sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
                    company
                  </span>
                </h2>

                <p className="mt-7 max-w-lg font-sans text-sm font-medium leading-relaxed tracking-[0.02em] text-body sm:mt-9 sm:text-base sm:leading-8">
                  {ABOUT_COMPANY_DESCRIPTION}
                </p>

                <div className="mt-8 sm:mt-9">
                  <Link
                    to="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-none bg-[var(--theme-btn-solid-bg)] px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-btn-solid-text)] transition hover:brightness-110"
                  >
                    Request Your Free Consultation!
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slide-right" className="w-full lg:justify-self-end">
                <div className="relative w-full p-4">
                  <div
                    className="pointer-events-none absolute -left-4 -top-4 z-0 h-32 w-32 border border-theme-accent/50"
                    aria-hidden
                  />
                  <div className="service-area-benefits-panel relative z-10 p-8 shadow-[var(--theme-shadow-card)] sm:p-10 lg:min-h-[320px] lg:p-11">
                    <ul className="space-y-4 sm:space-y-5">
                      {ABOUT_COMPANY_BENEFITS.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex gap-3 font-sans text-sm font-medium leading-relaxed tracking-[0.02em] text-body sm:text-base sm:leading-7"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-theme-accent"
                            aria-hidden
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="pointer-events-none absolute -bottom-4 -right-4 z-0 h-32 w-32 border border-theme-accent/50"
                    aria-hidden
                  />
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </PageHeroScrollStack>

      <Section tone="muted">
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <ScrollReveal variant="slide-left" className="h-full">
            <Card className="h-full">
              <p className="eyebrow mb-2">Our Mission</p>
              <DisplayTitle as="h3" size="card" title="Our Mission" />
              <p className="mt-4 text-body leading-relaxed">{MISSION}</p>
            </Card>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" className="h-full">
            <Card className="h-full">
              <p className="eyebrow mb-2">Our Vision</p>
              <DisplayTitle as="h3" size="card" title="Our Vision" />
              <p className="mt-4 text-body leading-relaxed">{VISION}</p>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="default" size="md">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
                Credentials
              </p>
            </div>

            <h2 className="font-serif font-bold leading-[1.08] tracking-tight text-forest-dark">
              <span className="block text-[2rem] sm:text-4xl lg:text-[2.75rem]">
                Licensed under
              </span>
              <span className="mt-2 block text-[2rem] italic theme-accent-gradient sm:mt-3 sm:text-4xl lg:text-[2.75rem]">
                M.M.J.J. Services LLC
              </span>
            </h2>

            <p className="mt-6 max-w-lg font-sans text-sm font-medium leading-relaxed tracking-[0.02em] text-body sm:mt-7 sm:text-base sm:leading-8">
              {COMPANY_AFFILIATION}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="slide-right">
            <div className="relative p-4">
              <div
                className="pointer-events-none absolute -left-3 -top-3 z-0 h-24 w-24 border border-theme-accent/50"
                aria-hidden
              />
              <div className="home-mission-split-right relative z-10 space-y-6 p-7 shadow-[var(--theme-shadow-card)] sm:space-y-7 sm:p-8 lg:p-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-theme-accent/12">
                    <FileBadge
                      size={20}
                      strokeWidth={1.75}
                      className="text-theme-accent"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent sm:text-[11px]">
                      Home Improvement Contractor
                    </p>
                    <p className="mt-1.5 font-sans text-sm font-medium leading-relaxed text-body sm:text-base">
                      License Certification
                    </p>
                    <p className="mt-2 font-serif text-xl font-semibold tracking-wide text-forest-dark sm:text-2xl">
                      {LICENSE_CERTIFICATION}
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-theme-accent/20" aria-hidden />

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-theme-accent/12">
                    <Award
                      size={20}
                      strokeWidth={1.75}
                      className="text-theme-accent"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent sm:text-[11px]">
                      Insurance
                    </p>
                    <p className="mt-1.5 font-sans text-sm font-medium leading-relaxed text-body sm:text-base">
                      Policy number
                    </p>
                    <p className="mt-2 font-serif text-xl font-semibold tracking-wide text-forest-dark sm:text-2xl">
                      {POLICY_NUMBER}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 z-0 h-24 w-24 border border-theme-accent/50"
                aria-hidden
              />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-theme-warm py-16 text-forest-dark sm:py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
          }}
          aria-hidden
        />

        <Container className="relative">
          <SectionTitle
            align="center"
            eyebrow="Our Values"
            title="What guides every project"
            subtitle="The principles behind our design, installation, and client relationships."
          />
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              const split = splitDisplayTitle(value.title);
              const primary = split.mode === "default" ? split.primary : value.title;
              const accent = split.mode === "default" ? split.accent : null;

              return (
                <ScrollReveal
                  key={value.title}
                  variant="fade-up"
                  staggerIndex={index + 1}
                  className="h-full"
                >
                  <article className="theme-card-border group relative h-full bg-theme-card p-8">
                    <div className="mb-7 flex h-12 w-12 items-center justify-center bg-theme-accent/12 transition-colors group-hover:bg-theme-accent/22">
                      <Icon
                        size={22}
                        strokeWidth={1.75}
                        className="text-theme-accent"
                        aria-hidden
                      />
                    </div>

                    <h3 className="font-serif text-[26px] leading-tight text-forest-dark">
                      {renderSerifTitleText(primary)}
                    </h3>
                    {accent ? (
                      <div className="font-serif text-[26px] italic leading-tight text-theme-accent">
                        {renderSerifTitleText(accent)}
                      </div>
                    ) : null}

                    <p className="mt-5 font-sans text-[14px] font-light leading-[1.75] text-muted">
                      {value.text}
                    </p>

                    <div
                      className="mt-7 h-px w-10 bg-theme-accent transition-all duration-500 group-hover:w-20"
                      aria-hidden
                    />
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
};
