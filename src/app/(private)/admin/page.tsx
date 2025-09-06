"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, Heart, TrendingUp, AlertTriangle, Clock, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 1247,
    totalInstitutions: 89,
    totalPets: 456,
    adoptionsThisMonth: 67,
    pendingApplications: 23,
    activeMatches: 145,
  }

  const recentActivity = [
    {
      id: 1,
      type: "adoption",
      message: "Nova adoção aprovada: Luna foi adotada por Maria Silva",
      time: "2 horas atrás",
      status: "success",
    },
    {
      id: 2,
      type: "institution",
      message: "Nova instituição cadastrada: Lar dos Bichos",
      time: "4 horas atrás",
      status: "info",
    },
    {
      id: 3,
      type: "alert",
      message: 'Instituição "Amigos Peludos" precisa de verificação',
      time: "6 horas atrás",
      status: "warning",
    },
    {
      id: 4,
      type: "match",
      message: "12 novos matches foram gerados pelo sistema de IA",
      time: "8 horas atrás",
      status: "info",
    },
  ]

  const pendingActions = [
    {
      id: 1,
      title: "Verificar Instituições",
      description: "5 instituições aguardando verificação",
      priority: "high",
      count: 5,
    },
    {
      id: 2,
      title: "Relatórios Pendentes",
      description: "3 relatórios de abuso para revisar",
      priority: "high",
      count: 3,
    },
    {
      id: 3,
      title: "Atualizações do Sistema",
      description: "Sistema de IA precisa de calibração",
      priority: "medium",
      count: 1,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
        <p className="text-gray-600">Visão geral do sistema Adota Match</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalUsers}</div>
            <p className="text-xs text-blue-600 mt-1">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Instituições Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.totalInstitutions}</div>
            <p className="text-xs text-green-600 mt-1">+5 novas este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Pets Disponíveis</CardTitle>
            <Heart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.totalPets}</div>
            <p className="text-xs text-purple-600 mt-1">{stats.activeMatches} matches ativos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Adoções este Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.adoptionsThisMonth}</div>
            <p className="text-xs text-orange-600 mt-1">+23% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Candidaturas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.pendingApplications}</div>
            <p className="text-xs text-red-600 mt-1">Requer atenção</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-700">Matches Ativos</CardTitle>
            <BarChart3 className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">{stats.activeMatches}</div>
            <p className="text-xs text-teal-600 mt-1">Sistema de IA funcionando</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Ações Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={action.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                      {action.count}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Revisar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
