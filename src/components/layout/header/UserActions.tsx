
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, Phone, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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

interface UserActionsProps {
  isAuthenticated: boolean;
  user: SupabaseUser | null;
  profile: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function UserActions({ isAuthenticated, user, profile, onLogin, onLogout }: UserActionsProps) {
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (profile?.role) {
      navigate(`/${profile.role}/dashboard`);
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        {/* Botón de Dashboard */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDashboard}
          className="hidden md:flex text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </Button>

        {/* Perfil de usuario con dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{profile?.first_name} {profile?.last_name}</p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleDashboard}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Mi Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
        <Phone className="h-4 w-4 mr-2" />
        Emergencia
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onLogin}
        className="border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        <User className="h-4 w-4 mr-2" />
        Iniciar Sesión
      </Button>
      <Button 
        size="sm" 
        onClick={onLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Registrarse
      </Button>
    </>
  );
}
