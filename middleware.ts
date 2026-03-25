import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
  "/asset-details(.*)",
  "/profile(.*)",
  "/downloads/system-cost-benefits(.*)",
  "/downloads/phase-in-data(.*)",
  "/downloads/stacked-data(.*)",
  "/downloads/stacked-cost(.*)",
  "/api/map-data(.*)",
  "/api/phase-out-data(.*)",
  "/api/company-data(.*)",
  "/api/asset-data(.*)",
  "/api/phase-out-assets(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
}
