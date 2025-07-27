import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, Phone, Calendar, Clock, MessageSquare, FileText, Camera, Mic } from "lucide-react";

const Telemedicine = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-16",
      time: "10:00 AM",
      duration: "30 minutes",
      type: "Follow-up Consultation",
      avatar: "/placeholder.svg",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: "2024-01-18",
      time: "2:30 PM",
      duration: "20 minutes",
      type: "Medication Review",
      avatar: "/placeholder.svg",
      status: "pending"
    }
  ];

  const pastConsultations = [
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "Dermatologist",
      date: "2024-01-10",
      time: "11:15 AM",
      duration: "25 minutes",
      type: "Skin Condition Review",
      avatar: "/placeholder.svg",
      status: "completed",
      notes: "Prescribed topical treatment, improvement noted"
    },
    {
      id: 4,
      doctor: "Dr. Robert Lee",
      specialty: "Mental Health",
      date: "2024-01-05",
      time: "3:00 PM",
      duration: "45 minutes",
      type: "Therapy Session",
      avatar: "/placeholder.svg",
      status: "completed",
      notes: "Good progress, continue current treatment plan"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      confirmed: "default",
      pending: "secondary",
      completed: "outline",
      cancelled: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const startCall = () => {
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsCameraOn(true);
  };

  if (isInCall) {
    return (
      <div className="h-screen bg-black flex flex-col">
        {/* Video Call Interface */}
        <div className="flex-1 relative">
          {/* Doctor's Video */}
          <div className="h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-gray-300">Cardiologist</p>
            </div>
          </div>
          
          {/* Patient's Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
            <div className="h-full bg-gray-700 flex items-center justify-center text-white">
              {isCameraOn ? (
                <div className="text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">You</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-lg font-semibold">You</span>
                  </div>
                  <p className="text-sm">Camera Off</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Call Info */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Live Consultation</span>
            </div>
            <p className="text-xs text-gray-300">Duration: 05:32</p>
          </div>
        </div>
        
        {/* Call Controls */}
        <div className="bg-gray-900 p-6">
          <div className="flex justify-center items-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full w-16 h-16"
            >
              <Mic className={`w-6 h-6 ${isMuted ? 'text-white' : ''}`} />
            </Button>
            
            <Button
              variant={isCameraOn ? "outline" : "destructive"}
              size="lg"
              onClick={() => setIsCameraOn(!isCameraOn)}
              className="rounded-full w-16 h-16"
            >
              <Camera className={`w-6 h-6 ${!isCameraOn ? 'text-white' : ''}`} />
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              onClick={endCall}
              className="rounded-full w-20 h-16"
            >
              <Phone className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16"
            >
              <FileText className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Telemedicine</h1>
          <p className="text-muted-foreground">Connect with your healthcare providers remotely</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Video className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">Start Video Call</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect instantly with available doctors
              </p>
              <Button onClick={startCall} className="w-full">
                Start Consultation
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">Schedule Video Visit</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a future telemedicine appointment
              </p>
              <Button variant="outline" className="w-full">
                Schedule Now
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">Secure Messaging</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send messages to your care team
              </p>
              <Button variant="outline" className="w-full">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Consultations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-500" />
              Upcoming Video Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={consultation.avatar} />
                      <AvatarFallback>
                        {consultation.doctor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{consultation.doctor}</h4>
                      <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                      <p className="text-sm">{consultation.type}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{consultation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{consultation.time}</span>
                    </div>
                    {getStatusBadge(consultation.status)}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button onClick={startCall} className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Join Call
                    </Button>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Consultations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Recent Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={consultation.avatar} />
                      <AvatarFallback>
                        {consultation.doctor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{consultation.doctor}</h4>
                      <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                      <p className="text-sm">{consultation.type}</p>
                      {consultation.notes && (
                        <p className="text-sm text-muted-foreground mt-1 italic">
                          "{consultation.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{consultation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{consultation.duration}</span>
                    </div>
                    {getStatusBadge(consultation.status)}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      View Summary
                    </Button>
                    <Button variant="outline" size="sm">
                      Schedule Follow-up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Telemedicine;