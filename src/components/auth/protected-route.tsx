"use client"

import type React from "react"

import { useAuth, type UserType } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: UserType[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedUserTypes, redirectTo = "/" }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (allowedUserTypes && !allowedUserTypes.includes(user.type)) {
        router.push(redirectTo)
        return
      }
    }
  }, [user, loading, allowedUserTypes, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user || (allowedUserTypes && !allowedUserTypes.includes(user.type))) {
    return null
  }

  return <>{children}</>
}
