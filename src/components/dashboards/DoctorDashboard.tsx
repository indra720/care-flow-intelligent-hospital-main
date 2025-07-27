import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  FileText, 
  Pill, 
  Brain, 
  Mic,
  Clock,
  Heart,
  Activity,
  UserCheck,
  MessageSquare,
  Video,
  Phone,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const DoctorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/dashboard/doctor", active: true },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments", badge: "8" },
    { icon: Users, label: "Patient Records", href: "/doctor/records" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: Heart, label: "Diagnostic Requests", href: "/doctor/diagnostics", badge: "2" },
    { icon: Brain, label: "AI Assistance", href: "/doctor/ai-assistance" },
    { icon: Mic, label: "Voice Notes", href: "/doctor/voice-notes" },
    { icon: Video, label: "Telemedicine", href: "/doctor/telemedicine", badge: "3" },
  ];

  const todayAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      type: "Check-up",
      status: "completed",
      avatar: "",
      condition: "Hypertension follow-up"
    },
    {
      id: 2,
      patient: "Michael Brown",
      time: "10:30 AM", 
      type: "Consultation",
      status: "in-progress",
      avatar: "",
      condition: "Chest pain"
    },
    {
      id: 3,
      patient: "Emily Davis",
      time: "11:15 AM",
      type: "Follow-up",
      status: "waiting",
      avatar: "",
      condition: "Diabetes management"
    },
    {
      id: 4,
      patient: "James Wilson",
      time: "02:00 PM",
      type: "Emergency",
      status: "urgent",
      avatar: "",
      condition: "Acute abdominal pain"
    },
    {
      id: 5,
      patient: "Lisa Garcia",
      time: "03:30 PM",
      type: "Consultation",
      status: "scheduled",
      avatar: "",
      condition: "Migraine consultation"
    }
  ];

  const patientStats = [
    {
      title: "Today's Appointments",
      value: "8",
      subtitle: "2 completed",
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Patients Seen",
      value: "156",
      subtitle: "This month",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Prescriptions",
      value: "23",
      subtitle: "This week",
      icon: Pill,
      color: "text-warning"
    },
    {
      title: "AI Insights",
      value: "4",
      subtitle: "Pending review",
      icon: Brain,
      color: "text-primary"
    }
  ];

  const aiInsights = [
    {
      type: "risk-alert",
      title: "High Risk Patient Alert",
      patient: "Robert Chen",
      message: "Patient shows elevated cardiac risk markers. Consider ECG and cardiac enzymes.",
      severity: "high",
      time: "2 hours ago"
    },
    {
      type: "suggestion",
      title: "Treatment Suggestion", 
      patient: "Maria Rodriguez",
      message: "Based on symptoms, consider testing for thyroid dysfunction.",
      severity: "medium",
      time: "4 hours ago"
    },
    {
      type: "drug-interaction",
      title: "Drug Interaction Warning",
      patient: "John Smith",
      message: "Potential interaction between prescribed medications. Review dosages.",
      severity: "high",
      time: "6 hours ago"
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
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "medium":
        return <TrendingUp className="w-4 h-4 text-warning" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-success" />;
    }
  };

  return (
    <DashboardLayout
      title="Doctor Portal"
      role="doctor"
      userName="Dr. Alex Morgan"
      userAvatar=""
      notifications={5}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Good morning, Dr. Morgan</h1>
            <p className="text-muted-foreground">You have 8 appointments scheduled for today</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ai">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
            <Button variant="outline">
              <Mic className="w-4 h-4 mr-2" />
              Voice Notes
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {patientStats.map((stat, index) => (
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
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={appointment.avatar} />
                          <AvatarFallback>
                            {appointment.patient.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.condition}</p>
                          <p className="text-xs text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </p>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        {appointment.status === "urgent" && (
                          <Button variant="emergency" size="sm">
                            <Video className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Panel */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>AI-powered medical assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/50 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(insight.severity)}
                        <p className="font-medium text-sm">{insight.title}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {insight.time}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-primary">
                      Patient: {insight.patient}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {insight.message}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Review
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Button variant="ai" className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Access Full AI Suite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used medical functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="w-6 h-6" />
                New Prescription
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Heart className="w-6 h-6" />
                Order Lab Test
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                Patient History
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Video className="w-6 h-6" />
                Telemedicine
              </Button>
              <Button variant="ai" className="h-20 flex-col gap-2">
                <Brain className="w-6 h-6" />
                AI Diagnosis
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Mic className="w-6 h-6" />
                Voice Note
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;