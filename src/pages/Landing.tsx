import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Smartphone } from 'lucide-react'
import { TextEffect } from '@/components/core/text-effect'
import FadeIn from '../components/hero/FadeIn'
import PageVideoBackground from '../components/layout/PageVideoBackground'
import SiteNav from '../components/layout/SiteNav'
import GlowAppLink from '../components/ui/GlowAppLink'
import { ADMIN_APP_PLAY_URL, CUSTOMER_APP_PLAY_URL } from '../lib/appLinks'
import {
  ADMIN_VIDEO_GRADIENT,
  CUSTOMER_VIDEO_GRADIENT,
  VIDEO_BUTTON_GHOST,
  VIDEO_CARD_BG,
  VIDEO_TRAIL_SHADOW,
} from '../lib/videoTheme'

const PAGE_TITLE = 'Water Tanker — Book Water Tankers On Demand'
const PAGE_DESCRIPTION =
  'Water Tanker connects you with trusted water suppliers. Book water tankers for home, construction, or events — simple, fast, reliable.'

function Landing() {
  return (
    <PageVideoBackground className="h-screen">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Helmet>

      <SiteNav />

      <div className="flex flex-1 flex-col justify-end pb-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <TextEffect
              as="h1"
              preset="fade-in-blur"
              speedReveal={1.1}
              speedSegment={0.3}
              className="text-[clamp(1.125rem,6vw,4.5rem)] font-normal mb-4 text-white"
              style={{ letterSpacing: '-0.04em' }}
            >
              {`Water when you need it,\ndelivered with care.`}
            </TextEffect>
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                We connect you with trusted water suppliers. Book tankers for home,
                construction, or events — simple, fast, reliable.
              </p>
            </FadeIn>
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 items-stretch sm:items-start">
                <GlowAppLink
                  href={CUSTOMER_APP_PLAY_URL}
                  title="Water Tanker — Customer"
                  description="Book, track, and pay for water deliveries"
                  gradient={CUSTOMER_VIDEO_GRADIENT}
                  trailShadow={VIDEO_TRAIL_SHADOW}
                  cardBg={VIDEO_CARD_BG}
                  icon={Smartphone}
                  surface="dark"
                />
                <GlowAppLink
                  href={ADMIN_APP_PLAY_URL}
                  title="Water Tanker — Admin"
                  description="Manage operations and deliveries"
                  gradient={ADMIN_VIDEO_GRADIENT}
                  trailShadow={VIDEO_TRAIL_SHADOW}
                  cardBg={VIDEO_CARD_BG}
                  icon={LayoutDashboard}
                  surface="dark"
                />
                <Link
                  to="/about"
                  className={`${VIDEO_BUTTON_GHOST} self-center sm:self-auto`}
                >
                  Explore Now
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-[#5A6975]/50 px-6 py-3 rounded-xl">
                <p className="text-lg md:text-xl lg:text-2xl font-light text-[#BABEBC]">
                  Book. Track. Deliver.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageVideoBackground>
  )
}

export default Landing
