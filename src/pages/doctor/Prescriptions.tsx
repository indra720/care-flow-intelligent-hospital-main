import { useState } from "react";
import { Search, Plus, Printer, Send, Calendar, FileText, Phone, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from "@/components/shared/DashboardLayout";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: FileText, label: "Patient Records", href: "/doctor/records" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions", active: true },
    { icon: FileText, label: "Diagnostic Requests", href: "/doctor/diagnostics" },
    { icon: FileText, label: "AI Assistance", href: "/doctor/ai-assistance" },
    { icon: FileText, label: "Voice Notes", href: "/doctor/voice-notes" },
    { icon: Phone, label: "Telemedicine", href: "/doctor/telemedicine" },
  ];

  const prescriptions = [
    {
      id: 1,
      patient: "Sarah Johnson",
      patientId: "P001",
      avatar: "/placeholder.svg",
      date: "2024-01-15",
      status: "Active",
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
      ],
      diagnosis: "Hypertension, Type 2 Diabetes",
      notes: "Monitor blood pressure weekly. Follow up in 2 weeks."
    },
    {
      id: 2,
      patient: "Michael Chen",
      patientId: "P002",
      avatar: "/placeholder.svg",
      date: "2024-01-12",
      status: "Completed",
      medications: [
        { name: "Albuterol Inhaler", dosage: "90mcg", frequency: "As needed", duration: "90 days" }
      ],
      diagnosis: "Asthma exacerbation",
      notes: "Use rescue inhaler as needed for wheezing or shortness of breath."
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      patientId: "P003",
      avatar: "/placeholder.svg",
      date: "2024-01-10",
      status: "Pending",
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "7 days" }
      ],
      diagnosis: "Upper respiratory infection",
      notes: "Complete full course of antibiotics. Return if symptoms worsen."
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || prescription.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      "Active": "default",
      "Completed": "secondary",
      "Pending": "outline"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  return (
    <DashboardLayout
      title="Prescriptions"
      role="doctor"
      userName="Dr. Smith"
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Prescriptions</h1>
            <p className="text-muted-foreground">Manage patient prescriptions and medications</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>Enter prescription details for the patient</DialogDescription>
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
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input placeholder="Primary diagnosis" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="medication">Medication</Label>
                  <Input placeholder="Medication name" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input placeholder="e.g., 10mg" />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Once daily</SelectItem>
                        <SelectItem value="twice">Twice daily</SelectItem>
                        <SelectItem value="three">Three times daily</SelectItem>
                        <SelectItem value="asneeded">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input placeholder="e.g., 30 days" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea placeholder="Additional instructions or notes" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Prescription</Button>
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
              placeholder="Search prescriptions..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prescriptions List */}
        <div className="grid gap-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={prescription.avatar} alt={prescription.patient} />
                      <AvatarFallback>{prescription.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{prescription.patient}</CardTitle>
                      <CardDescription>ID: {prescription.patientId} • Date: {new Date(prescription.date).toLocaleDateString()}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(prescription.status)}
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">DIAGNOSIS</h4>
                  <p className="text-sm">{prescription.diagnosis}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">MEDICATIONS</h4>
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                        </div>
                        <Badge variant="outline">{med.duration}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {prescription.notes && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">NOTES</h4>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{prescription.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;