
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Admin Pages
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManagePatients from "./pages/admin/ManagePatients";
import Departments from "./pages/admin/Departments";
import StaffManagement from "./pages/admin/StaffManagement";
import BillingFinance from "./pages/admin/BillingFinance";
import FeedbackComplaints from "./pages/admin/FeedbackComplaints";
import AIReportsInsights from "./pages/admin/AIReportsInsights";
import SystemSettings from "./pages/admin/SystemSettings";
import Reports from "./pages/admin/Reports";

// Doctor Pages
import DoctorAppointments from "./pages/doctor/Appointments";
import PatientRecords from "./pages/doctor/PatientRecords";
import Prescriptions from "./pages/doctor/Prescriptions";
import DiagnosticRequests from "./pages/doctor/DiagnosticRequests";
import AIAssistance from "./pages/doctor/AIAssistance";
import VoiceNotes from "./pages/doctor/VoiceNotes";
import Telemedicine from "./pages/doctor/Telemedicine";

// Patient Pages
import BookAppointment from "./pages/patient/BookAppointment.tsx";
import PatientAppointments from "./pages/patient/Appointments";
import MedicalHistory from "./pages/patient/MedicalHistory";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import DownloadReports from "./pages/patient/DownloadReports";
import PatientTelemedicine from "./pages/patient/Telemedicine";
import AIHealthAssistant from "./pages/patient/AIHealthAssistant";
import PatientMessages from "./pages/patient/Messages";

// Pharmacy Pages
import PharmacyInventory from "./pages/pharmacy/Inventory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/doctors" element={<ManageDoctors />} />
          <Route path="/admin/patients" element={<ManagePatients />} />
          <Route path="/admin/departments" element={<Departments />} />
          <Route path="/admin/staff" element={<StaffManagement />} />
          <Route path="/admin/billing" element={<BillingFinance />} />
          <Route path="/admin/feedback" element={<FeedbackComplaints />} />
          <Route path="/admin/ai-reports" element={<AIReportsInsights />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/reports" element={<Reports />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/records" element={<PatientRecords />} />
          <Route path="/doctor/prescriptions" element={<Prescriptions />} />
          <Route path="/doctor/diagnostics" element={<DiagnosticRequests />} />
          <Route path="/doctor/ai-assistance" element={<AIAssistance />} />
          <Route path="/doctor/voice-notes" element={<VoiceNotes />} />
          <Route path="/doctor/telemedicine" element={<Telemedicine />} />
          
          {/* Patient Routes */}
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/appointments/book" element={<BookAppointment />} />
          <Route path="/patient/medical-history" element={<MedicalHistory />} />
          <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
          <Route path="/patient/reports" element={<DownloadReports />} />
          <Route path="/patient/telemedicine" element={<PatientTelemedicine />} />
          <Route path="/patient/ai-assistant" element={<AIHealthAssistant />} />
          <Route path="/patient/messages" element={<PatientMessages />} />
          
          {/* Pharmacy Routes */}
          <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
