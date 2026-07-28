import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageVideoBackground from '../components/layout/PageVideoBackground'
import SiteNav from '../components/layout/SiteNav'
import { VIDEO_LINK, VIDEO_PANEL } from '../lib/videoTheme'

function RefundPolicy() {
  const contactEmail = 'watertankerhub@support.tankerhub.in'
  const lastUpdated = '28 July 2026'

  return (
    <PageVideoBackground>
      <Helmet>
        <title>Refund Policy — Water Tanker</title>
        <meta
          name="description"
          content="Water Tanker refund and cancellation policy. Learn about eligibility, timeframes, and how to request a refund for water tanker bookings."
        />
        <meta property="og:title" content="Refund Policy — Water Tanker" />
      </Helmet>

      <SiteNav />

      <main className="flex-1 py-8 sm:py-12 lg:py-16 pb-16">
        <article className={`${VIDEO_PANEL} max-w-3xl mx-auto`}>
          <header className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-[#BABEBC] text-sm leading-relaxed">
              <strong>Effective date:</strong> 28 July 2026 · <strong>Last updated:</strong>{' '}
              {lastUpdated} · <strong>Developer:</strong> Shubham Rana · Pune, Maharashtra, India
            </p>
          </header>

          <div className="space-y-8 text-gray-300 text-base leading-7 max-w-none">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                1. Introduction
              </h2>
              <p className="leading-relaxed mb-3">
                This Refund &amp; Cancellation Policy applies to bookings made through the{' '}
                <strong>Water Tanker</strong> (TankerHub) customer mobile application and related
                services operated by Shubham Rana (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
                It explains when refunds may be issued, how cancellations work, and what services
                are non-refundable.
              </p>
              <p className="leading-relaxed">
                By placing a booking or making a payment through the app, you agree to this policy
                in addition to our{' '}
                <Link to="/terms" className={VIDEO_LINK}>
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                2. Refund Eligibility &amp; Timeframes
              </h2>
              <p className="leading-relaxed mb-3">
                Refunds are considered based on booking status at the time of your request:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>
                  <strong>Before a driver is assigned</strong> — Full refund of any prepaid amount,
                  typically processed within <strong>5–7 business days</strong>.
                </li>
                <li>
                  <strong>After a driver is assigned but before dispatch</strong> — Partial refund
                  may apply; a cancellation fee of up to 20% of the booking amount may be deducted
                  to cover operational costs.
                </li>
                <li>
                  <strong>After the tanker has been dispatched</strong> — Generally{' '}
                  <strong>not eligible</strong> for a refund, unless the delivery could not be
                  completed due to our error or the driver&apos;s failure to arrive.
                </li>
                <li>
                  <strong>Completed deliveries</strong> — Not eligible for refund once water has
                  been delivered and the order marked complete.
                </li>
                <li>
                  <strong>Failed or duplicate payments</strong> — Full refund within{' '}
                  <strong>5–10 business days</strong> after verification.
                </li>
              </ul>
              <p className="leading-relaxed">
                Refund requests must be submitted within <strong>7 days</strong> of the booking
                date or payment date, whichever is later, unless otherwise required by applicable
                law.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                3. How to Request a Refund or Return
              </h2>
              <p className="leading-relaxed mb-3">To request a refund or report a delivery issue:</p>
              <ol className="list-decimal pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>
                  Open the app and go to <strong>My Bookings</strong> to cancel an eligible pending
                  booking directly, where available.
                </li>
                <li>
                  For completed or in-progress orders, email{' '}
                  <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                    {contactEmail}
                  </a>{' '}
                  with your booking ID, registered phone number, payment reference (if applicable),
                  and a brief description of the issue.
                </li>
                <li>
                  Our support team will review your request and respond within{' '}
                  <strong>2–3 business days</strong>.
                </li>
                <li>
                  Approved refunds for online payments (e.g. via PhonePe or other payment gateways)
                  are credited to the original payment method. Cash on Delivery (COD) bookings that
                  were never charged do not require a monetary refund.
                </li>
              </ol>
              <p className="leading-relaxed">
                We may ask for additional information or photos to verify delivery issues before
                approving a refund or replacement delivery.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                4. Non-Refundable &amp; Non-Cancellable Services
              </h2>
              <p className="leading-relaxed mb-3">
                The following are generally <strong>non-refundable and non-cancellable</strong>:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>
                  Completed water deliveries where the agreed quantity was supplied to the delivery
                  address.
                </li>
                <li>
                  Bookings cancelled after the tanker has left the supplier&apos;s location, except
                  where delivery failure is attributable to us or the assigned driver.
                </li>
                <li>
                  Subscription or membership fees after the subscription period has started and
                  services have been accessed, unless required by law.
                </li>
                <li>
                  Charges arising from incorrect delivery addresses, unavailable access at the
                  delivery site, or refusal to accept delivery by the customer.
                </li>
                <li>
                  Promotional or discounted bookings where the offer terms explicitly state
                  &quot;non-refundable&quot;.
                </li>
              </ul>
              <p className="leading-relaxed">
                Water is a perishable consumable product — once delivered, it cannot be
                &quot;returned&quot; in the traditional sense. Where quality or quantity issues are
                verified, we may offer a partial refund or a replacement delivery at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                5. Cancellation Procedures, Fees &amp; Requirements
              </h2>
              <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">
                How to cancel
              </h3>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>
                  <strong>In-app:</strong> Cancel from the booking details screen while the order
                  status is &quot;Pending&quot; or &quot;Confirmed&quot; (before dispatch).
                </li>
                <li>
                  <strong>By email:</strong> Contact{' '}
                  <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                    {contactEmail}
                  </a>{' '}
                  with your booking ID if in-app cancellation is unavailable.
                </li>
              </ul>
              <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">
                Cancellation fees
              </h3>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
                <li>No fee if cancelled before a driver is assigned.</li>
                <li>
                  Up to <strong>20% cancellation fee</strong> if cancelled after driver assignment
                  but before dispatch.
                </li>
                <li>
                  Full booking amount may be charged if cancelled after dispatch or if the customer
                  is unavailable at the delivery location.
                </li>
              </ul>
              <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">
                Requirements
              </h3>
              <p className="leading-relaxed">
                Cancellations must be made by the account holder or an authorised representative
                using the registered phone number or email. Repeated no-shows or abusive
                cancellation behaviour may result in account suspension.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                6. Payment Method-Specific Notes
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
                <li>
                  <strong>PhonePe / UPI / card payments</strong> — Refunds are processed through the
                  same payment gateway and may take 5–10 business days to appear in your account,
                  depending on your bank or wallet provider.
                </li>
                <li>
                  <strong>Cash on Delivery (COD)</strong> — No upfront charge; refunds apply only
                  if you were incorrectly charged or paid in advance for a cancelled booking.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">
                7. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Refund &amp; Cancellation Policy from time to time. Material
                changes will be posted on this page with an updated &quot;Last updated&quot; date.
                Your continued use of the app after changes constitutes acceptance of the updated
                policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">8. Contact</h2>
              <p className="leading-relaxed mb-2">
                For refund requests, cancellation help, or questions about this policy:
              </p>
              <ul className="list-none space-y-2 leading-7">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <strong>Contact form:</strong>{' '}
                  <Link to="/contact" className={VIDEO_LINK}>
                    watertankerhub.in/contact
                  </Link>
                </li>
                <li>
                  <strong>Developer:</strong> Shubham Rana, Pune, Maharashtra, India
                </li>
              </ul>
            </section>

            <p className="text-sm text-[#8A9399] italic pt-4 border-t border-[#5A6975]/30">
              See also:{' '}
              <Link to="/terms" className={VIDEO_LINK}>
                Terms &amp; Conditions
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

export default RefundPolicy
