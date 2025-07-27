import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Calendar, 
  FileText, 
  Download, 
  Video, 
  MessageSquare,
  Bot,
  Pill,
  Activity,
  Clock,
  MapPin,
  Phone,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const PatientDashboard = () => {
  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/dashboard/patient", active: true },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments", badge: "2" },
    { icon: FileText, label: "Medical History", href: "/patient/medical-history" },
    { icon: Pill, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: Download, label: "Download Reports", href: "/patient/reports" },
    { icon: Video, label: "Telemedicine", href: "/patient/telemedicine" },
    { icon: Bot, label: "AI Health Assistant", href: "/patient/ai-assistant" },
    { icon: MessageSquare, label: "Messages", href: "/patient/messages", badge: "1" },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "Today",
      time: "2:30 PM",
      type: "Follow-up",
      location: "Room 205",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Physician",
      date: "Tomorrow",
      time: "10:00 AM", 
      type: "Check-up",
      location: "Room 101",
      status: "confirmed"
    },
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      date: "March 15",
      time: "3:15 PM",
      type: "Consultation",
      location: "Room 308",
      status: "pending"
    }
  ];

  const healthMetrics = [
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      lastUpdated: "2 hours ago",
      icon: Heart
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal", 
      lastUpdated: "2 hours ago",
      icon: Activity
    },
    {
      title: "Weight",
      value: "68.5",
      unit: "kg",
      status: "normal",
      lastUpdated: "1 week ago",
      icon: TrendingUp
    },
    {
      title: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "normal",
      lastUpdated: "2 hours ago",
      icon: Activity
    }
  ];

  const recentReports = [
    {
      type: "Blood Test",
      date: "March 10, 2024",
      doctor: "Dr. Sarah Wilson",
      status: "Available",
      urgent: false
    },
    {
      type: "X-Ray Chest",
      date: "March 8, 2024", 
      doctor: "Dr. Michael Chen",
      status: "Available",
      urgent: false
    },
    {
      type: "ECG Report",
      date: "March 5, 2024",
      doctor: "Dr. Sarah Wilson", 
      status: "Available",
      urgent: true
    }
  ];

  const healthTips = [
    {
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily for optimal health.",
      category: "Wellness",
      priority: "medium"
    },
    {
      title: "Medication Reminder",
      description: "Don't forget to take your evening medication at 8 PM.",
      category: "Medication",
      priority: "high"
    },
    {
      title: "Exercise Routine",
      description: "30 minutes of walking can improve your cardiovascular health.",
      category: "Fitness",
      priority: "low"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getHealthStatus = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout
      title="Patient Portal"
      role="patient"
      userName="John Smith"
      userAvatar=""
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's your health summary for today</p>
          </div>
          <div className="flex gap-2">
            <Button variant="medical">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="ai">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-6 h-6 text-primary" />
                  {getHealthStatus(metric.status)}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value} <span className="text-sm font-normal text-muted-foreground">{metric.unit}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Updated {metric.lastUpdated}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>Your scheduled medical visits</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        <Stethoscope className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appointment.date} at {appointment.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      {getStatusBadge(appointment.status)}
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Recent Reports
                  </CardTitle>
                  <CardDescription>Your latest medical reports and results</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{report.type}</p>
                        <p className="text-sm text-muted-foreground">Dr. {report.doctor}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.urgent && (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                      <Badge variant="outline">{report.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips & AI Suggestions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Health Tips & Reminders
            </CardTitle>
            <CardDescription>Personalized recommendations for your wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {healthTips.map((tip, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border bg-muted/50 ${
                    tip.priority === "high" ? "border-warning bg-warning/10" :
                    tip.priority === "medium" ? "border-primary bg-primary/10" :
                    "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {tip.category}
                    </Badge>
                    {tip.priority === "high" && <AlertTriangle className="w-4 h-4 text-warning" />}
                  </div>
                  <h3 className="font-medium mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 text-center">
              <Button variant="ai">
                <Bot className="w-4 h-4 mr-2" />
                Chat with AI Health Assistant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common patient services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="w-6 h-6" />
                Book Appointment
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Pill className="w-6 h-6" />
                View Prescriptions
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Video className="w-6 h-6" />
                Telemedicine
              </Button>
              <Button variant="ai" className="h-20 flex-col gap-2">
                <Bot className="w-6 h-6" />
                AI Symptom Checker
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;