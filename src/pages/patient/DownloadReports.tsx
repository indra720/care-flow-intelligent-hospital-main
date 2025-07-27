import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Search, Calendar, Filter, Eye } from "lucide-react";

const DownloadReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDoctor, setFilterDoctor] = useState("all");

  const reports = [
    {
      id: 1,
      title: "Complete Blood Count",
      type: "Lab Report",
      date: "2024-01-08",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      description: "Comprehensive blood analysis including hemoglobin, white blood cells, and platelets",
      fileSize: "2.4 MB",
      status: "available"
    },
    {
      id: 2,
      title: "Chest X-Ray",
      type: "Imaging Report",
      date: "2024-01-05",
      doctor: "Dr. Michael Chen",
      department: "Radiology",
      description: "Chest radiograph showing clear lung fields with no abnormalities",
      fileSize: "8.7 MB",
      status: "available"
    },
    {
      id: 3,
      title: "Echocardiogram",
      type: "Cardiac Report",
      date: "2023-12-28",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      description: "Ultrasound examination of heart structure and function",
      fileSize: "15.2 MB",
      status: "available"
    },
    {
      id: 4,
      title: "Lipid Panel",
      type: "Lab Report",
      date: "2023-12-20",
      doctor: "Dr. Michael Chen",
      department: "General Medicine",
      description: "Cholesterol and triglyceride levels assessment",
      fileSize: "1.8 MB",
      status: "available"
    },
    {
      id: 5,
      title: "MRI Brain Scan",
      type: "Imaging Report",
      date: "2023-11-15",
      doctor: "Dr. Emily Davis",
      department: "Neurology",
      description: "Magnetic resonance imaging of brain structures",
      fileSize: "45.6 MB",
      status: "processing"
    },
    {
      id: 6,
      title: "Dermatology Biopsy",
      type: "Pathology Report",
      date: "2023-10-30",
      doctor: "Dr. Lisa Wong",
      department: "Dermatology",
      description: "Histopathological examination of skin tissue sample",
      fileSize: "3.2 MB",
      status: "available"
    }
  ];

  const doctors = [...new Set(reports.map(report => report.doctor))];
  const reportTypes = [...new Set(reports.map(report => report.type))];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      available: "default",
      processing: "secondary",
      pending: "outline"
    };
    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      "Lab Report": "🧪",
      "Imaging Report": "📷",
      "Cardiac Report": "❤️",
      "Pathology Report": "🔬"
    };
    return iconMap[type] || "📄";
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesDoctor = filterDoctor === "all" || report.doctor === filterDoctor;
    
    return matchesSearch && matchesType && matchesDoctor;
  });

  const handleDownload = (reportId: number, title: string) => {
    // Simulate download
    console.log(`Downloading report ${reportId}: ${title}`);
  };

  const handlePreview = (reportId: number, title: string) => {
    // Simulate preview
    console.log(`Previewing report ${reportId}: ${title}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Download Reports</h1>
          <p className="text-muted-foreground">Access and download your medical reports and test results</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold">{reports.filter(r => r.status === "available").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold">{reports.filter(r => r.status === "processing").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Reports</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {reportTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Doctor</label>
                <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Doctors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {doctors.map(doctor => (
                      <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterDoctor("all");
                  }}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(report.type)}</div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type: </span>
                    <span className="text-muted-foreground">{report.type}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date: </span>
                    <span className="text-muted-foreground">{report.date}</span>
                  </div>
                  <div>
                    <span className="font-medium">Doctor: </span>
                    <span className="text-muted-foreground">{report.doctor}</span>
                  </div>
                  <div>
                    <span className="font-medium">Size: </span>
                    <span className="text-muted-foreground">{report.fileSize}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {report.status === "available" ? (
                    <>
                      <Button 
                        onClick={() => handleDownload(report.id, report.title)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handlePreview(report.id, report.title)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                    </>
                  ) : (
                    <Button disabled className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Processing...
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-4">
                No reports match your current search criteria.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterDoctor("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DownloadReports;