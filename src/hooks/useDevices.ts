
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DevicesService } from '@/services/api';
import { toast } from 'sonner';

export const useConnectedDevices = (patientId: string) => {
  return useQuery({
    queryKey: ['connected-devices', patientId],
    queryFn: () => DevicesService.getConnectedDevices(patientId),
    enabled: !!patientId,
  });
};

export const useDeviceData = (deviceId: string, timeRange: string = '24h') => {
  return useQuery({
    queryKey: ['device-data', deviceId, timeRange],
    queryFn: () => DevicesService.getDeviceData(deviceId, timeRange),
    enabled: !!deviceId,
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });
};

export const useConnectDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: DevicesService.connectDevice,
    onSuccess: (newDevice) => {
      queryClient.invalidateQueries({ queryKey: ['connected-devices', newDevice.patientId] });
      toast.success('Dispositivo conectado correctamente');
    },
    onError: () => {
      toast.error('Error al conectar el dispositivo');
    },
  });
};

export const useDisconnectDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (deviceId: string) => DevicesService.disconnectDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connected-devices'] });
      toast.success('Dispositivo desconectado');
    },
    onError: () => {
      toast.error('Error al desconectar el dispositivo');
    },
  });
};

export const useDeviceCalibration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ deviceId, calibrationData }: { 
      deviceId: string; 
      calibrationData: any 
    }) => DevicesService.calibrateDevice(deviceId, calibrationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connected-devices'] });
      toast.success('Dispositivo calibrado correctamente');
    },
  });
};

export const useRealtimeDeviceData = (patientId: string) => {
  return useQuery({
    queryKey: ['realtime-device-data', patientId],
    queryFn: () => DevicesService.getRealtimeData(patientId),
    enabled: !!patientId,
    refetchInterval: 5000, // Actualizar cada 5 segundos para datos en tiempo real
  });
};
