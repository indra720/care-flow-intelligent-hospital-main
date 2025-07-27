
import { useState } from "react";
import { Calendar, Clock, User, Video, Phone, Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/shared/DashboardLayout";

const DoctorAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const sidebarItems = [
    { icon: Calendar, label: "Dashboard", href: "/dashboard/doctor", active: false },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments", active: true },
  ];

  const appointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "Confirmed",
      mode: "In-Person",
      reason: "Follow-up check",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      patient: "Maria Garcia",
      time: "10:30 AM",
      duration: "45 min",
      type: "Consultation",
      status: "Confirmed",
      mode: "Video Call",
      reason: "Diabetes management",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      patient: "David Wilson",
      time: "02:00 PM",
      duration: "30 min",
      type: "Check-up",
      status: "Pending",
      mode: "In-Person",
      reason: "Annual physical",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      patient: "Sarah Johnson",
      time: "03:30 PM",
      duration: "60 min",
      type: "Consultation",
      status: "Confirmed",
      mode: "Phone Call",
      reason: "Lab results review",
      avatar: "/placeholder.svg"
    }
  ];

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayStats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === "Confirmed").length,
    pending: appointments.filter(a => a.status === "Pending").length,
    completed: 5
  };

  return (
    <DashboardLayout
      title="Appointments"
      role="doctor"
      userName="Dr. Sarah Johnson"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Manage your daily appointments and schedule</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule View
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.total}</div>
              <p className="text-xs text-muted-foreground">Scheduled appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <Clock className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.confirmed}</div>
              <p className="text-xs text-success">Ready to see</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.pending}</div>
              <p className="text-xs text-warning">Awaiting confirmation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <User className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.completed}</div>
              <p className="text-xs text-muted-foreground">Patients seen today</p>
            </CardContent>
          </Card>
        </div>

        {/* Date Selector and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 mb-6">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48"
              />
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search appointments by patient or reason..."
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
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-medium transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={appointment.avatar} />
                              <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                              <p className="text-muted-foreground">{appointment.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-lg font-medium">
                                <Clock className="w-4 h-4" />
                                {appointment.time}
                              </div>
                              <p className="text-sm text-muted-foreground">{appointment.duration}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {appointment.mode === "Video Call" && <Video className="w-4 h-4 text-primary" />}
                              {appointment.mode === "Phone Call" && <Phone className="w-4 h-4 text-primary" />}
                              {appointment.mode === "In-Person" && <User className="w-4 h-4 text-primary" />}
                              <span className="text-sm">{appointment.mode}</span>
                            </div>
                            <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm">
                                Start Consultation
                              </Button>
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar View</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-4 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center font-medium text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                      {[...Array(35)].map((_, i) => (
                        <div key={i} className="aspect-square border rounded-lg p-2 hover:bg-muted/50 cursor-pointer">
                          <div className="text-sm">{((i % 31) + 1)}</div>
                          {i === 15 && (
                            <div className="mt-1">
                              <div className="text-xs bg-primary text-primary-foreground rounded px-1 py-0.5 mb-1">
                                9:00 AM
                              </div>
                              <div className="text-xs bg-secondary text-secondary-foreground rounded px-1 py-0.5">
                                2:00 PM
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline View</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {filteredAppointments.map((appointment, index) => (
                        <div key={appointment.id} className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full ${
                              appointment.status === "Confirmed" ? "bg-success" : "bg-warning"
                            }`} />
                            {index < filteredAppointments.length - 1 && (
                              <div className="w-0.5 h-12 bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={appointment.avatar} />
                                <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{appointment.patient}</h4>
                                <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{appointment.time}</div>
                              <div className="text-sm text-muted-foreground">{appointment.duration}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorAppointments;
