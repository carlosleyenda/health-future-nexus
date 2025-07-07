import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, fetchProfile } = useAuthStore();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user, session);
          // Fetch profile data
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user, session);
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, [setUser, setLoading, fetchProfile]);

  return <>{children}</>;
}