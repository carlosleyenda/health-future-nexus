export type DeviceType = 'thermometer' | 'scale' | 'blood_pressure' | 'glucose_meter' | 'pulse_oximeter' | 'ecg' | 'wearable' | 'sensor' | 'camera' | 'other';
export type DeviceStatus = 'active' | 'inactive' | 'maintenance' | 'offline' | 'error';
export type ConnectivityType = 'wifi' | 'bluetooth' | 'cellular' | 'ethernet' | 'satellite' | 'lorawan' | 'nb-iot';
export type ComplianceStatus = 'compliant' | 'non-compliant' | 'pending';

export interface IoTDevice {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  isConnected: boolean;
  lastSeen: string;
  batteryLevel?: number;
  version?: string;
  isResolved?: boolean;
  location?: string;
  patientId?: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  firmwareVersion: string;
  connectionType: ConnectivityType;
  dataFrequency: number; // minutes
  configuration: DeviceConfiguration;
  capabilities: DeviceCapability[];
  alerts: DeviceAlert[];
  readings: DeviceReading[];
  healthScore: number;
  maintenanceSchedule?: MaintenanceSchedule;
  complianceStatus: ComplianceStatus;
  encryptionEnabled: boolean;
  lastCalibration?: string;
  nextCalibration?: string;
  warrantyExpiry?: string;
  certifications: string[];
  powerSource: 'battery' | 'mains' | 'solar' | 'kinetic';
  expectedLifespan: number; // months
  costPerMonth: number;
  reimbursementCode?: string;
}

export interface DeviceReading {
  timestamp: string;
  type: string;
  value: number;
  unit: string;
  deviceId: string;
}

export interface DeviceAlert {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  deviceId: string;
  isResolved: boolean;
}

export interface DeviceConfiguration {
  samplingRate: number;
  dataStorageLimit: number;
  alertThresholds: Record<string, number>;
  encryptionType: string;
  accessControls: string[];
}

export interface DeviceCapability {
  type: string;
  description: string;
  specifications: Record<string, any>;
}

export interface MaintenanceSchedule {
  lastMaintenance: string;
  nextMaintenance: string;
  frequency: string;
  tasks: string[];
}
