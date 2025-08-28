import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const TopNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEscuelasOpen, setIsEscuelasOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Inicio", href: "/" },
    { 
      name: "Escuelas", 
      href: "/especialidades",
      hasDropdown: true,
      submenu: [
        { name: "Medicina", href: "/especialidades" },
        { name: "Enfermería", href: "/especialidades" },
        { name: "Odontología", href: "/especialidades" },
        { name: "Psicología", href: "/especialidades" }
      ]
    },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Corporativo", href: "/nosotros" },
    { name: "Promociones", href: "/servicios" },
    { name: "Validar", href: "/servicios" }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-800/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-slate-800/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-medical-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              MediCare
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsEscuelasOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsEscuelasOpen(false)}
              >
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center text-white hover:text-medical-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isEscuelasOpen ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && isEscuelasOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {item.submenu?.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleNavigation(subItem.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-medical-lighter hover:text-medical-primary transition-colors"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="text-white hover:text-medical-primary hover:bg-white/10"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  onClick={handleLogin}
                  className="bg-medical-primary hover:bg-medical-dark text-white border border-medical-primary"
                >
                  Aula Virtual
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-medical-primary hover:bg-medical-dark text-white"
              >
                Dashboard
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-medical-primary hover:bg-white/10"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;