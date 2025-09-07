import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfessionalDeliveryService } from '@/services/api/professionalDeliveryService';
import { toast } from 'sonner';
import type { DeliveryStaff, EarningsSummary, DeliveryStats } from '@/types/professionalDelivery';

export const useProfessionalDelivery = (userId: string) => {
  const queryClient = useQueryClient();

  // Get delivery staff profile
  const staffProfile = useQuery({
    queryKey: ['deliveryStaff', userId],
    queryFn: () => ProfessionalDeliveryService.getDeliveryStaffProfile(userId),
    enabled: !!userId,
  });

  // Get pending deliveries
  const pendingDeliveries = useQuery({
    queryKey: ['pendingDeliveries', staffProfile.data?.id],
    queryFn: () => staffProfile.data ? ProfessionalDeliveryService.getDeliveryServices(staffProfile.data.id, 'assigned') : [],
    enabled: !!staffProfile.data?.id,
  });

  // Get active deliveries
  const activeDeliveries = useQuery({
    queryKey: ['activeDeliveries', staffProfile.data?.id],
    queryFn: () => staffProfile.data ? ProfessionalDeliveryService.getDeliveryServices(staffProfile.data.id, 'accepted') : [],
    enabled: !!staffProfile.data?.id,
  });

  // Get completed deliveries
  const completedDeliveries = useQuery({
    queryKey: ['completedDeliveries', staffProfile.data?.id],
    queryFn: () => staffProfile.data ? ProfessionalDeliveryService.getDeliveryServices(staffProfile.data.id, 'completed') : [],
    enabled: !!staffProfile.data?.id,
  });

  // Get earnings
  const earnings = useQuery({
    queryKey: ['earnings', staffProfile.data?.id],
    queryFn: async (): Promise<EarningsSummary> => {
      if (!staffProfile.data?.id) return {} as EarningsSummary;

      const [todayEarnings, weekEarnings, monthEarnings, yearEarnings] = await Promise.all([
        ProfessionalDeliveryService.getEarnings(staffProfile.data.id, 'today'),
        ProfessionalDeliveryService.getEarnings(staffProfile.data.id, 'week'),
        ProfessionalDeliveryService.getEarnings(staffProfile.data.id, 'month'),
        ProfessionalDeliveryService.getEarnings(staffProfile.data.id, 'year'),
      ]);

      const calculateTotal = (earnings: any[]) => 
        earnings.reduce((sum, earning) => sum + parseFloat(String(earning.amount || 0)), 0);

      const today = calculateTotal(todayEarnings);
      const week = calculateTotal(weekEarnings);
      const month = calculateTotal(monthEarnings);
      const year = calculateTotal(yearEarnings);

      const totalTips = todayEarnings
        .filter(e => e.earning_type === 'tip')
        .reduce((sum, earning) => sum + parseFloat(String(earning.amount || 0)), 0);

      const pendingPayments = todayEarnings
        .filter(e => e.payment_status === 'pending')
        .reduce((sum, earning) => sum + parseFloat(String(earning.amount || 0)), 0);

      return {
        today,
        week,
        month,
        year,
        totalTips,
        pendingPayments,
        averagePerDelivery: staffProfile.data.total_deliveries > 0 ? year / staffProfile.data.total_deliveries : 0,
        bestDay: {
          date: new Date().toISOString().split('T')[0],
          amount: today
        },
        breakdown: {
          deliveryFees: monthEarnings.filter(e => e.earning_type === 'delivery_fee').reduce((sum, e) => sum + parseFloat(String(e.amount || 0)), 0),
          tips: monthEarnings.filter(e => e.earning_type === 'tip').reduce((sum, e) => sum + parseFloat(String(e.amount || 0)), 0),
          bonuses: monthEarnings.filter(e => e.earning_type === 'bonus').reduce((sum, e) => sum + parseFloat(String(e.amount || 0)), 0),
          penalties: monthEarnings.filter(e => e.earning_type === 'penalty').reduce((sum, e) => sum + parseFloat(String(e.amount || 0)), 0),
        }
      };
    },
    enabled: !!staffProfile.data?.id,
  });

  // Get ratings
  const ratings = useQuery({
    queryKey: ['ratings', staffProfile.data?.id],
    queryFn: () => staffProfile.data ? ProfessionalDeliveryService.getRatings(staffProfile.data.id) : [],
    enabled: !!staffProfile.data?.id,
  });

  // Get performance metrics
  const performanceMetrics = useQuery({
    queryKey: ['performanceMetrics', staffProfile.data?.id],
    queryFn: () => staffProfile.data ? ProfessionalDeliveryService.getPerformanceMetrics(staffProfile.data.id) : [],
    enabled: !!staffProfile.data?.id,
  });

  // Stats calculation
  const stats: DeliveryStats = {
    totalDeliveries: staffProfile.data?.total_deliveries || 0,
    completedToday: activeDeliveries.data?.length || 0,
    averageRating: staffProfile.data?.rating || 0,
    completionRate: staffProfile.data?.completion_rate || 0,
    averageDeliveryTime: staffProfile.data?.average_delivery_time || 0,
    totalDistanceThisMonth: performanceMetrics.data?.reduce((sum, metric) => sum + (metric.total_distance_km || 0), 0) || 0,
    onlineHoursToday: performanceMetrics.data?.[0]?.online_hours || 0,
    acceptanceRate: performanceMetrics.data?.[0]?.acceptance_rate || 0,
  };

  return {
    staffProfile: staffProfile.data,
    isLoading: staffProfile.isLoading,
    pendingDeliveries: pendingDeliveries.data || [],
    activeDeliveries: activeDeliveries.data || [],
    completedDeliveries: completedDeliveries.data || [],
    earnings: earnings.data,
    ratings: ratings.data || [],
    performanceMetrics: performanceMetrics.data || [],
    stats,
  };
};

// Accept delivery mutation
export const useAcceptDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProfessionalDeliveryService.acceptDeliveryService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingDeliveries'] });
      queryClient.invalidateQueries({ queryKey: ['activeDeliveries'] });
      toast.success('Entrega aceptada exitosamente');
    },
    onError: () => {
      toast.error('Error al aceptar la entrega');
    },
  });
};

// Update delivery status mutation
export const useUpdateDeliveryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ serviceId, status, location }: { serviceId: string; status: string; location?: { lat: number; lng: number } }) =>
      ProfessionalDeliveryService.updateDeliveryStatus(serviceId, status, location),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeDeliveries'] });
      queryClient.invalidateQueries({ queryKey: ['completedDeliveries'] });
      queryClient.invalidateQueries({ queryKey: ['earnings'] });
      toast.success('Estado actualizado exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar el estado');
    },
  });
};

// Update online status mutation
export const useUpdateOnlineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, isOnline }: { staffId: string; isOnline: boolean }) =>
      ProfessionalDeliveryService.updateOnlineStatus(staffId, isOnline),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveryStaff'] });
      toast.success('Estado de conexión actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el estado de conexión');
    },
  });
};

// Submit proof of delivery mutation
export const useSubmitProofOfDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ serviceId, proof }: { serviceId: string; proof: { photo?: string; signature?: string; notes?: string } }) =>
      ProfessionalDeliveryService.submitProofOfDelivery(serviceId, proof),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeDeliveries'] });
      queryClient.invalidateQueries({ queryKey: ['completedDeliveries'] });
      queryClient.invalidateQueries({ queryKey: ['earnings'] });
      toast.success('Prueba de entrega enviada exitosamente');
    },
    onError: () => {
      toast.error('Error al enviar la prueba de entrega');
    },
  });
};