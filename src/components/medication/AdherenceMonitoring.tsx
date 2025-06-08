
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Camera, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Pill,
  TrendingUp,
  TrendingDown,
  Users,
  Bell,
  Calendar,
  Target,
  Activity,
  AlertTriangle
} from 'lucide-react';

interface AdherenceMonitoringProps {
  patientId: string;
}

export default function AdherenceMonitoring({ patientId }: AdherenceMonitoringProps) {
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Metformina',
      dosage: '500mg',
      frequency: '2 veces/día',
      adherenceScore: 94,
      lastTaken: '2024-06-08 08:30',
      nextDue: '2024-06-08 20:30',
      missedDoses: 2,
      totalDoses: 50,
      photoVerification: true,
      smartDispenser: true
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: '1 vez/día',
      adherenceScore: 87,
      lastTaken: '2024-06-08 09:00',
      nextDue: '2024-06-09 09:00',
      missedDoses: 5,
      totalDoses: 38,
      photoVerification: false,
      smartDispenser: true
    },
    {
      id: '3',
      name: 'Vitamina D',
      dosage: '1000 IU',
      frequency: '1 vez/día',
      adherenceScore: 76,
      lastTaken: '2024-06-07 10:00',
      nextDue: '2024-06-08 10:00',
      missedDoses: 8,
      totalDoses: 33,
      photoVerification: true,
      smartDispenser: false
    }
  ]);

  const [weeklyAdherence, setWeeklyAdherence] = useState([
    { day: 'Lun', score: 100 },
    { day: 'Mar', score: 85 },
    { day: 'Mie', score: 92 },
    { day: 'Jue', score: 78 },
    { day: 'Vie', score: 95 },
    { day: 'Sab', score: 88 },
    { day: 'Dom', score: 90 }
  ]);

  const [behavioralInsights, setBehavioralInsights] = useState([
    {
      insight: 'Mejor adherencia en días laborales vs fines de semana',
      recommendation: 'Configurar recordatorios adicionales para fines de semana',
      impact: 'high'
    },
    {
      insight: 'Tendencia a olvidar dosis nocturnas',
      recommendation: 'Cambiar hora de administración a la mañana si es posible',
      impact: 'medium'
    },
    {
      insight: 'Adherencia mejora cuando usa verificación por foto',
      recommendation: 'Habilitar foto-verificación para todos los medicamentos',
      impact: 'high'
    }
  ]);

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAdherenceBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 75) return 'secondary';
    return 'destructive';
  };

  const isOverdue = (nextDue: string) => {
    return new Date(nextDue) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Adherence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Adherencia General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">87%</div>
            <p className="text-sm text-gray-600">Últimos 30 días</p>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Dosis Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">1</div>
            <p className="text-sm text-gray-600">Vence en 2 horas</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Ver Recordatorios
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Mejora Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+5%</div>
            <p className="text-sm text-gray-600">vs semana anterior</p>
            <div className="text-xs text-green-600 mt-1">↗ Tendencia positiva</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Adherence Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Adherencia Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyAdherence}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Adherencia']} />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Active Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Medicamentos Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{med.name}</h4>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getAdherenceBadgeVariant(med.adherenceScore)}>
                      {med.adherenceScore}%
                    </Badge>
                    {med.smartDispenser && <Badge variant="outline">Smart</Badge>}
                    {med.photoVerification && <Badge variant="outline">📷</Badge>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Última toma</div>
                    <div className="font-medium">
                      {new Date(med.lastTaken).toLocaleString('es-MX', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Próxima dosis</div>
                    <div className={`font-medium ${isOverdue(med.nextDue) ? 'text-red-600' : 'text-green-600'}`}>
                      {isOverdue(med.nextDue) ? '¡Vencida!' : 
                        new Date(med.nextDue).toLocaleString('es-MX', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      }
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Dosis perdidas</div>
                    <div className="font-medium">{med.missedDoses} de {med.totalDoses}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <Progress value={med.adherenceScore} className="h-2" />
                </div>

                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-1" />
                    Verificar Toma
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-1" />
                    Recordatorio
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Ajustar Horario
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insights Comportamentales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behavioralInsights.map((insight, index) => (
              <Alert key={index} className={`border-l-4 ${
                insight.impact === 'high' ? 'border-l-red-500' : 
                insight.impact === 'medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
              }`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div><strong>Insight:</strong> {insight.insight}</div>
                    <div><strong>Recomendación:</strong> {insight.recommendation}</div>
                    <Badge variant={
                      insight.impact === 'high' ? 'destructive' : 
                      insight.impact === 'medium' ? 'secondary' : 'outline'
                    }>
                      Impacto {insight.impact}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Family/Caregiver Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Notificaciones a Cuidadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">María González (Hija)</div>
                <div className="text-sm text-gray-600">Notificaciones de adherencia diarias</div>
              </div>
              <Badge variant="default">Activo</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Dr. Rodriguez</div>
                <div className="text-sm text-gray-600">Alertas críticas únicamente</div>
              </div>
              <Badge variant="outline">Configurado</Badge>
            </div>

            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Agregar Cuidador
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
