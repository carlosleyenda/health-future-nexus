
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();

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
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setShowMobileMenu(false)}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </Link>
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
