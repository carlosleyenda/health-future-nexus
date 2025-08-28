
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { AuthPage } from '@/pages/auth/AuthPage';
import DemoAccessPage from '@/pages/demo/DemoAccess';
import Settings from '@/pages/Settings';
import DoctorSchedulePage from '@/pages/DoctorSchedule';
import DoctorPatientsPage from '@/pages/DoctorPatients';
import DoctorFinancialsPage from '@/pages/DoctorFinancials';

// Dashboard pages
import PatientDashboard from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

// New pages
import ChatPage from '@/pages/Chat';
import NotificationsPage from '@/pages/Notifications';
import ProfilePage from '@/pages/Profile';
import AdminPage from '@/pages/AdminPage';
import UsersManagementPage from '@/pages/UsersManagement';
import AnalyticsPage from '@/pages/Analytics';
import AppointmentsPage from '@/pages/Appointments';
import ConsultationsPage from '@/pages/Consultations';
import HealthPage from '@/pages/Health';
import PharmacyPage from '@/pages/Pharmacy';
import MedicalRecordsPage from '@/pages/MedicalRecords';
import AIAssistantPage from '@/pages/AIAssistant';
import DeliveryPage from '@/pages/Delivery';
import PaymentsPage from '@/pages/Payments';
import PricingPage from '@/pages/Pricing';
import MarketplacePage from '@/pages/Marketplace';
import ExecutiveDashboard from '@/pages/ExecutiveDashboard';
import ReferralsPage from '@/pages/Referrals';
import MedicationsPage from '@/pages/Medications';
import DevicesPage from '@/pages/Devices';
import EmergencyPage from '@/pages/Emergency';
import EnterpriseDashboard from '@/pages/EnterpriseDashboard';
import PharmacyPartnerDashboard from '@/pages/PharmacyPartnerDashboard';
import HomeDoctorPage from '@/pages/HomeDoctorPage';

// Public pages
import Nosotros from '@/pages/public/Nosotros';
import Servicios from '@/pages/public/Servicios';
import Especialidades from '@/pages/public/Especialidades';
import Contacto from '@/pages/public/Contacto';

// Blog pages
import BlogIndex from '@/pages/blog/BlogIndex';
import NoticiasMedicas from '@/pages/blog/NoticiasMedicas';
import ConsejosSalud from '@/pages/blog/ConsejosSalud';
import CasosExito from '@/pages/blog/CasosExito';
import InvestigacionMedica from '@/pages/blog/InvestigacionMedica';

// Service pages
import ConsultasMedicas from '@/pages/services/ConsultasMedicas';
import Telemedicina from '@/pages/services/Telemedicina';
import Laboratorio from '@/pages/services/Laboratorio';
import FarmaciaVirtual from '@/pages/services/FarmaciaVirtual';
import EmergenciasMedicas from '@/pages/services/EmergenciasMedicas';

// Blog article pages
import InteligenciaArtificialDiagnostico from '@/pages/blog/articles/InteligenciaArtificialDiagnostico';
import TerapiaGenica from '@/pages/blog/articles/TerapiaGenica';
import SuperalimentosDieta from '@/pages/blog/articles/SuperalimentosDieta';
import RutinaEjercicios from '@/pages/blog/articles/RutinaEjercicios';
import RecuperacionInfarto from '@/pages/blog/articles/RecuperacionInfarto';
import TerapiasCarT from '@/pages/blog/articles/TerapiasCarT';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/demo" element={<DemoAccessPage />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/especialidades" element={<Especialidades />} />
      <Route path="/contacto" element={<Contacto />} />
      
      {/* Blog routes */}
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/noticias-medicas" element={<NoticiasMedicas />} />
      <Route path="/blog/consejos-salud" element={<ConsejosSalud />} />
      <Route path="/blog/casos-exito" element={<CasosExito />} />
      <Route path="/blog/investigacion-medica" element={<InvestigacionMedica />} />
      
      {/* Service routes */}
      <Route path="/servicios/consultas" element={<ConsultasMedicas />} />
      <Route path="/servicios/telemedicina" element={<Telemedicina />} />
      <Route path="/servicios/laboratorio" element={<Laboratorio />} />
      <Route path="/servicios/farmacia-virtual" element={<FarmaciaVirtual />} />
      <Route path="/servicios/emergencias" element={<EmergenciasMedicas />} />
      
      {/* Individual Articles */}
      <Route path="/blog/inteligencia-artificial-diagnostico" element={<InteligenciaArtificialDiagnostico />} />
      <Route path="/blog/terapia-genica" element={<TerapiaGenica />} />
      <Route path="/blog/superalimentos-dieta" element={<SuperalimentosDieta />} />
      <Route path="/blog/rutina-ejercicios" element={<RutinaEjercicios />} />
      <Route path="/blog/recuperacion-infarto" element={<RecuperacionInfarto />} />
      <Route path="/blog/terapias-car-t" element={<TerapiasCarT />} />

      {/* Protected routes with layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Common routes */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/consultations" element={<ConsultationsPage />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/home-doctor" element={<HomeDoctorPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/medications" element={<MedicationsPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/enterprise" element={<EnterpriseDashboard />} />
        <Route path="/pharmacy-dashboard" element={<PharmacyPartnerDashboard />} />
        <Route path="/executive" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ExecutiveDashboard />
          </ProtectedRoute>
        } />

        {/* Patient-specific routes */}
        <Route path="/health" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <HealthPage />
          </ProtectedRoute>
        } />

        {/* Doctor-specific routes */}
        <Route path="/patients" element={
          <ProtectedRoute allowedRoles={['doctor', 'specialist']}>
            <DoctorPatientsPage />
          </ProtectedRoute>
        } />
        <Route path="/schedule" element={
          <ProtectedRoute allowedRoles={['doctor', 'specialist']}>
            <DoctorSchedulePage />
          </ProtectedRoute>
        } />
        <Route path="/doctor/financials" element={
          <ProtectedRoute allowedRoles={['doctor', 'specialist']}>
            <DoctorFinancialsPage />
          </ProtectedRoute>
        } />

        {/* Admin-specific routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <UsersManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <AnalyticsPage />
          </ProtectedRoute>
        } />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
