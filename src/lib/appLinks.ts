const CUSTOMER_FALLBACK =
  'https://play.google.com/store/apps/details?id=com.watertanker.app'
const ADMIN_FALLBACK =
  'https://play.google.com/store/apps/details?id=com.watertanker.admin'

export const CUSTOMER_APP_PLAY_URL =
  import.meta.env.VITE_PLAY_STORE_URL || CUSTOMER_FALLBACK

export const ADMIN_APP_PLAY_URL =
  import.meta.env.VITE_ADMIN_PLAY_STORE_URL || ADMIN_FALLBACK

export const CUSTOMER_APP_GRADIENT =
  'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)'

export const ADMIN_APP_GRADIENT =
  'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)'
