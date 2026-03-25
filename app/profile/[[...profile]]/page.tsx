"use client"

import { UserProfile } from "@clerk/nextjs"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { clerkAppearance } from "@/lib/clerk-appearance"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-3xl font-light tracking-tight">Your Profile</h1>
            <div className="overflow-hidden rounded-lg">
              <UserProfile
                routing="path"
                path="/profile"
                appearance={{
                  ...clerkAppearance,
                  elements: {
                    ...clerkAppearance.elements,
                    card: "border-0 bg-transparent shadow-none",
                    pageScrollBox: "bg-transparent",
                    page: "bg-transparent",
                    navbar: "border-r border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#0a0a0a]",
                  },
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
