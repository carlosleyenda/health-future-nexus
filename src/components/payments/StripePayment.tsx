import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CreditCard, Loader2, Shield } from 'lucide-react';

interface StripePaymentProps {
  onSuccess?: () => void;
}

export default function StripePayment({ onSuccess }: StripePaymentProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(800);
  const [serviceType, setServiceType] = useState('consultation');

  const handlePayment = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para realizar un pago');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount,
          currency: 'mxn',
          serviceType,
        },
      });

      if (error) throw error;

      // In a real implementation, you would integrate with Stripe Elements here
      toast.success('Payment Intent creado exitosamente');
      console.log('Payment Intent:', data);
      
      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast.error('Error al procesar el pago: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Inicia sesión para realizar pagos
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Procesar Pago
        </CardTitle>
        <CardDescription>
          Pago seguro con Stripe
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service">Tipo de Servicio</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consulta Médica</SelectItem>
              <SelectItem value="telemedicine">Telemedicina</SelectItem>
              <SelectItem value="specialist">Especialista</SelectItem>
              <SelectItem value="emergency">Emergencia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Monto (MXN)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            step="0.01"
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-md">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Shield className="h-4 w-4" />
            <span>Pago procesado de forma segura con Stripe</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Tus datos están protegidos con cifrado de nivel bancario
          </p>
        </div>

        <Button 
          onClick={handlePayment} 
          disabled={loading || !amount || amount <= 0}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            `Pagar $${amount.toFixed(2)} MXN`
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Al continuar, aceptas nuestros términos de servicio y política de privacidad
        </p>
      </CardContent>
    </Card>
  );
}