
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, MessageCircleQuestion } from "lucide-react";
import { toast } from "sonner";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Show toast notification
    toast.error('Página no encontrada', {
      description: `La página "${location.pathname}" no existe`,
      duration: 5000,
    });
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const popularPages = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Iniciar Sesión', path: '/auth', icon: MessageCircleQuestion },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <div className="text-6xl font-bold text-gray-900 mb-2">404</div>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Página No Encontrada
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleGoBack} 
              variant="outline" 
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Button 
              onClick={handleGoHome} 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Home className="h-4 w-4 mr-2" />
              Inicio
            </Button>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">Páginas populares:</p>
            <div className="space-y-2">
              {popularPages.map((page) => (
                <Button
                  key={page.path}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(page.path)}
                >
                  <page.icon className="h-4 w-4 mr-2" />
                  {page.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded-md">
            Ruta solicitada: <code className="font-mono">{location.pathname}</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
