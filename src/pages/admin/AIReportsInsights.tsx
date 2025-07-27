import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Brain, TrendingUp, Activity, BarChart3, Download, RefreshCw } from "lucide-react";

const AIReportsInsights = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sidebarItems = [
    { name: "Overview", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { name: "Manage Doctors", href: "/admin/doctors", icon: "UserCheck" },
    { name: "Manage Patients", href: "/admin/patients", icon: "Users" },
    { name: "Departments", href: "/admin/departments", icon: "Building2" },
    { name: "Staff Management", href: "/admin/staff", icon: "UserCog" },
    { name: "Billing & Finance", href: "/admin/billing", icon: "CreditCard" },
    { name: "Feedback & Complaints", href: "/admin/feedback", icon: "MessageSquare" },
    { name: "AI Reports & Insights", href: "/admin/ai-reports", icon: "Brain" },
    { name: "System Settings", href: "/admin/settings", icon: "Settings" },
    { name: "Reports", href: "/admin/reports", icon: "FileText" },
  ];

  const aiInsights = [
    {
      id: "AI-001",
      title: "Patient Flow Optimization",
      type: "Operational",
      priority: "High",
      insight: "AI analysis suggests reducing wait times by 23% through optimized scheduling in Emergency department during peak hours (2-6 PM).",
      impact: "High",
      confidence: 94,
      dateGenerated: "2024-01-20",
      status: "Active",
      recommendation: "Implement dynamic scheduling algorithm",
    },
    {
      id: "AI-002",
      title: "Resource Allocation Alert",
      type: "Resource",
      priority: "Medium",
      insight: "Cardiology department shows 15% underutilization of CT scan equipment during morning hours (8-11 AM).",
      impact: "Medium",
      confidence: 87,
      dateGenerated: "2024-01-19",
      status: "Under Review",
      recommendation: "Reschedule non-urgent scans to morning slots",
    },
    {
      id: "AI-003",
      title: "Cost Reduction Opportunity",
      type: "Financial",
      priority: "High",
      insight: "Medication inventory analysis reveals potential $45,000 monthly savings through optimized ordering patterns.",
      impact: "High",
      confidence: 91,
      dateGenerated: "2024-01-18",
      status: "Implemented",
      recommendation: "Adopt AI-driven inventory management",
    },
    {
      id: "AI-004",
      title: "Staffing Pattern Analysis",
      type: "Staffing",
      priority: "Medium",
      insight: "Night shift in ICU is overstaffed by 20%, while day shift in Pediatrics needs 2 additional nurses.",
      impact: "Medium",
      confidence: 89,
      dateGenerated: "2024-01-17",
      status: "Active",
      recommendation: "Redistribute staff allocation across departments",
    },
  ];

  const predictiveAlerts = [
    {
      id: "PA-001",
      title: "Equipment Maintenance Alert",
      department: "Radiology",
      equipment: "MRI Machine #2",
      probability: 85,
      timeframe: "Next 7 days",
      description: "Predictive analysis indicates high probability of equipment failure",
    },
    {
      id: "PA-002",
      title: "Patient Admission Surge",
      department: "Emergency",
      probability: 78,
      timeframe: "Next 3 days",
      description: "Expected 30% increase in emergency admissions due to weather patterns",
    },
    {
      id: "PA-003",
      title: "Supply Chain Disruption",
      department: "Pharmacy",
      item: "Blood Pressure Medication",
      probability: 72,
      timeframe: "Next 14 days",
      description: "Potential shortage predicted based on supplier patterns",
    },
  ];

  const filteredInsights = aiInsights.filter(insight =>
    insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="AI Reports & Insights"
      role="admin"
      userName="Dr. Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Reports & Insights</h1>
            <p className="text-muted-foreground mt-2">
              AI-powered analytics and predictive insights for hospital operations
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Analysis
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Generate Custom AI Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Operational Efficiency</SelectItem>
                        <SelectItem value="financial">Financial Analysis</SelectItem>
                        <SelectItem value="patient">Patient Flow</SelectItem>
                        <SelectItem value="resource">Resource Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeframe">Time Frame</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time frame" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Generate Report</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Insights</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+8 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">High accuracy rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125K</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predictions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Active alerts</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Alerts</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 gap-6">
              {filteredInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {insight.type} • Generated on {insight.dateGenerated}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge
                          variant={
                            insight.priority === "High"
                              ? "destructive"
                              : insight.priority === "Medium"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {insight.priority}
                        </Badge>
                        <Badge
                          variant={
                            insight.status === "Active"
                              ? "default"
                              : insight.status === "Implemented"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {insight.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{insight.insight}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm font-medium">Impact: </span>
                          <Badge variant="outline">{insight.impact}</Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Confidence: </span>
                          <span className="text-sm">{insight.confidence}%</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {predictiveAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <Badge variant="destructive">Alert</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{alert.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm font-medium">Department: </span>
                          <span className="text-sm">{alert.department}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Probability: </span>
                          <span className="text-sm">{alert.probability}%</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Timeframe: </span>
                          <span className="text-sm">{alert.timeframe}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">Take Action</Button>
                        <Button variant="outline" size="sm">Dismiss</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Prediction Accuracy</span>
                      <span>89%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Processing Speed</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Data Quality</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Cost Reduction</span>
                    <span>$125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency Gain</span>
                    <span>23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Saved</span>
                    <span>156 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommendations Implemented</span>
                    <span>34/47</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Implement AI-Driven Scheduling</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce patient wait times by 25% through optimized appointment scheduling
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">High Impact</Badge>
                      <Badge variant="outline">Quick Win</Badge>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Optimize Inventory Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce medication waste by 30% through predictive ordering
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">Cost Saving</Badge>
                      <Badge variant="outline">Medium Effort</Badge>
                    </div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium">Enhance Staff Allocation</h4>
                    <p className="text-sm text-muted-foreground">
                      Improve patient satisfaction by 15% through better staff distribution
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">Patient Satisfaction</Badge>
                      <Badge variant="outline">Long Term</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIReportsInsights;