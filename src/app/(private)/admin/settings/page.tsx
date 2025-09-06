"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Bell, Shield, Database, Mail, Globe, Save, AlertTriangle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoApproval: false,
    requireVerification: true,
    allowPublicRegistration: true,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600 mt-1">Gerencie configurações gerais da plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: Settings, label: "Geral", active: true },
                { icon: Bell, label: "Notificações", active: false },
                { icon: Shield, label: "Segurança", active: false },
                { icon: Database, label: "Banco de Dados", active: false },
                { icon: Mail, label: "Email", active: false },
                { icon: Globe, label: "API", active: false },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    item.active
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input id="siteName" defaultValue="Adota Match" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL do Site</Label>
                  <Input id="siteUrl" defaultValue="https://adotamatch.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  defaultValue="Plataforma inteligente para conectar pets e famílias através de matches personalizados"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Configurações do Sistema</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-gray-600">Desabilita o acesso público ao site</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Aprovação Automática</Label>
                    <p className="text-sm text-gray-600">Aprova automaticamente novas instituições</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoApproval}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, autoApproval: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Verificação Obrigatória</Label>
                    <p className="text-sm text-gray-600">Exige verificação de email para novos usuários</p>
                  </div>
                  <Switch
                    checked={systemSettings.requireVerification}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({ ...prev, requireVerification: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Registro Público</Label>
                    <p className="text-sm text-gray-600">Permite que qualquer pessoa se cadastre</p>
                  </div>
                  <Switch
                    checked={systemSettings.allowPublicRegistration}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({ ...prev, allowPublicRegistration: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Configurações de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-gray-600">Receber notificações importantes por email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-gray-600">Receber notificações push no navegador</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-gray-600">Receber resumo semanal de atividades</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Alertas de Segurança</Label>
                  <p className="text-sm text-gray-600">Receber alertas sobre atividades suspeitas</p>
                </div>
                <Switch
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, securityAlerts: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Limpar Cache do Sistema</h4>
                <p className="text-sm text-red-700 mb-3">
                  Remove todos os dados em cache. Esta ação pode afetar temporariamente a performance.
                </p>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                  Limpar Cache
                </Button>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Reset de Configurações</h4>
                <p className="text-sm text-red-700 mb-3">
                  Restaura todas as configurações para os valores padrão. Esta ação não pode ser desfeita.
                </p>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                  Reset Configurações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
