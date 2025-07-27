import { useState } from "react";
import { Mic, Square, Play, Pause, Download, Search, Calendar, FileText, Phone, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DashboardLayout from "@/components/shared/DashboardLayout";

const VoiceNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: FileText, label: "Patient Records", href: "/doctor/records" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: FileText, label: "Diagnostic Requests", href: "/doctor/diagnostics" },
    { icon: FileText, label: "AI Assistance", href: "/doctor/ai-assistance" },
    { icon: Mic, label: "Voice Notes", href: "/doctor/voice-notes", active: true },
    { icon: Phone, label: "Telemedicine", href: "/doctor/telemedicine" },
  ];

  const voiceNotes = [
    {
      id: 1,
      title: "Patient Consultation - Sarah Johnson",
      patient: "Sarah Johnson",
      patientId: "P001",
      date: "2024-01-15",
      duration: "3:45",
      category: "Consultation",
      transcription: "Patient reports persistent headaches over the past two weeks. Pain is described as throbbing, primarily frontal. No visual disturbances or nausea. Patient history includes hypertension. Blood pressure today 145/92. Recommend increasing lisinopril dose and follow-up in two weeks.",
      tags: ["headache", "hypertension", "follow-up"],
      status: "Transcribed"
    },
    {
      id: 2,
      title: "Surgical Notes - Michael Chen",
      patient: "Michael Chen",
      patientId: "P002",
      date: "2024-01-14",
      duration: "8:20",
      category: "Surgery",
      transcription: "Laparoscopic appendectomy performed successfully. Three ports used. Appendix showed signs of acute inflammation. No complications during procedure. Patient tolerated anesthesia well. Post-operative instructions given. Expected recovery 2-3 days.",
      tags: ["appendectomy", "surgery", "post-op"],
      status: "Transcribed"
    },
    {
      id: 3,
      title: "Clinical Observation - Emily Rodriguez",
      patient: "Emily Rodriguez",
      patientId: "P003",
      date: "2024-01-12",
      duration: "2:30",
      category: "Observation",
      transcription: "Patient showing improvement in asthma symptoms. Peak flow measurements improved from 250 to 320. Inhaler technique reviewed and corrected. Continue current medication regimen. Next appointment in one month.",
      tags: ["asthma", "improvement", "medication"],
      status: "Transcribed"
    },
    {
      id: 4,
      title: "Emergency Case - David Wilson",
      patient: "David Wilson",
      patientId: "P004",
      date: "2024-01-10",
      duration: "5:15",
      category: "Emergency",
      transcription: "",
      tags: ["emergency", "trauma"],
      status: "Processing"
    }
  ];

  const filteredNotes = voiceNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.transcription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || note.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // In a real app, start audio recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, stop audio recording and process
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      "Consultation": "default",
      "Surgery": "destructive",
      "Observation": "secondary",
      "Emergency": "outline"
    } as const;
    return <Badge variant={variants[category as keyof typeof variants] || "outline"}>{category}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "Transcribed" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <DashboardLayout
      title="Voice Notes"
      role="doctor"
      userName="Dr. Smith"
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Voice Notes</h1>
            <p className="text-muted-foreground">Record and manage clinical voice notes</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mic className="mr-2 h-4 w-4" />
                  Quick Record
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quick Voice Recording</DialogTitle>
                  <DialogDescription>Record a quick voice note</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      {!isRecording ? (
                        <Button onClick={startRecording} size="lg" className="h-20 w-20 rounded-full">
                          <Mic className="h-8 w-8" />
                        </Button>
                      ) : (
                        <Button onClick={stopRecording} variant="destructive" size="lg" className="h-20 w-20 rounded-full">
                          <Square className="h-8 w-8" />
                        </Button>
                      )}
                    </div>
                    {isRecording && (
                      <div className="space-y-2">
                        <div className="text-lg font-mono">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</div>
                        <div className="flex justify-center">
                          <div className="animate-pulse bg-destructive h-3 w-3 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="observation">Observation</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="patient">Patient (Optional)</Label>
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
                </div>
              </DialogContent>
            </Dialog>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Import Audio
            </Button>
          </div>
        </div>

        {/* Recording Status Alert */}
        {isRecording && (
          <Alert>
            <Mic className="h-4 w-4" />
            <AlertDescription>
              Recording in progress... Click the stop button to finish recording.
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search voice notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
              <SelectItem value="observation">Observation</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Voice Notes List */}
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={note.patient} />
                      <AvatarFallback>{note.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <CardDescription>
                        {note.patient} ({note.patientId}) • {new Date(note.date).toLocaleDateString()} • {note.duration}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(note.category)}
                    {getStatusBadge(note.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Audio Controls */}
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 bg-background h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-1/3"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{note.duration}</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                {/* Transcription */}
                {note.status === "Transcribed" ? (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">TRANSCRIPTION</h4>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{note.transcription}</p>
                    
                    {/* Tags */}
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Transcription in progress...</p>
                    <div className="mt-2 animate-pulse h-2 bg-primary/30 rounded-full">
                      <div className="h-full bg-primary rounded-full w-2/3"></div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VoiceNotes;