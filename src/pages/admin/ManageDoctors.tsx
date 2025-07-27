
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { useNavigate } from "react-router-dom";

const ManageDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  
   const navigate = useNavigate();
  const sidebarItems = [
    { icon: TrendingUp, label: "Dashboard", href: "/dashboard/admin", active: false },
    { icon: Award, label: "Manage Doctors", href: "/admin/doctors", active: true },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      email: "sarah.johnson@medcare.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      patients: 234,
      rating: 4.8,
      experience: "12 years",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      email: "michael.chen@medcare.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      patients: 189,
      rating: 4.9,
      experience: "15 years",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      email: "emily.davis@medcare.com",
      phone: "+1 (555) 345-6789",
      status: "On Leave",
      patients: 156,
      rating: 4.7,
      experience: "8 years",
      avatar: "/placeholder.svg"
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Manage Doctors"
      role="admin"
      userName="Admin User"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Doctors</h1>
            <p className="text-muted-foreground">Add, edit, and manage doctor profiles</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" onClick={()=>(navigate("/admin/addDoctor"))}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Doctor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">138</div>
              <p className="text-xs text-success">97% active rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Specialties</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Medical specialties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Award className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Patient satisfaction</p>
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
                  placeholder="Search doctors by name or specialty..."
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

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={doctor.avatar} />
                              <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-muted-foreground">{doctor.experience}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doctor.specialty}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{doctor.email}</div>
                            <div className="text-muted-foreground">{doctor.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{doctor.patients}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{doctor.rating}</span>
                            <Award className="w-4 h-4 text-warning" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>
                            {doctor.status}
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

              <TabsContent value="cards" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="hover:shadow-medium transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={doctor.avatar} />
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{doctor.name}</CardTitle>
                            <CardDescription>{doctor.specialty}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Patients</span>
                            <span className="font-medium">{doctor.patients}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Rating</span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{doctor.rating}</span>
                              <Award className="w-4 h-4 text-warning" />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>
                              {doctor.status}
                            </Badge>
                          </div>
                          <div className="pt-3 border-t">
                            <Button className="w-full" variant="outline">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Doctor Distribution by Specialty</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Cardiology</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm">18</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Neurology</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-2/3 h-2 bg-secondary rounded-full"></div>
                            </div>
                            <span className="text-sm">15</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Pediatrics</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-1/2 h-2 bg-success rounded-full"></div>
                            </div>
                            <span className="text-sm">12</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Average Patient Load</span>
                          <span className="font-medium">186 patients</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Average Rating</span>
                          <span className="font-medium">4.8/5.0</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Active Rate</span>
                          <span className="font-medium text-success">97%</span>
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

export default ManageDoctors;
