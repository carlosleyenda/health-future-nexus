
// Interface base para dispositivos de monitoreo médico
export interface MonitoringDevice {
  id: string;
  patientId: string;
  deviceType: string;
  brand: string;
  model: string;
  serialNumber: string;
  lastSync: string;
  batteryLevel?: number;
  firmwareVersion?: string;
  isActive: boolean;
  aiAnalyticsEnabled?: boolean;
}

// Tipos extendidos para dispositivos IoT médicos

export interface FitbitDevice extends MonitoringDevice {
  deviceType: 'fitbit';
  accessToken: string;
  refreshToken: string;
  fitbitUserId: string;
  subscriptions: FitbitSubscription[];
}

export interface AppleWatchDevice extends MonitoringDevice {
  deviceType: 'apple_watch';
  healthKitEnabled: boolean;
  permissions: HealthKitPermission[];
}

export interface GlucoseMeterDevice extends MonitoringDevice {
  deviceType: 'glucose_meter';
  calibrationDate: string;
  stripLotNumber?: string;
  targetRange: {
    min: number;
    max: number;
    unit: 'mg/dL' | 'mmol/L';
  };
}

export interface BloodPressureDevice extends MonitoringDevice {
  deviceType: 'blood_pressure_monitor';
  cuffSize: 'small' | 'medium' | 'large' | 'xl';
  armPreference: 'left' | 'right';
}

export interface SmartScaleDevice extends MonitoringDevice {
  deviceType: 'smart_scale';
  bodyCompositionEnabled: boolean;
  multiUserMode: boolean;
  userProfiles: ScaleUserProfile[];
}

export interface PulseOximeterDevice extends MonitoringDevice {
  deviceType: 'pulse_oximeter';
  sensorType: 'finger' | 'wrist' | 'forehead';
  altitudeCalibration?: number;
}

export interface FitbitSubscription {
  subscriptionId: string;
  resourceType: 'activities' | 'sleep' | 'heart' | 'weight';
  isActive: boolean;
}

export interface HealthKitPermission {
  type: string;
  access: 'read' | 'write' | 'read_write';
  granted: boolean;
}

export interface ScaleUserProfile {
  userId: string;
  name: string;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface IoTDeviceReading {
  deviceId: string;
  timestamp: string;
  readings: {
    [key: string]: {
      value: number;
      unit: string;
      confidence?: number;
    };
  };
  rawData?: any;
  processed: boolean;
}
