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
import { Plus, Search, DollarSign, TrendingUp, CreditCard, FileText, Download, Eye } from "lucide-react";

const BillingFinance = () => {
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

  const invoices = [
    {
      id: "INV-001",
      patientName: "John Smith",
      patientId: "PAT-001",
      amount: "$2,450.00",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Paid",
      department: "Cardiology",
      insurance: "Blue Cross",
    },
    {
      id: "INV-002",
      patientName: "Sarah Johnson",
      patientId: "PAT-002",
      amount: "$1,280.00",
      date: "2024-01-18",
      dueDate: "2024-02-18",
      status: "Pending",
      department: "Emergency",
      insurance: "Aetna",
    },
    {
      id: "INV-003",
      patientName: "Michael Brown",
      patientId: "PAT-003",
      amount: "$3,750.00",
      date: "2024-01-20",
      dueDate: "2024-02-20",
      status: "Overdue",
      department: "Surgery",
      insurance: "Medicare",
    },
    {
      id: "INV-004",
      patientName: "Emily Davis",
      patientId: "PAT-004",
      amount: "$890.00",
      date: "2024-01-22",
      dueDate: "2024-02-22",
      status: "Paid",
      department: "Pediatrics",
      insurance: "Self-Pay",
    },
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Billing & Finance"
      role="admin"
      userName="Dr. Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing & Finance</h1>
            <p className="text-muted-foreground mt-2">
              Manage invoices, payments, and financial reports
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pat1">John Smith</SelectItem>
                      <SelectItem value="pat2">Sarah Johnson</SelectItem>
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
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="$0.00" />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue-cross">Blue Cross</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="self-pay">Self-Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create Invoice</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245,680</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$156,890</div>
              <p className="text-xs text-muted-foreground">$45K overdue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">88% collection rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">95% approval rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
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

            {/* Invoices Table */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Management</CardTitle>
                <CardDescription>
                  Track and manage all patient invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Insurance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice.patientName}</p>
                            <p className="text-sm text-muted-foreground">{invoice.patientId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.department}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{invoice.insurance}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Overdue"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="payments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Insurance</span>
                    <span>65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Card</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash</span>
                    <span>10%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">$2,450.00</p>
                      <p className="text-sm text-muted-foreground">John Smith - INV-001</p>
                    </div>
                    <span className="text-sm text-green-600">Paid</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">$890.00</p>
                      <p className="text-sm text-muted-foreground">Emily Davis - INV-004</p>
                    </div>
                    <span className="text-sm text-green-600">Paid</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Claims Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Approved</span>
                      <span>325 (95%)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pending</span>
                      <span>12 (3.5%)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "3.5%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Denied</span>
                      <span>5 (1.5%)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "1.5%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Insurance Providers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Blue Cross Blue Shield</span>
                    <span>35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aetna</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UnitedHealth</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Others</span>
                    <span>5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>January 2024</span>
                    <span>$1,245,680</span>
                  </div>
                  <div className="flex justify-between">
                    <span>December 2023</span>
                    <span>$1,108,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>November 2023</span>
                    <span>$1,089,320</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Department Revenue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Cardiology</span>
                    <span>$485,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency</span>
                    <span>$385,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Surgery</span>
                    <span>$275,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Others</span>
                    <span>$100,680</span>
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

export default BillingFinance;