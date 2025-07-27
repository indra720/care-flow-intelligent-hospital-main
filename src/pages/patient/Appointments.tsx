import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Video, Plus, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "In-Person",
      status: "confirmed",
      location: "Room 302, Main Building",
      notes: "Follow-up consultation for heart check-up"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "Video Call",
      status: "pending",
      location: "Online",
      notes: "Routine check-up and medication review"
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "Dermatologist",
      date: "2024-01-22",
      time: "11:15 AM",
      type: "In-Person",
      status: "completed",
      location: "Room 205, Dermatology Wing",
      notes: "Skin condition follow-up"
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

  const getTypeIcon = (type: string) => {
    return type === "Video Call" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />;
  };

  const filteredAppointments = filterStatus === "all" 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
            <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
          </div>
          <Button onClick={() => navigate("/patient/appointments/book")} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Book New Appointment
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by status:</span>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All appointments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Appointments List */}
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(appointment.type)}
                    <span className="text-sm">{appointment.location}</span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{appointment.notes}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  {appointment.status === "confirmed" && (
                    <>
                      {appointment.type === "Video Call" ? (
                        <Button variant="default" size="sm" className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Join Video Call
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          View Directions
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Office
                      </Button>
                    </>
                  )}
                  {appointment.status === "pending" && (
                    <Button variant="destructive" size="sm">
                      Cancel Appointment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
              <p className="text-muted-foreground mb-4">You don't have any appointments matching the selected filter.</p>
              <Button onClick={() => navigate("/patient/appointments/book")}>
                Book Your First Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Appointments;