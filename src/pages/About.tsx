import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { DisplayTitle } from "../components/ui/DisplayTitle";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO } from "../utils/siteMeta";

const INTRO_PARAGRAPHS = [
  "We transform outdoor spaces with landscape lighting, hardscaping, and architectural illumination solutions that enhance the beauty, safety, and functionality of every property. We specialize in the design, installation, and maintenance of lighting systems that highlight the most impressive details of gardens, patios, pathways, and facades.",
  "Based in New Jersey, we offer personalized services for residential and commercial properties, ensuring that each project reflects our clients' vision and needs. Whether creating a cozy atmosphere, improving nighttime security, or enhancing a space's aesthetics, our team combines expertise and cutting-edge technology to deliver exceptional results.",
  "At Nova Outdoor Lighting, we illuminate your world with style, efficiency, and quality.",
];

const MISSION =
  "To provide lighting, landscaping, and hardscaping solutions that combine innovative design, energy efficiency, and top-quality materials to enhance the beauty and security of any outdoor space.";

const VISION =
  "To be the leading company in outdoor lighting design and installation in our region, recognized for excellence in every project and our commitment to customer satisfaction.";

const VALUES = [
  {
    title: "Quality",
    text: "We use top-tier materials and technology to ensure durability and efficiency.",
  },
  {
    title: "Innovation",
    text: "We implement the latest trends in design and technology in every project.",
  },
  {
    title: "Commitment",
    text: "We strive to exceed our clients' expectations with customized solutions and exceptional service.",
  },
  {
    title: "Sustainability",
    text: "We promote the use of energy-efficient lighting and eco-friendly practices in our designs.",
  },
] as const;

export const About = () => {
  usePageMeta({
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
  });

  return (
    <>
      <Section tone="dark" size="lg">
        <SectionTitle
          light
          eyebrow="About Us"
          title="Nova Outdoor Lighting"
          subtitle="Landscape lighting, hardscaping, and architectural illumination across New Jersey and the tri-state area."
        />
      </Section>

      <Section tone="white">
        <SectionTitle
          eyebrow="Who we are"
          title="About our company"
          subtitle="Design, installation, and maintenance for residential and commercial outdoor spaces."
        />
        <ScrollReveal variant="slide-left" className="mt-10 max-w-3xl space-y-5 text-body leading-relaxed">
          {INTRO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </ScrollReveal>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal variant="slide-left">
            <Card>
              <p className="eyebrow mb-2">Our Mission</p>
              <DisplayTitle as="h3" size="card" title="Our Mission" />
              <p className="mt-4 text-body leading-relaxed">{MISSION}</p>
            </Card>
          </ScrollReveal>
          <ScrollReveal variant="slide-right">
            <Card>
              <p className="eyebrow mb-2">Our Vision</p>
              <DisplayTitle as="h3" size="card" title="Our Vision" />
              <p className="mt-4 text-body leading-relaxed">{VISION}</p>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <SectionTitle
          align="center"
          eyebrow="Our Values"
          title="What guides every project"
          subtitle="The principles behind our design, installation, and client relationships."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <ScrollReveal key={value.title} variant="fade-up" staggerIndex={index + 1}>
              <Card hover>
                <DisplayTitle as="h3" size="card" title={value.title} />
                <p className="mt-3 text-body leading-relaxed">{value.text}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
};
