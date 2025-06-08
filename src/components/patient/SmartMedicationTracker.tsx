
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Pill, Clock, CheckCircle, AlertCircle, Plus, Bell, 
  Calendar, Smartphone, Zap, TrendingUp, Target,
  Camera, QrCode, Info
} from 'lucide-react';

export default function SmartMedicationTracker() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Una vez al día',
      nextDose: '20:00',
      timeRemaining: '6h 30m',
      adherence: 95,
      color: 'blue',
      instructions: 'Tomar con alimentos',
      sideEffects: ['Tos seca', 'Mareos'],
      taken: false,
      critical: false
    },
    {
      id: 2,
      name: 'Metformina',
      dosage: '500mg',
      frequency: 'Dos veces al día',
      nextDose: '12:00',
      timeRemaining: '2h 15m',
      adherence: 88,
      color: 'green',
      instructions: 'Tomar con las comidas',
      sideEffects: ['Náuseas', 'Diarrea'],
      taken: true,
      critical: false
    },
    {
      id: 3,
      name: 'Atorvastatina',
      dosage: '20mg',
      frequency: 'Una vez al día (noche)',
      nextDose: '22:00',
      timeRemaining: '8h 45m',
      adherence: 92,
      color: 'purple',
      instructions: 'Preferiblemente por la noche',
      sideEffects: ['Dolor muscular'],
      taken: false,
      critical: true
    }
  ]);

  const [smartReminders, setSmartReminders] = useState(true);
  const [locationReminders, setLocationReminders] = useState(true);

  const todayStats = {
    taken: 2,
    total: 4,
    adherenceToday: 50,
    weeklyAdherence: 91
  };

  const markAsTaken = (id: number) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
  };

  const getColorClasses = (color: string, taken: boolean) => {
    if (taken) return 'bg-gray-100 border-gray-200 text-gray-600';
    
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'green': return 'bg-green-50 border-green-200 text-green-700';
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas del día */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Mis Medicamentos</h2>
            <p className="text-green-100">Gestión inteligente de tu tratamiento</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{todayStats.adherenceToday}%</div>
            <div className="text-green-100 text-sm">Adherencia hoy</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">{todayStats.taken}/{todayStats.total}</div>
            <div className="text-green-100 text-sm">Dosis de hoy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">{todayStats.weeklyAdherence}%</div>
            <div className="text-green-100 text-sm">Semanal</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">3</div>
            <div className="text-green-100 text-sm">Medicamentos</div>
          </div>
        </div>
      </div>

      {/* Configuración inteligente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Recordatorios Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Notificaciones Adaptativas</p>
                <p className="text-sm text-gray-600">Se ajustan a tu rutina diaria</p>
              </div>
            </div>
            <Switch checked={smartReminders} onCheckedChange={setSmartReminders} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Recordatorios por Ubicación</p>
                <p className="text-sm text-gray-600">Alertas cuando llegues a casa</p>
              </div>
            </div>
            <Switch checked={locationReminders} onCheckedChange={setLocationReminders} />
          </div>
        </CardContent>
      </Card>

      {/* Lista de medicamentos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Medicamentos Activos</h3>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Agregar Medicamento
          </Button>
        </div>

        {medications.map((med) => (
          <Card key={med.id} className={`border-2 ${getColorClasses(med.color, med.taken)} transition-all hover:shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${med.taken ? 'bg-gray-200' : 'bg-white'} shadow-sm`}>
                    <Pill className={`h-6 w-6 ${med.taken ? 'text-gray-500' : 'text-' + med.color + '-600'}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{med.name}</h4>
                    <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        Próxima: {med.nextDose}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {med.timeRemaining}
                      </div>
                      {med.critical && (
                        <Badge variant="destructive" className="text-xs">
                          Crítico
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">{med.adherence}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Adherencia</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progreso de adherencia</span>
                  <span className="text-sm text-gray-600">{med.adherence}%</span>
                </div>
                <Progress value={med.adherence} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Info className="h-3 w-3" />
                    Información
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Camera className="h-3 w-3" />
                    Escanear
                  </Button>
                </div>
                
                {!med.taken ? (
                  <Button 
                    onClick={() => markAsTaken(med.id)}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Marcar como Tomado
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Tomado</span>
                  </div>
                )}
              </div>

              {/* Información adicional cuando está expandido */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Instrucciones:</p>
                    <p className="text-sm text-gray-600">{med.instructions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Efectos secundarios:</p>
                    <div className="flex flex-wrap gap-1">
                      {med.sideEffects.map((effect, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <QrCode className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="font-semibold mb-2">Escanear Receta</h3>
            <p className="text-sm text-gray-600">Agrega medicamentos automáticamente</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="font-semibold mb-2">Configurar Metas</h3>
            <p className="text-sm text-gray-600">Define objetivos de adherencia</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h3 className="font-semibold mb-2">Horarios Personalizados</h3>
            <p className="text-sm text-gray-600">Ajusta según tu rutina</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
