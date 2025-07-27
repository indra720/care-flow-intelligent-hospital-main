
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Users, Calendar, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useNavigate } from "react-router-dom";

const ManagePatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/dashboard/admin", active: false },
    { icon: Users, label: "Manage Patients", href: "/admin/patients", active: true },
  ];

  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      bloodType: "A+",
      lastVisit: "2024-01-15",
      status: "Active",
      condition: "Hypertension",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "maria.garcia@email.com",
      bloodType: "O-",
      lastVisit: "2024-01-10",
      status: "Active",
      condition: "Diabetes",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "David Wilson",
      age: 28,
      gender: "Male",
      phone: "+1 (555) 345-6789",
      email: "david.wilson@email.com",
      bloodType: "B+",
      lastVisit: "2023-12-20",
      status: "Inactive",
      condition: "Healthy",
      avatar: "/placeholder.svg"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Manage Patients"
      role="admin"
      userName="Admin User"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Patients</h1>
            <p className="text-muted-foreground">View and manage patient records</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" onClick={()=>navigate('/admin/registerPatient')}>
            <Plus className="w-4 h-4 mr-2" />
            Register New Patient
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+180 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,340</div>
              <p className="text-xs text-success">82% active rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">New registrations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
              <FileText className="h-4 w-4 text-emergency" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-emergency">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search patients by name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="list">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list">Patient List</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={patient.avatar} />
                              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-muted-foreground">ID: P{patient.id.toString().padStart(4, '0')}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{patient.age} years</div>
                            <div className="text-sm text-muted-foreground">{patient.gender}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{patient.phone}</div>
                            <div className="text-muted-foreground">{patient.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{patient.bloodType}</Badge>
                        </TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>
                          <Badge variant={patient.condition === "Healthy" ? "default" : "secondary"}>
                            {patient.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Age Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>0-18 years</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-1/4 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm">12%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>19-40 years</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-2/3 h-2 bg-secondary rounded-full"></div>
                            </div>
                            <span className="text-sm">45%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>41-65 years</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-1/3 h-2 bg-success rounded-full"></div>
                            </div>
                            <span className="text-sm">28%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>65+ years</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-1/6 h-2 bg-warning rounded-full"></div>
                            </div>
                            <span className="text-sm">15%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Common Conditions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Hypertension</span>
                          <span className="font-medium">284 patients</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Diabetes</span>
                          <span className="font-medium">198 patients</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Heart Disease</span>
                          <span className="font-medium">156 patients</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Asthma</span>
                          <span className="font-medium">134 patients</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="demographics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gender Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Female</span>
                          <span className="font-medium">52% (1,480)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Male</span>
                          <span className="font-medium">48% (1,367)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Blood Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>O+</span>
                          <span>35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>A+</span>
                          <span>28%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>B+</span>
                          <span>18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>AB+</span>
                          <span>12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other</span>
                          <span>7%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Insurance Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Insured</span>
                          <span className="font-medium text-success">89%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Uninsured</span>
                          <span className="font-medium text-warning">11%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagePatients;
