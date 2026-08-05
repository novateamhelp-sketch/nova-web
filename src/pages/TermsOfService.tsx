import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO, SERVICE_AREA_LONG, SITE_NAME } from "../utils/siteMeta";
import {
  LegalDocumentLayout,
  LegalSection,
} from "../components/legal/LegalDocumentLayout";

const EFFECTIVE = "August 5, 2026";

export const TermsOfService = () => {
  usePageMeta({
    title: PAGE_SEO.terms.title,
    description: PAGE_SEO.terms.description,
  });

  return (
    <LegalDocumentLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      effectiveDate={EFFECTIVE}
    >
      <LegalSection title="1. Acceptance of terms">
        <p>
          By accessing or using the {SITE_NAME} website, you agree to these
          Terms &amp; Conditions. If you do not agree, please do not use the
          site.
        </p>
      </LegalSection>

      <LegalSection title="2. Use of the website">
        <p>
          You may use this website for lawful purposes only—to learn about our
          services and to request information or estimates. You agree not to
          misuse the site, attempt unauthorized access, submit malicious or
          automated spam, or interfere with its operation.
        </p>
      </LegalSection>

      <LegalSection title="3. Intellectual property">
        <p>
          All content on this website—including text, images, logos, designs,
          and project photos—is owned by {SITE_NAME} or its licensors and is
          protected by applicable intellectual property laws. You may not copy,
          reproduce, or distribute site content without our prior written
          permission, except for personal, non-commercial viewing.
        </p>
      </LegalSection>

      <LegalSection title="4. Service descriptions">
        <p>
          Descriptions of outdoor lighting, landscaping, hardscaping, and related
          services are for general informational purposes. Actual offerings,
          availability, and suitability depend on your property and an
          evaluation by our team.
        </p>
      </LegalSection>

      <LegalSection title="5. Estimates &amp; service disclaimer">
        <p>
          All information provided on this website is for general informational
          purposes only. Project estimates are preliminary and may change after
          an onsite evaluation. Submitting a contact or estimate form does not
          create a contract.
        </p>
        <p>
          All project timelines and estimates are subject to onsite evaluation,
          availability of materials, weather conditions, site conditions,
          permits, access, and project requirements. Final pricing and scope are
          confirmed in writing after assessment.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of liability">
        <p>
          To the fullest extent permitted by law, {SITE_NAME} and its affiliates
          are not liable for any indirect, incidental, special, or consequential
          damages arising from your use of this website or reliance on its
          content. Our liability related to website use is limited to the
          greatest extent allowed under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-party links">
        <p>
          The site may link to third-party websites or embed maps and media. We
          are not responsible for the content, privacy practices, or availability
          of those third parties.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes">
        <p>
          We may update these Terms at any time. The effective date above will
          be revised when changes are posted. Continued use of the site after
          changes means you accept the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing law">
        <p>
          These Terms are governed by the laws of the State of New Jersey and
          applicable United States federal law, without regard to conflict of
          law principles. Our services are offered primarily in{" "}
          {SERVICE_AREA_LONG}.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact">
        <p>
          Questions about these Terms:{" "}
          <a
            href="mailto:info@lumiscapeservices.com"
            className="font-semibold text-theme-accent hover:underline"
          >
            info@lumiscapeservices.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
};
