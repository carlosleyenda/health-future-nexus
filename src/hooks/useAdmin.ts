
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '@/services/api/adminService';
import { toast } from 'sonner';

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => AdminService.getDashboardStats(),
  });
};

export const useRevenueAnalytics = (period: string) => {
  return useQuery({
    queryKey: ['revenue-analytics', period],
    queryFn: () => AdminService.getRevenueAnalytics(period),
  });
};

export const useUserManagement = () => {
  return useQuery({
    queryKey: ['user-management'],
    queryFn: () => AdminService.getUserManagement(),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'suspended' }) =>
      AdminService.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      toast.success('Estado de usuario actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el estado');
    },
  });
};
