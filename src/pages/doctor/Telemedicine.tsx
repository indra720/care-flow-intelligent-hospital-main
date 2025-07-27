import { useState } from "react";
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Calendar, FileText, MessageSquare, Users, Clock, Settings } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/shared/DashboardLayout";

const Telemedicine = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentPatient, setCurrentPatient] = useState<string | null>(null);

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: FileText, label: "Patient Records", href: "/doctor/records" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: FileText, label: "Diagnostic Requests", href: "/doctor/diagnostics" },
    { icon: FileText, label: "AI Assistance", href: "/doctor/ai-assistance" },
    { icon: FileText, label: "Voice Notes", href: "/doctor/voice-notes" },
    { icon: Video, label: "Telemedicine", href: "/doctor/telemedicine", active: true },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      patientId: "P001",
      avatar: "/placeholder.svg",
      time: "10:00 AM",
      date: "Today",
      type: "Follow-up",
      status: "Scheduled",
      duration: "30 min",
      reason: "Hypertension follow-up"
    },
    {
      id: 2,
      patient: "Michael Chen",
      patientId: "P002",
      avatar: "/placeholder.svg",
      time: "11:30 AM",
      date: "Today",
      type: "Consultation",
      status: "Waiting",
      duration: "45 min",
      reason: "Chest pain evaluation"
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      patientId: "P003",
      avatar: "/placeholder.svg",
      time: "2:00 PM",
      date: "Today",
      type: "Check-up",
      status: "Scheduled",
      duration: "30 min",
      reason: "Routine checkup"
    }
  ];

  const recentSessions = [
    {
      id: 1,
      patient: "David Wilson",
      date: "2024-01-14",
      duration: "25 min",
      type: "Emergency",
      status: "Completed",
      notes: "Patient reported severe headache. Prescribed pain medication. Recommended follow-up if symptoms persist."
    },
    {
      id: 2,
      patient: "Lisa Anderson",
      date: "2024-01-13",
      duration: "35 min",
      type: "Consultation",
      status: "Completed",
      notes: "Initial consultation for diabetes management. Discussed lifestyle changes and medication options."
    }
  ];

  const startCall = (patientName: string) => {
    setIsInCall(true);
    setCurrentPatient(patientName);
  };

  const endCall = () => {
    setIsInCall(false);
    setCurrentPatient(null);
    setIsMuted(false);
    setIsVideoOn(true);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "Scheduled": "secondary",
      "Waiting": "default",
      "In Progress": "outline",
      "Completed": "outline"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  if (isInCall) {
    return (
      <div className="h-screen bg-black flex flex-col">
        {/* Video Call Interface */}
        <div className="flex-1 relative">
          {/* Main video area */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
            <div className="text-center text-white">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" alt={currentPatient} />
                <AvatarFallback className="text-4xl">{currentPatient?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold">{currentPatient}</h2>
              <p className="text-gray-300">Connected • 05:23</p>
            </div>
          </div>

          {/* Self video (picture-in-picture) */}
          <div className="absolute top-4 right-4 w-48 h-32 bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <div className="text-white text-center">
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src="/placeholder.svg" alt="Dr. Smith" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <p className="text-sm">Dr. Smith</p>
              </div>
            </div>
          </div>

          {/* Call controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full p-4">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full h-12 w-12"
                onClick={endCall}
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12"
              >
                <Settings className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Telemedicine"
      role="doctor"
      userName="Dr. Smith"
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Telemedicine</h1>
            <p className="text-muted-foreground">Conduct virtual consultations with patients</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Call Settings
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Video className="mr-2 h-4 w-4" />
                  Start Instant Call
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Instant Call</DialogTitle>
                  <DialogDescription>Start a video call with a patient</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patient">Select Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p001">Sarah Johnson (P001)</SelectItem>
                        <SelectItem value="p002">Michael Chen (P002)</SelectItem>
                        <SelectItem value="p003">Emily Rodriguez (P003)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reason">Call Reason</Label>
                    <Textarea placeholder="Brief reason for the call..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={() => startCall("Selected Patient")}>Start Call</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                              <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                              <p className="text-muted-foreground">
                                {appointment.patientId} • {appointment.time} • {appointment.duration}
                              </p>
                              <p className="text-sm">{appointment.reason}</p>
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(appointment.status)}
                              <Badge variant="outline">{appointment.type}</Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => startCall(appointment.patient)}
                              >
                                <Video className="mr-2 h-4 w-4" />
                                Join Call
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-4">
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold">{session.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(session.date).toLocaleDateString()} • {session.duration}
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{session.type}</Badge>
                              <Badge variant="outline">{session.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">SESSION NOTES</h4>
                          <p className="text-sm bg-muted/50 p-3 rounded-lg">{session.notes}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Call Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Call Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Waiting Room</span>
                    <Badge variant="secondary">1 Patient</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Today's Calls</span>
                    <span className="text-sm font-medium">7 completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" />
                  Test Camera
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="mr-2 h-4 w-4" />
                  Test Microphone
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Waiting Room
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Connection Info */}
            <Card>
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Video className="h-4 w-4" />
                  <AlertDescription>
                    Video quality: HD • Connection: Excellent
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Telemedicine;