
export interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin';
  password: string;
  confirmPassword: string;
  // Campos específicos para doctores
  medicalLicense?: string;
  specialties?: string[];
  yearsExperience?: number;
  consultationFee?: number;
  // Campos específicos para pacientes
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bloodType?: string;
}

export interface SystemConfig {
  id: string;
  consultationFee: number;
  emergencyFee: number;
  followUpFee: number;
  businessHours: {
    start: string;
    end: string;
  };
  weekends: boolean;
  maxAppointmentsPerDay: number;
  appointmentDuration: number;
  currency: string;
  taxRate: number;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

export interface ReportData {
  id: string;
  type: 'users' | 'appointments' | 'revenue' | 'medications';
  dateRange: {
    start: string;
    end: string;
  };
  format: 'pdf' | 'csv' | 'excel';
  data: any[];
}

export interface DatabaseStats {
  tables: {
    name: string;
    records: number;
    size: string;
  }[];
  totalSize: string;
  lastBackup: string;
  performance: {
    queryTime: number;
    connections: number;
  };
}
