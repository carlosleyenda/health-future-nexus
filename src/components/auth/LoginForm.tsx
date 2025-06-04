
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, Heart } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setLoading } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    try {
      // Simulamos autenticación (aquí iría la integración con Supabase)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos diferentes tipos de usuarios para demostración
      const currentTime = new Date().toISOString();
      const mockUsers = {
        "paciente@test.com": { 
          id: "1", 
          email: "paciente@test.com", 
          firstName: "Juan",
          lastName: "Pérez",
          role: "patient" as const,
          phone: "+52 555 0123",
          avatarUrl: null,
          isActive: true,
          onboardingCompleted: true,
          createdAt: currentTime,
          updatedAt: currentTime
        },
        "doctor@test.com": { 
          id: "2", 
          email: "doctor@test.com", 
          firstName: "María",
          lastName: "García",
          role: "doctor" as const,
          phone: "+52 555 0456",
          avatarUrl: null,
          isActive: true,
          onboardingCompleted: true,
          createdAt: currentTime,
          updatedAt: currentTime
        },
        "admin@test.com": { 
          id: "3", 
          email: "admin@test.com", 
          firstName: "Carlos",
          lastName: "Admin",
          role: "admin" as const,
          phone: "+52 555 0789",
          avatarUrl: null,
          isActive: true,
          onboardingCompleted: true,
          createdAt: currentTime,
          updatedAt: currentTime
        }
      };

      const user = mockUsers[data.email as keyof typeof mockUsers];
      
      if (user && data.password === "123456") {
        setUser(user);
        toast.success(`¡Bienvenido ${user.firstName} ${user.lastName}!`, {
          description: `Has iniciado sesión como ${user.role === 'patient' ? 'Paciente' : user.role === 'doctor' ? 'Doctor' : 'Administrador'}`
        });
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión", {
        description: "Verifica tus credenciales. Usa: paciente@test.com, doctor@test.com o admin@test.com con contraseña: 123456"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-10 w-10 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Recordar mi sesión
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="text-sm">
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
              <p className="font-medium mb-1">Cuentas de prueba:</p>
              <p>• paciente@test.com (Paciente)</p>
              <p>• doctor@test.com (Doctor)</p>
              <p>• admin@test.com (Admin)</p>
              <p className="mt-1">Contraseña: <span className="font-mono">123456</span></p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-600 hover:text-blue-500"
                onClick={onToggleMode}
              >
                Regístrate aquí
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
