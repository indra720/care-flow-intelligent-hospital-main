import { useParams } from "react-router-dom";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import PatientDashboard from "@/components/dashboards/PatientDashboard";
import ReceptionistDashboard from "@/components/dashboards/ReceptionistDashboard";
import PharmacistDashboard from "@/components/dashboards/PharmacistDashboard";
import LabDashboard from "@/components/dashboards/LabDashboard";

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "doctor":
        return <DoctorDashboard />;
      case "patient":
        return <PatientDashboard />;
      case "receptionist":
        return <ReceptionistDashboard />;
      case "pharmacist":
        return <PharmacistDashboard />;
      case "lab":
        return <LabDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return <div className="min-h-screen bg-background">{renderDashboard()}</div>;
};

export default Dashboard;