
import { useQuery } from '@tanstack/react-query';

export const useConnectedDevices = (patientId: string) => {
  return useQuery({
    queryKey: ['connected-devices', patientId],
    queryFn: async () => [
      {
        id: 'device-1',
        name: 'Apple Watch Series 8',
        type: 'Smartwatch',
        manufacturer: 'Apple',
        isActive: true,
        batteryLevel: 85,
        lastSync: '2024-01-15T10:00:00Z',
        connectionType: 'bluetooth'
      },
      {
        id: 'device-2',
        name: 'Glucómetro Digital',
        type: 'Glucose Monitor',
        manufacturer: 'Abbott',
        isActive: false,
        batteryLevel: 45,
        lastSync: '2024-01-10T08:00:00Z',
        connectionType: 'wifi'
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

export const useRealtimeDeviceData = (patientId: string) => {
  return useQuery({
    queryKey: ['realtime-device-data', patientId],
    queryFn: async () => [
      {
        deviceId: 'device-1',
        deviceName: 'Apple Watch',
        metric: 'Heart Rate',
        currentValue: 78,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
        trend: 'stable',
        normalRange: 85
      },
      {
        deviceId: 'device-2',
        deviceName: 'Blood Pressure Monitor',
        metric: 'Blood Pressure',
        currentValue: 125,
        unit: 'mmHg',
        timestamp: new Date().toISOString(),
        trend: 'up',
        normalRange: 75
      }
    ],
    enabled: !!patientId,
  });
};
