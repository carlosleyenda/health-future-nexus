import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Ambulance,
  Shield,
  MessageSquare,
  Navigation,
  User
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export default function EmergencyPage() {
  const { user, profile } = useAuthStore();
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyTypes = [
    {
      type: 'cardiac',
      label: 'Emergencia Cardíaca',
      description: 'Dolor en el pecho, dificultad para respirar',
      icon: Heart,
      color: 'bg-red-500',
      priority: 'critical'
    },
    {
      type: 'accident',
      label: 'Accidente',
      description: 'Lesiones por caída, accidente vehicular',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      priority: 'high'
    },
    {
      type: 'medical',
      label: 'Emergencia Médica',
      description: 'Síntomas severos, malestar general',
      icon: Shield,
      color: 'bg-yellow-500',
      priority: 'medium'
    },
    {
      type: 'consultation',
      label: 'Consulta Urgente',
      description: 'Necesito hablar con un doctor ahora',
      icon: MessageSquare,
      color: 'bg-blue-500',
      priority: 'low'
    }
  ];

  const emergencyContacts = [
    {
      name: 'Servicios de Emergencia',
      number: '911',
      description: 'Ambulancia, bomberos, policía',
      available: '24/7'
    },
    {
      name: 'Centro Médico de Emergencias',
      number: '+52 55 1234-5678',
      description: 'Hospital más cercano',
      available: '24/7'
    },
    {
      name: 'Línea Médica Directa',
      number: '+52 55 8765-4321',
      description: 'Consulta telefónica inmediata',
      available: '24/7'
    }
  ];

  const handleEmergencyCall = (type: string) => {
    setEmergencyType(type);
    setIsEmergencyActive(true);
    
    // Simulate emergency call
    toast.success('Enviando alerta de emergencia...');
    
    // Auto-location (simulated)
    setTimeout(() => {
      toast.success('Ubicación enviada. Ayuda en camino.');
    }, 2000);
  };

  const handleCancelEmergency = () => {
    setIsEmergencyActive(false);
    setEmergencyType('');
    setDescription('');
    toast.info('Alerta de emergencia cancelada');
  };

  if (isEmergencyActive) {
    return (
      <div className="min-h-screen bg-red-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Emergency Active Header */}
          <Card className="border-red-500 bg-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="animate-pulse">
                  <Ambulance className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">EMERGENCIA ACTIVA</h1>
                  <p className="text-red-100">Ayuda está en camino</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Detalles de la Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Paciente:</strong> {profile?.first_name} {profile?.last_name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Hora:</strong> {new Date().toLocaleTimeString('es-MX')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Ubicación:</strong> Av. Reforma 123, CDMX
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">
                    {emergencyTypes.find(t => t.type === emergencyType)?.label}
                  </Badge>
                </div>
              </div>

              {description && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Descripción:</p>
                  <p className="text-sm text-gray-700">{description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={handleCancelEmergency}
            >
              Cancelar Emergencia
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('tel:911')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Llamar 911
            </Button>
          </div>

          {/* Live Status */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">GPS activado - Ubicación enviada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Contactando servicios de emergencia...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Tiempo estimado de llegada: 8-12 minutos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-red-100 rounded-full">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-red-600">Centro de Emergencias</h1>
          <p className="text-gray-600">Acceso rápido a servicios de emergencia médica</p>
        </div>
      </div>

      {/* Emergency Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyTypes.map((emergency, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-red-300"
            onClick={() => handleEmergencyCall(emergency.type)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${emergency.color} rounded-full`}>
                  <emergency.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{emergency.label}</h3>
                  <p className="text-gray-600 text-sm">{emergency.description}</p>
                  <Badge 
                    variant={emergency.priority === 'critical' ? 'destructive' : 'secondary'}
                    className="mt-2"
                  >
                    {emergency.priority === 'critical' ? 'Crítica' : 
                     emergency.priority === 'high' ? 'Alta' :
                     emergency.priority === 'medium' ? 'Media' : 'Baja'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-blue-500" />
            Contactos de Emergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{contact.name}</h4>
                <p className="text-sm text-gray-600">{contact.description}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {contact.available}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-medium text-blue-600">{contact.number}</span>
                <Button 
                  size="sm"
                  onClick={() => window.open(`tel:${contact.number}`)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe tu situación médica, síntomas, o cualquier información relevante..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <Navigation className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              Tu ubicación será compartida automáticamente con los servicios de emergencia cuando actives una alerta.
              Asegúrate de tener el GPS activado para obtener la respuesta más rápida.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}