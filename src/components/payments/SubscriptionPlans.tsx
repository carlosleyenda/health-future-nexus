import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Check, Crown, Zap, Star, Loader2 } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  user_type: string;
  is_active: boolean;
}

export default function SubscriptionPlans() {
  const { user, profile } = useAuthStore();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, [profile]);

  const fetchPlans = async () => {
    try {
      const userType = profile?.role || 'patient';
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('user_type', userType)
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (error) throw error;
      
      // Parse features from JSON to string array
      const parsedPlans = (data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : 
                 typeof plan.features === 'string' ? JSON.parse(plan.features) : []
      }));
      
      setPlans(parsedPlans);
    } catch (error: any) {
      console.error('Error fetching plans:', error);
      toast.error('Error al cargar los planes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error('Debes iniciar sesión para suscribirte');
      return;
    }

    setSubscribing(planId);
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: {
          planId,
          billingCycle: isYearly ? 'yearly' : 'monthly',
        },
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      window.open(data.checkout_url, '_blank');
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      toast.error('Error al procesar la suscripción: ' + error.message);
    } finally {
      setSubscribing(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'básico':
        return <Zap className="h-5 w-5" />;
      case 'premium':
        return <Star className="h-5 w-5" />;
      case 'pro':
        return <Crown className="h-5 w-5" />;
      case 'enterprise':
        return <Crown className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  const getPopularPlan = () => {
    if (plans.length === 0) return null;
    // Return the middle plan as popular, or the second plan if there are at least 2
    return plans.length >= 2 ? plans[1] : plans[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando planes...</span>
      </div>
    );
  }

  const popularPlan = getPopularPlan();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Planes de Suscripción</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Elige el plan perfecto para tus necesidades de salud digital
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
            Mensual
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={`text-sm ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
            Anual
          </span>
          {isYearly && (
            <Badge variant="secondary" className="ml-2">
              Ahorra 20%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isPopular = popularPlan?.id === plan.id;
          const currentPrice = isYearly ? plan.price_yearly : plan.price_monthly;
          const yearlyDiscount = isYearly ? Math.round(((plan.price_monthly * 12 - plan.price_yearly) / (plan.price_monthly * 12)) * 100) : 0;

          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 hover:shadow-lg ${
                isPopular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white">
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {getPlanIcon(plan.name)}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {formatPrice(currentPrice)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    por {isYearly ? 'año' : 'mes'}
                  </div>
                  {isYearly && yearlyDiscount > 0 && (
                    <div className="text-xs text-green-600 font-medium">
                      Ahorra {yearlyDiscount}% anual
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscribing === plan.id}
                  className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={isPopular ? 'default' : 'outline'}
                >
                  {subscribing === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Suscribirse'
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No hay planes disponibles para tu tipo de usuario
          </p>
        </div>
      )}
    </div>
  );
}