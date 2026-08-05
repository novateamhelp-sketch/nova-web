import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO, SERVICE_AREA_LONG, SITE_NAME } from "../utils/siteMeta";
import {
  LegalDocumentLayout,
  LegalSection,
} from "../components/legal/LegalDocumentLayout";

const EFFECTIVE = "August 5, 2026";

export const PrivacyPolicy = () => {
  usePageMeta({
    title: PAGE_SEO.privacy.title,
    description: PAGE_SEO.privacy.description,
  });

  return (
    <LegalDocumentLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate={EFFECTIVE}
    >
      <LegalSection title="1. Who we are">
        <p>
          {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          provides outdoor lighting, landscaping, and hardscaping services across{" "}
          {SERVICE_AREA_LONG}. This Privacy Policy explains how we collect, use,
          and share information when you use our website or contact us.
        </p>
        <p>
          {SITE_NAME} operates as a branch of work belonging to M.M.J.J. Services
          LLC. For privacy questions, email{" "}
          <a
            href="mailto:info@lumiscapeservices.com"
            className="font-semibold text-theme-accent hover:underline"
          >
            info@lumiscapeservices.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>
          We collect information you provide through our contact and estimate
          forms, including your name, email address, phone number, street
          address, city, state, ZIP code, and project details, in order to
          respond to your inquiries and provide estimates.
        </p>
        <p>
          We may also collect technical information such as your IP address when
          you submit a form (for security and spam prevention), and limited log
          data from our hosting providers. Our admin panel uses a secure session
          cookie for authenticated staff only—not for public marketing tracking.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use information">
        <p>We use your information to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Respond to inquiries and prepare estimates</li>
          <li>Contact you about your project by phone, message, or email</li>
          <li>Improve our website and customer service</li>
          <li>Protect against spam, fraud, and abuse (including CAPTCHA checks)</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sharing of information">
        <p>
          We do not sell your personal information. We may share data with
          service providers that help us operate the business, such as website
          hosting, database hosting, image hosting (e.g. Cloudinary), email
          delivery, and bot protection (Cloudflare Turnstile). These providers
          process data only as needed to provide their services.
        </p>
      </LegalSection>

      <LegalSection title="5. Retention">
        <p>
          We retain lead and contact information for as long as needed to
          respond to your request, manage the customer relationship, and meet
          legitimate business or legal requirements. You may ask us to update or
          delete your information by contacting us.
        </p>
      </LegalSection>

      <LegalSection title="6. Security">
        <p>
          We use reasonable administrative and technical measures to protect
          information submitted through our site. No method of transmission over
          the Internet is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies">
        <p>
          Our public website does not use third-party advertising or analytics
          cookies at this time. We may use essential technical storage (such as
          theme preference in your browser) and, for the admin panel only, a
          secure authentication cookie. If we later add analytics or advertising
          tools, we will update this policy and provide appropriate notices.
        </p>
      </LegalSection>

      <LegalSection title="8. Your choices and rights">
        <p>
          Depending on where you live, you may have rights to access, correct,
          or delete personal information we hold about you. To make a request,
          contact us at the email above. We will respond as required by
          applicable law.
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          Our services are directed to adults and property owners. We do not
          knowingly collect personal information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes">
        <p>
          We may update this Privacy Policy from time to time. The effective
          date at the top of this page will change when we do. Continued use of
          the site after updates constitutes acceptance of the revised policy.
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
};
