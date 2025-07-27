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
import { Plus, Search, Users, MapPin, Clock, TrendingUp, Edit, Trash2 } from "lucide-react";

const Departments = () => {
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

  const departments = [
    {
      id: "1",
      name: "Cardiology",
      head: "Dr. Smith Johnson",
      staff: 15,
      location: "Building A, Floor 3",
      beds: 25,
      status: "Active",
      budget: "$450,000",
      patients: 180,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Emergency",
      head: "Dr. Sarah Wilson",
      staff: 28,
      location: "Building A, Floor 1",
      beds: 40,
      status: "Active",
      budget: "$680,000",
      patients: 320,
      rating: 4.9,
    },
    {
      id: "3",
      name: "Pediatrics",
      head: "Dr. Michael Brown",
      staff: 12,
      location: "Building B, Floor 2",
      beds: 20,
      status: "Active",
      budget: "$320,000",
      patients: 145,
      rating: 4.7,
    },
    {
      id: "4",
      name: "Orthopedics",
      head: "Dr. Lisa Davis",
      staff: 18,
      location: "Building C, Floor 1",
      beds: 30,
      status: "Maintenance",
      budget: "$520,000",
      patients: 200,
      rating: 4.6,
    },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Departments Management"
      role="admin"
      userName="Dr. Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Departments Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage hospital departments, staff allocation, and resources
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Department Name</Label>
                  <Input id="name" placeholder="Enter department name" />
                </div>
                <div>
                  <Label htmlFor="head">Department Head</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department head" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr1">Dr. John Doe</SelectItem>
                      <SelectItem value="dr2">Dr. Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Building, Floor" />
                </div>
                <div>
                  <Label htmlFor="beds">Number of Beds</Label>
                  <Input id="beds" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="budget">Annual Budget</Label>
                  <Input id="budget" placeholder="$0" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Department description" />
                </div>
                <Button className="w-full">Create Department</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground">92% operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">485</div>
              <p className="text-xs text-muted-foreground">78% occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">All departments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="departments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search departments..."
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

            {/* Departments Table */}
            <Card>
              <CardHeader>
                <CardTitle>Department List</CardTitle>
                <CardDescription>
                  Manage all hospital departments and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Head</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Beds</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepartments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.head}</TableCell>
                        <TableCell>{dept.staff}</TableCell>
                        <TableCell>{dept.location}</TableCell>
                        <TableCell>{dept.beds}</TableCell>
                        <TableCell>{dept.patients}</TableCell>
                        <TableCell>{dept.budget}</TableCell>
                        <TableCell>
                          <Badge
                            variant={dept.status === "Active" ? "default" : "secondary"}
                          >
                            {dept.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cardiology Equipment</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Emergency Equipment</span>
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
                  <CardTitle>Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Emergency</span>
                      <span>$680,000</span>
                    </div>
                    <div className="space-y-2">
                      <span>Cardiology</span>
                      <span>$450,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept) => (
                      <div key={dept.id} className="flex justify-between items-center">
                        <span>{dept.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{dept.rating}/5</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${
                                  star <= Math.floor(dept.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average Bed Occupancy</span>
                      <span>78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staff Utilization</span>
                      <span>85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Patient Satisfaction</span>
                      <span>4.7/5</span>
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

export default Departments;