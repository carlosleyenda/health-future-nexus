import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  FileText,
  Pill,
  Heart,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientProgressOverview() {
  const navigate = useNavigate();

  const healthTasks = [
    {
      id: 1,
      title: 'Completar Perfil Médico',
      description: 'Agrega información sobre alergias y condiciones médicas',
      status: 'pending',
      route: '/profile',
      priority: 'high',
      icon: FileText,
      progress: 75
    },
    {
      id: 2,
      title: 'Conectar Dispositivos',
      description: 'Sincroniza tu smartwatch o tensiómetro',
      status: 'pending',
      route: '/devices',
      priority: 'medium',
      icon: Heart,
      progress: 30
    },
    {
      id: 3,
      title: 'Agendar Chequeo Anual',
      description: 'Es hora de tu revisión médica anual',
      status: 'pending',
      route: '/appointments',
      priority: 'high',
      icon: Calendar,
      progress: 0
    },
    {
      id: 4,
      title: 'Actualizar Medicamentos',
      description: 'Revisa y actualiza tu lista de medicamentos',
      status: 'completed',
      route: '/medications',
      priority: 'medium',
      icon: Pill,
      progress: 100
    }
  ];

  const completedTasks = healthTasks.filter(task => task.status === 'completed').length;
  const totalTasks = healthTasks.length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-xs">Alta</Badge>;
      case 'medium': return <Badge variant="default" className="text-xs">Media</Badge>;
      case 'low': return <Badge variant="secondary" className="text-xs">Baja</Badge>;
      default: return <Badge variant="outline" className="text-xs">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Target className="h-5 w-5 mr-2" />
            Tu Progreso de Salud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progreso general</span>
              <span className="text-2xl font-bold text-blue-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{completedTasks} de {totalTasks} tareas completadas</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">+15% esta semana</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tareas de Salud Recomendadas</span>
            <Badge variant="outline" className="text-xs">
              {healthTasks.filter(t => t.status === 'pending').length} pendientes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                task.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => navigate(task.route)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
                  <task.icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(task.priority)}
                      {getStatusIcon(task.status)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{task.description}</p>
                  
                  {task.status !== 'completed' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Progreso</span>
                        <span className="font-medium">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Health Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-500" />
            Recomendaciones Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <Heart className="h-5 w-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-purple-700">Mejora tu salud cardiovascular</h4>
                <p className="text-sm text-purple-600 mt-1">
                  Basado en tus métricas recientes, te recomendamos aumentar tu actividad física a 30 minutos diarios.
                </p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate('/health')}>
                  Ver Detalles
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-700">¡Excelente adherencia a medicamentos!</h4>
                <p className="text-sm text-green-600 mt-1">
                  Has tomado todos tus medicamentos a tiempo esta semana. Sigue así.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-700">Recordatorio: Chequeo anual</h4>
                <p className="text-sm text-orange-600 mt-1">
                  Han pasado 11 meses desde tu último chequeo general. Es hora de programar uno.
                </p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate('/appointments')}>
                  Agendar Cita
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}