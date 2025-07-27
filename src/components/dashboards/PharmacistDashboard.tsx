import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Pill, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Brain,
  Search,
  Clock,
  CheckCircle,
  FileText,
  BarChart3,
  Activity,
  Truck
} from "lucide-react";

const PharmacistDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/dashboard/pharmacist", active: true },
    { icon: Package, label: "Inventory Management", href: "/pharmacy/inventory", badge: "5" },
    { icon: ShoppingCart, label: "Medicine Orders", href: "/pharmacy/orders", badge: "12" },
    { icon: FileText, label: "Process Prescriptions", href: "/pharmacy/prescriptions", badge: "8" },
    { icon: Brain, label: "AI Stock Prediction", href: "/pharmacy/ai-stock" },
    { icon: BarChart3, label: "Sales Reports", href: "/pharmacy/reports" },
    { icon: Truck, label: "Supplier Management", href: "/pharmacy/suppliers" },
    { icon: AlertTriangle, label: "Alerts & Expiry", href: "/pharmacy/alerts", badge: "3" },
  ];

  const pharmacyStats = [
    {
      title: "Pending Prescriptions",
      value: "23",
      subtitle: "Awaiting processing",
      icon: FileText,
      color: "text-warning"
    },
    {
      title: "Low Stock Items",
      value: "8",
      subtitle: "Need reordering",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Daily Sales",
      value: "$2,450",
      subtitle: "+15% from yesterday",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Inventory Value",
      value: "$125,000",
      subtitle: "Current stock worth",
      icon: Package,
      color: "text-primary"
    }
  ];

  const lowStockItems = [
    {
      medicine: "Paracetamol 500mg",
      currentStock: 25,
      minStock: 100,
      expiryDate: "2024-08-15",
      supplier: "MedSupply Co.",
      urgency: "high"
    },
    {
      medicine: "Amoxicillin 250mg",
      currentStock: 45,
      minStock: 80,
      expiryDate: "2024-09-20",
      supplier: "PharmaCorp",
      urgency: "medium"
    },
    {
      medicine: "Insulin Glargine",
      currentStock: 12,
      minStock: 30,
      expiryDate: "2024-07-30",
      supplier: "BioMed Inc.",
      urgency: "high"
    },
    {
      medicine: "Metformin 1000mg",
      currentStock: 55,
      minStock: 75,
      expiryDate: "2024-10-12",
      supplier: "HealthSupply",
      urgency: "low"
    }
  ];

  const recentPrescriptions = [
    {
      id: "RX001",
      patientName: "Sarah Johnson",
      doctor: "Dr. Alex Morgan",
      medicines: ["Paracetamol 500mg", "Amoxicillin 250mg"],
      status: "pending",
      time: "10 minutes ago",
      priority: "normal"
    },
    {
      id: "RX002",
      patientName: "Michael Chen",
      doctor: "Dr. Sarah Wilson",
      medicines: ["Insulin Glargine", "Metformin 1000mg"],
      status: "processing",
      time: "25 minutes ago",
      priority: "urgent"
    },
    {
      id: "RX003",
      patientName: "Emily Davis",
      doctor: "Dr. Michael Brown",
      medicines: ["Aspirin 75mg"],
      status: "ready",
      time: "1 hour ago",
      priority: "normal"
    },
    {
      id: "RX004",
      patientName: "James Wilson",
      doctor: "Dr. Emily Rodriguez",
      medicines: ["Lisinopril 10mg", "Atorvastatin 20mg"],
      status: "completed",
      time: "2 hours ago",
      priority: "normal"
    }
  ];

  const aiInsights = [
    {
      type: "stock-prediction",
      title: "Stock Depletion Alert",
      message: "Paracetamol will run out in 3 days based on current usage patterns.",
      action: "Order 500 units",
      severity: "high"
    },
    {
      type: "demand-forecast",
      title: "Seasonal Demand Increase",
      message: "Flu medications demand expected to increase by 40% next week.",
      action: "Stock up on flu medicines",
      severity: "medium"
    },
    {
      type: "expiry-alert",
      title: "Near Expiry Items",
      message: "15 items will expire within the next 30 days.",
      action: "Review expiry list",
      severity: "medium"
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-destructive bg-destructive/10";
      case "medium":
        return "border-warning bg-warning/10";
      case "low":
        return "border-success bg-success/10";
      default:
        return "border-border bg-muted/50";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "medium":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  return (
    <DashboardLayout
      title="Pharmacy Management"
      role="pharmacist"
      userName="Dr. Rachel Adams"
      userAvatar=""
      notifications={11}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pharmacy Dashboard</h1>
            <p className="text-muted-foreground">Manage medications, inventory, and prescriptions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="medical">
              <Package className="w-4 h-4 mr-2" />
              Manage Inventory
            </Button>
            <Button variant="ai">
              <Brain className="w-4 h-4 mr-2" />
              AI Predictions
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pharmacyStats.map((stat, index) => (
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
          {/* Low Stock Alert */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Low Stock Alert
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Reorder All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getUrgencyColor(item.urgency)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.medicine}</h3>
                        <p className="text-sm text-muted-foreground">{item.supplier}</p>
                      </div>
                      <Badge variant={
                        item.urgency === "high" ? "destructive" :
                        item.urgency === "medium" ? "default" : "secondary"
                      }>
                        {item.urgency} priority
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Stock:</span>
                        <span className="font-medium">{item.currentStock} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Minimum Stock:</span>
                        <span className="font-medium">{item.minStock} units</span>
                      </div>
                      <Progress value={(item.currentStock / item.minStock) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Expiry: {item.expiryDate}</span>
                        <span>{Math.round((item.currentStock / item.minStock) * 100)}% of minimum</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Recent Prescriptions
                  </CardTitle>
                  <CardDescription>Latest prescription orders to process</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search prescriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Pill className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{prescription.patientName}</p>
                        <Badge variant="outline" className="text-xs">
                          {prescription.id}
                        </Badge>
                        {prescription.priority === "urgent" && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{prescription.doctor}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {prescription.medicines.join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">{prescription.time}</p>
                    </div>
                    <div className="text-right space-y-2">
                      {getStatusBadge(prescription.status)}
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
        </div>

        {/* AI Insights */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI-Powered Pharmacy Insights
            </CardTitle>
            <CardDescription>Smart predictions and recommendations for inventory management</CardDescription>
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
                      AI
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.message}</p>
                  <Button variant="ai" size="sm" className="w-full">
                    {insight.action}
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-4 text-center">
              <Button variant="ai">
                <Brain className="w-4 h-4 mr-2" />
                Access Full AI Analytics Suite
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used pharmacy functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="w-6 h-6" />
                Process Prescription
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Package className="w-6 h-6" />
                Check Inventory
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ShoppingCart className="w-6 h-6" />
                Place Order
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Truck className="w-6 h-6" />
                Track Delivery
              </Button>
              <Button variant="ai" className="h-20 flex-col gap-2">
                <Brain className="w-6 h-6" />
                AI Predictions
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                Sales Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PharmacistDashboard;