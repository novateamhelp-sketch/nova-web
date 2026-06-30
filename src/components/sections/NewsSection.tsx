import { Link } from "react-router-dom";
import type { NewsItem } from "../../types/api.types";
import { Section } from "../ui/Section";
import { SectionTitle } from "../ui/SectionTitle";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";

interface NewsSectionProps {
  items: NewsItem[];
}

export const NewsSection = ({ items }: NewsSectionProps) => {
  if (items.length === 0) return null;

  return (
    <Section tone="muted" size="md">
      <SectionTitle
        eyebrow="News & Promotions"
        title="Latest updates"
        subtitle="Current offers and announcements from Nova."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="card-surface overflow-hidden">
            {item.image?.url ? (
              <img
                src={cloudinaryUrl(item.image, { width: 500 })}
                alt={item.image.alt || item.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="p-5">
              <h3 className="text-forest-dark">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-body">{item.description}</p>
              {item.buttonUrl ? (
                <Link
                  to={
                    item.buttonUrl.startsWith("/")
                      ? item.buttonUrl
                      : "/contact"
                  }
                  className="mt-4 inline-block text-sm font-semibold text-gold hover:text-gold-dark"
                >
                  {item.buttonText || "Learn more"}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
