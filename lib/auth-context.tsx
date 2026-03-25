"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuth as useClerkAuth, useClerk, useUser } from "@clerk/nextjs"

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  created_at?: string
  isVerified: boolean
}

export enum AuthState {
  INITIAL = "INITIAL",
  CHECKING = "CHECKING",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  ERROR = "ERROR",
  LOGGING_OUT = "LOGGING_OUT",
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; redirectTo?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  refreshSession: () => Promise<void>
  sessionExpiredMessage: string | null
  clearSessionExpiredMessage: () => void
  authState: AuthState
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function mapUser(user: ReturnType<typeof useUser>["user"]): User | null {
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return null
  }

  return {
    id: user.id,
    name: user.fullName || user.firstName || user.username || user.primaryEmailAddress.emailAddress,
    email: user.primaryEmailAddress.emailAddress,
    role: "user",
    created_at: user.createdAt ? new Date(user.createdAt).toISOString() : undefined,
    isVerified: true,
  }
}

function AuthProviderContent({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useClerkAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const mappedUser = mapUser(user)

  const value: AuthContextType = {
    user: mappedUser,
    isLoading: !isLoaded,
    login: async () => ({
      success: false,
      message: "Authentication is handled on the /login page.",
    }),
    register: async () => ({
      success: false,
      message: "Account creation is invite-only for this prototype.",
    }),
    logout: async () => {
      await signOut({ redirectUrl: "/" })
    },
    isAuthenticated: !!isSignedIn,
    refreshSession: async () => {},
    sessionExpiredMessage: null,
    clearSessionExpiredMessage: () => {},
    authState: !isLoaded
      ? AuthState.CHECKING
      : isSignedIn
        ? AuthState.AUTHENTICATED
        : AuthState.UNAUTHENTICATED,
    isInitialized: isLoaded,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthProviderContent>{children}</AuthProviderContent>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
