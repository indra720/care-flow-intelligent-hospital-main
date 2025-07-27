
import { useState } from "react";
import { Calendar, Clock, MapPin, Star, Filter, Search, Video, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/shared/DashboardLayout";

const BookAppointment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const sidebarItems = [
    { icon: Calendar, label: "Dashboard", href: "/dashboard/patient", active: false },
    { icon: Calendar, label: "Book Appointment", href: "/patient/appointments/book", active: true },
  ];

  const specialties = [
    "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology", 
    "Psychiatry", "Oncology", "Endocrinology", "Gastroenterology"
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 124,
      experience: "12 years",
      location: "Heart Center - Floor 3",
      consultationFee: "$150",
      availableSlots: ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"],
      avatar: "/placeholder.svg",
      nextAvailable: "Today"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      rating: 4.9,
      reviews: 89,
      experience: "15 years",
      location: "Neuro Center - Floor 5",
      consultationFee: "$200",
      availableSlots: ["11:00 AM", "01:00 PM", "04:00 PM"],
      avatar: "/placeholder.svg",
      nextAvailable: "Tomorrow"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      rating: 4.7,
      reviews: 156,
      experience: "8 years",
      location: "Children's Wing - Floor 2",
      consultationFee: "$120",
      availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"],
      avatar: "/placeholder.svg",
      nextAvailable: "Today"
    }
  ];

  const filteredDoctors = doctors.filter((doctor) => {
  const matchesSpecialty = selectedSpecialty === "all" || !selectedSpecialty || doctor.specialty === selectedSpecialty;
  return matchesSpecialty;
});


  return (
    <DashboardLayout
      title="Book Appointment"
      role="patient"
      userName="John Smith"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
            <p className="text-muted-foreground">Find and book appointments with our specialists</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search doctors or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <Tabs defaultValue="doctors">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="doctors">Available Doctors</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Booking</TabsTrigger>
              </TabsList>

              <TabsContent value="doctors" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="hover:shadow-medium transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={doctor.avatar} />
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-xl">{doctor.name}</CardTitle>
                            <CardDescription className="text-base">{doctor.specialty}</CardDescription>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-warning text-warning" />
                                <span className="font-medium">{doctor.rating}</span>
                                <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
                              </div>
                              <Badge variant="outline">{doctor.experience}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{doctor.consultationFee}</div>
                            <div className="text-sm text-muted-foreground">Consultation</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {doctor.location}
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Available Slots</span>
                              <Badge variant={doctor.nextAvailable === "Today" ? "default" : "secondary"}>
                                Next: {doctor.nextAvailable}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {doctor.availableSlots.map((slot) => (
                                <Button
                                  key={slot}
                                  variant="outline"
                                  size="sm"
                                  className="justify-start"
                                  onClick={() => setSelectedDoctor({...doctor, selectedSlot: slot})}
                                >
                                  <Clock className="w-3 h-3 mr-1" />
                                  {slot}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4 border-t">
                            <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                              <Calendar className="w-4 h-4 mr-2" />
                              Book In-Person
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Video className="w-4 h-4 mr-2" />
                              Video Call
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="mt-6">
                <Card className="border-emergency">
                  <CardHeader>
                    <CardTitle className="text-emergency">Emergency Appointment</CardTitle>
                    <CardDescription>
                      For urgent medical situations that need immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-emergency/10 rounded-lg border border-emergency/20">
                        <h3 className="font-semibold text-emergency mb-2">Emergency Services Available 24/7</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          If you're experiencing a life-threatening emergency, please call 911 immediately.
                          For urgent but non-life-threatening conditions, our emergency doctors are available.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Available Now:</h4>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>ER</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">Dr. Emergency Team</div>
                                <div className="text-sm text-muted-foreground">Emergency Medicine</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Response Time:</h4>
                            <div className="text-2xl font-bold text-emergency">15 min</div>
                            <div className="text-sm text-muted-foreground">Average wait time</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button className="flex-1 bg-emergency hover:bg-emergency/90 text-emergency-foreground">
                          <User className="w-4 h-4 mr-2" />
                          Book Emergency Visit
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Video className="w-4 h-4 mr-2" />
                          Emergency Video Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedDoctor && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedDoctor.avatar} />
                    <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedDoctor.name}</h3>
                    <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Date & Time</div>
                    <div className="font-medium">{selectedDate || "Today"} at {selectedDoctor.selectedSlot}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Consultation Fee</div>
                    <div className="font-medium">{selectedDoctor.consultationFee}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                    Confirm Booking
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookAppointment;
