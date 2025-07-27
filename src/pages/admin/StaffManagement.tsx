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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Users, UserCheck, Clock, TrendingUp, Edit, Trash2, Phone, Mail } from "lucide-react";

const StaffManagement = () => {
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

  const staff = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Nurse Manager",
      department: "Emergency",
      email: "sarah.johnson@hospital.com",
      phone: "(555) 123-4567",
      startDate: "2020-03-15",
      salary: "$75,000",
      status: "Active",
      shift: "Day",
      performance: 4.8,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Lab Technician",
      department: "Laboratory",
      email: "michael.chen@hospital.com",
      phone: "(555) 234-5678",
      startDate: "2021-07-20",
      salary: "$65,000",
      status: "Active",
      shift: "Night",
      performance: 4.6,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Administrative Assistant",
      department: "Administration",
      email: "emily.rodriguez@hospital.com",
      phone: "(555) 345-6789",
      startDate: "2019-11-10",
      salary: "$45,000",
      status: "Active",
      shift: "Day",
      performance: 4.9,
    },
    {
      id: "4",
      name: "David Wilson",
      role: "Security Officer",
      department: "Security",
      email: "david.wilson@hospital.com",
      phone: "(555) 456-7890",
      startDate: "2022-01-05",
      salary: "$40,000",
      status: "On Leave",
      shift: "Night",
      performance: 4.3,
    },
  ];

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Staff Management"
      role="admin"
      userName="Dr. Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage hospital staff, schedules, and performance
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="admin">Administrative</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
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
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="lab">Laboratory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="staff@hospital.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" placeholder="$50,000" />
                </div>
                <div>
                  <Label htmlFor="shift">Shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day (8AM - 8PM)</SelectItem>
                      <SelectItem value="night">Night (8PM - 8AM)</SelectItem>
                      <SelectItem value="rotating">Rotating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Add Staff Member</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">325</div>
              <p className="text-xs text-muted-foreground">95% attendance rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17</div>
              <p className="text-xs text-muted-foreground">Various reasons</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6/5</div>
              <p className="text-xs text-muted-foreground">+0.2 from last quarter</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="staff" className="space-y-4">
          <TabsList>
            <TabsTrigger value="staff">Staff Directory</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
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

            {/* Staff Table */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
                <CardDescription>
                  Manage all hospital staff members and their information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="mr-1 h-3 w-3" />
                              {member.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-1 h-3 w-3" />
                              {member.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.startDate}</TableCell>
                        <TableCell>{member.salary}</TableCell>
                        <TableCell>{member.shift}</TableCell>
                        <TableCell>
                          <Badge
                            variant={member.status === "Active" ? "default" : "secondary"}
                          >
                            {member.status}
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

          <TabsContent value="schedules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shift Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Day Shift</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Night Shift</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Rotating</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Shifts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Day Shift - Emergency</p>
                      </div>
                      <span className="text-sm">8:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-sm text-muted-foreground">Night Shift - Laboratory</p>
                      </div>
                      <span className="text-sm">8:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role} - {member.department}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{member.performance}/5</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${
                                star <= Math.floor(member.performance)
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
          </TabsContent>

          <TabsContent value="payroll" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Monthly Payroll</span>
                    <span className="font-medium">$1,825,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Salary</span>
                    <span className="font-medium">$5,336</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overtime This Month</span>
                    <span className="font-medium">$45,000</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Department Payroll</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Emergency</span>
                    <span>$485,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cardiology</span>
                    <span>$425,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laboratory</span>
                    <span>$285,000</span>
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

export default StaffManagement;