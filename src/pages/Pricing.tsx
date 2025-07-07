import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Crown, Zap, Building2, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

const pricingPlans = {
  patient: [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: { monthly: 29, yearly: 290 },
      icon: CheckCircle,
      color: 'blue',
      features: [
        '5 consultas médicas al mes',
        'Chat médico 24/7',
        'Historial médico básico',
        'Recordatorios de medicamentos',
        'Monitoreo básico de salud'
      ],
      limitations: ['Sin consultas de especialistas', 'Sin IA diagnóstica avanzada']
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: { monthly: 79, yearly: 790 },
      icon: Crown,
      color: 'purple',
      popular: true,
      features: [
        'Consultas ilimitadas',
        'Especialistas incluidos',
        'IA diagnóstica avanzada',
        'Delivery médico gratis',
        'Análisis genético básico',
        'Telemedicina familiar (4 miembros)',
        'Prioridad en emergencias'
      ]
    },
    {
      id: 'family',
      name: 'Plan Familiar',
      price: { monthly: 149, yearly: 1490 },
      icon: Building2,
      color: 'green',
      features: [
        'Todo del Plan Premium',
        'Hasta 8 miembros familiares',
        'Coordinador de salud familiar',
        'Descuentos en farmacias (20%)',
        'Seguros médicos integrados',
        'Medicina preventiva avanzada'
      ]
    }
  ],
  doctor: [
    {
      id: 'starter',
      name: 'Doctor Starter',
      price: { monthly: 99, yearly: 990 },
      commission: 8,
      icon: CheckCircle,
      color: 'blue',
      features: [
         'Hasta 100 pacientes',
        'Dashboard básico',
        'Herramientas de diagnóstico',
        'Gestión de citas',
        'Facturación automática'
      ]
    },
    {
      id: 'professional',
      name: 'Doctor Professional',
      price: { monthly: 199, yearly: 1990 },
      commission: 6,
      icon: Zap,
      color: 'purple',
      popular: true,
      features: [
        'Pacientes ilimitados',
        'IA diagnóstica avanzada',
        'Analytics de práctica',
        'Marketing automático',
        'Integraciones ERP',
        'Telecirugía básica',
        'Educación médica continua'
      ]
    },
    {
      id: 'enterprise',
      name: 'Clínica Enterprise',
      price: { monthly: 499, yearly: 4990 },
      commission: 4,
      icon: Building2,
      color: 'gold',
      features: [
        'Todo del Professional',
        'Múltiples doctores',
        'White-label completo',
        'API personalizada',
        'Soporte dedicado 24/7',
        'Compliance automático',
        'Blockchain para registros'
      ]
    }
  ]
};

export default function PricingPage() {
  const { user } = useAuthStore();
  const [isYearly, setIsYearly] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor'>(user?.role === 'doctor' ? 'doctor' : 'patient');

  const currentPlans = pricingPlans[userType];

  const handleSubscribe = (planId: string) => {
    // Integrate with Stripe checkout
    console.log(`Subscribing to ${planId} plan`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="h-12 w-12 text-yellow-400" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Revolución Médica
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              La primera plataforma de telemedicina con IA que genera{' '}
              <span className="font-bold text-yellow-300">$10M+ en valor médico</span> para nuestros usuarios
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>500K+ Pacientes Activos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>15K+ Doctores Elite</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>98% Precisión IA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* User Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-xl shadow-lg border">
            <div className="flex gap-2">
              <button
                onClick={() => setUserType('patient')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  userType === 'patient'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Para Pacientes
              </button>
              <button
                onClick={() => setUserType('doctor')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  userType === 'doctor'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Para Doctores
              </button>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
            Mensual
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-green-600"
          />
          <span className={`font-medium ${isYearly ? 'text-green-600' : 'text-gray-500'}`}>
            Anual
          </span>
          <Badge className="bg-green-100 text-green-800 ml-2">
            Ahorra 30%
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {currentPlans.map((plan) => {
            const IconComponent = plan.icon;
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const originalPrice = isYearly ? plan.price.monthly * 12 : null;
            
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? 'ring-2 ring-purple-500 scale-105 bg-gradient-to-br from-purple-50 to-blue-50'
                    : 'hover:scale-102'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 text-sm font-bold">
                    🔥 MÁS POPULAR - 89% de doctores lo eligen
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-${plan.color}-100`}>
                      <IconComponent className={`h-8 w-8 text-${plan.color}-600`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    {originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${originalPrice}/año
                      </div>
                    )}
                    <div className="text-4xl font-bold text-gray-900">
                      ${price}
                      <span className="text-lg text-gray-500 font-normal">
                        /{isYearly ? 'año' : 'mes'}
                      </span>
                    </div>
                    {userType === 'doctor' && 'commission' in plan && (
                      <div className="text-sm text-green-600 font-medium">
                        {plan.commission}% comisión por transacción
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {'limitations' in plan && plan.limitations && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500 mb-2">Limitaciones:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-sm text-gray-400">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Comenzar ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Calcula tu ROI en Tiempo Real
          </h3>
          <p className="text-xl mb-6 text-green-100">
            Nuestros doctores generan en promedio <span className="font-bold text-yellow-300">$284K adicionales</span> por año
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">847%</div>
              <div className="text-sm text-green-100">ROI Promedio Anual</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">72hrs</div>
              <div className="text-sm text-green-100">Tiempo hasta primer ingreso</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">$2.1M</div>
              <div className="text-sm text-green-100">Ahorro en costos operativos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}