
import { useQuery } from '@tanstack/react-query';

export const useConnectedDevices = (patientId: string) => {
  return useQuery({
    queryKey: ['connected-devices', patientId],
    queryFn: async () => [
      {
        id: 'device-1',
        name: 'Apple Watch Series 8',
        type: 'Smartwatch',
        isActive: true,
        lastSync: '2024-01-15T10:00:00Z'
      },
      {
        id: 'device-2',
        name: 'Glucómetro Digital',
        type: 'Glucose Monitor',
        isActive: false,
        lastSync: '2024-01-10T08:00:00Z'
      }
    ],
    enabled: !!patientId,
  });
};

export const useDeviceData = (deviceId: string) => {
  return useQuery({
    queryKey: ['device-data', deviceId],
    queryFn: async () => ({
      heartRate: 72,
      steps: 8500,
      calories: 320
    }),
    enabled: !!deviceId,
  });
};
