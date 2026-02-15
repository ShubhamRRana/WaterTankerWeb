import { Loader2 } from 'lucide-react'

/**
 * Full-page loading fallback for Suspense or route transitions.
 */
export default function PageLoader() {
  return (
    <div
      className="flex flex-1 items-center justify-center py-24"
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="w-10 h-10 animate-spin text-primary" aria-hidden />
    </div>
  )
}
