
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthPage } from "./pages/auth/AuthPage";
import MainLayout from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuthStore } from "@/store/auth";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { DoctorDashboard } from "@/components/dashboard/DoctorDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import UserProfile from "@/components/profile/UserProfile";
import HealthMonitoring from "@/components/health/HealthMonitoring";
import ConsultationRoom from "@/components/consultation/ConsultationRoom";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Retry up to 3 times for network errors
        if (failureCount < 3 && error?.message?.includes('fetch')) {
          return true;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Public Route wrapper - redirects to appropriate dashboard if authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            {/* Public routes with header/footer */}
            <Route path="/" element={
              <PublicRoute>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Index />
                  </main>
                  <Footer />
                </div>
              </PublicRoute>
            } />
            
            <Route path="/auth" element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } />
            
            {/* Protected dashboard routes */}
            <Route path="/patient/dashboard" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<PatientDashboard />} />
            </Route>
            
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DoctorDashboard />} />
            </Route>
            
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
            </Route>
            
            {/* Profile route - accessible by all authenticated users */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<UserProfile />} />
            </Route>
            
            {/* Consultation room - full screen */}
            <Route path="/consultation/:appointmentId" element={
              <ProtectedRoute allowedRoles={['patient', 'doctor']}>
                <ConsultationRoom 
                  appointmentId={window.location.pathname.split('/')[2]} 
                  userId={useAuthStore.getState().user?.id || ''} 
                  userRole={useAuthStore.getState().user?.role as 'patient' | 'doctor' || 'patient'} 
                />
              </ProtectedRoute>
            } />
            
            {/* Additional protected routes */}
            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={['patient', 'doctor']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Appointments Page</div>} />
            </Route>
            
            <Route path="/consultations" element={
              <ProtectedRoute allowedRoles={['patient', 'doctor']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Consultations Page</div>} />
            </Route>
            
            <Route path="/health" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<HealthMonitoring />} />
            </Route>
            
            <Route path="/medical-history" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Medical History</div>} />
            </Route>
            
            <Route path="/payments" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Payments</div>} />
            </Route>
            
            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Patients Management</div>} />
            </Route>
            
            <Route path="/schedule" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Doctor Schedule</div>} />
            </Route>
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<div>Admin Panel</div>} />
            </Route>
            
            {/* Compatibility redirects for old dashboard route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigate to={`/${useAuthStore.getState().user?.role}/dashboard`} replace />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
