
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  Calendar,
  Shield,
  BarChart3,
  Settings,
  AlertTriangle
} from "lucide-react";

export const AdminDashboard = () => {
  const systemStats = [
    { label: "Usuarios Activos", value: "1,247", icon: Users, color: "text-blue-600", change: "+12%" },
    { label: "Consultas Hoy", value: "89", icon: Activity, color: "text-green-600", change: "+8%" },
    { label: "Ingresos del Mes", value: "$45,320", icon: DollarSign, color: "text-purple-600", change: "+15%" },
    { label: "Satisfacción", value: "4.8/5", icon: TrendingUp, color: "text-orange-600", change: "+0.3" }
  ];

  const recentActivity = [
    {
      type: "user_registration",
      description: "Nuevo paciente registrado: María González",
      time: "Hace 5 min",
      priority: "normal"
    },
    {
      type: "doctor_approval",
      description: "Dr. Carlos Méndez aprobado en el sistema",
      time: "Hace 15 min",
      priority: "high"
    },
    {
      type: "payment_received",
      description: "Pago procesado: $150 - Juan Pérez",
      time: "Hace 30 min",
      priority: "normal"
    },
    {
      type: "system_alert",
      description: "Servidor de backup completado exitosamente",
      time: "Hace 1 hora",
      priority: "low"
    }
  ];

  const platformMetrics = [
    { label: "Pacientes Totales", value: "847", change: "+23 esta semana" },
    { label: "Médicos Activos", value: "45", change: "+3 este mes" },
    { label: "Consultas Completadas", value: "2,341", change: "+156 esta semana" },
    { label: "Tasa de Conversión", value: "68%", change: "+5% vs mes anterior" }
  ];

  const systemAlerts = [
    {
      level: "warning",
      message: "Uso del servidor al 78% - considerar escalamiento",
      time: "Hace 2 horas"
    },
    {
      level: "info",
      message: "Actualización de seguridad programada para mañana",
      time: "Hace 4 horas"
    },
    {
      level: "success",
      message: "Backup automático completado exitosamente",
      time: "Hace 6 horas"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600">Gestión y monitoreo de la plataforma</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reportes
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Actividad Reciente del Sistema
            </CardTitle>
            <CardDescription>
              Eventos y transacciones en tiempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  activity.priority === "high" ? "bg-red-500" :
                  activity.priority === "normal" ? "bg-blue-500" : "bg-gray-400"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant={
                  activity.priority === "high" ? "destructive" :
                  activity.priority === "normal" ? "default" : "secondary"
                } className="text-xs">
                  {activity.priority === "high" ? "Alta" :
                   activity.priority === "normal" ? "Normal" : "Baja"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alertas del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              Alertas del Sistema
            </CardTitle>
            <CardDescription>
              Notificaciones importantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="border-l-4 pl-4" style={{
                borderColor: alert.level === "warning" ? "#f59e0b" :
                           alert.level === "info" ? "#3b82f6" : "#10b981"
              }}>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alert.level === "warning" ? "text-yellow-500" :
                    alert.level === "info" ? "text-blue-500" : "text-green-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métricas de la Plataforma */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Métricas de la Plataforma
            </CardTitle>
            <CardDescription>
              Estadísticas generales de uso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{metric.label}</p>
                  <p className="text-sm text-gray-600">{metric.change}</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Herramientas de administración
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <UserCheck className="h-4 w-4 mr-2" />
              Aprobar Médicos Pendientes (3)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Revisar Programación de Consultas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Procesar Pagos Pendientes
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generar Reporte Mensual
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Configurar Respaldo Automático
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
