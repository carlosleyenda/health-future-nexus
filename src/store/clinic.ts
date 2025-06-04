
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ClinicState {
  // Estados globales de la clínica
  activeAppointment: string | null;
  videoCallActive: boolean;
  emergencyMode: boolean;
  
  // Configuraciones
  consultationDuration: number;
  enableNotifications: boolean;
  
  // Acciones
  setActiveAppointment: (appointmentId: string | null) => void;
  setVideoCallActive: (active: boolean) => void;
  setEmergencyMode: (active: boolean) => void;
  setConsultationDuration: (duration: number) => void;
  toggleNotifications: () => void;
}

export const useClinicStore = create<ClinicState>()(
  devtools(
    (set) => ({
      activeAppointment: null,
      videoCallActive: false,
      emergencyMode: false,
      consultationDuration: 30,
      enableNotifications: true,
      
      setActiveAppointment: (appointmentId) => set({ activeAppointment: appointmentId }),
      setVideoCallActive: (active) => set({ videoCallActive: active }),
      setEmergencyMode: (active) => set({ emergencyMode: active }),
      setConsultationDuration: (duration) => set({ consultationDuration: duration }),
      toggleNotifications: () => set((state) => ({ enableNotifications: !state.enableNotifications })),
    }),
    { name: 'clinic-store' }
  )
);
