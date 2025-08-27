import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, Phone, MapPin, Clock, Heart, Activity, 
  Truck, User, Shield, Siren, Navigation, RadioIcon,
  Zap, Target, Users, CheckCircle, Wifi, Battery, Brain
} from 'lucide-react';
import { useEmergencyAlert, useEmergencyHistory } from '@/hooks/useEmergency';
import { toast } from 'sonner';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number;
  isAvailable: boolean;
}

interface EmergencyResponse {
  id: string;
  type: 'ambulance' | 'police' | 'fire' | 'medical_team';
  status: 'dispatched' | 'en_route' | 'arrived' | 'completed';
  eta: string;
  location: { lat: number; lng: number };
  crew: string[];
  equipment: string[];
}

interface VitalMonitoring {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenSaturation: number;
  temperature: number;
  consciousness: 'alert' | 'confused' | 'unresponsive';
  timestamp: string;
}

interface CompleteEmergencySystemProps {
  patientId: string;
}

export default function CompleteEmergencySystem({ patientId }: CompleteEmergencySystemProps) {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  const [responses, setResponses] = useState<EmergencyResponse[]>([]);
  const [vitals, setVitals] = useState<VitalMonitoring[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);

  const { sendEmergencyAlert, emergencyContacts } = useEmergencyAlert(patientId);
  const emergencyHistory = useEmergencyHistory(patientId);

  const emergencyTypes = [
    { 
      id: 'cardiac', 
      label: 'Emergencia Cardíaca', 
      icon: Heart, 
      color: 'bg-red-600',
      priority: 'critical',
      protocols: ['Activar ECMO', 'Contactar cardiología', 'Preparar desfibrilador']
    },
    { 
      id: 'respiratory', 
      label: 'Dificultad Respiratoria', 
      icon: Activity, 
      color: 'bg-orange-600',
      priority: 'high',
      protocols: ['Administrar oxígeno', 'Evaluar vías aéreas', 'Contactar neumología']
    },
    { 
      id: 'accident', 
      label: 'Accidente/Trauma', 
      icon: AlertTriangle, 
      color: 'bg-yellow-600',
      priority: 'high',
      protocols: ['Inmovilizar', 'Evaluar trauma', 'Activar cirugía si necesario']
    },
    { 
      id: 'stroke', 
      label: 'ACV/Ictus', 
      icon: Brain, 
      color: 'bg-purple-600',
      priority: 'critical',
      protocols: ['Protocolo FAST', 'TAC urgente', 'Neurología inmediata']
    },
    { 
      id: 'overdose', 
      label: 'Intoxicación', 
      icon: Zap, 
      color: 'bg-indigo-600',
      priority: 'high',
      protocols: ['Identificar sustancia', 'Antídoto si disponible', 'Toxicología']
    },
    { 
      id: 'psychiatric', 
      label: 'Emergencia Psiquiátrica', 
      icon: Users, 
      color: 'bg-pink-600',
      priority: 'medium',
      protocols: ['Evaluar riesgo', 'Contención segura', 'Psiquiatría urgente']
    }
  ];

  useEffect(() => {
    // Obtener ubicación actual
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }

    // Mock contacts
    setContacts([
      { id: '1', name: 'María Pérez', phone: '+52 55 1234 5678', relationship: 'Esposa', priority: 1, isAvailable: true },
      { id: '2', name: 'Dr. García', phone: '+52 55 8765 4321', relationship: 'Médico Personal', priority: 2, isAvailable: true },
      { id: '3', name: 'Juan Pérez', phone: '+52 55 9876 5432', relationship: 'Hijo', priority: 3, isAvailable: false }
    ]);

    // Simular monitoreo de vitales en tiempo real
    const vitalsInterval = setInterval(() => {
      if (emergencyActive) {
        const newVital: VitalMonitoring = {
          heartRate: Math.floor(Math.random() * (120 - 60) + 60),
          bloodPressure: {
            systolic: Math.floor(Math.random() * (160 - 100) + 100),
            diastolic: Math.floor(Math.random() * (100 - 60) + 60)
          },
          oxygenSaturation: Math.floor(Math.random() * (100 - 90) + 90),
          temperature: Math.round((Math.random() * (39 - 36) + 36) * 10) / 10,
          consciousness: 'alert',
          timestamp: new Date().toISOString()
        };
        
        setVitals(prev => [newVital, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(vitalsInterval);
  }, [emergencyActive]);

  const activateEmergency = async (type: string) => {
    setEmergencyActive(true);
    setEmergencyType(type);

    // Enviar alerta automática
    try {
      await sendEmergencyAlert.mutateAsync({
        patientId,
        emergencyType: type,
        location: currentLocation || { lat: 19.4326, lng: -99.1332 },
        severity: 'critical'
      });

      // Simular respuesta de servicios de emergencia
      const mockResponses: EmergencyResponse[] = [
        {
          id: 'amb-1',
          type: 'ambulance',
          status: 'dispatched',
          eta: '8 minutos',
          location: { lat: 19.4320, lng: -99.1330 },
          crew: ['Dr. Martínez (Paramedico)', 'Enf. González', 'Téc. Rodríguez'],
          equipment: ['Desfibrilador', 'Oxígeno', 'Monitor cardíaco', 'Medicamentos de emergencia']
        },
        {
          id: 'med-1',
          type: 'medical_team',
          status: 'en_route',
          eta: '12 minutos',
          location: { lat: 19.4315, lng: -99.1325 },
          crew: ['Dr. López (Cardiólogo)', 'Enf. Silva'],
          equipment: ['ECG portátil', 'Kit de intubación', 'Medicamentos especializados']
        }
      ];

      setResponses(mockResponses);

      // Contactar automáticamente a contactos de emergencia
      contacts.forEach(contact => {
        if (contact.isAvailable && contact.priority <= 2) {
          toast.success(`Contactando a ${contact.name}...`);
        }
      });

      toast.success('Sistema de emergencia activado - Ayuda en camino');

    } catch (error) {
      toast.error('Error al activar emergencia');
    }
  };

  const updateResponseStatus = (responseId: string, newStatus: EmergencyResponse['status']) => {
    setResponses(prev => prev.map(response => 
      response.id === responseId 
        ? { ...response, status: newStatus }
        : response
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dispatched': return 'bg-yellow-100 text-yellow-800';
      case 'en_route': return 'bg-blue-100 text-blue-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResponseIcon = (type: string) => {
    switch (type) {
      case 'ambulance': return Truck;
      case 'police': return Shield;
      case 'fire': return Siren;
      case 'medical_team': return User;
      default: return AlertTriangle;
    }
  };

  if (emergencyActive) {
    return (
      <div className="space-y-6">
        {/* Estado de Emergencia Activa */}
        <Alert className="border-red-200 bg-red-50 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>EMERGENCIA ACTIVA</strong> - Servicios de emergencia notificados
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergencia en Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Tipo: {emergencyTypes.find(t => t.id === emergencyType)?.label}</span>
                    <Badge className="bg-red-100 text-red-800">CRÍTICO</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Activada: {new Date().toLocaleTimeString('es-MX')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>Ubicación confirmada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span>Conectado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-gray-400" />
                      <span>{batteryLevel}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      onClick={() => setEmergencyActive(false)}
                      className="flex-1"
                    >
                      Cancelar Emergencia
                    </Button>
                    <Button variant="outline" className="px-6">
                      <Phone className="h-4 w-4 mr-2" />
                      911
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Respuestas de Emergencia */}
            <Card>
              <CardHeader>
                <CardTitle>Servicios de Emergencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {responses.map((response) => {
                    const ResponseIcon = getResponseIcon(response.type);
                    
                    return (
                      <div key={response.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <ResponseIcon className="h-5 w-5 text-primary" />
                            <span className="font-medium capitalize">
                              {response.type.replace('_', ' ')}
                            </span>
                          </div>
                          <Badge className={getStatusColor(response.status)}>
                            {response.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium mb-2">Personal:</p>
                            <ul className="space-y-1">
                              {response.crew.map((member, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {member}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-medium mb-2">Equipo:</p>
                            <ul className="space-y-1">
                              {response.equipment.slice(0, 3).map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            ETA: {response.eta}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateResponseStatus(response.id, 'arrived')}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Rastrear
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Monitoreo de Vitales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Monitoreo Vital
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vitals.length > 0 ? (
                  <div className="space-y-3">
                    {vitals.slice(0, 3).map((vital, index) => (
                      <div key={index} className="border rounded p-3">
                        <div className="text-xs text-gray-500 mb-2">
                          {new Date(vital.timestamp).toLocaleTimeString('es-MX')}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>FC: {vital.heartRate} bpm</div>
                          <div>SpO2: {vital.oxygenSaturation}%</div>
                          <div>PA: {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}</div>
                          <div>T°: {vital.temperature}°C</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Iniciando monitoreo...</p>
                )}
              </CardContent>
            </Card>

            {/* Contactos de Emergencia */}
            <Card>
              <CardHeader>
                <CardTitle>Contactos Notificados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.filter(c => c.priority <= 2).map((contact) => (
                    <div key={contact.id} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.relationship}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {contact.isAvailable ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-600">Sistema de Emergencias</h2>
        <div className="flex items-center gap-2">
          <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
          <Battery className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{batteryLevel}%</span>
        </div>
      </div>

      <Tabs defaultValue="activate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activate">Activar</TabsTrigger>
          <TabsTrigger value="contacts">Contactos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="activate" className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Sistema listo.</strong> En caso de emergencia, selecciona el tipo y el sistema activará automáticamente todos los protocolos.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyTypes.map((emergency) => {
              const EmergencyIcon = emergency.icon;
              
              return (
                <Card key={emergency.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className={`${emergency.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto`}>
                        <EmergencyIcon className="h-8 w-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">{emergency.label}</h3>
                        <Badge variant="outline" className="mb-3">
                          {emergency.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="text-left">
                        <p className="text-xs text-gray-600 mb-2">Protocolos automáticos:</p>
                        <ul className="text-xs space-y-1">
                          {emergency.protocols.slice(0, 2).map((protocol, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {protocol}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className={`w-full ${emergency.color} hover:opacity-90`}
                        onClick={() => activateEmergency(emergency.id)}
                      >
                        ACTIVAR
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contactos de Emergencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                      <p className="text-sm text-gray-400">Prioridad: {contact.priority}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={contact.isAvailable ? 'default' : 'secondary'}>
                        {contact.isAvailable ? 'Disponible' : 'No disponible'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Emergencias</CardTitle>
            </CardHeader>
            <CardContent>
              {emergencyHistory.data?.length ? (
                <div className="space-y-3">
                  {emergencyHistory.data.map((record) => (
                    <div key={record.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{record.type}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(record.date).toLocaleDateString('es-MX')}
                          </p>
                        </div>
                        <Badge variant={record.resolved ? 'default' : 'destructive'}>
                          {record.resolved ? 'Resuelto' : 'Pendiente'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Tiempo de respuesta: {record.responseTime}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No hay historial de emergencias</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}