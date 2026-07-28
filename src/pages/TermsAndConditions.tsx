import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageVideoBackground from '../components/layout/PageVideoBackground'
import SiteNav from '../components/layout/SiteNav'
import { VIDEO_LINK, VIDEO_PANEL } from '../lib/videoTheme'

function TermsAndConditions() {
  const contactEmail = 'watertankerhub@support.tankerhub.in'
  const lastUpdated = '28 July 2026'

  return (
    <PageVideoBackground>
      <Helmet>
        <title>Terms &amp; Conditions — Water Tanker</title>
        <meta
          name="description"
          content="Water Tanker Terms and Conditions. Service details, user responsibilities, payment terms, and legal agreements for using our water tanker booking app."
        />
        <meta property="og:title" content="Terms & Conditions — Water Tanker" />
      </Helmet>

      <SiteNav />

      <main className="flex-1 py-8 sm:py-12 lg:py-16 pb-16">
        <article className={`${VIDEO_PANEL} max-w-3xl mx-auto`}>
          <header className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-[#BABEBC] text-sm leading-relaxed">
              <strong>Effective date:</strong> 28 July 2026 · <strong>Last updated:</strong>{' '}
              {lastUpdated} · <strong>Developer:</strong> Shubham Rana · Pune, Maharashtra, India
            </p>
          </header>

          <div className="space-y-8 text-gray-300 text-base leading-7 max-w-none">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed mb-3">
                These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the{' '}
                <strong>Water Tanker</strong> (TankerHub) customer mobile application, the Water
                Tanker Admin application, and related websites and services (collectively, the
                &quot;Service&quot;) operated by Shubham Rana (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;).
              </p>
              <p className="leading-relaxed">
                By downloading, registering for, or using the Service, you agree to be bound by
                these Terms and our{' '}
                <Link to="/privacy" className={VIDEO_LINK}>
                  Privacy Policy
                </Link>
                . If you do not agree, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                2. Service Description
              </h2>
              <p className="leading-relaxed mb-3">
                Water Tanker is an on-demand platform that connects customers with verified water
                tanker suppliers and drivers for delivery of potable or non-potable water (as
                offered in your area). We provide:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>Instant and scheduled water tanker bookings</li>
                <li>Real-time order tracking and status updates</li>
                <li>Distance-based transparent pricing</li>
                <li>Payment processing via supported methods (e.g. PhonePe, Cash on Delivery)</li>
                <li>Account management, saved addresses, and society/bulk booking features</li>
              </ul>
              <p className="leading-relaxed">
                We act as an intermediary platform. Water supply and physical delivery are
                performed by independent tanker operators and drivers. We do not own or operate
                tanker vehicles unless explicitly stated.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                3. User Responsibilities
              </h2>
              <p className="leading-relaxed mb-3">When using the Service, you agree to:</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
                <li>
                  Provide accurate registration information (name, phone, email) and keep your
                  account credentials secure
                </li>
                <li>
                  Enter correct delivery addresses and ensure safe, legal access for the tanker at
                  the scheduled time
                </li>
                <li>
                  Be present or designate an authorised person to receive the delivery and verify
                  quantity where applicable
                </li>
                <li>
                  Pay the agreed booking amount using an accepted payment method before or at
                  delivery, as applicable
                </li>
                <li>
                  Use the Service only for lawful personal or business water delivery needs in
                  compliance with local regulations
                </li>
                <li>
                  Not misuse the platform — including fake bookings, harassment of drivers, or
                  attempts to circumvent pricing or payment
                </li>
                <li>
                  Ensure any society or bulk account usage complies with your organisation&apos;s
                  rules and that you are authorised to place orders on its behalf
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                4. Account Registration
              </h2>
              <p className="leading-relaxed mb-3">
                You must be at least <strong>18 years old</strong> to create an account. One person
                may not maintain more than one customer account without our approval. We reserve
                the right to suspend or terminate accounts that violate these Terms or engage in
                fraudulent activity.
              </p>
              <p className="leading-relaxed">
                Admin and driver accounts are issued separately and subject to additional
                verification (e.g. business details, vehicle and licence information).
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                5. Payment Terms
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>
                  Prices displayed at checkout include applicable charges based on tanker size,
                  distance, and any surcharges shown before you confirm.
                </li>
                <li>
                  <strong>Online payments</strong> (e.g. PhonePe, UPI, cards) are processed by
                  third-party payment gateways. By paying, you also agree to their terms where
                  applicable.
                </li>
                <li>
                  <strong>Cash on Delivery (COD)</strong> — payment is due to the driver or as
                  instructed at delivery. Failure to pay may result in account restrictions.
                </li>
                <li>
                  Subscription or membership plans, where offered, renew as described at purchase
                  unless cancelled before the renewal date.
                </li>
                <li>
                  Refunds and cancellations are governed by our{' '}
                  <Link to="/refund" className={VIDEO_LINK}>
                    Refund &amp; Cancellation Policy
                  </Link>
                  .
                </li>
              </ul>
              <p className="leading-relaxed">
                We may change pricing, fees, or payment methods with reasonable notice through the
                app or website. Confirmed bookings are honoured at the price shown at confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                6. Usage Restrictions
              </h2>
              <p className="leading-relaxed mb-3">You may not:</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
                <li>
                  Copy, modify, reverse engineer, or distribute the app or its underlying software
                </li>
                <li>
                  Scrape, crawl, or use automated tools to access the Service without permission
                </li>
                <li>
                  Use the Service for illegal purposes or to resell water in violation of local
                  licensing laws
                </li>
                <li>Impersonate another person or misrepresent your affiliation with any entity</li>
                <li>
                  Interfere with the Service&apos;s security, servers, or networks
                </li>
                <li>
                  Post or transmit harmful, abusive, or infringing content through support channels
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                7. Intellectual Property
              </h2>
              <p className="leading-relaxed mb-3">
                The Service — including the app name, logo, UI design, software, text, graphics,
                and documentation — is owned by Shubham Rana or its licensors and protected by
                copyright, trademark, and other intellectual property laws.
              </p>
              <p className="leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable, revocable licence to use
                the app for personal or authorised business use in accordance with these Terms. You
                do not acquire any ownership rights in the Service. User-generated content (e.g.
                reviews, support messages) may be used by us to operate and improve the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                8. Limitation of Liability
              </h2>
              <p className="leading-relaxed mb-3">
                To the fullest extent permitted by applicable law:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>
                  The Service is provided &quot;as is&quot; and &quot;as available&quot; without
                  warranties of uninterrupted access, error-free operation, or fitness for a
                  particular purpose.
                </li>
                <li>
                  We are not liable for delays, shortages, or quality issues arising from
                  third-party suppliers, drivers, traffic, weather, or events beyond our reasonable
                  control.
                </li>
                <li>
                  Our total liability for any claim arising from your use of the Service shall not
                  exceed the amount you paid us for the specific booking giving rise to the claim
                  in the <strong>three (3) months</strong> preceding the claim, or ₹1,000,
                  whichever is greater.
                </li>
                <li>
                  We are not liable for indirect, incidental, special, consequential, or punitive
                  damages, including lost profits or data.
                </li>
              </ul>
              <p className="leading-relaxed">
                Nothing in these Terms excludes liability that cannot be excluded under Indian law,
                including liability for death or personal injury caused by negligence where
                applicable.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                9. Indemnification
              </h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless Shubham Rana and its affiliates from claims,
                damages, and expenses (including reasonable legal fees) arising from your misuse of
                the Service, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                10. Dispute Resolution
              </h2>
              <p className="leading-relaxed mb-3">
                If you have a dispute, please contact us first at{' '}
                <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                  {contactEmail}
                </a>{' '}
                or via our{' '}
                <Link to="/contact" className={VIDEO_LINK}>
                  contact form
                </Link>{' '}
                so we can attempt to resolve it informally within 30 days.
              </p>
              <p className="leading-relaxed mb-3">
                If informal resolution fails, disputes shall be subject to the exclusive
                jurisdiction of the courts in <strong>Pune, Maharashtra, India</strong>, and governed
                by the laws of India.
              </p>
              <p className="leading-relaxed">
                For consumer disputes, you may also pursue remedies available under the Consumer
                Protection Act, 2019, where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                11. Termination
              </h2>
              <p className="leading-relaxed">
                You may stop using the Service and delete your account at any time through app
                settings or by contacting us. We may suspend or terminate access for violations of
                these Terms, non-payment, or conduct harmful to other users, drivers, or the
                platform. Provisions that by nature should survive (e.g. liability limits,
                intellectual property, dispute resolution) remain in effect after termination.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                12. Changes to These Terms
              </h2>
              <p className="leading-relaxed">
                We may update these Terms from time to time. Material changes will be posted on
                this page with an updated &quot;Last updated&quot; date and, where appropriate,
                notified in the app. Continued use after the effective date constitutes acceptance
                of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">13. Contact</h2>
              <p className="leading-relaxed mb-2">For questions about these Terms:</p>
              <ul className="list-none space-y-2 leading-7">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <strong>Developer:</strong> Shubham Rana
                </li>
                <li>
                  <strong>Location:</strong> Pune, Maharashtra, India
                </li>
              </ul>
            </section>

            <p className="text-sm text-[#8A9399] italic pt-4 border-t border-[#5A6975]/30">
              See also:{' '}
              <Link to="/refund" className={VIDEO_LINK}>
                Refund Policy
              </Link>{' '}
              ·{' '}
              <Link to="/privacy" className={VIDEO_LINK}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </article>
      </main>
    </PageVideoBackground>
  )
}

export default TermsAndConditions
