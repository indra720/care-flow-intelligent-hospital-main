import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Heart, Activity, Pill, Calendar, Lightbulb, AlertTriangle } from "lucide-react";

const AIHealthAssistant = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: "assistant",
      message: "Hello! I'm your AI Health Assistant. I can help you with health information, medication reminders, symptom tracking, and general wellness advice. How can I assist you today?",
      timestamp: "09:00 AM"
    }
  ]);

  const quickSuggestions = [
    "Track my blood pressure readings",
    "Remind me about my medications",
    "What foods are good for heart health?",
    "Explain my lab results",
    "Symptoms I should watch for",
    "Exercise recommendations"
  ];

  const healthInsights = [
    {
      icon: Heart,
      title: "Heart Health",
      insight: "Your recent blood pressure readings show improvement. Keep up with your medication routine.",
      priority: "good"
    },
    {
      icon: Activity,
      title: "Activity Level",
      insight: "You've been less active this week. Consider taking a 20-minute walk daily.",
      priority: "moderate"
    },
    {
      icon: Pill,
      title: "Medication Adherence",
      insight: "Great job! You've taken your medications on time for 7 consecutive days.",
      priority: "good"
    },
    {
      icon: Calendar,
      title: "Upcoming Appointment",
      insight: "You have a cardiology follow-up in 3 days. Remember to bring your blood pressure log.",
      priority: "info"
    }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: conversation.length + 1,
      type: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Simulate AI response
    const aiResponse = {
      id: conversation.length + 2,
      type: "assistant",
      message: getAIResponse(message),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation([...conversation, newUserMessage, aiResponse]);
    setMessage("");
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("blood pressure")) {
      return "I can help you track your blood pressure. Your recent readings show good control. Remember to measure at the same time daily, preferably in the morning. Would you like me to set up a reminder?";
    } else if (lowerMessage.includes("medication")) {
      return "I see you're asking about medications. Based on your profile, you're taking Lisinopril and Metformin. Both should be taken as prescribed. Is there a specific question about your medications?";
    } else if (lowerMessage.includes("exercise") || lowerMessage.includes("activity")) {
      return "For your health conditions, I recommend starting with 20-30 minutes of moderate activity daily. Walking, swimming, or cycling are excellent choices. Always consult your doctor before starting a new exercise routine.";
    } else if (lowerMessage.includes("diet") || lowerMessage.includes("food")) {
      return "A heart-healthy diet includes plenty of fruits, vegetables, whole grains, and lean proteins. Limit sodium intake and avoid processed foods. Would you like specific meal suggestions?";
    } else {
      return "I understand you're asking about " + userMessage + ". While I can provide general health information, please remember that I'm not a replacement for professional medical advice. For specific concerns, consult your healthcare provider.";
    }
  };

  const useSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "good": return "text-green-500";
      case "moderate": return "text-yellow-500";
      case "high": return "text-red-500";
      default: return "text-blue-500";
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      good: "default",
      moderate: "secondary",
      high: "destructive",
      info: "outline"
    };
    return <Badge variant={variants[priority] || "default"}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Health Assistant</h1>
          <p className="text-muted-foreground">Your personal AI companion for health information and wellness guidance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  Health Assistant Chat
                </CardTitle>
              </CardHeader>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {conversation.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your health question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Suggestions */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => useSuggestion(suggestion)}
                      className="text-left justify-start h-auto p-3"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Insights Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthInsights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <insight.icon className={`h-5 w-5 mt-0.5 ${getPriorityColor(insight.priority)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{insight.title}</h4>
                          {getPriorityBadge(insight.priority)}
                        </div>
                        <p className="text-xs text-muted-foreground">{insight.insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Important Notice</h4>
                    <p className="text-xs text-muted-foreground">
                      This AI assistant provides general health information only. 
                      Always consult your healthcare provider for medical advice, 
                      diagnosis, or treatment decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-red-700 mb-2">Emergency Contact</h4>
                <p className="text-sm text-red-600 mb-3">
                  If you're experiencing a medical emergency, call 911 immediately.
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  Call Emergency Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHealthAssistant;