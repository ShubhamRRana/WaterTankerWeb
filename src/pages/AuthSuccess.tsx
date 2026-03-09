import { Helmet } from 'react-helmet-async'
import { CheckCircle } from 'lucide-react'

function AuthSuccess() {
  return (
    <main className="flex-1 min-h-[60vh] flex items-center justify-center">
      <Helmet>
        <title>Authentication Successful — Water Tanker</title>
        <meta name="description" content="Your authentication was successful." />
        <meta property="og:title" content="Authentication Successful — Water Tanker" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Authentication Successful
        </h1>
        <p className="text-primary/80">
          You have been successfully authenticated.
        </p>
      </div>
    </main>
  )
}

export default AuthSuccess
