import { Helmet } from 'react-helmet-async'
import { Droplets, ExternalLink } from 'lucide-react'

const PAGE_TITLE = 'Water Tanker — Book Water Tankers On Demand'
const CUSTOMER_APP_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.watertanker.app'
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

        <p className="text-sm sm:text-base text-primary/70 mb-3">Get the app</p>
        <a
          href={CUSTOMER_APP_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold
            hover:bg-accent/90 hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
            transition-all duration-200"
        >
          <span>Water Tanker - Customer App</span>
          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </section>
    </main>
  )
}

export default Landing
