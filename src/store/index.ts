import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, HealthWallet, MonitoringDevice, DeliveryService, AIAnalysis } from '@/types';

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

// Store para gestión financiera y wallet
interface FinancialState {
  wallet: HealthWallet | null;
  transactions: any[];
  loyaltyProgress: {
    currentTier: string;
    pointsToNext: number;
    totalPoints: number;
  };
  setWallet: (wallet: HealthWallet) => void;
  updateBalance: (amount: number) => void;
  addTransaction: (transaction: any) => void;
  updateLoyaltyProgress: (progress: any) => void;
}

export const useFinancialStore = create<FinancialState>()(
  devtools(
    persist(
      (set, get) => ({
        wallet: null,
        transactions: [],
        loyaltyProgress: {
          currentTier: 'bronze',
          pointsToNext: 1000,
          totalPoints: 0,
        },
        setWallet: (wallet) => set({ wallet }),
        updateBalance: (amount) => {
          const currentWallet = get().wallet;
          if (currentWallet) {
            set({
              wallet: {
                ...currentWallet,
                balance: currentWallet.balance + amount,
              },
            });
          }
        },
        addTransaction: (transaction) => {
          set((state) => ({
            transactions: [transaction, ...state.transactions],
          }));
        },
        updateLoyaltyProgress: (progress) => {
          set({ loyaltyProgress: progress });
        },
      }),
      {
        name: 'financial-store',
      }
    ),
    { name: 'financial-store' }
  )
);

// Store para monitoreo de salud IoT
interface HealthMonitoringState {
  devices: MonitoringDevice[];
  metrics: any[];
  alerts: any[];
  aiAnalysis: AIAnalysis[];
  isRealTimeMonitoring: boolean;
  addDevice: (device: MonitoringDevice) => void;
  removeDevice: (deviceId: string) => void;
  updateDeviceStatus: (deviceId: string, status: any) => void;
  addMetric: (metric: any) => void;
  addAlert: (alert: any) => void;
  addAIAnalysis: (analysis: AIAnalysis) => void;
  toggleRealTimeMonitoring: () => void;
  clearAlerts: () => void;
}

export const useHealthMonitoringStore = create<HealthMonitoringState>()(
  devtools(
    persist(
      (set, get) => ({
        devices: [],
        metrics: [],
        alerts: [],
        aiAnalysis: [],
        isRealTimeMonitoring: false,
        addDevice: (device) => {
          set((state) => ({
            devices: [...state.devices, device],
          }));
        },
        removeDevice: (deviceId) => {
          set((state) => ({
            devices: state.devices.filter((device) => device.id !== deviceId),
          }));
        },
        updateDeviceStatus: (deviceId, status) => {
          set((state) => ({
            devices: state.devices.map((device) =>
              device.id === deviceId ? { ...device, ...status } : device
            ),
          }));
        },
        addMetric: (metric) => {
          set((state) => ({
            metrics: [metric, ...state.metrics.slice(0, 999)], // Keep last 1000 metrics
          }));
        },
        addAlert: (alert) => {
          set((state) => ({
            alerts: [alert, ...state.alerts],
          }));
        },
        addAIAnalysis: (analysis) => {
          set((state) => ({
            aiAnalysis: [analysis, ...state.aiAnalysis.slice(0, 99)], // Keep last 100 analyses
          }));
        },
        toggleRealTimeMonitoring: () => {
          set((state) => ({
            isRealTimeMonitoring: !state.isRealTimeMonitoring,
          }));
        },
        clearAlerts: () => {
          set({ alerts: [] });
        },
      }),
      {
        name: 'health-monitoring-store',
        partialize: (state) => ({
          devices: state.devices,
          isRealTimeMonitoring: state.isRealTimeMonitoring,
        }),
      }
    ),
    { name: 'health-monitoring-store' }
  )
);

// Store para servicios de delivery médico
interface DeliveryState {
  activeServices: DeliveryService[];
  serviceHistory: DeliveryService[];
  trackingInfo: { [serviceId: string]: any };
  availableStaff: any[];
  requestService: (service: Omit<DeliveryService, 'id' | 'createdAt'>) => void;
  updateServiceStatus: (serviceId: string, status: string, location?: any) => void;
  addTrackingInfo: (serviceId: string, info: any) => void;
  completeService: (serviceId: string, feedback: any) => void;
  setAvailableStaff: (staff: any[]) => void;
}

export const useDeliveryStore = create<DeliveryState>()(
  devtools(
    persist(
      (set, get) => ({
        activeServices: [],
        serviceHistory: [],
        trackingInfo: {},
        availableStaff: [],
        requestService: (service) => {
          const newService: DeliveryService = {
            ...service,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({
            activeServices: [...state.activeServices, newService],
          }));
        },
        updateServiceStatus: (serviceId, status, location) => {
          set((state) => ({
            activeServices: state.activeServices.map((service) =>
              service.id === serviceId
                ? { ...service, status: status as any }
                : service
            ),
          }));
          
          if (location) {
            set((state) => ({
              trackingInfo: {
                ...state.trackingInfo,
                [serviceId]: { ...state.trackingInfo[serviceId], location },
              },
            }));
          }
        },
        addTrackingInfo: (serviceId, info) => {
          set((state) => ({
            trackingInfo: {
              ...state.trackingInfo,
              [serviceId]: { ...state.trackingInfo[serviceId], ...info },
            },
          }));
        },
        completeService: (serviceId, feedback) => {
          const service = get().activeServices.find((s) => s.id === serviceId);
          if (service) {
            set((state) => ({
              activeServices: state.activeServices.filter((s) => s.id !== serviceId),
              serviceHistory: [{ ...service, ...feedback }, ...state.serviceHistory],
            }));
          }
        },
        setAvailableStaff: (staff) => {
          set({ availableStaff: staff });
        },
      }),
      {
        name: 'delivery-store',
        partialize: (state) => ({
          serviceHistory: state.serviceHistory.slice(0, 50), // Keep last 50 services
        }),
      }
    ),
    { name: 'delivery-store' }
  )
);

// Store para farmacia y medicamentos
interface PharmacyState {
  nearbyPharmacies: any[];
  activeOrders: any[];
  orderHistory: any[];
  prescriptions: any[];
  medicationReminders: any[];
  addPharmacies: (pharmacies: any[]) => void;
  placeOrder: (order: any) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  addPrescription: (prescription: any) => void;
  setMedicationReminder: (reminder: any) => void;
  markReminderTaken: (reminderId: string) => void;
}

export const usePharmacyStore = create<PharmacyState>()(
  devtools(
    persist(
      (set, get) => ({
        nearbyPharmacies: [],
        activeOrders: [],
        orderHistory: [],
        prescriptions: [],
        medicationReminders: [],
        addPharmacies: (pharmacies) => {
          set({ nearbyPharmacies: pharmacies });
        },
        placeOrder: (order) => {
          set((state) => ({
            activeOrders: [...state.activeOrders, order],
          }));
        },
        updateOrderStatus: (orderId, status) => {
          set((state) => ({
            activeOrders: state.activeOrders.map((order) =>
              order.id === orderId ? { ...order, status } : order
            ),
          }));
          
          // Move to history if completed
          if (status === 'delivered' || status === 'cancelled') {
            const completedOrder = get().activeOrders.find((o) => o.id === orderId);
            if (completedOrder) {
              set((state) => ({
                activeOrders: state.activeOrders.filter((o) => o.id !== orderId),
                orderHistory: [completedOrder, ...state.orderHistory],
              }));
            }
          }
        },
        addPrescription: (prescription) => {
          set((state) => ({
            prescriptions: [prescription, ...state.prescriptions],
          }));
        },
        setMedicationReminder: (reminder) => {
          set((state) => ({
            medicationReminders: [...state.medicationReminders, reminder],
          }));
        },
        markReminderTaken: (reminderId) => {
          set((state) => ({
            medicationReminders: state.medicationReminders.map((reminder) =>
              reminder.id === reminderId
                ? { ...reminder, taken: true, takenAt: new Date().toISOString() }
                : reminder
            ),
          }));
        },
      }),
      {
        name: 'pharmacy-store',
      }
    ),
    { name: 'pharmacy-store' }
  )
);

// Store para marketplace y servicios premium
interface MarketplaceState {
  availableServices: any[];
  bookedServices: any[];
  favorites: string[];
  reviews: any[];
  filters: {
    serviceType?: string;
    priceRange?: [number, number];
    rating?: number;
    language?: string;
    availability?: string;
  };
  setAvailableServices: (services: any[]) => void;
  bookService: (service: any) => void;
  addToFavorites: (serviceId: string) => void;
  removeFromFavorites: (serviceId: string) => void;
  addReview: (review: any) => void;
  updateFilters: (filters: any) => void;
  clearFilters: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>()(
  devtools(
    persist(
      (set) => ({
        availableServices: [],
        bookedServices: [],
        favorites: [],
        reviews: [],
        filters: {},
        setAvailableServices: (services) => {
          set({ availableServices: services });
        },
        bookService: (service) => {
          set((state) => ({
            bookedServices: [...state.bookedServices, service],
          }));
        },
        addToFavorites: (serviceId) => {
          set((state) => ({
            favorites: [...state.favorites, serviceId],
          }));
        },
        removeFromFavorites: (serviceId) => {
          set((state) => ({
            favorites: state.favorites.filter((id) => id !== serviceId),
          }));
        },
        addReview: (review) => {
          set((state) => ({
            reviews: [...state.reviews, review],
          }));
        },
        updateFilters: (newFilters) => {
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          }));
        },
        clearFilters: () => {
          set({ filters: {} });
        },
      }),
      {
        name: 'marketplace-store',
      }
    ),
    { name: 'marketplace-store' }
  )
);
