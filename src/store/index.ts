
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/types';

// Store para autenticación
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        setUser: (user) => set({ 
          user, 
          isAuthenticated: !!user 
        }),
        setLoading: (isLoading) => set({ isLoading }),
        logout: () => set({ 
          user: null, 
          isAuthenticated: false 
        }),
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({ 
          user: state.user, 
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    { name: 'auth-store' }
  )
);

// Store para notificaciones
interface NotificationState {
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  unreadCount: number;
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set, get) => ({
        notifications: [],
        unreadCount: 0,
        addNotification: (notification) => {
          const newNotification = {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            read: false,
          };
          
          set((state) => ({
            notifications: [newNotification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          }));
        },
        markAsRead: (id) => {
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          }));
        },
        markAllAsRead: () => {
          set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
            unreadCount: 0,
          }));
        },
        removeNotification: (id) => {
          const notification = get().notifications.find(n => n.id === id);
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.read 
              ? Math.max(0, state.unreadCount - 1) 
              : state.unreadCount,
          }));
        },
        clearAll: () => {
          set({ notifications: [], unreadCount: 0 });
        },
      }),
      {
        name: 'notification-store',
      }
    ),
    { name: 'notification-store' }
  )
);

// Store para configuración de la aplicación
interface AppState {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  sidebar: {
    isOpen: boolean;
    isCollapsed: boolean;
  };
  setTheme: (theme: AppState['theme']) => void;
  setLanguage: (language: AppState['language']) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        language: 'es',
        sidebar: {
          isOpen: true,
          isCollapsed: false,
        },
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
        toggleSidebar: () =>
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              isOpen: !state.sidebar.isOpen,
            },
          })),
        setSidebarCollapsed: (isCollapsed) =>
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              isCollapsed,
            },
          })),
      }),
      {
        name: 'app-store',
      }
    ),
    { name: 'app-store' }
  )
);

// Store para datos de cita actual (para video consultas)
interface ConsultationState {
  currentConsultation: {
    appointmentId: string;
    patientId: string;
    doctorId: string;
    startTime: string;
    isActive: boolean;
  } | null;
  videoState: {
    isVideoEnabled: boolean;
    isAudioEnabled: boolean;
    isScreenSharing: boolean;
    isRecording: boolean;
  };
  setCurrentConsultation: (consultation: ConsultationState['currentConsultation']) => void;
  updateVideoState: (state: Partial<ConsultationState['videoState']>) => void;
  endConsultation: () => void;
}

export const useConsultationStore = create<ConsultationState>()(
  devtools(
    (set) => ({
      currentConsultation: null,
      videoState: {
        isVideoEnabled: true,
        isAudioEnabled: true,
        isScreenSharing: false,
        isRecording: false,
      },
      setCurrentConsultation: (currentConsultation) => set({ currentConsultation }),
      updateVideoState: (newState) =>
        set((state) => ({
          videoState: { ...state.videoState, ...newState },
        })),
      endConsultation: () =>
        set({
          currentConsultation: null,
          videoState: {
            isVideoEnabled: true,
            isAudioEnabled: true,
            isScreenSharing: false,
            isRecording: false,
          },
        }),
    }),
    { name: 'consultation-store' }
  )
);
