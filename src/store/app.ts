
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
