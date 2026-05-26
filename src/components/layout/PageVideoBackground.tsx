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
      className={`relative min-h-screen w-full overflow-hidden bg-black text-white ${className}`}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col px-6 md:px-12 lg:px-16">
        {children}
      </div>
    </div>
  )
}
