import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Menu, 
  Settings, 
  LogOut, 
  User, 
  MessageSquare,
  Moon,
  Sun
} from "lucide-react";
import { Input } from "@/components/ui/input";
import medicalIcon from "@/assets/medical-icon.png";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  role: string;
  userName: string;
  userAvatar?: string;
  notifications?: number;
  sidebarItems: Array<{
    icon: any;
    label: string;
    href: string;
    badge?: string;
    active?: boolean;
  }>;
}

const DashboardLayout = ({
  children,
  title,
  role,
  userName,
  userAvatar,
  notifications = 0,
  sidebarItems
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "doctor": return "default";
      case "patient": return "secondary";
      case "receptionist": return "outline";
      case "pharmacist": return "secondary";
      case "lab": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="h-16 bg-background border-b shadow-soft sticky top-0 z-50 backdrop-blur-sm bg-background/95">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <img src={medicalIcon} alt="MedCare" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-primary hidden sm:block">MedCare AI</h1>
            </div>

            <div className="hidden md:flex items-center">
              <div className="w-px h-6 bg-border mx-4" />
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            </div>
          </div>

          {/* Center Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients, appointments, records..."
                className="pl-10 bg-muted/50 border-none"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-emergency">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={userAvatar} />
                    <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium">{userName}</p>
                    <Badge variant={getRoleBadgeVariant(role)} className="text-xs">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'w-64' : 'w-16'} 
          bg-background border-r shadow-soft transition-all duration-300 
          fixed lg:static h-screen lg:h-auto z-40
          ${!sidebarOpen && 'lg:w-16'}
        `}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${!sidebarOpen && 'lg:w-12 lg:px-0 lg:justify-center'}`}
                onClick={() => window.location.href = item.href}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {(sidebarOpen) && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;