import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Shield, Users, Bot, Stethoscope, Clipboard, Pill, UserCheck } from "lucide-react";
import medicalHero from "@/assets/medical-hero.jpg";
import medicalIcon from "@/assets/medical-icon.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (role: string) => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      navigate(`/dashboard/${role}`);
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      icon: Heart,
      title: "Patient Care Excellence",
      description: "Advanced patient management with AI-powered insights"
    },
    {
      icon: Bot,
      title: "AI Integration",
      description: "Smart diagnosis assistance and predictive analytics"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA compliant with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description: "Tailored interfaces for all healthcare professionals"
    }
  ];

  const roleIcons = {
    admin: Shield,
    doctor: Stethoscope,
    patient: Heart,
    receptionist: UserCheck,
    pharmacist: Pill,
    lab: Clipboard
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={medicalIcon} alt="MedCare" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">MedCare AI</h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Welcome to the Future of
                <span className="block text-primary-glow">Healthcare Management</span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Experience next-generation hospital management with AI-powered insights, 
                seamless workflows, and exceptional patient care.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 
                           hover:bg-white/15 transition-all duration-300 hover:shadow-glow"
                >
                  <feature.icon className="w-8 h-8 text-primary-glow mb-3" />
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-fade-in">
            <Card className="shadow-strong border-white/20 bg-background/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl text-primary">Sign In to MedCare</CardTitle>
                <CardDescription>
                  Choose your role and access your personalized healthcare dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Select Your Role</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose your role" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="admin">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Administrator
                            </div>
                          </SelectItem>
                          <SelectItem value="doctor">
                            <div className="flex items-center gap-2">
                              <Stethoscope className="w-4 h-4" />
                              Doctor
                            </div>
                          </SelectItem>
                          <SelectItem value="patient">
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              Patient
                            </div>
                          </SelectItem>
                          <SelectItem value="receptionist">
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4" />
                              Receptionist
                            </div>
                          </SelectItem>
                          <SelectItem value="pharmacist">
                            <div className="flex items-center gap-2">
                              <Pill className="w-4 h-4" />
                              Pharmacist
                            </div>
                          </SelectItem>
                          <SelectItem value="lab">
                            <div className="flex items-center gap-2">
                              <Clipboard className="w-4 h-4" />
                              Lab Technician
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="doctor@medcare.com"
                        type="email"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                        className="h-12"
                      />
                    </div>

                    <Button
                      variant="medical"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => handleLogin("doctor")}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>

                    <div className="text-center">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <div className="text-center py-8">
                      <h3 className="text-lg font-semibold mb-2">New User Registration</h3>
                      <p className="text-muted-foreground mb-4">
                        Contact your system administrator for account creation
                      </p>
                      <Button variant="outline" size="lg">
                        Contact Admin
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Quick Login Buttons for Demo */}
                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Quick Demo Access
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(roleIcons).map(([role, Icon]) => (
                      <Button
                        key={role}
                        variant="outline"
                        size="sm"
                        onClick={() => handleLogin(role)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;