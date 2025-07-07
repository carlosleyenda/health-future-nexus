
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'patient' | 'doctor' | 'admin' | 'enterprise' | 'pharmacy';
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null, session?: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        profile: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        
        setUser: (user, session = null) => set({ 
          user, 
          session,
          isAuthenticated: !!user 
        }),
        
        setProfile: (profile) => set({ profile }),
        
        setLoading: (isLoading) => set({ isLoading }),
        
        signIn: async (email: string, password: string) => {
          set({ isLoading: true });
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (!error && data.user) {
            set({ 
              user: data.user, 
              session: data.session,
              isAuthenticated: true 
            });
            // Fetch profile after successful login
            await get().fetchProfile(data.user.id);
          }
          
          set({ isLoading: false });
          return { error };
        },
        
        signUp: async (email: string, password: string, firstName: string, lastName: string) => {
          set({ isLoading: true });
          const redirectUrl = `${window.location.origin}/`;
          
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: redirectUrl,
              data: {
                firstName,
                lastName
              }
            }
          });
          
          set({ isLoading: false });
          return { error };
        },
        
        signOut: async () => {
          set({ isLoading: true });
          await supabase.auth.signOut();
          set({ 
            user: null, 
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false
          });
        },
        
        fetchProfile: async (userId: string) => {
          try {
            // Fetch profile
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', userId)
              .single();
            
            // Fetch role
            const { data: roleData } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', userId)
              .single();
            
            if (profileData && roleData) {
              const profile: UserProfile = {
                ...profileData,
                role: roleData.role
              };
              set({ profile });
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        }
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({ 
          user: state.user, 
          profile: state.profile,
          session: state.session,
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    { name: 'auth-store' }
  )
);
