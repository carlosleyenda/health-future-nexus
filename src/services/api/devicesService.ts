
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class DevicesService {
  static async getConnectedDevices(patientId: string) {
    await delay(400);
    return [
      {
        id: 'dev1',
        patientId,
        name: 'Apple Watch Series 9',
        type: 'fitness_tracker',
        manufacturer: 'Apple',
        serialNumber: 'AW123456789',
        isActive: true,
        batteryLevel: 85,
        lastSync: '2024-06-08T10:30:00Z',
        connectionType: 'bluetooth'
      },
      {
        id: 'dev2',
        patientId,
        name: 'Omron Blood Pressure Monitor',
        type: 'blood_pressure_monitor',
        manufacturer: 'Omron',
        serialNumber: 'OM987654321',
        isActive: true,
        batteryLevel: 92,
        lastSync: '2024-06-08T08:15:00Z',
        connectionType: 'wifi'
      }
    ];
  }

  static async getDeviceData(deviceId: string, timeRange: string) {
    await delay(300);
    
    const mockData = [
      { metric: 'Heart Rate', value: 72, unit: 'bpm', timestamp: '2024-06-08T10:00:00Z' },
      { metric: 'Blood Pressure', value: 120, unit: 'mmHg', timestamp: '2024-06-08T09:30:00Z' },
      { metric: 'Steps', value: 8542, unit: 'steps', timestamp: '2024-06-08T09:00:00Z' },
      { metric: 'Sleep', value: 7.5, unit: 'hours', timestamp: '2024-06-08T07:00:00Z' }
    ];

    return mockData;
  }

  static async connectDevice(deviceData: {
    patientId: string;
    deviceType: string;
    deviceName: string;
    serialNumber: string;
    manufacturer: string;
  }) {
    await delay(800);
    
    return {
      ...deviceData,
      id: crypto.randomUUID(),
      isActive: true,
      batteryLevel: 100,
      lastSync: new Date().toISOString(),
      connectionType: 'bluetooth'
    };
  }

  static async disconnectDevice(deviceId: string) {
    await delay(400);
    return { success: true, deviceId };
  }

  static async calibrateDevice(deviceId: string, calibrationData: any) {
    await delay(600);
    return {
      deviceId,
      calibrationStatus: 'completed',
      timestamp: new Date().toISOString()
    };
  }

  static async getRealtimeData(patientId: string) {
    await delay(200);
    
    return [
      {
        deviceId: 'dev1',
        deviceName: 'Apple Watch',
        metric: 'Heart Rate',
        currentValue: 78,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
        trend: 'stable',
        normalRange: 85
      },
      {
        deviceId: 'dev2',
        deviceName: 'Blood Pressure Monitor',
        metric: 'Blood Pressure',
        currentValue: 125,
        unit: 'mmHg',
        timestamp: new Date().toISOString(),
        trend: 'up',
        normalRange: 75
      }
    ];
  }
}
