import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Heart, 
  Settings, 
  Target,
  Sparkles,
  Clock,
  Shield
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface UserData {
  personalInfo: {
    dateOfBirth: string;
    phone: string;
    address: string;
    emergencyContact: string;
  };
  healthProfile: {
    conditions: string[];
    medications: string[];
    allergies: string[];
    bloodType: string;
  };
  preferences: {
    notifications: string[];
    language: string;
    timezone: string;
    privacy: string;
  };
  goals: {
    primaryGoals: string[];
    frequency: string;
    budget: string;
  };
}

export default function EnhancedOnboarding() {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    personalInfo: {
      dateOfBirth: '',
      phone: '',
      address: '',
      emergencyContact: ''
    },
    healthProfile: {
      conditions: [],
      medications: [],
      allergies: [],
      bloodType: ''
    },
    preferences: {
      notifications: [],
      language: 'es',
      timezone: 'America/Mexico_City',
      privacy: 'normal'
    },
    goals: {
      primaryGoals: [],
      frequency: '',
      budget: ''
    }
  });

  const steps: OnboardingStep[] = [
    {
      id: 'personal',
      title: 'Información Personal',
      description: 'Completa tu perfil básico para personalizar tu experiencia',
      icon: <User className="h-6 w-6" />,
      component: <PersonalInfoStep userData={userData} setUserData={setUserData} />
    },
    {
      id: 'health',
      title: 'Perfil de Salud',
      description: 'Comparte información médica relevante para un mejor cuidado',
      icon: <Heart className="h-6 w-6" />,
      component: <HealthProfileStep userData={userData} setUserData={setUserData} />
    },
    {
      id: 'preferences',
      title: 'Preferencias',
      description: 'Configura notificaciones y privacidad según tus necesidades',
      icon: <Settings className="h-6 w-6" />,
      component: <PreferencesStep userData={userData} setUserData={setUserData} />
    },
    {
      id: 'goals',
      title: 'Objetivos de Salud',
      description: 'Define tus metas para que podamos ayudarte mejor',
      icon: <Target className="h-6 w-6" />,
      component: <GoalsStep userData={userData} setUserData={setUserData} />
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // In a real app, save the onboarding data
      console.log('Onboarding completed:', userData);
      
      toast.success('¡Bienvenido! Tu perfil ha sido configurado exitosamente');
      
      // Redirect based on role
      const dashboardPaths = {
        patient: '/patient/dashboard',
        doctor: '/doctor/dashboard',
        admin: '/admin/dashboard',
        enterprise: '/enterprise',
        pharmacy: '/pharmacy-dashboard'
      };
      
      const role = profile?.role || 'patient';
      navigate(dashboardPaths[role as keyof typeof dashboardPaths] || '/');
    } catch (error) {
      toast.error('Error al completar el onboarding');
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Configuración Inicial</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Te ayudaremos a configurar tu cuenta en solo unos minutos para brindarte 
            la mejor experiencia personalizada
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              ~2 min restantes
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Steps indicator */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                  ${index < currentStep ? 'bg-primary text-white' : 
                    index === currentStep ? 'bg-primary/20 text-primary border-2 border-primary' :
                    'bg-muted text-muted-foreground'
                  }
                `}>
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                {currentStepData.icon}
              </div>
            </div>
            <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
            <CardDescription className="text-base">
              {currentStepData.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            {currentStepData.component}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/patient/dashboard')}
              className="text-muted-foreground"
            >
              Omitir por ahora
            </Button>
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 min-w-[120px]"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="h-4 w-4" />
                  Completar
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Toda tu información está protegida y encriptada</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual step components
function PersonalInfoStep({ userData, setUserData }: { userData: UserData; setUserData: React.Dispatch<React.SetStateAction<UserData>> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Fecha de Nacimiento</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={userData.personalInfo.dateOfBirth}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
            }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            placeholder="+52 55 1234 5678"
            value={userData.personalInfo.phone}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, phone: e.target.value }
            }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          placeholder="Calle, número, colonia, ciudad"
          value={userData.personalInfo.address}
          onChange={(e) => setUserData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, address: e.target.value }
          }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
        <Input
          id="emergencyContact"
          placeholder="Nombre y teléfono de contacto"
          value={userData.personalInfo.emergencyContact}
          onChange={(e) => setUserData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, emergencyContact: e.target.value }
          }))}
        />
      </div>
    </div>
  );
}

function HealthProfileStep({ userData, setUserData }: { userData: UserData; setUserData: React.Dispatch<React.SetStateAction<UserData>> }) {
  const conditions = [
    'Diabetes', 'Hipertensión', 'Asma', 'Alergias', 'Cardiopatía', 
    'Artritis', 'Migraña', 'Depresión', 'Ansiedad'
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bloodType">Tipo de Sangre</Label>
        <Select 
          value={userData.healthProfile.bloodType}
          onValueChange={(value) => setUserData(prev => ({
            ...prev,
            healthProfile: { ...prev.healthProfile, bloodType: value }
          }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu tipo de sangre" />
          </SelectTrigger>
          <SelectContent>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Condiciones Médicas (selecciona las que apliquen)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {conditions.map(condition => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={userData.healthProfile.conditions.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setUserData(prev => ({
                      ...prev,
                      healthProfile: {
                        ...prev.healthProfile,
                        conditions: [...prev.healthProfile.conditions, condition]
                      }
                    }));
                  } else {
                    setUserData(prev => ({
                      ...prev,
                      healthProfile: {
                        ...prev.healthProfile,
                        conditions: prev.healthProfile.conditions.filter(c => c !== condition)
                      }
                    }));
                  }
                }}
              />
              <Label htmlFor={condition} className="text-sm">{condition}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">Alergias Conocidas</Label>
        <Textarea
          id="allergies"
          placeholder="Describe cualquier alergia a medicamentos, alimentos, etc."
          value={userData.healthProfile.allergies.join(', ')}
          onChange={(e) => setUserData(prev => ({
            ...prev,
            healthProfile: { 
              ...prev.healthProfile, 
              allergies: e.target.value.split(',').map(a => a.trim()).filter(a => a)
            }
          }))}
        />
      </div>
    </div>
  );
}

function PreferencesStep({ userData, setUserData }: { userData: UserData; setUserData: React.Dispatch<React.SetStateAction<UserData>> }) {
  const notificationOptions = [
    'Recordatorios de citas',
    'Recordatorios de medicamentos',
    'Resultados de laboratorio',
    'Actualizaciones de salud',
    'Ofertas y promociones'
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Notificaciones (selecciona las que deseas recibir)</Label>
        <div className="space-y-3">
          {notificationOptions.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={userData.preferences.notifications.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setUserData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: [...prev.preferences.notifications, option]
                      }
                    }));
                  } else {
                    setUserData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: prev.preferences.notifications.filter(n => n !== option)
                      }
                    }));
                  }
                }}
              />
              <Label htmlFor={option} className="text-sm">{option}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">Idioma Preferido</Label>
          <Select 
            value={userData.preferences.language}
            onValueChange={(value) => setUserData(prev => ({
              ...prev,
              preferences: { ...prev.preferences, language: value }
            }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="privacy">Nivel de Privacidad</Label>
          <Select 
            value={userData.preferences.privacy}
            onValueChange={(value) => setUserData(prev => ({
              ...prev,
              preferences: { ...prev.preferences, privacy: value }
            }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Alto - Máxima privacidad</SelectItem>
              <SelectItem value="normal">Normal - Equilibrado</SelectItem>
              <SelectItem value="open">Abierto - Más personalización</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function GoalsStep({ userData, setUserData }: { userData: UserData; setUserData: React.Dispatch<React.SetStateAction<UserData>> }) {
  const healthGoals = [
    'Mantener salud general',
    'Perder peso',
    'Ganar masa muscular',
    'Controlar condición crónica',
    'Mejorar salud mental',
    'Prevenir enfermedades',
    'Aumentar actividad física',
    'Mejorar alimentación'
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Objetivos de Salud (selecciona tus prioridades)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {healthGoals.map(goal => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={userData.goals.primaryGoals.includes(goal)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setUserData(prev => ({
                      ...prev,
                      goals: {
                        ...prev.goals,
                        primaryGoals: [...prev.goals.primaryGoals, goal]
                      }
                    }));
                  } else {
                    setUserData(prev => ({
                      ...prev,
                      goals: {
                        ...prev.goals,
                        primaryGoals: prev.goals.primaryGoals.filter(g => g !== goal)
                      }
                    }));
                  }
                }}
              />
              <Label htmlFor={goal} className="text-sm">{goal}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="frequency">Frecuencia de Uso Esperada</Label>
          <Select 
            value={userData.goals.frequency}
            onValueChange={(value) => setUserData(prev => ({
              ...prev,
              goals: { ...prev.goals, frequency: value }
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="¿Con qué frecuencia usarás la plataforma?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diariamente</SelectItem>
              <SelectItem value="weekly">Semanalmente</SelectItem>
              <SelectItem value="monthly">Mensualmente</SelectItem>
              <SelectItem value="as-needed">Solo cuando sea necesario</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Presupuesto Mensual Aproximado</Label>
          <Select 
            value={userData.goals.budget}
            onValueChange={(value) => setUserData(prev => ({
              ...prev,
              goals: { ...prev.goals, budget: value }
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Rango de presupuesto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500">$0 - $500 MXN</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000 MXN</SelectItem>
              <SelectItem value="1000-2000">$1,000 - $2,000 MXN</SelectItem>
              <SelectItem value="2000+">$2,000+ MXN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}