import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  UserCheck, 
  Calendar, 
  Bed, 
  UserPlus, 
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  Activity
} from "lucide-react";

const ReceptionistDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/dashboard/receptionist", active: true },
    { icon: UserPlus, label: "Register Patient", href: "/receptionist/register" },
    { icon: Calendar, label: "Manage Appointments", href: "/receptionist/appointments", badge: "15" },
    { icon: Bed, label: "Bed Management", href: "/receptionist/beds", badge: "3" },
    { icon: Users, label: "Patient Admission", href: "/receptionist/admission" },
    { icon: FileText, label: "Patient Discharge", href: "/receptionist/discharge" },
    { icon: CreditCard, label: "Billing", href: "/receptionist/billing" },
    { icon: Phone, label: "Emergency Desk", href: "/receptionist/emergency", badge: "2" },
  ];

  const todayStats = [
    {
      title: "New Registrations",
      value: "12",
      subtitle: "Today",
      icon: UserPlus,
      color: "text-success"
    },
    {
      title: "Appointments",
      value: "48",
      subtitle: "Scheduled today",
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Available Beds",
      value: "15",
      subtitle: "Out of 120",
      icon: Bed,
      color: "text-warning"
    },
    {
      title: "Pending Admissions",
      value: "6",
      subtitle: "Waiting",
      icon: Users,
      color: "text-destructive"
    }
  ];

  const appointmentQueue = [
    {
      id: 1,
      patientName: "Alice Johnson",
      patientId: "P001234",
      doctor: "Dr. Sarah Wilson",
      time: "09:00 AM",
      type: "Check-up",
      status: "waiting",
      phone: "+1 234-567-8901"
    },
    {
      id: 2,
      patientName: "Robert Chen",
      patientId: "P001235", 
      doctor: "Dr. Michael Brown",
      time: "09:30 AM",
      type: "Follow-up",
      status: "in-progress",
      phone: "+1 234-567-8902"
    },
    {
      id: 3,
      patientName: "Maria Garcia",
      patientId: "P001236",
      doctor: "Dr. Emily Davis",
      time: "10:00 AM", 
      type: "Consultation",
      status: "completed",
      phone: "+1 234-567-8903"
    },
    {
      id: 4,
      patientName: "James Wilson",
      patientId: "P001237",
      doctor: "Dr. Alex Morgan",
      time: "10:30 AM",
      type: "Emergency",
      status: "urgent",
      phone: "+1 234-567-8904"
    }
  ];

  const bedStatus = [
    {
      ward: "General Ward A",
      total: 30,
      occupied: 25,
      available: 5,
      utilization: 83
    },
    {
      ward: "General Ward B", 
      total: 30,
      occupied: 22,
      available: 8,
      utilization: 73
    },
    {
      ward: "ICU",
      total: 15,
      occupied: 14,
      available: 1,
      utilization: 93
    },
    {
      ward: "Emergency",
      total: 20,
      occupied: 12,
      available: 8,
      utilization: 60
    },
    {
      ward: "Pediatrics",
      total: 25,
      occupied: 18,
      available: 7,
      utilization: 72
    }
  ];

  const pendingTasks = [
    {
      type: "admission",
      title: "Patient Admission",
      patient: "Jennifer Davis",
      priority: "high",
      time: "2 minutes ago",
      description: "Emergency admission - Room assignment needed"
    },
    {
      type: "discharge",
      title: "Discharge Processing",
      patient: "Michael Johnson",
      priority: "medium",
      time: "15 minutes ago", 
      description: "Final billing and paperwork completion"
    },
    {
      type: "appointment",
      title: "Appointment Rescheduling",
      patient: "Sarah Wilson",
      priority: "low",
      time: "1 hour ago",
      description: "Patient requested to reschedule appointment"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
      case "waiting":
        return <Badge variant="outline">Waiting</Badge>;
      case "urgent":
        return <Badge className="bg-emergency text-emergency-foreground animate-pulse-glow">Urgent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-destructive bg-destructive/10";
      case "medium":
        return "border-warning bg-warning/10";
      case "low":
        return "border-border bg-muted/50";
      default:
        return "border-border bg-muted/50";
    }
  };

  const getBedUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-destructive";
    if (utilization >= 75) return "text-warning";
    return "text-success";
  };

  return (
    <DashboardLayout
      title="Reception Desk"
      role="receptionist"
      userName="Lisa Martinez"
      userAvatar=""
      notifications={7}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reception Dashboard</h1>
            <p className="text-muted-foreground">Manage patient flow and hospital operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="medical">
              <UserPlus className="w-4 h-4 mr-2" />
              Register Patient
            </Button>
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Emergency Desk
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {todayStats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment Queue */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Today's Appointment Queue
                    </CardTitle>
                    <CardDescription>Current patient appointments status</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search patients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointmentQueue.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{appointment.patientName}</p>
                            <Badge variant="outline" className="text-xs">
                              {appointment.patientId}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {appointment.time}
                            </span>
                            <span>{appointment.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        {getStatusBadge(appointment.status)}
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                          {appointment.status === "urgent" && (
                            <Button variant="emergency" size="sm">
                              Priority
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Tasks */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Pending Tasks
              </CardTitle>
              <CardDescription>Urgent actions required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {task.priority === "high" ? (
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        ) : task.priority === "medium" ? (
                          <Clock className="w-4 h-4 text-warning" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                        <p className="font-medium text-sm">{task.title}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.time}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-primary mb-1">
                      Patient: {task.patient}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {task.description}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Handle
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Later
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bed Management */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-primary" />
              Bed Availability
            </CardTitle>
            <CardDescription>Real-time bed status across all wards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {bedStatus.map((ward, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{ward.ward}</h3>
                    <Badge 
                      variant={ward.utilization >= 90 ? "destructive" : ward.utilization >= 75 ? "default" : "secondary"}
                    >
                      {ward.utilization}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Occupied:</span>
                      <span className="font-medium">{ward.occupied}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className={`font-medium ${getBedUtilizationColor(ward.utilization)}`}>
                        {ward.available}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span className="font-medium">{ward.total}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Assign Bed
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common reception desk functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UserPlus className="w-6 h-6" />
                New Patient
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="w-6 h-6" />
                Book Appointment
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bed className="w-6 h-6" />
                Assign Bed
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                Patient Admission
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="w-6 h-6" />
                Discharge
              </Button>
              <Button variant="emergency" className="h-20 flex-col gap-2">
                <Phone className="w-6 h-6" />
                Emergency
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReceptionistDashboard;