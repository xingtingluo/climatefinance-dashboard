import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import "@/styles/globals.css"
import { Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { clerkAppearance } from "@/lib/clerk-appearance"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300"],
  variable: '--font-space-grotesk',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark", spaceGrotesk.variable)}>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ClerkProvider appearance={clerkAppearance}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
