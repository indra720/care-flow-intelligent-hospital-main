import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Users, 
  Stethoscope, 
  Building2, 
  UserPlus, 
  CreditCard, 
  MessageSquare, 
  BarChart3,
  Settings,
  Brain,
  TrendingUp,
  TrendingDown,
  Heart,
  Bed,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard/admin", active: true },
    { icon: Stethoscope, label: "Manage Doctors", href: "/admin/doctors", badge: "12" },
    { icon: Users, label: "Manage Patients", href: "/admin/patients", badge: "847" },
    { icon: Building2, label: "Departments", href: "/admin/departments" },
    { icon: UserPlus, label: "Staff Management", href: "/admin/staff", badge: "45" },
    { icon: CreditCard, label: "Billing & Finance", href: "/admin/billing" },
    { icon: MessageSquare, label: "Feedback & Complaints", href: "/admin/feedback", badge: "3" },
    { icon: Brain, label: "AI Reports & Insights", href: "/admin/ai-insights" },
    { icon: Settings, label: "System Settings", href: "/admin/settings" },
  ];

  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Doctors",
      value: "124",
      change: "+3%", 
      trend: "up",
      icon: Stethoscope,
      color: "text-success"
    },
    {
      title: "Bed Occupancy",
      value: "89%",
      change: "+5%",
      trend: "up", 
      icon: Bed,
      color: "text-warning"
    },
    {
      title: "Revenue Today",
      value: "$48,250",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary"
    }
  ];

  const recentActivities = [
    {
      type: "appointment",
      title: "New appointment scheduled",
      description: "Dr. Sarah Wilson - Patient: John Doe",
      time: "2 minutes ago",
      status: "success"
    },
    {
      type: "admission",
      title: "Emergency admission", 
      description: "Patient admitted to ICU - Room 205",
      time: "15 minutes ago",
      status: "warning"
    },
    {
      type: "discharge",
      title: "Patient discharged",
      description: "Maria Garcia - Room 108",
      time: "1 hour ago", 
      status: "success"
    },
    {
      type: "alert",
      title: "Low inventory alert",
      description: "Paracetamol stock below minimum level",
      time: "2 hours ago",
      status: "error"
    }
  ];

  const departmentStats = [
    { name: "Emergency", patients: 23, capacity: 30, utilization: 77 },
    { name: "Cardiology", patients: 18, capacity: 25, utilization: 72 },
    { name: "Orthopedics", patients: 15, capacity: 20, utilization: 75 },
    { name: "Pediatrics", patients: 12, capacity: 18, utilization: 67 },
    { name: "Neurology", patients: 8, capacity: 12, utilization: 67 }
  ];

  return (
    <DashboardLayout
      title="Admin Dashboard"
      role="admin" 
      userName="Admin User"
      notifications={8}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hospital Overview</h1>
            <p className="text-muted-foreground">Monitor and manage your healthcare facility</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedPeriod("today")}>
              Today
            </Button>
            <Button variant="outline" onClick={() => setSelectedPeriod("week")}>
              This Week
            </Button>
            <Button variant="medical">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Utilization */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Department Utilization
              </CardTitle>
              <CardDescription>Current patient capacity across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {dept.patients}/{dept.capacity}
                      </span>
                    </div>
                    <Progress value={dept.utilization} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{dept.utilization}% occupied</span>
                      <Badge variant={dept.utilization > 80 ? "destructive" : dept.utilization > 60 ? "default" : "secondary"}>
                        {dept.utilization > 80 ? "High" : dept.utilization > 60 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest hospital activities and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`p-1 rounded-full ${
                      activity.status === "success" ? "bg-success/20" :
                      activity.status === "warning" ? "bg-warning/20" :
                      "bg-destructive/20"
                    }`}>
                      {activity.status === "success" ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : activity.status === "warning" ? (
                        <Clock className="w-4 h-4 text-warning" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UserPlus className="w-6 h-6" />
                Add New Doctor
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                Register Patient
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bed className="w-6 h-6" />
                Manage Beds
              </Button>
              <Button variant="ai" className="h-20 flex-col gap-2">
                <Brain className="w-6 h-6" />
                AI Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;