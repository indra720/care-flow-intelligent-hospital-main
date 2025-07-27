import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Activity, Pill, FileText, Download, Calendar, User } from "lucide-react";

const MedicalHistory = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const medicalOverview = {
    allergies: ["Penicillin", "Shellfish", "Peanuts"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    bloodType: "A+",
    emergencyContact: "Jane Smith - (555) 123-4567"
  };

  const visitHistory = [
    {
      id: 1,
      date: "2024-01-10",
      doctor: "Dr. Sarah Johnson",
      type: "Cardiology Consultation",
      diagnosis: "Routine heart check-up",
      notes: "Blood pressure stable, continue current medication",
      status: "completed"
    },
    {
      id: 2,
      date: "2023-12-15",
      doctor: "Dr. Michael Chen",
      type: "General Check-up",
      diagnosis: "Annual physical examination",
      notes: "Overall health good, recommended dietary changes",
      status: "completed"
    },
    {
      id: 3,
      date: "2023-11-22",
      doctor: "Dr. Emily Davis",
      type: "Dermatology",
      diagnosis: "Skin condition evaluation",
      notes: "Prescribed topical treatment, follow-up in 6 weeks",
      status: "completed"
    }
  ];

  const labResults = [
    {
      id: 1,
      date: "2024-01-08",
      test: "Complete Blood Count",
      status: "normal",
      doctor: "Dr. Sarah Johnson",
      results: {
        "Hemoglobin": "14.2 g/dL (Normal)",
        "White Blood Cells": "6,800/μL (Normal)",
        "Platelets": "285,000/μL (Normal)"
      }
    },
    {
      id: 2,
      date: "2023-12-20",
      test: "Lipid Panel",
      status: "attention",
      doctor: "Dr. Michael Chen",
      results: {
        "Total Cholesterol": "245 mg/dL (High)",
        "LDL": "165 mg/dL (High)",
        "HDL": "45 mg/dL (Low)",
        "Triglycerides": "180 mg/dL (Borderline High)"
      }
    }
  ];

  const surgeries = [
    {
      id: 1,
      date: "2022-06-15",
      procedure: "Appendectomy",
      surgeon: "Dr. Robert Martinez",
      hospital: "City General Hospital",
      notes: "Laparoscopic procedure, no complications"
    },
    {
      id: 2,
      date: "2019-03-20",
      procedure: "Wisdom Tooth Extraction",
      surgeon: "Dr. Lisa Wong",
      hospital: "Dental Clinic East",
      notes: "All four wisdom teeth removed under local anesthesia"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      normal: "default",
      attention: "secondary",
      critical: "destructive",
      completed: "outline"
    };
    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical History</h1>
          <p className="text-muted-foreground">Complete overview of your health records and medical history</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visits">Visit History</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
            <TabsTrigger value="surgeries">Surgeries</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {medicalOverview.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive">{allergy}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    Chronic Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {medicalOverview.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">{condition}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blood Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{medicalOverview.bloodType}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{medicalOverview.emergencyContact}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visit History Tab */}
          <TabsContent value="visits" className="space-y-4">
            {visitHistory.map((visit) => (
              <Card key={visit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{visit.type}</CardTitle>
                      <p className="text-sm text-muted-foreground">with {visit.doctor}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{visit.date}</span>
                      </div>
                      {getStatusBadge(visit.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Diagnosis: </span>
                      <span>{visit.diagnosis}</span>
                    </div>
                    <div>
                      <span className="font-medium">Notes: </span>
                      <span>{visit.notes}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="labs" className="space-y-4">
            {labResults.map((lab) => (
              <Card key={lab.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{lab.test}</CardTitle>
                      <p className="text-sm text-muted-foreground">Ordered by {lab.doctor}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{lab.date}</span>
                      </div>
                      {getStatusBadge(lab.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(lab.results).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Surgeries Tab */}
          <TabsContent value="surgeries" className="space-y-4">
            {surgeries.map((surgery) => (
              <Card key={surgery.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{surgery.procedure}</CardTitle>
                      <p className="text-sm text-muted-foreground">Performed by {surgery.surgeon}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{surgery.date}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Hospital: </span>
                      <span>{surgery.hospital}</span>
                    </div>
                    <div>
                      <span className="font-medium">Notes: </span>
                      <span>{surgery.notes}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <FileText className="h-4 w-4 mr-2" />
                    View Surgical Notes
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

export default MedicalHistory;