
import { useQuery } from '@tanstack/react-query';
import { AdminService } from '@/services/api';

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => AdminService.getAnalytics(),
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: () => AdminService.getSystemHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: () => AdminService.getAllUsers(),
  });
};
