
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { User as UserType } from '@/types';

interface MobileMenuProps {
  isMenuOpen: boolean;
  isAuthenticated: boolean;
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onMenuClose: () => void;
}

export default function MobileMenu({ 
  isMenuOpen, 
  isAuthenticated, 
  user, 
  onLogin, 
  onLogout, 
  onMenuClose 
}: MobileMenuProps) {
  const navigate = useNavigate();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Especialidades", href: "/especialidades" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" }
  ];

  const handleDashboard = () => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  };

  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
        {isAuthenticated && user ? (
          // Menú móvil para usuarios autenticados
          <>
            <div className="px-3 py-2 border-b border-gray-200 mb-2">
              <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <button
              onClick={() => {
                handleDashboard();
                onMenuClose();
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Mi Dashboard
            </button>
            <button
              onClick={() => {
                navigate('/profile');
                onMenuClose();
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Mi Perfil
            </button>
            <button
              onClick={() => {
                onLogout();
                onMenuClose();
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          // Menú móvil para usuarios no autenticados
          <>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-2 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  onLogin();
                  onMenuClose();
                }}
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <User className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  onLogin();
                  onMenuClose();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Registrarse
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                <Phone className="h-4 w-4 mr-2" />
                Emergencia 24/7
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
