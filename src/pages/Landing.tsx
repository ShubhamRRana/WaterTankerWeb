import { Helmet } from 'react-helmet-async'
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
  VIDEO_CARD_BG,
  VIDEO_TRAIL_SHADOW,
} from '../lib/videoTheme'

const PAGE_TITLE = 'Water Tanker — Book Water Tankers On Demand'
const PAGE_DESCRIPTION =
  'Water Tanker connects you with trusted water suppliers. Book water tankers for home, construction, or events — simple, fast, reliable.'

function Landing() {
  return (
    <PageVideoBackground className="h-dvh">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Helmet>

      <SiteNav />

      <div className="flex flex-1 flex-col justify-center">
        <div>
          <TextEffect
            as="h1"
            per="line"
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.3}
            className="font-playfair [font-optical-sizing:auto] text-fluid-hero font-normal leading-none mb-4 text-white"
            style={{ letterSpacing: '-0.04em' }}
          >
            {`Water when you need,\ndelivered with care.`}
          </TextEffect>
          <FadeIn delay={800} duration={1000}>
            <p className="font-sans text-fluid-lead text-white mb-5 max-w-xl">
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
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={1400} duration={1000}>
        <footer
          aria-label="Tagline"
          className="-mx-6 md:-mx-12 lg:-mx-16 mt-auto border border-[#5A6975]/50 liquid-glass rounded-[20px] overflow-hidden"
        >
          <p className="text-fluid-tagline font-light text-[#BABEBC] text-center py-4 px-6 md:px-12 lg:px-16">
            Book. Track. Deliver.
          </p>
        </footer>
      </FadeIn>
    </PageVideoBackground>
  )
}

export default Landing
