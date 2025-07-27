import { useState } from "react";
import { Search, Plus, Download, Eye, Clock, CheckCircle, XCircle, Calendar, FileText, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/shared/DashboardLayout";

const DiagnosticRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: FileText, label: "Patient Records", href: "/doctor/records" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: FileText, label: "Diagnostic Requests", href: "/doctor/diagnostics", active: true },
    { icon: FileText, label: "AI Assistance", href: "/doctor/ai-assistance" },
    { icon: FileText, label: "Voice Notes", href: "/doctor/voice-notes" },
    { icon: Phone, label: "Telemedicine", href: "/doctor/telemedicine" },
  ];

  const diagnosticRequests = [
    {
      id: 1,
      patient: "Sarah Johnson",
      patientId: "P001",
      avatar: "/placeholder.svg",
      requestDate: "2024-01-15",
      status: "Completed",
      type: "Blood Test",
      test: "Complete Blood Count (CBC)",
      urgency: "Routine",
      results: "Available",
      notes: "Annual health checkup - all values within normal range",
      requestedBy: "Dr. Smith",
      completedDate: "2024-01-16"
    },
    {
      id: 2,
      patient: "Michael Chen",
      patientId: "P002",
      avatar: "/placeholder.svg",
      requestDate: "2024-01-14",
      status: "Pending",
      type: "Imaging",
      test: "Chest X-Ray",
      urgency: "Urgent",
      results: "Pending",
      notes: "Persistent cough and chest pain evaluation",
      requestedBy: "Dr. Smith",
      scheduledDate: "2024-01-17"
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      patientId: "P003",
      avatar: "/placeholder.svg",
      requestDate: "2024-01-12",
      status: "In Progress",
      type: "Blood Test",
      test: "HbA1c, Lipid Panel",
      urgency: "Routine",
      results: "Processing",
      notes: "Diabetes follow-up - 3-month monitoring",
      requestedBy: "Dr. Smith",
      expectedDate: "2024-01-15"
    },
    {
      id: 4,
      patient: "David Wilson",
      patientId: "P004",
      avatar: "/placeholder.svg",
      requestDate: "2024-01-10",
      status: "Cancelled",
      type: "Imaging",
      test: "MRI Brain",
      urgency: "Routine",
      results: "N/A",
      notes: "Patient rescheduled appointment",
      requestedBy: "Dr. Smith",
      cancelledDate: "2024-01-11"
    }
  ];

  const filteredRequests = diagnosticRequests.filter(request => {
    const matchesSearch = request.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.test.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || request.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === "all" || request.type.toLowerCase() === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      "Completed": { variant: "default", icon: CheckCircle },
      "Pending": { variant: "secondary", icon: Clock },
      "In Progress": { variant: "outline", icon: Clock },
      "Cancelled": { variant: "destructive", icon: XCircle }
    } as const;
    
    const config = variants[status as keyof typeof variants] || { variant: "outline", icon: Clock };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const variant = urgency === "Urgent" ? "destructive" : "outline";
    return <Badge variant={variant}>{urgency}</Badge>;
  };

  return (
    <DashboardLayout
      title="Diagnostic Requests"
      role="doctor"
      userName="Dr. Smith"
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Diagnostic Requests</h1>
            <p className="text-muted-foreground">Manage lab tests and imaging requests</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Diagnostic Request</DialogTitle>
                <DialogDescription>Submit a new diagnostic test request</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p001">Sarah Johnson (P001)</SelectItem>
                        <SelectItem value="p002">Michael Chen (P002)</SelectItem>
                        <SelectItem value="p003">Emily Rodriguez (P003)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Test Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blood">Blood Test</SelectItem>
                        <SelectItem value="imaging">Imaging</SelectItem>
                        <SelectItem value="urine">Urine Test</SelectItem>
                        <SelectItem value="biopsy">Biopsy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="test">Specific Test</Label>
                    <Input placeholder="e.g., Complete Blood Count" />
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="stat">STAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Clinical Notes</Label>
                  <Textarea placeholder="Reason for test and clinical details" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit Request</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="blood test">Blood Test</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="urine test">Urine Test</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Requests List */}
        <div className="grid gap-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.avatar} alt={request.patient} />
                      <AvatarFallback>{request.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{request.patient}</CardTitle>
                      <CardDescription>
                        ID: {request.patientId} • Requested: {new Date(request.requestDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                    {getUrgencyBadge(request.urgency)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">TEST TYPE</p>
                        <p className="text-sm">{request.type}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">SPECIFIC TEST</p>
                        <p className="text-sm">{request.test}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">CLINICAL NOTES</p>
                      <p className="text-sm bg-muted/50 p-3 rounded-lg">{request.notes}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      {request.status === "Completed" && (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="results" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">RESULTS STATUS</p>
                        <p className="text-sm">{request.results}</p>
                      </div>
                      
                      {request.status === "Completed" && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm font-medium">Test Results Available</p>
                          <p className="text-xs text-muted-foreground">
                            Completed on {request.completedDate && new Date(request.completedDate).toLocaleDateString()}
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Download className="mr-2 h-4 w-4" />
                            Download Full Report
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <p className="font-medium">Request Timeline</p>
                        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                          <p>• Requested by {request.requestedBy} on {new Date(request.requestDate).toLocaleDateString()}</p>
                          {request.scheduledDate && <p>• Scheduled for {new Date(request.scheduledDate).toLocaleDateString()}</p>}
                          {request.completedDate && <p>• Completed on {new Date(request.completedDate).toLocaleDateString()}</p>}
                          {request.cancelledDate && <p>• Cancelled on {new Date(request.cancelledDate).toLocaleDateString()}</p>}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticRequests;