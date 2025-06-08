
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Heart, User, Calendar, Phone, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Especialidades", href: "/especialidades" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" }
  ];

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleDashboard = () => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">Clínica Virtual</span>
            <Badge variant="outline" className="hidden sm:inline-flex bg-green-100 text-green-800 border-green-200">
              Premium
            </Badge>
          </div>

          {/* Desktop Navigation - Solo para usuarios no autenticados */}
          {!isAuthenticated && (
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}

          {/* Acciones del header */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              // Usuario autenticado
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
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
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
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // Usuario no autenticado
              <>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergencia
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogin}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Registrarse
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
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
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Mi Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
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
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Iniciar Sesión
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
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
        )}
      </div>
    </header>
  );
};

export default Header;
