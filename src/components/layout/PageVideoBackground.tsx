import type { ReactNode } from 'react'
import { HERO_VIDEO_URL } from '../../lib/videoTheme'

type PageVideoBackgroundProps = {
  children: ReactNode
  className?: string
}

export default function PageVideoBackground({
  children,
  className = '',
}: PageVideoBackgroundProps) {
  return (
    <div
      className={`relative min-h-dvh w-full overflow-hidden bg-black text-white ${className}`}
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
      </div>
      <div className="relative z-10 flex min-h-dvh flex-col px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:px-12 lg:px-16">
        {children}
      </div>
    </div>
  )
}
