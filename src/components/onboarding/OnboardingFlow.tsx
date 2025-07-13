import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, User, Heart, Calendar, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Bienvenida', description: 'Te damos la bienvenida a nuestra plataforma' },
  { id: 2, title: 'Perfil Personal', description: 'Completa tu información básica' },
  { id: 3, title: 'Información Médica', description: 'Datos importantes para tu salud' },
  { id: 4, title: 'Preferencias', description: 'Configura tus preferencias de comunicación' },
  { id: 5, title: 'Completado', description: 'Todo listo para empezar' }
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    emergencyContact: '',
    allergies: '',
    bloodType: '',
    notifications: true,
    reminders: true
  });
  const { profile } = useAuthStore();

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    toast.success('¡Onboarding completado!');
    // Aquí iría la lógica para marcar el onboarding como completado
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido a Clínica Virtual!</h2>
              <p className="text-muted-foreground">
                Estamos emocionados de tenerte aquí. Te ayudaremos a configurar tu cuenta
                para que tengas la mejor experiencia médica digital.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">¿Qué puedes hacer aquí?</h3>
              <ul className="text-sm text-left space-y-1">
                <li>✓ Agendar citas médicas online</li>
                <li>✓ Realizar videoconsultas</li>
                <li>✓ Acceder a tu historial médico</li>
                <li>✓ Recibir recetas digitales</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Tu Perfil Personal</h2>
              <p className="text-muted-foreground">
                Esta información nos ayuda a brindarte un mejor servicio
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nombre</Label>
                <Input value={profile?.first_name || ''} disabled />
              </div>
              <div>
                <Label>Apellido</Label>
                <Input value={profile?.last_name || ''} disabled />
              </div>
            </div>
            
            <div>
              <Label htmlFor="emergencyContact">Contacto de Emergencia *</Label>
              <Input
                id="emergencyContact"
                placeholder="Nombre y teléfono"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Información Médica</h2>
              <p className="text-muted-foreground">
                Datos importantes para tu atención médica
              </p>
            </div>
            
            <div>
              <Label htmlFor="bloodType">Tipo de Sangre</Label>
              <select
                id="bloodType"
                className="w-full p-2 border rounded-md"
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
              >
                <option value="">Selecciona...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="allergies">Alergias Conocidas</Label>
              <textarea
                id="allergies"
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Describe cualquier alergia a medicamentos, alimentos, etc."
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Preferencias</h2>
              <p className="text-muted-foreground">
                Configura cómo quieres recibir información
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Notificaciones por Email</h3>
                  <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Recordatorios de Citas</h3>
                  <p className="text-sm text-muted-foreground">Te recordaremos tus citas próximas</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.reminders}
                  onChange={(e) => setFormData({ ...formData, reminders: e.target.checked })}
                  className="scale-125"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">¡Todo Listo!</h2>
              <p className="text-muted-foreground">
                Tu cuenta ha sido configurada exitosamente. Ya puedes comenzar a usar
                todas las funcionalidades de la plataforma.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Próximos pasos:</h3>
              <ul className="text-sm text-left space-y-1">
                <li>✓ Explora tu dashboard personalizado</li>
                <li>✓ Agenda tu primera cita</li>
                <li>✓ Revisa los doctores disponibles</li>
                <li>✓ Configura tu perfil médico completo</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header con progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">Configuración de Cuenta</h1>
            <Badge variant="outline">
              Paso {currentStep} de {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <p className="text-xs mt-1 max-w-20 truncate">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido del paso actual */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
            <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-96">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          {currentStep === steps.length ? (
            <Button onClick={completeOnboarding} className="flex items-center gap-2">
              Finalizar
              <CheckCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={nextStep}
              disabled={currentStep === 2 && !formData.emergencyContact}
              className="flex items-center gap-2"
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}