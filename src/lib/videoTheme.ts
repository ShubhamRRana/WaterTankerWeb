export const VIDEO_PALETTE = {
  shadow: '#101916',
  darkMid: '#494010',
  mid: '#32414D',
  lightMid: '#5A6975',
  highlight: '#8A9399',
  bright: '#BABEBC',
} as const

export const VIDEO_GRADIENT =
  'linear-gradient(160deg, #101916 0%, #32414D 35%, #5A6975 65%, #494010 85%, #8A9399 100%)'

export const CUSTOMER_VIDEO_GRADIENT =
  'linear-gradient(137deg, #101916 0%, #32414D 45%, #5A6975 100%)'

export const ADMIN_VIDEO_GRADIENT =
  'linear-gradient(137deg, #101916 0%, #494010 45%, #8A9399 100%)'

export const VIDEO_TRAIL_SHADOW =
  '0px 0px 60px 30px rgb(90 105 117 / 45%), 0 0 100px 60px rgb(16 25 22 / 55%), 0 0 140px 90px rgb(73 64 16 / 25%)'

export const VIDEO_CARD_BG = VIDEO_PALETTE.shadow

const HERO_VIDEO_FALLBACK =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

export const HERO_VIDEO_URL =
  import.meta.env.VITE_HERO_VIDEO_URL || HERO_VIDEO_FALLBACK

export const HERO_BACKGROUND_IMAGE =
  import.meta.env.VITE_HERO_BACKGROUND_IMAGE || '/hero-background.jpg'

export const VIDEO_BUTTON_PRIMARY =
  'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-[#5A6975]/50 bg-gradient-to-br from-[#32414D] to-[#101916] text-[#BABEBC] hover:from-[#5A6975] hover:to-[#32414D] hover:text-white hover:border-[#8A9399]/60'

export const VIDEO_BUTTON_GHOST =
  'liquid-glass border border-[#5A6975]/50 px-8 py-3 rounded-lg font-medium transition-all duration-200 text-[#BABEBC] hover:border-[#494010]/70 hover:text-white hover:bg-[#32414D]/35'

export const VIDEO_PAGE_ROUTES = ['/', '/about', '/privacy', '/refund', '/terms', '/contact'] as const

export function isVideoThemedRoute(pathname: string) {
  return (VIDEO_PAGE_ROUTES as readonly string[]).includes(pathname)
}

export const VIDEO_PANEL =
  'liquid-glass border border-[#5A6975]/30 rounded-2xl px-5 sm:px-8 lg:px-10 py-8 sm:py-12'

export const VIDEO_LINK =
  'text-[#8A9399] underline underline-offset-2 hover:text-[#BABEBC] transition-colors'

export const VIDEO_INPUT =
  'w-full px-3 py-2.5 rounded-lg border-2 border-[#5A6975]/40 bg-[#101916]/80 text-[#BABEBC] placeholder:text-[#5A6975] transition-colors duration-200 focus:outline-none focus:border-[#8A9399] focus:ring-2 focus:ring-[#5A6975]/40 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-60 disabled:cursor-not-allowed aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:ring-red-500/30'

export const VIDEO_SUBMIT_BUTTON =
  'w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-[#5A6975]/50 bg-gradient-to-br from-[#32414D] to-[#101916] text-[#BABEBC] hover:from-[#5A6975] hover:to-[#32414D] hover:text-white hover:border-[#8A9399]/60 focus:outline-none focus:ring-2 focus:ring-[#5A6975]/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]'
