
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Menu, X, Stethoscope } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import Navigation from "./header/Navigation";
import UserActions from "./header/UserActions";
import MobileMenu from "./header/MobileMenu";
import { useState } from "react";

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
    <header className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold text-professional">MediCare</span>
              <Badge variant="outline" className="ml-2 hidden sm:inline-flex bg-medical-lighter text-medical-primary border-medical-light text-xs">
                Pro
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <Navigation isAuthenticated={isAuthenticated} />

          {/* Actions */}
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
                className="text-professional"
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
