import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Search, Plus, Paperclip, Archive, Star, Circle } from "lucide-react";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      avatar: "/placeholder.svg",
      lastMessage: "Your recent test results look good. Continue with current medication.",
      timestamp: "2 hours ago",
      unread: 2,
      starred: true,
      status: "online"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Medicine",
      avatar: "/placeholder.svg",
      lastMessage: "Please schedule a follow-up appointment for next month.",
      timestamp: "1 day ago",
      unread: 0,
      starred: false,
      status: "offline"
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "Dermatologist",
      avatar: "/placeholder.svg",
      lastMessage: "The prescribed treatment should help. Let me know if symptoms persist.",
      timestamp: "3 days ago",
      unread: 1,
      starred: false,
      status: "away"
    },
    {
      id: 4,
      doctor: "Care Team",
      specialty: "Administration",
      avatar: "/placeholder.svg",
      lastMessage: "Reminder: Your appointment is scheduled for tomorrow at 10 AM.",
      timestamp: "1 week ago",
      unread: 0,
      starred: false,
      status: "online"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "doctor",
      content: "Hello! I've reviewed your recent blood work results. Overall, they look quite good.",
      timestamp: "10:30 AM",
      attachments: []
    },
    {
      id: 2,
      sender: "patient",
      content: "That's great to hear! Should I continue with the same medication dosage?",
      timestamp: "10:32 AM",
      attachments: []
    },
    {
      id: 3,
      sender: "doctor",
      content: "Yes, please continue with the current Lisinopril dosage of 10mg once daily. Your blood pressure has been well controlled.",
      timestamp: "10:35 AM",
      attachments: []
    },
    {
      id: 4,
      sender: "doctor",
      content: "I'm also attaching your lab results for your records. Please review them and let me know if you have any questions.",
      timestamp: "10:36 AM",
      attachments: [
        { name: "Lab_Results_2024.pdf", size: "245 KB" }
      ]
    },
    {
      id: 5,
      sender: "patient",
      content: "Thank you! I'll review the results. When should my next check-up be scheduled?",
      timestamp: "11:15 AM",
      attachments: []
    },
    {
      id: 6,
      sender: "doctor",
      content: "Your recent test results look good. Continue with current medication.",
      timestamp: "2:20 PM",
      attachments: []
    }
  ];

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-green-500";
      case "away": return "text-yellow-500";
      default: return "text-gray-400";
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Secure communication with your healthcare team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>
                              {conversation.doctor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <Circle 
                            className={`absolute -bottom-1 -right-1 w-3 h-3 fill-current ${getStatusColor(conversation.status)}`}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{conversation.doctor}</h4>
                            <div className="flex items-center gap-1">
                              {conversation.starred && (
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              )}
                              {conversation.unread > 0 && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[18px] h-5">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{conversation.specialty}</p>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                {selectedConv && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConv.avatar} />
                          <AvatarFallback>
                            {selectedConv.doctor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Circle 
                          className={`absolute -bottom-1 -right-1 w-3 h-3 fill-current ${getStatusColor(selectedConv.status)}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedConv.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{selectedConv.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'patient' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      
                      {message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-background/10 rounded border">
                              <Paperclip className="h-4 w-4" />
                              <span className="text-xs">{attachment.name}</span>
                              <span className="text-xs text-muted-foreground">({attachment.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className={`text-xs mt-2 ${
                        message.sender === 'patient' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button onClick={sendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;