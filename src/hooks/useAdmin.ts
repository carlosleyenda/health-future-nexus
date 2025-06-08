
import { useQuery } from '@tanstack/react-query';
import { AdminService } from '@/services/api/adminService';

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: AdminService.getAnalytics,
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: AdminService.getSystemHealth,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

export const useUserManagement = () => {
  return useQuery({
    queryKey: ['user-management'],
    queryFn: AdminService.getAllUsers,
  });
};
