import { useState } from "react";
import { Settings, Shield, Database, Mail, Bell, Clock, Globe, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    hospitalName: "MedCare Hospital",
    timezone: "America/New_York",
    language: "en",
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
    twoFactorAuth: true,
    sessionTimeout: "30"
  });

  const sidebarItems = [
    { icon: Settings, label: "Dashboard", href: "/dashboard/admin", active: false },
    { icon: Settings, label: "System Settings", href: "/admin/settings", active: true },
  ];

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout
      title="System Settings"
      role="admin"
      userName="Admin User"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure hospital management system settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Configuration
                </CardTitle>
                <CardDescription>Basic hospital and system information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Hospital Name</label>
                    <Input
                      value={settings.hospitalName}
                      onChange={(e) => updateSetting("hospitalName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Zone</label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Default Language</label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground">Version</div>
                    <div>v2.1.4</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">Last Update</div>
                    <div>Jan 15, 2024</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">Database Size</div>
                    <div>1.2 GB</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">Uptime</div>
                    <div>45 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Configuration
                </CardTitle>
                <CardDescription>Manage system security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Require 2FA for all admin accounts</div>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">Restrict system access for maintenance</div>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Password Policy</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Minimum Length</span>
                      <span>8 characters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Require Special Characters</span>
                      <span>Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Password Expiry</span>
                      <span>90 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Login Attempts</span>
                      <span>5 max</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure system-wide notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Send system alerts via email</div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">Send critical alerts via SMS</div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="font-medium">Email Configuration</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">SMTP Server</label>
                      <Input placeholder="smtp.hospital.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">SMTP Port</label>
                      <Input placeholder="587" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">From Email</label>
                      <Input placeholder="noreply@hospital.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">From Name</label>
                      <Input placeholder="MedCare Hospital" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup & Recovery
                </CardTitle>
                <CardDescription>Configure automatic backup and recovery options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automatic Backup</div>
                    <div className="text-sm text-muted-foreground">Enable scheduled backups</div>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => updateSetting("autoBackup", checked)}
                  />
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium mb-2 block">Backup Frequency</label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting("backupFrequency", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="font-medium">Backup Status</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">98%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold">2.1 GB</div>
                      <div className="text-sm text-muted-foreground">Last Backup Size</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold">4 hrs</div>
                      <div className="text-sm text-muted-foreground">Next Backup</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Create Backup Now</Button>
                  <Button variant="outline">Download Latest Backup</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme & Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Default Theme</label>
                  <Select defaultValue="light">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Color</label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-primary"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer"></div>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium mb-2 block">Logo Settings</label>
                  <div className="space-y-2">
                    <Button variant="outline">Upload Hospital Logo</Button>
                    <div className="text-xs text-muted-foreground">Recommended size: 200x60px, PNG or SVG format</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
            Save All Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;