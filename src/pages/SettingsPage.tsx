import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationControls from '@/components/layout/TopNavigationControls';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Bell, Settings as SettingsIcon, LayoutGrid, User, Shield, Palette, Upload } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = React.useState("John Doe");
  const [profileEmail, setProfileEmail] = React.useState("john.doe@example.com");
  const [enableBiometrics, setEnableBiometrics] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const [smsNotifications, setSmsNotifications] = React.useState(true);

  console.log('SettingsPage loaded');

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Accounts', icon: LayoutGrid, href: '/account-details/sample-account-id' },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Settings', icon: SettingsIcon, href: '/settings', isActive: true },
  ];
  
  const handleProfileSave = () => {
    console.log("Profile saved:", { profileName, profileEmail });
    // Add toast notification here in a real app
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavigationControls
        title="Settings"
        onMenuClick={() => navigate('/general-menu')}
        onNotificationsClick={() => navigate('/notifications')}
        onSettingsClick={() => navigate('/settings')} // Current page
      />
      <main className="flex-grow overflow-y-auto p-4 pb-20"> {/* Added pb-20 for bottom nav */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2 inline-block"/>Profile</TabsTrigger>
            <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2 inline-block"/>Security</TabsTrigger>
            <TabsTrigger value="notifications_prefs"><Bell className="h-4 w-4 mr-2 inline-block"/>Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://i.pravatar.cc/150?u=johndoe" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-2"/>Change Photo</Button>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleProfileSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="biometrics" className="font-medium">Enable Biometric Login</Label>
                    <p className="text-sm text-muted-foreground">Use Face ID or Touch ID to log in.</p>
                  </div>
                  <Switch id="biometrics" checked={enableBiometrics} onCheckedChange={setEnableBiometrics} />
                </div>
                <Button variant="outline">Change PIN</Button>
                <Button variant="outline">Manage Connected Devices</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications_prefs">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you receive updates from us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts directly on your device.</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get updates sent to your email address.</p>
                  </div>
                  <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via text message.</p>
                  </div>
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </CardContent>
               <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <AppBottomNavigationBar navItems={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default SettingsPage;