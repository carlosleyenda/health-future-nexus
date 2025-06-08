
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, ShoppingCart as ShoppingCartIcon, History } from 'lucide-react';
import MedicationSearch from './MedicationSearch';
import PrescriptionView from './PrescriptionView';
import ShoppingCart from './ShoppingCart';
import OrderHistory from './OrderHistory';
import { PharmacyMedicationService } from '@/services/api/pharmacyMedicationService';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import type { Medication, CartItem, DigitalPrescription } from '@/types/pharmacy';

export default function PharmacyModule() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('search');
  const { user } = useAuthStore();

  const addToCart = (medication: Medication) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.medication.id === medication.id);
      if (existingItem) {
        return prev.map(item =>
          item.medication.id === medication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { medication, quantity: 1 }];
    });
  };

  const updateQuantity = (medicationId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.medication.id === medicationId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (medicationId: string) => {
    setCartItems(prev => prev.filter(item => item.medication.id !== medicationId));
    toast.success('Producto removido del carrito');
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para continuar');
      return;
    }

    try {
      const totalAmount = cartItems.reduce((total, item) => 
        total + (item.medication.price * item.quantity), 0
      ) * 1.16; // Add tax

      await PharmacyMedicationService.createOrder({
        patientId: user.id,
        items: cartItems,
        totalAmount,
        prescriptionRequired: cartItems.some(item => item.medication.requiresPrescription),
        pharmacyId: 'pharmacy-1'
      });

      toast.success('Orden creada exitosamente');
      setCartItems([]);
      setActiveTab('history');
    } catch (error) {
      toast.error('Error al crear la orden');
    }
  };

  const handleOrderFromPrescription = (prescription: DigitalPrescription) => {
    // This would normally match prescription medications to available medications
    toast.success('Medicamentos de la receta agregados al carrito');
    setActiveTab('cart');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmacia Virtual</h1>
        <p className="text-gray-600">
          Encuentra, ordena y recibe tus medicamentos de forma segura
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Buscar
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Recetas
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingCartIcon className="w-4 h-4" />
            Carrito
            {cartItems.length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {cartItems.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <MedicationSearch onAddToCart={addToCart} />
        </TabsContent>

        <TabsContent value="prescriptions">
          <PrescriptionView onOrderFromPrescription={handleOrderFromPrescription} />
        </TabsContent>

        <TabsContent value="cart">
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        </TabsContent>

        <TabsContent value="history">
          <OrderHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
