
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { CartItem } from '@/types/pharmacy';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (medicationId: string, quantity: number) => void;
  onRemoveItem: (medicationId: string) => void;
  onCheckout: () => void;
}

export default function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const subtotal = items.reduce((total, item) => total + (item.medication.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% IVA
  const total = subtotal + tax;

  const hasPrescriptionRequired = items.some(item => item.medication.requiresPrescription);

  const handleQuantityChange = (medicationId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      onRemoveItem(medicationId);
      return;
    }
    onUpdateQuantity(medicationId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    
    if (hasPrescriptionRequired) {
      toast.warning('Algunos medicamentos requieren receta médica');
    }
    
    onCheckout();
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Tu carrito está vacío</p>
          <p className="text-sm text-gray-500 mt-2">
            Agrega medicamentos para continuar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCartIcon className="w-5 h-5" />
          Carrito de Compras ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.medication.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{item.medication.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.medication.brand} - {item.medication.dosage}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-semibold text-green-600">
                        ${item.medication.price.toFixed(2)}
                      </p>
                      {item.medication.requiresPrescription && (
                        <Badge variant="outline" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Receta
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.medication.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.medication.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.medication.id, parseInt(e.target.value) || 1)}
                    className="w-16 text-center"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.medication.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-medium ml-2">
                    = ${(item.medication.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IVA (16%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Warnings */}
        {hasPrescriptionRequired && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">
                Algunos medicamentos requieren receta médica. Deberás presentarla en la farmacia.
              </p>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <Button onClick={handleCheckout} className="w-full" size="lg">
          Proceder al Pago
        </Button>
      </CardContent>
    </Card>
  );
}
