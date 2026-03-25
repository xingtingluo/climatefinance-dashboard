import { SignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { clerkAppearance } from "@/lib/clerk-appearance"

function getSafeReturnTo(returnTo?: string) {
  if (!returnTo || !returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return "/dashboard"
  }

  return returnTo
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { returnTo?: string }
}) {
  const { userId } = await auth()
  const returnTo = getSafeReturnTo(searchParams?.returnTo)

  if (userId) {
    redirect(returnTo)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-[hsl(var(--clerk-border))] bg-[hsl(var(--clerk-panel))] text-[hsl(var(--clerk-text))] shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email to receive a verification code and continue to the protected analytics experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="login-clerk-shell">
            <SignIn
              routing="path"
              path="/login"
              withSignUp={false}
              fallbackRedirectUrl={returnTo}
              appearance={{
                variables: clerkAppearance.variables,
                elements: {
                  ...clerkAppearance.elements,
                  rootBox: "w-full",
                  card: "w-full border-0 bg-transparent p-0 shadow-none",
                  header: "hidden",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  footer: "hidden",
                  footerAction: "hidden",
                  formField: "space-y-2 overflow-visible",
                  formFieldLabelRow: "overflow-visible pl-2",
                  formButtonPrimary: "h-12 rounded-md border-0 bg-gradient-to-r from-zinc-900 to-[#2F3A2F] text-white shadow-lg transition-all duration-300 hover:from-zinc-900 hover:to-[#243024]",
                  dividerRow: "hidden",
                  socialButtonsBlockButton: "hidden",
                },
              }}
            />
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-center text-sm text-muted-foreground">
              Access is invite-only for prototype testers.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
