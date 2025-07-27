import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Clock, AlertTriangle, Download, RefreshCw, CheckCircle } from "lucide-react";

const Prescriptions = () => {
  const [activeTab, setActiveTab] = useState("current");

  const currentPrescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      dateIssued: "2024-01-10",
      refillsLeft: 3,
      instructions: "Take with food in the morning",
      condition: "Hypertension",
      status: "active"
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Michael Chen",
      dateIssued: "2023-12-15",
      refillsLeft: 1,
      instructions: "Take with meals",
      condition: "Type 2 Diabetes",
      status: "active"
    },
    {
      id: 3,
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      prescribedBy: "Dr. Sarah Johnson",
      dateIssued: "2023-11-20",
      refillsLeft: 0,
      instructions: "Take at bedtime, avoid grapefruit",
      condition: "High Cholesterol",
      status: "renewal_needed"
    }
  ];

  const prescriptionHistory = [
    {
      id: 4,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      prescribedBy: "Dr. Emily Davis",
      dateIssued: "2023-10-05",
      dateCompleted: "2023-10-15",
      instructions: "Complete full course",
      condition: "Bacterial Infection",
      status: "completed"
    },
    {
      id: 5,
      medication: "Prednisone",
      dosage: "20mg",
      frequency: "Once daily for 7 days",
      prescribedBy: "Dr. Robert Lee",
      dateIssued: "2023-09-12",
      dateCompleted: "2023-09-19",
      instructions: "Take with food, taper as directed",
      condition: "Inflammation",
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "destructive" | "outline" | "secondary", icon: any }> = {
      active: { variant: "default", icon: CheckCircle },
      renewal_needed: { variant: "secondary", icon: RefreshCw },
      completed: { variant: "outline", icon: CheckCircle },
      discontinued: { variant: "destructive", icon: AlertTriangle }
    };

    const { variant, icon: Icon } = config[status] || { variant: "default", icon: CheckCircle };
    
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </Badge>
    );
  };

  const getRefillStatus = (refills: number) => {
    if (refills === 0) return <Badge variant="destructive">No Refills</Badge>;
    if (refills <= 2) return <Badge variant="secondary">{refills} Refills Left</Badge>;
    return <Badge variant="default">{refills} Refills Left</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Prescriptions</h1>
          <p className="text-muted-foreground">Manage your current medications and prescription history</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Medications</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Need Renewal</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">On Schedule</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Interactions</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Prescriptions</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
          </TabsList>

          {/* Current Prescriptions Tab */}
          <TabsContent value="current" className="space-y-4">
            {currentPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Pill className="h-5 w-5 text-primary" />
                        {prescription.medication}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(prescription.status)}
                      {getRefillStatus(prescription.refillsLeft)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Prescribed for:</p>
                      <p className="text-sm text-muted-foreground">{prescription.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prescribed by:</p>
                      <p className="text-sm text-muted-foreground">{prescription.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Date Issued:</p>
                      <p className="text-sm text-muted-foreground">{prescription.dateIssued}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instructions:</p>
                      <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {prescription.status === "renewal_needed" ? (
                      <Button className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Request Renewal
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        disabled={prescription.refillsLeft === 0}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Request Refill
                      </Button>
                    )}
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Prescription History Tab */}
          <TabsContent value="history" className="space-y-4">
            {prescriptionHistory.map((prescription) => (
              <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Pill className="h-5 w-5 text-primary" />
                        {prescription.medication}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                    </div>
                    {getStatusBadge(prescription.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Prescribed for:</p>
                      <p className="text-sm text-muted-foreground">{prescription.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prescribed by:</p>
                      <p className="text-sm text-muted-foreground">{prescription.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Date Issued:</p>
                      <p className="text-sm text-muted-foreground">{prescription.dateIssued}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Date Completed:</p>
                      <p className="text-sm text-muted-foreground">{prescription.dateCompleted}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Instructions:</p>
                    <p className="text-sm">{prescription.instructions}</p>
                  </div>

                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Record
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prescriptions;