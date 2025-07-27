import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Users, 
  Bot, 
  Stethoscope, 
  Calendar, 
  Pill, 
  TestTube,
  Brain,
  Activity,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";
import medicalHero from "@/assets/medical-hero.jpg";
import medicalIcon from "@/assets/medical-icon.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Diagnostics",
      description: "Advanced AI assists doctors with diagnosis suggestions and pattern recognition",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Multi-Role Management",
      description: "Tailored dashboards for admins, doctors, patients, and staff",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data protection",
      color: "text-warning"
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Live tracking of patient vitals, appointments, and hospital operations",
      color: "text-destructive"
    }
  ];

  const modules = [
    {
      icon: Stethoscope,
      title: "Doctor Portal",
      description: "Manage appointments, patient records, AI diagnosis assistance",
      role: "doctor",
      features: ["AI Diagnosis Support", "Voice-to-Text Notes", "Telemedicine"]
    },
    {
      icon: Users,
      title: "Patient Portal", 
      description: "Book appointments, view medical history, AI health assistant",
      role: "patient",
      features: ["AI Symptom Checker", "Telemedicine", "Health Tracking"]
    },
    {
      icon: Shield,
      title: "Admin Panel",
      description: "Complete hospital management with AI-powered analytics",
      role: "admin",
      features: ["AI Analytics", "Resource Management", "Financial Reports"]
    },
    {
      icon: Calendar,
      title: "Reception Desk",
      description: "Patient registration, appointment scheduling, bed management",
      role: "receptionist",
      features: ["Patient Registration", "Bed Assignment", "Emergency Desk"]
    },
    {
      icon: Pill,
      title: "Pharmacy Module",
      description: "Inventory management with AI stock prediction",
      role: "pharmacist",
      features: ["AI Stock Prediction", "Prescription Processing", "Inventory Alerts"]
    },
    {
      icon: TestTube,
      title: "Laboratory",
      description: "Test management with AI-powered result analysis",
      role: "lab",
      features: ["AI Result Analysis", "Quality Control", "Equipment Monitoring"]
    }
  ];

  const stats = [
    { label: "Healthcare Facilities", value: "500+" },
    { label: "Active Users", value: "50K+" },
    { label: "Patient Records", value: "2M+" },
    { label: "AI Predictions", value: "99.2%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={medicalIcon} alt="MedCare" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">MedCare AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#modules" className="text-muted-foreground hover:text-primary transition-colors">Modules</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </nav>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button variant="medical" onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Healthcare Management
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  The Future of
                  <span className="block text-primary-glow">Hospital Management</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                  Revolutionize healthcare delivery with AI-powered insights, seamless workflows, 
                  and exceptional patient care. Built for modern healthcare professionals.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="medical" 
                  className="text-lg px-8 py-6"
                  onClick={() => navigate("/login")}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-float">
              <img 
                src={medicalHero} 
                alt="Medical Technology" 
                className="rounded-2xl shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of hospital management with cutting-edge AI technology 
              and intuitive design built for healthcare professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-lg bg-muted mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Healthcare Modules
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each module is designed specifically for different healthcare roles, 
              ensuring optimal workflow and user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <module.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/dashboard/${module.role}`)}
                  >
                    Try {module.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your Healthcare Facility?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of healthcare professionals who trust MedCare AI 
              for their daily operations and patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6"
                onClick={() => navigate("/login")}
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10"
              >
                Schedule a Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Trusted by 500+ Hospitals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={medicalIcon} alt="MedCare" className="w-8 h-8" />
              <span className="text-xl font-bold text-primary">MedCare AI</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 MedCare AI. Transforming healthcare with artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
