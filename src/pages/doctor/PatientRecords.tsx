import { useState } from "react";
import { Search, Filter, Eye, Edit, FileText, Calendar, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/shared/DashboardLayout";

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: FileText, label: "Patient Records", href: "/doctor/records", active: true },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: FileText, label: "Diagnostic Requests", href: "/doctor/diagnostics" },
    { icon: FileText, label: "AI Assistance", href: "/doctor/ai-assistance" },
    { icon: FileText, label: "Voice Notes", href: "/doctor/voice-notes" },
    { icon: Phone, label: "Telemedicine", href: "/doctor/telemedicine" },
  ];

  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, City, State",
      bloodType: "O+",
      allergies: "Penicillin, Nuts",
      lastVisit: "2024-01-15",
      status: "Active",
      condition: "Hypertension",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 28,
      gender: "Male",
      phone: "+1 (555) 987-6543",
      email: "michael.chen@email.com",
      address: "456 Oak Ave, City, State",
      bloodType: "A-",
      allergies: "None",
      lastVisit: "2024-01-12",
      status: "Active",
      condition: "Diabetes Type 2",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 42,
      gender: "Female",
      phone: "+1 (555) 456-7890",
      email: "emily.rodriguez@email.com",
      address: "789 Pine St, City, State",
      bloodType: "B+",
      allergies: "Shellfish",
      lastVisit: "2024-01-10",
      status: "Inactive",
      condition: "Asthma",
      avatar: "/placeholder.svg"
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || patient.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variant = status === "Active" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <DashboardLayout
      title="Patient Records"
      role="doctor"
      userName="Dr. Smith"
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patient Records</h1>
            <p className="text-muted-foreground">Manage and view patient information</p>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Patient List */}
        <div className="grid gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <p className="text-muted-foreground">
                        {patient.age} years • {patient.gender} • {patient.bloodType}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{patient.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(patient.status)}
                      <Badge variant="outline">{patient.condition}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Tabs defaultValue="contact" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                      <TabsTrigger value="medical">Medical</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="contact" className="mt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">{patient.email}</p>
                        </div>
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-muted-foreground">{patient.address}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="medical" className="mt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Blood Type</p>
                          <p className="text-muted-foreground">{patient.bloodType}</p>
                        </div>
                        <div>
                          <p className="font-medium">Allergies</p>
                          <p className="text-muted-foreground">{patient.allergies}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="history" className="mt-4">
                      <div className="text-sm">
                        <p className="font-medium">Recent Visits</p>
                        <p className="text-muted-foreground">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientRecords;