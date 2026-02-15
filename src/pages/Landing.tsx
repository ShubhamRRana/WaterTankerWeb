import { Helmet } from 'react-helmet-async'
import { Droplets } from 'lucide-react'

const PAGE_TITLE = 'Water Tanker — Book Water Tankers On Demand'
const PAGE_DESCRIPTION = 'Water Tanker connects you with trusted water suppliers. Book water tankers for home, construction, or events — simple, fast, reliable.'

function Landing() {
  return (
    <main className="flex-1">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Helmet>
      {/* Hero section — responsive: mobile, tablet, desktop */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6">
          <Droplets className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4">
          Water Tanker
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-primary/80 font-medium mb-6 sm:mb-8 max-w-2xl mx-auto px-1">
          Book water tankers on demand — simple, fast, reliable.
        </p>

        {/* Brief description */}
        <div className="max-w-2xl mx-auto text-primary/80 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 px-1">
          <p>
            Water Tanker connects you with trusted water suppliers in your area.
            Whether you need water for your home, construction site, or event,
            our app makes it easy to find and book tankers with just a few taps.
          </p>
        </div>

        {/* Download links — stacked vertically on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          {import.meta.env.VITE_APP_STORE_URL && (
            <a
              href={import.meta.env.VITE_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg py-1 min-w-[140px] sm:min-w-0"
              aria-label="Download on the App Store"
            >
              <img
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                className="h-11 sm:h-12 md:h-14 w-auto mx-auto sm:mx-0"
                loading="lazy"
              />
            </a>
          )}
          {import.meta.env.VITE_PLAY_STORE_URL && (
            <a
              href={import.meta.env.VITE_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg py-1 min-w-[140px] sm:min-w-0"
              aria-label="Get it on Google Play"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-11 sm:h-12 md:h-14 w-auto mx-auto sm:mx-0"
                loading="lazy"
              />
            </a>
          )}
          {!import.meta.env.VITE_APP_STORE_URL && !import.meta.env.VITE_PLAY_STORE_URL && (
            <p className="text-primary/60 text-sm italic">Download links coming soon</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Landing
