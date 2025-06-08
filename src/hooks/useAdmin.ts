
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/services/api';
import { toast } from 'sonner';

export const useAdminAnalytics = (timeRange: string) => {
  return useQuery({
    queryKey: ['admin-analytics', timeRange],
    queryFn: () => AdminService.getAnalytics(timeRange),
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: () => AdminService.getSystemHealth(),
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });
};

export const useUserManagement = () => {
  const queryClient = useQueryClient();

  const activateUser = useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      AdminService.setUserStatus(userId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Estado del usuario actualizado');
    },
  });

  const deleteUser = useMutation({
    mutationFn: (userId: string) => AdminService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Usuario eliminado');
    },
  });

  return { activateUser, deleteUser };
};

export const useAdminReports = () => {
  return useMutation({
    mutationFn: ({ reportType, startDate, endDate, format }: {
      reportType: string;
      startDate: string;
      endDate: string;
      format: 'json' | 'csv' | 'pdf';
    }) => AdminService.generateReport(reportType, startDate, endDate, format),
    onSuccess: () => {
      toast.success('Reporte generado correctamente');
    },
  });
};
