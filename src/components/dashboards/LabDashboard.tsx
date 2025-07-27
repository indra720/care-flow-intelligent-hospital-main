import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Clipboard, 
  TestTube, 
  Upload, 
  Bell,
  Brain,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Microscope,
  Activity,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

const LabDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/dashboard/lab", active: true },
    { icon: TestTube, label: "Diagnostic Tests", href: "/lab/tests", badge: "12" },
    { icon: Upload, label: "Upload Reports", href: "/lab/upload" },
    { icon: Bell, label: "Notify Patients", href: "/lab/notifications", badge: "6" },
    { icon: Brain, label: "AI Analysis", href: "/lab/ai-analysis" },
    { icon: FileText, label: "Test Results", href: "/lab/results" },
    { icon: Microscope, label: "Equipment Status", href: "/lab/equipment" },
    { icon: Users, label: "Patient Queue", href: "/lab/queue", badge: "8" },
  ];

  const labStats = [
    {
      title: "Pending Tests",
      value: "24",
      subtitle: "Awaiting processing",
      icon: TestTube,
      color: "text-warning"
    },
    {
      title: "Completed Today",
      value: "156",
      subtitle: "Tests processed",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Critical Results",
      value: "3",
      subtitle: "Require attention",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Equipment Active",
      value: "18/20",
      subtitle: "Machines operational",
      icon: Microscope,
      color: "text-primary"
    }
  ];

  const pendingTests = [
    {
      id: "LAB001",
      patientName: "Sarah Johnson",
      patientId: "P001234",
      testType: "Complete Blood Count",
      doctor: "Dr. Alex Morgan",
      priority: "urgent",
      sampleTime: "08:30 AM",
      expectedTime: "2 hours",
      status: "processing"
    },
    {
      id: "LAB002",
      patientName: "Michael Chen",
      patientId: "P001235",
      testType: "Lipid Profile",
      doctor: "Dr. Sarah Wilson",
      priority: "normal",
      sampleTime: "09:15 AM",
      expectedTime: "4 hours",
      status: "pending"
    },
    {
      id: "LAB003",
      patientName: "Emily Davis",
      patientId: "P001236",
      testType: "Liver Function Test",
      doctor: "Dr. Michael Brown",
      priority: "urgent",
      sampleTime: "10:00 AM",
      expectedTime: "3 hours",
      status: "processing"
    },
    {
      id: "LAB004",
      patientName: "James Wilson",
      patientId: "P001237",
      testType: "Thyroid Function",
      doctor: "Dr. Emily Rodriguez",
      priority: "normal",
      sampleTime: "10:45 AM",
      expectedTime: "6 hours",
      status: "ready"
    }
  ];

  const criticalResults = [
    {
      patientName: "Robert Chen",
      testType: "Cardiac Enzymes",
      abnormalValues: ["Troponin I: 15.2 ng/mL (Normal: <0.04)"],
      severity: "critical",
      doctor: "Dr. Sarah Wilson",
      time: "30 minutes ago",
      notified: false
    },
    {
      patientName: "Maria Garcia",
      testType: "Blood Glucose",
      abnormalValues: ["Glucose: 450 mg/dL (Normal: 70-100)"],
      severity: "high",
      doctor: "Dr. Alex Morgan",
      time: "1 hour ago",
      notified: true
    },
    {
      patientName: "David Smith",
      testType: "Hemoglobin",
      abnormalValues: ["Hb: 5.2 g/dL (Normal: 13.5-17.5)"],
      severity: "critical",
      doctor: "Dr. Michael Brown",
      time: "2 hours ago",
      notified: false
    }
  ];

  const equipmentStatus = [
    {
      name: "Automated Chemistry Analyzer",
      status: "operational",
      utilization: 85,
      nextMaintenance: "March 20, 2024",
      testsToday: 145
    },
    {
      name: "Hematology Analyzer",
      status: "operational",
      utilization: 92,
      nextMaintenance: "March 18, 2024",
      testsToday: 89
    },
    {
      name: "Immunoassay Analyzer",
      status: "maintenance",
      utilization: 0,
      nextMaintenance: "Today",
      testsToday: 0
    },
    {
      name: "Microscopy Station 1",
      status: "operational",
      utilization: 45,
      nextMaintenance: "March 25, 2024",
      testsToday: 23
    }
  ];

  const aiInsights = [
    {
      type: "anomaly-detection",
      title: "Unusual Pattern Detected",
      message: "Patient's liver enzymes show unusual elevation pattern. Consider hepatitis panel.",
      patient: "Jennifer Davis",
      severity: "high",
      confidence: 94
    },
    {
      type: "quality-control",
      title: "Quality Control Alert",
      message: "Chemistry analyzer showing drift in glucose measurements. Recalibration recommended.",
      equipment: "Chemistry Analyzer #2",
      severity: "medium",
      confidence: 87
    },
    {
      type: "prediction",
      title: "High Volume Prediction",
      message: "Expected 40% increase in CBC requests tomorrow based on admission patterns.",
      department: "Hematology",
      severity: "low",
      confidence: 78
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return <Badge className="bg-primary text-primary-foreground">Processing</Badge>;
      case "ready":
        return <Badge className="bg-success text-success-foreground">Ready</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-emergency text-emergency-foreground animate-pulse-glow">Urgent</Badge>;
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "normal":
        return <Badge variant="secondary">Normal</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getEquipmentStatus = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-success text-success-foreground">Operational</Badge>;
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      case "offline":
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "medium":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  return (
    <DashboardLayout
      title="Laboratory Management"
      role="lab"
      userName="Dr. Lisa Zhang"
      userAvatar=""
      notifications={9}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Laboratory Dashboard</h1>
            <p className="text-muted-foreground">Manage diagnostic tests and analyze results</p>
          </div>
          <div className="flex gap-2">
            <Button variant="medical">
              <Upload className="w-4 h-4 mr-2" />
              Upload Results
            </Button>
            <Button variant="ai">
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {labStats.map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tests Queue */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-primary" />
                    Test Queue
                  </CardTitle>
                  <CardDescription>Tests awaiting processing and completion</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TestTube className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{test.patientName}</p>
                        <Badge variant="outline" className="text-xs">
                          {test.id}
                        </Badge>
                        {getPriorityBadge(test.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">{test.testType}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Sample: {test.sampleTime}
                        </span>
                        <span>ETA: {test.expectedTime}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      {getStatusBadge(test.status)}
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          Process
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Results */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Critical Results
              </CardTitle>
              <CardDescription>Abnormal values requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.severity === "critical" ? "border-destructive bg-destructive/10" : "border-warning bg-warning/10"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(result.severity)}
                        <p className="font-medium text-sm">{result.patientName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!result.notified ? (
                          <Badge variant="destructive" className="text-xs">
                            Not Notified
                          </Badge>
                        ) : (
                          <Badge className="bg-success text-success-foreground text-xs">
                            Notified
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {result.time}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-2">{result.testType}</p>
                    <div className="space-y-1 mb-3">
                      {result.abnormalValues.map((value, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground font-mono">
                          {value}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Ordering Doctor: {result.doctor}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant={result.notified ? "outline" : "emergency"} 
                        size="sm" 
                        className="flex-1"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        {result.notified ? "Re-notify" : "Notify Doctor"}
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Status */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="w-5 h-5 text-primary" />
              Equipment Status
            </CardTitle>
            <CardDescription>Real-time status of laboratory equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {equipmentStatus.map((equipment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{equipment.name}</h3>
                    {getEquipmentStatus(equipment.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization:</span>
                      <span className="font-medium">{equipment.utilization}%</span>
                    </div>
                    <Progress value={equipment.utilization} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Tests Today:</span>
                      <span>{equipment.testsToday}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Next Maintenance:</span>
                      <span>{equipment.nextMaintenance}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitor
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI-Powered Lab Insights
            </CardTitle>
            <CardDescription>Smart analysis and quality control recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-muted/50 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(insight.severity)}
                      <p className="font-medium text-sm">{insight.title}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confident
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.message}</p>
                  {insight.patient && (
                    <p className="text-xs font-medium text-primary">
                      Patient: {insight.patient}
                    </p>
                  )}
                  {insight.equipment && (
                    <p className="text-xs font-medium text-primary">
                      Equipment: {insight.equipment}
                    </p>
                  )}
                  <Button variant="ai" size="sm" className="w-full">
                    Review Analysis
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-4 text-center">
              <Button variant="ai">
                <Brain className="w-4 h-4 mr-2" />
                Access Full AI Diagnostic Suite
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common laboratory functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TestTube className="w-6 h-6" />
                Process Sample
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Upload className="w-6 h-6" />
                Upload Results
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bell className="w-6 h-6" />
                Notify Doctor
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Microscope className="w-6 h-6" />
                Equipment Check
              </Button>
              <Button variant="ai" className="h-20 flex-col gap-2">
                <Brain className="w-6 h-6" />
                AI Analysis
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="w-6 h-6" />
                Quality Control
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LabDashboard;