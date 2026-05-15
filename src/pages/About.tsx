import { Helmet } from 'react-helmet-async'

function About() {
  return (
    <main className="flex-1 min-h-screen">
      <Helmet>
        <title>About Us — Water Tanker</title>
        <meta
          name="description"
          content="Learn about Water Tanker — our admin operations app and TankerHub customer app. Mission, values, and what we offer."
        />
        <meta property="og:title" content="About Us — Water Tanker" />
      </Helmet>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-3xl">
        <header className="mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 leading-tight">
            About Us
          </h1>
          <p className="text-primary/80 text-base leading-relaxed">
            Two apps, one purpose: reliable water delivery for homes, businesses, and communities.
          </p>
        </header>

        <div className="space-y-12 sm:space-y-16 text-primary/90 text-base leading-7 max-w-none">
          <section id="admin-app" className="scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-2">
              Water Tanker — Admin App
            </h2>
            <p className="text-lg font-medium text-primary/90 mb-6">
              Delivering Water, Building Trust
            </p>
            <p className="leading-relaxed mb-4">
              We are a dedicated water tanker delivery service committed to providing clean,
              reliable water supply to homes, businesses, and communities. Founded with a
              simple mission — to make water accessible to everyone, on time, every time — we
              have grown into a trusted name in water logistics.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 mt-8">
              Our Mission
            </h3>
            <p className="leading-relaxed mb-4">
              Water is life. Our mission is to ensure that no household or business ever faces a
              water crisis. We connect customers with verified water tanker suppliers, making the
              process of ordering and receiving water as seamless as booking a cab.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 mt-8">
              Why Choose Us?
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 leading-7">
              <li>
                <strong>Fast Delivery</strong> — Water delivered to your doorstep within hours of
                booking.
              </li>
              <li>
                <strong>Verified Suppliers</strong> — All our tanker operators are screened and
                certified for water quality and safety.
              </li>
              <li>
                <strong>Real-Time Tracking</strong> — Know exactly where your tanker is at all
                times.
              </li>
              <li>
                <strong>Transparent Pricing</strong> — No hidden charges. Pay only for what you
                order.
              </li>
              <li>
                <strong>24/7 Support</strong> — Our team is always available to assist you.
              </li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 mt-8">Who We Serve</h3>
            <p className="leading-relaxed mb-4">
              From residential apartments and independent houses to construction sites, hotels,
              and industrial facilities — we cater to all water needs, big or small.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 mt-8">Our Commitment</h3>
            <p className="leading-relaxed">
              We believe in sustainable water usage and responsible delivery practices. Every drop
              matters, and we ensure minimal wastage from source to delivery.
            </p>
          </section>

          <hr className="border-primary/20" />

          <section id="customer-app" className="scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6">
              Water Tanker — Customer App (TankerHub)
            </h2>
            <p className="leading-relaxed mb-4">
              TankerHub is an on-demand water tanker delivery platform built to make clean water
              accessible to every home and society — on your schedule, at a fair price.
            </p>
            <p className="leading-relaxed mb-8">
              We connect customers directly with verified water tanker agencies in their area.
              Whether you&apos;re an individual household running low or a housing society
              managing bulk water needs, TankerHub gets water to your doorstep with just a few
              taps.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 mt-2">
              Why We Built This
            </h3>
            <p className="leading-relaxed mb-4">
              Water scarcity and unreliable tanker services have long been a problem for residents
              across India. Calling multiple agencies, haggling over prices, and waiting without
              any updates — we knew there had to be a better way.
            </p>
            <p className="leading-relaxed mb-8">
              TankerHub was created to bring transparency, reliability, and convenience to an
              industry that desperately needed it.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3">What We Offer</h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-8 leading-7">
              <li>
                <strong>Instant &amp; Scheduled Bookings</strong> — Book a tanker right now or plan
                ahead for the perfect delivery time.
              </li>
              <li>
                <strong>Real-Time Tracking</strong> — Know exactly where your tanker is and when
                it will arrive.
              </li>
              <li>
                <strong>Transparent Pricing</strong> — Distance-based pricing with no hidden
                charges. See the full breakdown before you confirm.
              </li>
              <li>
                <strong>Society Accounts</strong> — Dedicated login and trip management for
                housing societies with bulk delivery needs.
              </li>
              <li>
                <strong>Secure Payments</strong> — Seamless payments powered by PhonePe, with a
                full subscription plan for regular users.
              </li>
              <li>
                <strong>Multiple Saved Addresses</strong> — Manage deliveries across different
                locations with ease.
              </li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3">Our Mission</h3>
            <p className="leading-relaxed">
              To ensure that no household or society ever has to go without water due to a broken
              booking process. We are committed to building a platform that is fast, reliable, and
              fair for both customers and service providers.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}

export default About
