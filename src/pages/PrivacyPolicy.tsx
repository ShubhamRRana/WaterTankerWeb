import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageVideoBackground from '../components/layout/PageVideoBackground'
import SiteNav from '../components/layout/SiteNav'
import { VIDEO_LINK, VIDEO_PANEL } from '../lib/videoTheme'

function PrivacyPolicy() {
  const contactEmail = 'watertankerhub@support.tankerhub.in'
  const lastUpdated = '28 July 2026'

  return (
    <PageVideoBackground>
      <Helmet>
        <title>Privacy Policy — Water Tanker</title>
        <meta name="description" content="Water Tanker Privacy Policy. Learn how we collect, use, and protect your data when you use our water tanker booking app." />
        <meta property="og:title" content="Privacy Policy — Water Tanker" />
      </Helmet>

      <SiteNav />

      <main className="flex-1 py-8 sm:py-12 lg:py-16 pb-16">
      <article className={`${VIDEO_PANEL} max-w-3xl mx-auto`}>
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Privacy Policy — Water Tanker Booking App
          </h1>
          <p className="text-[#BABEBC] text-sm leading-relaxed">
            <strong>Effective date:</strong> 8 February 2025 · <strong>Last updated:</strong> {lastUpdated} · <strong>Developer:</strong> Shubham Rana · Pune, Maharashtra, India
          </p>
        </header>

        <div className="space-y-8 text-gray-300 text-base leading-7 max-w-none">
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">1. Introduction</h2>
            <p className="leading-relaxed mb-3">
              This Privacy Policy describes how <strong>Water Tanker Booking App</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;the app&quot;) collects, uses, and protects your information when you use our mobile application. The app is a cross-platform application built with React Native and Expo, and is developed by Shubham Rana in Pune, Maharashtra, India.
            </p>
            <p className="leading-relaxed mb-3">
              We are committed to protecting your privacy and complying with applicable data protection laws, including the General Data Protection Regulation (GDPR) where relevant. By using the app, you agree to the practices described in this policy.
            </p>
            <p className="leading-relaxed">
              <strong>Contact:</strong> For privacy-related questions or requests, email us at{' '}
              <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                {contactEmail}
              </a>{' '}
              or write to: Shubham Rana, Pune, Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">2. Data We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect only what is necessary to provide and improve the service.
            </p>
            <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">Personal information (required for account and bookings)</h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
              <li><strong>Email address</strong> — for account creation and login</li>
              <li><strong>Name</strong> — for account identification and bookings</li>
              <li><strong>Phone number</strong> — for account creation, bookings, and contact by drivers</li>
              <li><strong>Password</strong> — stored in hashed form; we never store or see your plain-text password</li>
            </ul>
            <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">Personal information (optional or role-specific)</h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
              <li><strong>Location (GPS)</strong> — used only when you choose to set or use a delivery address, or for service-area features; you can deny permission and still use the app with a manual address</li>
              <li><strong>Saved addresses</strong> — delivery addresses you save, which may include approximate coordinates</li>
              <li><strong>Business name</strong> — only if you register or are set up as an admin</li>
              <li><strong>Driver-related data</strong> — if you use the app as a driver: vehicle number, licence details, and (if provided) emergency contact name and phone</li>
            </ul>
            <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">Device and usage data</h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-3 leading-7 marker:text-[#5A6975]">
              <li><strong>Device information</strong> — such as device type and operating system, for compatibility and basic analytics</li>
              <li><strong>Usage data</strong> — in-app analytics (e.g. screen views, booking-related events) to improve the app; we do not sell this data</li>
            </ul>
            <p className="leading-relaxed">
              We do <strong>not</strong> collect data from children under 13. The app is intended for general adult users.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">3. Camera</h2>
            <p className="leading-relaxed mb-3">
              The mobile app may request access to your device <strong>camera</strong> only when you actively choose an action that needs it (for example taking a photo), not in the background and not without your consent through the operating system&apos;s permission prompt.
            </p>
            <p className="leading-relaxed mb-3">
              Camera access may be used for optional or feature-specific purposes such as uploading a profile picture, capturing images related to bookings or deliveries when you initiate capture, or (for drivers or admins) photographing documents such as licences or vehicles where those features exist. We do not use the camera for continuous recording, covert scanning of your surroundings, or advertising profiling.
            </p>
            <p className="leading-relaxed mb-3">
              Photos you choose to capture are transmitted and stored using the same security practices as other app data described in this policy. They are retained only as long as needed for the stated purpose unless a longer retention period is required by law.
            </p>
            <p className="leading-relaxed">
              You can deny camera permission and still use core features wherever the app supports alternatives (such as picking an existing photo from your library, if offered). You can revoke camera access at any time in your device settings; some features may be unavailable until permission is granted again.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">4. How We Use Data</h2>
            <p className="leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
              <li><strong>Create and manage your account</strong> (email, name, phone, password)</li>
              <li><strong>Process and fulfil bookings</strong> (delivery address, contact details, tanker size, date/time)</li>
              <li><strong>Match you with drivers and show orders to drivers</strong> (customer/driver name, phone, address as needed)</li>
              <li><strong>Support payment handling</strong> — currently Cash on Delivery (COD); if we add online payments (e.g. via payment gateways), we will use data only as needed for processing</li>
              <li><strong>Send push notifications</strong> (e.g. booking status updates), if you allow them</li>
              <li><strong>Improve the app</strong> — basic analytics (no sale of personal data)</li>
              <li><strong>Comply with law</strong> — when we are legally required to retain or disclose data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">5. Cookies &amp; Similar Technologies</h2>
            <p className="leading-relaxed mb-3">
              This section describes how we use cookies and similar technologies on our website and in the mobile app.
            </p>
            <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">Website (watertankerhub.in)</h3>
            <p className="leading-relaxed mb-3">
              Our marketing website may use minimal cookies and similar technologies for:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7 marker:text-[#5A6975]">
              <li>
                <strong>Essential operation</strong> — to remember basic preferences required for the site to function
              </li>
              <li>
                <strong>Analytics</strong> — to understand page visits and improve performance (e.g. Vercel Speed Insights). These do not identify you personally for advertising
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              We do <strong>not</strong> use third-party advertising or cross-site tracking cookies on this website. You can control or delete cookies through your browser settings; disabling cookies may affect some site features.
            </p>
            <h3 className="text-base sm:text-lg font-medium text-[#BABEBC] mb-2 mt-3">Mobile app</h3>
            <p className="leading-relaxed mb-3">
              The Water Tanker mobile app does not use browser cookies. It may store:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-3 leading-7 marker:text-[#5A6975]">
              <li>
                <strong>Authentication tokens</strong> — to keep you signed in securely (via Supabase Auth)
              </li>
              <li>
                <strong>Local preferences</strong> — such as saved addresses and notification settings on your device
              </li>
              <li>
                <strong>Session and analytics data</strong> — to improve app stability and features; we do not sell this data
              </li>
            </ul>
            <p className="leading-relaxed">
              You can clear app data by logging out, uninstalling the app, or clearing storage in your device settings. Push notification tokens are used only to deliver booking updates you opt into.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">6. Third Parties</h2>
            <p className="leading-relaxed mb-4">
              We do <strong>not</strong> sell your personal data to third parties or ad networks.
            </p>
            <p className="leading-relaxed mb-3">We may share your information only in these cases:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
              <li><strong>Service providers</strong> — with providers that help us run the app, under strict confidentiality (e.g. Supabase for backend and authentication; if we add payment gateways such as Razorpay or others, only as needed for payment processing)</li>
              <li><strong>Drivers and operations</strong> — customer name, phone, and delivery address are shared with the driver assigned to your booking so they can complete the delivery</li>
              <li><strong>Legal requirements</strong> — when required by law, court order, or government request</li>
              <li><strong>Your consent</strong> — where you have given explicit consent for a specific use</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Data is stored on secure servers (e.g. via Supabase); server regions may include EU/US or other regions depending on our hosting configuration.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">7. Data Security</h2>
            <p className="leading-relaxed mb-3">We take reasonable steps to protect your data:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
              <li><strong>Authentication</strong> — we use Supabase Auth; passwords are hashed and not stored in plain text</li>
              <li><strong>Access control</strong> — only authorised roles (e.g. drivers, admins) can access data needed for their function</li>
              <li><strong>Secure transmission</strong> — data is transmitted over HTTPS</li>
              <li><strong>Storage</strong> — personal and booking data is stored on secure cloud infrastructure</li>
            </ul>
            <p className="leading-relaxed mt-4">
              No system is completely secure; we encourage you to use a strong password and keep your login details private.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">8. User Rights</h2>
            <p className="leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 leading-7 marker:text-[#5A6975]">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Correction</strong> — ask us to correct inaccurate or incomplete data (e.g. via app profile or settings)</li>
              <li><strong>Deletion</strong> — request deletion of your account and associated data, subject to legal retention requirements</li>
              <li><strong>Opt-out</strong> — limit or opt out of optional data (e.g. disable location or camera access, or turn off push notifications in device settings)</li>
              <li><strong>Withdraw consent</strong> — where we rely on consent, you may withdraw it at any time</li>
            </ul>
            <p className="leading-relaxed mt-4">
              To exercise these rights, use in-app settings where available, or contact us at{' '}
              <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                {contactEmail}
              </a>
              . We will respond within a reasonable time and in line with applicable law (e.g. 30 days under GDPR where it applies).
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">9. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              The app is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy in the app and/or by email or in-app notice, and we will update the &quot;Last updated&quot; date at the top. Your continued use of the app after the effective date of changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 mt-2">11. Contact</h2>
            <p className="leading-relaxed mb-2">
              For privacy questions, access/deletion requests, or complaints:
            </p>
            <ul className="list-none space-y-2 leading-7">
              <li><strong>Email:</strong>{' '}
                <a href={`mailto:${contactEmail}`} className={VIDEO_LINK}>
                  {contactEmail}
                </a>
              </li>
              <li><strong>Developer:</strong> Shubham Rana</li>
              <li><strong>Location:</strong> Pune, Maharashtra, India</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We will work to resolve any concerns in line with applicable data protection laws.
            </p>
          </section>

          <p className="text-sm text-[#8A9399] italic pt-4 border-t border-[#5A6975]/30">
            See also:{' '}
            <Link to="/terms" className={VIDEO_LINK}>
              Terms &amp; Conditions
            </Link>{' '}
            ·{' '}
            <Link to="/refund" className={VIDEO_LINK}>
              Refund Policy
            </Link>
            . This policy is designed to align with Google Play Data Safety, payment gateway requirements, and GDPR where applicable.
          </p>
        </div>
      </article>
      </main>
    </PageVideoBackground>
  )
}

export default PrivacyPolicy
