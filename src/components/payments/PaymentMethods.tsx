
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Edit, Trash2, Shield, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const cardSchema = z.object({
  cardNumber: z.string().min(16, 'Número de tarjeta inválido'),
  expiryMonth: z.string().min(1).max(2),
  expiryYear: z.string().min(2).max(2),
  cvv: z.string().min(3).max(4),
  cardholderName: z.string().min(2, 'Nombre requerido'),
  isDefault: z.boolean().optional()
});

type CardFormData = z.infer<typeof cardSchema>;

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer';
  lastFour: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  isExpired: boolean;
}

export default function PaymentMethods() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      lastFour: '4567',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 25,
      isDefault: true,
      isExpired: false
    },
    {
      id: '2',
      type: 'debit_card',
      lastFour: '8901',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 24,
      isDefault: false,
      isExpired: true
    }
  ]);

  const form = useForm<CardFormData>({
    resolver: zodResolver(cardSchema)
  });

  const onSubmit = async (data: CardFormData) => {
    try {
      // Simulate adding payment method
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMethod: PaymentMethod = {
        id: crypto.randomUUID(),
        type: 'credit_card',
        lastFour: data.cardNumber.slice(-4),
        brand: data.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        expiryMonth: parseInt(data.expiryMonth),
        expiryYear: parseInt(data.expiryYear),
        isDefault: data.isDefault || false,
        isExpired: false
      };

      setPaymentMethods(prev => [...prev, newMethod]);
      setShowAddForm(false);
      form.reset();
      toast.success('Método de pago agregado exitosamente');
    } catch (error) {
      toast.error('Error al agregar método de pago');
    }
  };

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    toast.success('Método de pago predeterminado actualizado');
  };

  const removeMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    toast.success('Método de pago eliminado');
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      default: return '💳';
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').substr(0, 16)
      .replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pago
            </CardTitle>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Método
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getCardIcon(method.brand)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {method.brand} •••• {method.lastFour}
                      </span>
                      {method.isDefault && (
                        <Badge variant="outline" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Predeterminado
                        </Badge>
                      )}
                      {method.isExpired && (
                        <Badge variant="destructive" className="text-xs">
                          Vencida
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Vence {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDefaultMethod(method.id)}
                    >
                      Predeterminar
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMethod(method.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Method Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Agregar Nuevo Método de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...form.register('cardNumber')}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    form.setValue('cardNumber', formatted.replace(/\s/g, ''));
                    e.target.value = formatted;
                  }}
                />
                {form.formState.errors.cardNumber && (
                  <p className="text-sm text-red-500">{form.formState.errors.cardNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cardholderName">Nombre del Titular</Label>
                <Input
                  id="cardholderName"
                  placeholder="Juan Pérez"
                  {...form.register('cardholderName')}
                />
                {form.formState.errors.cardholderName && (
                  <p className="text-sm text-red-500">{form.formState.errors.cardholderName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Mes</Label>
                  <Input
                    id="expiryMonth"
                    placeholder="12"
                    maxLength={2}
                    {...form.register('expiryMonth')}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryYear">Año</Label>
                  <Input
                    id="expiryYear"
                    placeholder="25"
                    maxLength={2}
                    {...form.register('expiryYear')}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    maxLength={4}
                    {...form.register('cvv')}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...form.register('isDefault')}
                  className="rounded"
                />
                <Label htmlFor="isDefault" className="text-sm">
                  Establecer como método predeterminado
                </Label>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Tu información está protegida con encriptación de nivel bancario
                </span>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Agregar Método
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900">Pagos Seguros</h3>
              <p className="text-sm text-green-700 mt-1">
                Todos los pagos son procesados de forma segura. No almacenamos información completa de tarjetas de crédito.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
