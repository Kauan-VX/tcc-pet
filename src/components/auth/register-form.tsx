"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Mail, Lock, User, Building } from "lucide-react"
import { useAuth, type UserType } from "@/lib/auth-context"

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<UserType>("adopter")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const { register, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    if (!acceptTerms) {
      setError("Você deve aceitar os termos de uso")
      return
    }

    try {
      const success = await register(email, password, name, userType)
      if (success) {
        onSuccess?.()
      } else {
        setError("Erro ao criar conta. Tente novamente.")
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-2xl">Criar Conta</CardTitle>
        <CardDescription>Junte-se à nossa comunidade e ajude a conectar pets com famílias amorosas</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userType">Tipo de Conta</Label>
            <Select value={userType} onValueChange={(value: UserType) => setUserType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="adopter">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Adotante - Quero adotar um pet</span>
                  </div>
                </SelectItem>
                <SelectItem value="institution">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Instituição - Tenho pets para adoção</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{userType === "institution" ? "Nome da Instituição" : "Nome Completo"}</Label>
            <div className="relative">
              {userType === "institution" ? (
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              ) : (
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                id="name"
                type="text"
                placeholder={userType === "institution" ? "Nome da sua instituição" : "Seu nome completo"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              Aceito os{" "}
              <a href="#" className="text-primary hover:underline">
                termos de uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary hover:underline">
                política de privacidade
              </a>
            </Label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar Conta"
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-medium">
              Entrar
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
