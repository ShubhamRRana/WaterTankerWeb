import type { LucideIcon } from 'lucide-react'
import { BorderTrail } from '@/components/core/border-trail'

type GlowAppLinkProps = {
  href: string
  title: string
  description?: string
  gradient: string
  icon: LucideIcon
  surface?: 'dark' | 'light'
  trailShadow?: string
  cardBg?: string
}

const TRAIL_SHADOW_DARK =
  '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)'

const TRAIL_SHADOW_LIGHT =
  '0px 0px 40px 20px rgb(0 0 0 / 15%), 0 0 80px 40px rgb(0 0 0 / 10%)'

export default function GlowAppLink({
  href,
  title,
  description,
  gradient,
  icon: Icon,
  surface = 'dark',
  trailShadow,
  cardBg,
}: GlowAppLinkProps) {
  const isDark = surface === 'dark'
  const resolvedTrailShadow =
    trailShadow ?? (isDark ? TRAIL_SHADOW_DARK : TRAIL_SHADOW_LIGHT)
  const resolvedCardBg = cardBg ?? (isDark ? '#1A1A1C' : '#f0ebd8')

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex w-full max-w-[300px] flex-col items-start mx-auto sm:mx-0"
    >
      <div
        className="relative z-10 self-stretch min-h-[72px] rounded-[24px] overflow-hidden px-1 py-1"
        style={{ backgroundColor: resolvedCardBg }}
      >
        <BorderTrail
          className="rounded-full"
          style={{
            background: gradient,
            boxShadow: resolvedTrailShadow,
          }}
          size={100}
        />
        <div className="font-playfair relative flex h-full w-full items-center gap-4 rounded-[20px] p-4 sm:p-5">
          <div className={isDark ? 'text-white/90' : 'text-primary/90'}>
            <Icon size={28} strokeWidth={2.5} aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p
              className={`font-medium text-fluid-card-title tracking-tight truncate ${
                isDark ? 'text-white' : 'text-primary'
              }`}
            >
              {title}
            </p>
            {description ? (
              <p
                className={`text-fluid-card-desc mt-0.5 line-clamp-2 ${
                  isDark ? 'text-gray-400' : 'text-primary/70'
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  )
}
