import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeliveryStaff, DeliveryService } from '@/types/delivery';
import { toast } from 'sonner';

// Enhanced mock data for delivery person
const mockDeliveryPerson: DeliveryStaff = {
  id: 'delivery-001',
  name: 'Carlos Mendoza',
  phone: '+51 987 654 321',
  email: 'carlos.mendoza@delivery.com',
  specialization: ['medication_delivery', 'sample_collection'],
  rating: 4.8,
  isAvailable: true,
  vehicleType: 'motorcycle',
  licenseNumber: 'MOT-2023-001',
  profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  workingHours: {
    start: '08:00',
    end: '18:00'
  },
  totalDeliveries: 342,
  completionRate: 98,
  averageDeliveryTime: 25,
  isOnline: true,
  lastActive: new Date().toISOString(),
  currentLocation: {
    lat: -12.0464,
    lng: -77.0428
  }
};

const mockEarnings = {
  today: 85.50,
  thisWeek: 420.75,
  thisMonth: 1685.40,
  total: 12850.25,
  deliveriesCompleted: 28,
  averagePerDelivery: 15.02,
  bonus: 125.50,
  tips: 89.25
};

const mockRatings = {
  overall: 4.8,
  totalReviews: 156,
  breakdown: {
    5: 98,
    4: 35,
    3: 15,
    2: 5,
    1: 3
  },
  recentReviews: [
    {
      id: '1',
      customerName: 'María González',
      customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Excelente servicio, muy puntual y amable. Los medicamentos llegaron perfectos.',
      date: '2024-01-14T10:30:00Z',
      deliveryType: 'Medicamentos'
    },
    {
      id: '2',
      customerName: 'José Ramírez',
      rating: 5,
      comment: 'Carlos fue muy profesional, llegó exactamente a la hora acordada y con mucho cuidado.',
      date: '2024-01-13T15:20:00Z',
      deliveryType: 'Muestras'
    },
    {
      id: '3',
      customerName: 'Ana Flores',
      rating: 4,
      comment: 'Buen servicio, aunque llegó 5 minutos tarde. Pero fue muy educado y cuidadoso.',
      date: '2024-01-12T09:15:00Z',
      deliveryType: 'Medicamentos'
    }
  ],
  badges: [
    'Puntualidad Oro',
    'Entregador Estrella',
    'Cliente Satisfecho',
    'Velocidad Plus'
  ]
};

const mockWeeklyStats = {
  deliveriesThisWeek: 28,
  deliveriesLastWeek: 24,
  averageRating: 4.8,
  onTimeDeliveries: 96,
  customerSatisfaction: 98
};

const mockMonthlyGoals = {
  deliveries: { current: 118, target: 120, progress: 98 },
  earnings: { current: 1685.40, target: 1800, progress: 94 },
  rating: { current: 4.8, target: 4.7, progress: 102 }
};

const mockVehicleStatus = {
  fuelLevel: 75,
  batteryLevel: 90,
  maintenanceNext: '2024-02-15',
  mileage: 15420,
  lastService: '2024-01-05'
};

const mockPendingDeliveries: DeliveryService[] = [
  {
    id: 'del-001',
    patientId: 'patient-001',
    serviceType: 'medication_delivery',
    scheduledDate: '2024-01-15T10:00:00Z',
    address: {
      street: 'Av. José Larco 1234',
      city: 'Miraflores',
      state: 'Lima',
      zipCode: '15074',
      country: 'peru'
    },
    status: 'assigned',
    priority: 'normal',
    estimatedCost: 15,
    createdAt: '2024-01-15T08:00:00Z',
    estimatedArrival: '10:30'
  },
  {
    id: 'del-002',
    patientId: 'patient-002',
    serviceType: 'sample_collection',
    scheduledDate: '2024-01-15T14:00:00Z',
    address: {
      street: 'Jr. de la Unión 456',
      city: 'Lima Centro',
      state: 'Lima',
      zipCode: '15001',
      country: 'peru'
    },
    status: 'assigned',
    priority: 'high',
    estimatedCost: 25,
    createdAt: '2024-01-15T08:30:00Z',
    estimatedArrival: '14:15'
  }
];

const mockActiveDeliveries: DeliveryService[] = [
  {
    id: 'del-003',
    patientId: 'patient-003',
    serviceType: 'medication_delivery',
    scheduledDate: '2024-01-15T09:00:00Z',
    address: {
      street: 'Av. Brasil 789',
      city: 'Breña',
      state: 'Lima',
      zipCode: '15082',
      country: 'peru'
    },
    status: 'in_transit',
    priority: 'normal',
    estimatedCost: 20,
    createdAt: '2024-01-15T07:30:00Z',
    estimatedArrival: '09:45',
    currentLocation: 'A 2 cuadras del destino'
  }
];

const mockCompletedDeliveries: DeliveryService[] = [
  {
    id: 'del-004',
    patientId: 'patient-004',
    serviceType: 'medication_delivery',
    scheduledDate: '2024-01-14T16:00:00Z',
    address: {
      street: 'Av. Universitaria 321',
      city: 'San Miguel',
      state: 'Lima',
      zipCode: '15088',
      country: 'peru'
    },
    status: 'completed',
    priority: 'normal',
    estimatedCost: 18,
    actualCost: 18,
    createdAt: '2024-01-14T15:00:00Z',
    rating: 5
  }
];

export const useDeliveryPerson = (deliveryPersonId: string) => {
  const profile = useQuery({
    queryKey: ['delivery-person', deliveryPersonId],
    queryFn: () => Promise.resolve(mockDeliveryPerson),
    enabled: !!deliveryPersonId
  });

  const pendingDeliveries = useQuery({
    queryKey: ['pending-deliveries', deliveryPersonId],
    queryFn: () => Promise.resolve(mockPendingDeliveries),
    enabled: !!deliveryPersonId
  });

  const activeDeliveries = useQuery({
    queryKey: ['active-deliveries', deliveryPersonId],
    queryFn: () => Promise.resolve(mockActiveDeliveries),
    enabled: !!deliveryPersonId
  });

  const completedDeliveries = useQuery({
    queryKey: ['completed-deliveries', deliveryPersonId],
    queryFn: () => Promise.resolve(mockCompletedDeliveries),
    enabled: !!deliveryPersonId
  });

  const earnings = useQuery({
    queryKey: ['earnings', deliveryPersonId],
    queryFn: () => Promise.resolve(mockEarnings),
    enabled: !!deliveryPersonId
  });

  const ratings = useQuery({
    queryKey: ['ratings', deliveryPersonId],
    queryFn: () => Promise.resolve(mockRatings),
    enabled: !!deliveryPersonId
  });

  const weeklyStats = useQuery({
    queryKey: ['weekly-stats', deliveryPersonId],
    queryFn: () => Promise.resolve(mockWeeklyStats),
    enabled: !!deliveryPersonId
  });

  const monthlyGoals = useQuery({
    queryKey: ['monthly-goals', deliveryPersonId],
    queryFn: () => Promise.resolve(mockMonthlyGoals),
    enabled: !!deliveryPersonId
  });

  const vehicleStatus = useQuery({
    queryKey: ['vehicle-status', deliveryPersonId],
    queryFn: () => Promise.resolve(mockVehicleStatus),
    enabled: !!deliveryPersonId
  });

  return {
    data: profile.data,
    pendingDeliveries: pendingDeliveries.data,
    activeDeliveries: activeDeliveries.data,
    completedDeliveries: completedDeliveries.data,
    earnings: earnings.data,
    ratings: ratings.data,
    weeklyStats: weeklyStats.data,
    monthlyGoals: monthlyGoals.data,
    vehicleStatus: vehicleStatus.data,
    recentReviews: mockRatings.recentReviews,
    isLoading: profile.isLoading
  };
};

export const useAcceptDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deliveryId: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-deliveries'] });
      queryClient.invalidateQueries({ queryKey: ['active-deliveries'] });
      toast.success('Entrega aceptada correctamente');
    },
    onError: () => {
      toast.error('Error al aceptar la entrega');
    }
  });
};

export const useCompleteDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deliveryId: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['active-deliveries'] });
      queryClient.invalidateQueries({ queryKey: ['completed-deliveries'] });
      toast.success('Entrega completada correctamente');
    },
    onError: () => {
      toast.error('Error al completar la entrega');
    }
  });
};

export const useUpdateLocation = () => {
  return useMutation({
    mutationFn: async ({ lat, lng }: { lat: number; lng: number }) => {
      // Simulate API call to update location
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onError: () => {
      toast.error('Error al actualizar ubicación');
    }
  });
};
