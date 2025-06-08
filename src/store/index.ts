
// Re-export all stores
export { useAuthStore } from './auth';
export { useAppStore } from './app';
export { useNotificationStore } from './notifications';
export { useClinicStore } from './clinic';

// Global app configuration store
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalConfigState {
  // Configuración global de la aplicación
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  currency: 'MXN' | 'USD';
  timezone: string;
  
  // Configuraciones de la clínica
  clinicName: string;
  maxAppointmentsPerDay: number;
  defaultConsultationFee: number;
  emergencyContactNumber: string;
  
  // Features flags
  enableVideoConsultations: boolean;
  enableHomeDelivery: boolean;
  enableHealthMonitoring: boolean;
  enablePrescriptionDelivery: boolean;
  enableInsuranceIntegration: boolean;
  
  // Configuraciones de pago
  acceptedPaymentMethods: string[];
  
  // Acciones
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'es' | 'en') => void;
  setCurrency: (currency: 'MXN' | 'USD') => void;
  updateClinicConfig: (config: Partial<GlobalConfigState>) => void;
  toggleFeature: (feature: keyof Pick<GlobalConfigState, 
    'enableVideoConsultations' | 'enableHomeDelivery' | 'enableHealthMonitoring' | 
    'enablePrescriptionDelivery' | 'enableInsuranceIntegration'>) => void;
}

export const useGlobalConfigStore = create<GlobalConfigState>()(
  devtools(
    (set) => ({
      // Estados iniciales
      theme: 'system',
      language: 'es',
      currency: 'MXN',
      timezone: 'America/Mexico_City',
      
      clinicName: 'Clínica Virtual Salud+',
      maxAppointmentsPerDay: 20,
      defaultConsultationFee: 800,
      emergencyContactNumber: '+52 555 EMERGENCIA',
      
      enableVideoConsultations: true,
      enableHomeDelivery: true,
      enableHealthMonitoring: true,
      enablePrescriptionDelivery: true,
      enableInsuranceIntegration: false,
      
      acceptedPaymentMethods: ['credit_card', 'debit_card', 'bank_transfer'],
      
      // Acciones
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      
      updateClinicConfig: (config) => set((state) => ({ ...state, ...config })),
      
      toggleFeature: (feature) => set((state) => ({ 
        ...state, 
        [feature]: !state[feature] 
      })),
    }),
    { name: 'global-config-store' }
  )
);

// Store para manejo de errores y debugging
interface ErrorState {
  errors: Array<{
    id: string;
    message: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    context?: any;
  }>;
  
  addError: (error: {
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    context?: any;
  }) => void;
  
  clearErrors: () => void;
  removeError: (id: string) => void;
}

export const useErrorStore = create<ErrorState>()(
  devtools(
    (set) => ({
      errors: [],
      
      addError: (error) => set((state) => ({
        errors: [...state.errors, {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ...error
        }].slice(-50) // Mantener solo los últimos 50 errores
      })),
      
      clearErrors: () => set({ errors: [] }),
      
      removeError: (id) => set((state) => ({
        errors: state.errors.filter(error => error.id !== id)
      })),
    }),
    { name: 'error-store' }
  )
);
