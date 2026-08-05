import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO, SITE_NAME } from "../utils/siteMeta";
import {
  LegalDocumentLayout,
  LegalSection,
} from "../components/legal/LegalDocumentLayout";

const EFFECTIVE = "August 5, 2026";

export const AccessibilityStatement = () => {
  usePageMeta({
    title: PAGE_SEO.accessibility.title,
    description: PAGE_SEO.accessibility.description,
  });

  return (
    <LegalDocumentLayout
      eyebrow="Legal"
      title="Accessibility Statement"
      effectiveDate={EFFECTIVE}
    >
      <LegalSection title="Our commitment">
        <p>
          {SITE_NAME} is committed to making our website accessible to as many
          people as possible, including people with disabilities. We aim to
          improve usability in line with generally accepted accessibility
          practices.
        </p>
      </LegalSection>

      <LegalSection title="Measures we take">
        <ul className="list-disc space-y-1 pl-5">
          <li>Meaningful alternative text for informative images where provided</li>
          <li>Form labels and clear error messaging on contact forms</li>
          <li>Keyboard-accessible navigation and interactive controls where applicable</li>
          <li>Color themes with attention to contrast between text and backgrounds</li>
          <li>Ongoing review and improvement of page structure and semantics</li>
        </ul>
      </LegalSection>

      <LegalSection title="Feedback">
        <p>
          If you experience a barrier on our website or need information in an
          alternative format, please contact us. We will work with you to find a
          solution.
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:info@lumiscapeservices.com"
            className="font-semibold text-theme-accent hover:underline"
          >
            info@lumiscapeservices.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Ongoing improvements">
        <p>
          Accessibility is an ongoing effort. We continue to test and enhance
          this site as we add features and content.
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
};
