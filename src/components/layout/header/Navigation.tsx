
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  isAuthenticated: boolean;
}

export default function Navigation({ isAuthenticated }: NavigationProps) {
  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Especialidades", href: "/especialidades" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" }
  ];

  if (isAuthenticated) {
    return null;
  }

  return (
    <nav className="hidden md:flex space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
