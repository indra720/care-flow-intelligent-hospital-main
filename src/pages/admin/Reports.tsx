import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, Users, Activity, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const sidebarItems = [
    { icon: TrendingUp, label: "Dashboard", href: "/dashboard/admin", active: false },
    { icon: FileText, label: "Reports", href: "/admin/reports", active: true },
  ];

  const reportTypes = [
    {
      id: "patient-analytics",
      title: "Patient Analytics",
      description: "Comprehensive patient demographics and visit analysis",
      icon: Users,
      lastGenerated: "2 hours ago",
      status: "ready"
    },
    {
      id: "financial-summary",
      title: "Financial Summary",
      description: "Revenue, expenses, and billing analytics",
      icon: DollarSign,
      lastGenerated: "1 day ago",
      status: "ready"
    },
    {
      id: "doctor-performance",
      title: "Doctor Performance",
      description: "Doctor efficiency and patient satisfaction metrics",
      icon: Activity,
      lastGenerated: "3 hours ago",
      status: "ready"
    },
    {
      id: "operational-metrics",
      title: "Operational Metrics",
      description: "Hospital capacity, wait times, and resource utilization",
      icon: Clock,
      lastGenerated: "5 hours ago",
      status: "generating"
    }
  ];

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Downloading Report",
      description: "Your report is being prepared for download",
    });
  };

  const handleGenerateReport = (reportId: string) => {
    toast({
      title: "Generating Report",
      description: "Your custom report is being generated",
    });
  };

  return (
    <DashboardLayout
      title="Reports & Analytics"
      role="admin"
      userName="Admin User"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and view comprehensive hospital reports</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <FileText className="w-4 h-4 mr-2" />
            Custom Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">143</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4M</div>
              <p className="text-xs text-success">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Active departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Generation Time</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">Processing time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="standard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="standard">Standard Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          {/* Standard Reports */}
          <TabsContent value="standard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Filters</CardTitle>
                <CardDescription>Customize your report parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Period</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <Card key={report.id} className="hover:shadow-medium transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                            <CardDescription>{report.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={report.status === "ready" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          Last generated: {report.lastGenerated}
                        </div>
                        {report.status === "generating" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Generating...</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadReport(report.id)}
                            disabled={report.status !== "ready"}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleGenerateReport(report.id)}
                          >
                            Generate New
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Custom Reports */}
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Create tailored reports for specific needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Available Data Sources</h4>
                    <div className="space-y-2">
                      {[
                        "Patient Records",
                        "Appointment Data",
                        "Financial Transactions",
                        "Staff Performance",
                        "Inventory Levels",
                        "Equipment Usage"
                      ].map((source) => (
                        <div key={source} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Report Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Report Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter report name..."
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Date Range</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="custom">Custom range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Custom Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Reports */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automated report generation and delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Weekly Patient Summary",
                      frequency: "Weekly - Mondays at 9:00 AM",
                      recipients: "admin@hospital.com, ceo@hospital.com",
                      status: "Active"
                    },
                    {
                      name: "Monthly Financial Report",
                      frequency: "Monthly - 1st day at 8:00 AM",
                      recipients: "finance@hospital.com",
                      status: "Active"
                    },
                    {
                      name: "Daily Emergency Department Stats",
                      frequency: "Daily at 11:59 PM",
                      recipients: "emergency@hospital.com",
                      status: "Paused"
                    }
                  ].map((schedule, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{schedule.name}</h4>
                          <div className="text-sm text-muted-foreground mt-1">
                            <div>{schedule.frequency}</div>
                            <div>Recipients: {schedule.recipients}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                            {schedule.status}
                          </Badge>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;