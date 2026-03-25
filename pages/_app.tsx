import type { AppProps } from 'next/app'
import { ClerkProvider } from "@clerk/nextjs"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { clerkAppearance } from '@/lib/clerk-appearance'

// Import global styles
import '@/app/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Handle redirects for hybrid mode
  useEffect(() => {
    // If we're on a page that exists in the app directory, redirect to it
    if (router.pathname === '/') {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <ClerkProvider appearance={clerkAppearance}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}
