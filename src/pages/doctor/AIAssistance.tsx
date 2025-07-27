import { useState } from "react";
import { Send, Bot, User, Brain, Search, FileText, AlertTriangle, Calendar, Phone, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLayout from "@/components/shared/DashboardLayout";

const AIAssistance = () => {
  const [currentChat, setCurrentChat] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "user",
      message: "What are the differential diagnoses for a 45-year-old patient with chest pain and shortness of breath?",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      type: "ai",
      message: "Based on the symptoms of chest pain and shortness of breath in a 45-year-old patient, here are the key differential diagnoses to consider:\n\n**Cardiovascular:**\n• Myocardial infarction (heart attack)\n• Angina pectoris\n• Pulmonary embolism\n• Aortic dissection\n\n**Pulmonary:**\n• Pneumonia\n• Pneumothorax\n• Asthma exacerbation\n• COPD exacerbation\n\n**Other considerations:**\n• Gastroesophageal reflux disease (GERD)\n• Anxiety/panic attack\n• Musculoskeletal chest pain\n\n**Recommended immediate workup:**\n• ECG\n• Chest X-ray\n• Cardiac enzymes (troponin)\n• D-dimer if PE suspected\n• Vital signs including oxygen saturation",
      timestamp: "10:31 AM"
    }
  ]);

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: FileText, label: "Patient Records", href: "/doctor/records" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: FileText, label: "Diagnostic Requests", href: "/doctor/diagnostics" },
    { icon: Brain, label: "AI Assistance", href: "/doctor/ai-assistance", active: true },
    { icon: FileText, label: "Voice Notes", href: "/doctor/voice-notes" },
    { icon: Phone, label: "Telemedicine", href: "/doctor/telemedicine" },
  ];

  const aiInsights = [
    {
      id: 1,
      patient: "Sarah Johnson",
      type: "Drug Interaction Alert",
      severity: "High",
      message: "Potential interaction between prescribed Warfarin and new Amoxicillin. Monitor INR closely.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      patient: "Michael Chen",
      type: "Clinical Recommendation",
      severity: "Medium",
      message: "Patient's HbA1c trend suggests need for diabetes medication adjustment. Consider increasing metformin dose.",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      type: "Diagnostic Suggestion",
      severity: "Low",
      message: "Based on symptoms and history, consider ordering thyroid function tests for fatigue evaluation.",
      timestamp: "6 hours ago"
    }
  ];

  const clinicalTools = [
    {
      name: "Drug Interaction Checker",
      description: "Check for potential drug interactions and contraindications",
      icon: AlertTriangle,
      color: "text-orange-500"
    },
    {
      name: "Differential Diagnosis Assistant",
      description: "Get AI-powered differential diagnosis suggestions based on symptoms",
      icon: Search,
      color: "text-blue-500"
    },
    {
      name: "Treatment Guidelines",
      description: "Access evidence-based treatment recommendations",
      icon: FileText,
      color: "text-green-500"
    },
    {
      name: "Risk Calculator",
      description: "Calculate risk scores for various medical conditions",
      icon: TrendingUp,
      color: "text-purple-500"
    }
  ];

  const handleSendMessage = () => {
    if (currentChat.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        type: "user" as const,
        message: currentChat,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory([...chatHistory, newMessage]);
      setCurrentChat("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatHistory.length + 2,
          type: "ai" as const,
          message: "I'm analyzing your query. This is a simulated AI response for demonstration purposes. In a real implementation, this would connect to a medical AI service to provide evidence-based clinical assistance.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      "High": "destructive",
      "Medium": "secondary",
      "Low": "outline"
    } as const;
    return <Badge variant={variants[severity as keyof typeof variants]}>{severity}</Badge>;
  };

  return (
    <DashboardLayout
      title="AI Clinical Assistant"
      role="doctor"
      userName="Dr. Smith"
      notifications={3}
      sidebarItems={sidebarItems}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Clinical Assistant</h1>
            <p className="text-muted-foreground">Get AI-powered clinical insights and assistance</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">AI Chat</TabsTrigger>
                <TabsTrigger value="tools">Clinical Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Clinical AI Assistant
                    </CardTitle>
                    <CardDescription>Ask clinical questions and get evidence-based insights</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {chatHistory.map((message) => (
                          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                              <Avatar className="h-8 w-8">
                                {message.type === 'user' ? (
                                  <>
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback>DS</AvatarFallback>
                                  </>
                                ) : (
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className={`rounded-lg p-3 ${
                                message.type === 'user' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                                <p className={`text-xs mt-2 ${
                                  message.type === 'user' 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-muted-foreground'
                                }`}>
                                  {message.timestamp}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Textarea
                        placeholder="Ask a clinical question..."
                        value={currentChat}
                        onChange={(e) => setCurrentChat(e.target.value)}
                        className="min-h-[60px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} className="self-end">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tools" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clinicalTools.map((tool, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg bg-muted ${tool.color}`}>
                            <tool.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                            <Button variant="outline" size="sm" className="mt-3">
                              Launch Tool
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Insights
                </CardTitle>
                <CardDescription>Recent clinical alerts and suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{insight.patient}</p>
                      {getSeverityBadge(insight.severity)}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{insight.type}</p>
                    <p className="text-sm">{insight.message}</p>
                    <p className="text-xs text-muted-foreground">{insight.timestamp}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Medical Literature Search
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Clinical Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Drug Reference
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Risk Calculators
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistance;