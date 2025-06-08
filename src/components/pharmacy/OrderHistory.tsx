
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, MapPin, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PharmacyMedicationService } from '@/services/api/pharmacyMedicationService';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export default function OrderHistory() {
  const { user } = useAuthStore();

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['order-history', user?.id],
    queryFn: () => PharmacyMedicationService.getOrderHistory(user?.id || ''),
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'preparing': return 'default';
      case 'ready': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const handleReorder = (orderId: string) => {
    toast.success('Productos agregados al carrito');
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando historial...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold">Historial de Órdenes</h2>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Orden #{order.id.slice(-8)}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                      {order.deliveryAddress && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Entrega a domicilio
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Items */}
                  <div>
                    <h4 className="font-medium mb-2">Productos Ordenados:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <div>
                            <p className="font-medium">{item.medication.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.medication.brand} - {item.medication.dosage}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Cantidad: {item.quantity}</p>
                            <p className="text-sm text-gray-600">
                              ${(item.medication.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {order.status === 'delivered' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(order.id)}
                      >
                        Volver a Ordenar
                      </Button>
                    )}
                    {(order.status === 'pending' || order.status === 'confirmed') && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => toast.success('Orden cancelada')}
                      >
                        Cancelar Orden
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No tienes órdenes previas</p>
          <p className="text-sm text-gray-500 mt-2">
            Tus órdenes de medicamentos aparecerán aquí
          </p>
        </div>
      )}
    </div>
  );
}
