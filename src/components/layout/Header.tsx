
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Heart } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import Navigation from "./header/Navigation";
import UserActions from "./header/UserActions";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, profile, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
  };

  const handleLogin = () => {
    navigate("/auth");
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

          {/* Desktop Navigation */}
          <Navigation isAuthenticated={isAuthenticated} />

          {/* Acciones del header */}
          <div className="flex items-center space-x-4">
            <UserActions
              isAuthenticated={isAuthenticated}
              user={user}
              profile={profile}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />

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
        <MobileMenu
          isMenuOpen={isMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
