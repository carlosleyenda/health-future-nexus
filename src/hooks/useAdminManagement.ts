
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminManagementService } from '@/services/api/adminManagementService';
import type { CreateUserForm, SystemConfig } from '@/types/admin';

export const useAllUsersAdmin = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ['admin-users', page, limit, search],
    queryFn: () => AdminManagementService.getAllUsers(page, limit, search),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: CreateUserForm) => AdminManagementService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: any }) =>
      AdminManagementService.updateUser(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => AdminManagementService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useSystemConfig = () => {
  return useQuery({
    queryKey: ['system-config'],
    queryFn: () => AdminManagementService.getSystemConfig(),
  });
};

export const useUpdateSystemConfig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (config: Partial<SystemConfig>) => AdminManagementService.updateSystemConfig(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-config'] });
    },
  });
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: ({ type, dateRange, format }: { type: string; dateRange: { start: string; end: string }; format: string }) =>
      AdminManagementService.generateReport(type, dateRange, format),
  });
};

export const useDatabaseStats = () => {
  return useQuery({
    queryKey: ['database-stats'],
    queryFn: () => AdminManagementService.getDatabaseStats(),
    refetchInterval: 30000,
  });
};

export const useBackupDatabase = () => {
  return useMutation({
    mutationFn: () => AdminManagementService.backupDatabase(),
  });
};

export const useOptimizeDatabase = () => {
  return useMutation({
    mutationFn: () => AdminManagementService.optimizeDatabase(),
  });
};
