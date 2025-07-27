import { useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MessageSquare, Star, TrendingUp, AlertTriangle, Eye, MessageCircle } from "lucide-react";

const FeedbackComplaints = () => {
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

  const feedbackData = [
    {
      id: "FB-001",
      patientName: "John Smith",
      type: "Feedback",
      category: "Service Quality",
      department: "Cardiology",
      rating: 5,
      subject: "Excellent care received",
      message: "The cardiology team provided exceptional care during my treatment. Very professional and caring staff.",
      date: "2024-01-20",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: "CP-001",
      patientName: "Sarah Johnson",
      type: "Complaint",
      category: "Wait Time",
      department: "Emergency",
      rating: 2,
      subject: "Long waiting time in emergency",
      message: "Had to wait for over 3 hours in the emergency room despite being in severe pain. This needs improvement.",
      date: "2024-01-18",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "FB-002",
      patientName: "Michael Brown",
      type: "Feedback",
      category: "Staff Behavior",
      department: "Pediatrics",
      rating: 4,
      subject: "Friendly nursing staff",
      message: "The nurses in the pediatrics department were very friendly and made my child comfortable during the visit.",
      date: "2024-01-15",
      status: "Acknowledged",
      priority: "Medium",
    },
    {
      id: "CP-002",
      patientName: "Emily Davis",
      type: "Complaint",
      category: "Billing Issue",
      department: "Administration",
      rating: 1,
      subject: "Incorrect billing charges",
      message: "I was charged for services I did not receive. The billing department needs to review my account.",
      date: "2024-01-12",
      status: "Under Review",
      priority: "High",
    },
  ];

  const filteredFeedback = feedbackData.filter(item =>
    item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Feedback & Complaints"
      role="admin"
      userName="Dr. Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Feedback & Complaints</h1>
            <p className="text-muted-foreground mt-2">
              Monitor patient feedback and resolve complaints
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Response
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Respond to Feedback</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feedback">Select Feedback/Complaint</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fb001">FB-001 - John Smith</SelectItem>
                      <SelectItem value="cp001">CP-001 - Sarah Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="response">Response</Label>
                  <Textarea id="response" placeholder="Enter your response..." />
                </div>
                <div>
                  <Label htmlFor="status">Update Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Send Response</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5</div>
              <p className="text-xs text-muted-foreground">+0.3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Complaints</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-5 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Within 48 hours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback and complaints..."
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

            {/* Feedback Table */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback & Complaints</CardTitle>
                <CardDescription>
                  Manage all patient feedback and complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.patientName}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === "Complaint" ? "destructive" : "default"}>
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= item.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.priority === "High"
                                ? "destructive"
                                : item.priority === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "Resolved"
                                ? "default"
                                : item.status === "In Progress"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positive Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData
                    .filter((item) => item.type === "Feedback")
                    .map((item) => (
                      <div key={item.id} className="border-l-4 border-green-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.subject}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.patientName} - {item.department}
                            </p>
                            <p className="text-sm mt-2">{item.message}</p>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= item.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData
                    .filter((item) => item.type === "Complaint")
                    .map((item) => (
                      <div key={item.id} className="border-l-4 border-red-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.subject}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.patientName} - {item.department}
                            </p>
                            <p className="text-sm mt-2">{item.message}</p>
                            <div className="flex space-x-2 mt-2">
                              <Badge variant="destructive">{item.priority}</Badge>
                              <Badge variant="outline">{item.status}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback by Department</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Emergency</span>
                    <span>35% (3.8 avg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cardiology</span>
                    <span>25% (4.5 avg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pediatrics</span>
                    <span>20% (4.2 avg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Others</span>
                    <span>20% (4.0 avg)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Common Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Wait Time</span>
                    <span>35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing Issues</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staff Behavior</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Facility Issues</span>
                    <span>20%</span>
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

export default FeedbackComplaints;