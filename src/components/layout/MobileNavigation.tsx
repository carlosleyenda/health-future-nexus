
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

interface MobileNavigationProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  navigationItems: Array<{ label: string; path: string; roles: string[] }>;
}

export default function MobileNavigation({
  showMobileMenu,
  setShowMobileMenu,
  navigationItems
}: MobileNavigationProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const handleLogout = () => {
    logout();
  };

  if (!showMobileMenu) {
    return null;
  }

  return (
    <div className="lg:hidden border-t bg-white">
      <div className="px-4 py-2 space-y-1">
        {filteredNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setShowMobileMenu(false);
            }}
            className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
