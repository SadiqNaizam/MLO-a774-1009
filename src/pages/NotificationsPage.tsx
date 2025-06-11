import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationControls from '@/components/layout/TopNavigationControls';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Home, Bell, Settings as SettingsIcon, LayoutGrid, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}

const initialNotifications: NotificationItem[] = [
  { id: '1', title: 'Payment Successful', message: 'Your transfer of $250.00 to John Doe was successful.', timestamp: '10 min ago', read: false, type: 'success' },
  { id: '2', title: 'Security Alert', message: 'Unusual login attempt detected from a new device. If this was not you, please secure your account.', timestamp: '1 hour ago', read: false, type: 'warning' },
  { id: '3', title: 'E-statement Ready', message: 'Your monthly e-statement for July 2024 is now available.', timestamp: '1 day ago', read: true, type: 'info' },
  { id: '4', title: 'Low Balance Warning', message: 'Your checking account balance is below $100.', timestamp: '2 days ago', read: true, type: 'warning' },
  { id: '5', title: 'Feature Update', message: 'Explore our new budgeting tools in the Insights tab!', timestamp: '5 days ago', read: true, type: 'info' },
];

const NotificationIcon = ({ type }: { type: NotificationItem['type'] }) => {
  if (type === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (type === 'warning') return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  return <Info className="h-5 w-5 text-blue-500" />;
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications);
  console.log('NotificationsPage loaded');

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Accounts', icon: LayoutGrid, href: '/account-details/sample-account-id' },
    { label: 'Notifications', icon: Bell, href: '/notifications', isActive: true },
    { label: 'Settings', icon: SettingsIcon, href: '/settings' },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavigationControls
        title="Notifications"
        onMenuClick={() => navigate('/general-menu')}
        onNotificationsClick={() => navigate('/notifications')} // Current page
        onSettingsClick={() => navigate('/settings')}
      />
      <main className="flex-grow overflow-y-auto p-4 pb-20"> {/* Added pb-20 for bottom nav */}
        <div className="flex justify-between items-center mb-4">
          <Label className="text-lg font-semibold">
            {unreadCount > 0 ? `Recent Notifications (${unreadCount} unread)` : "All Notifications Caught Up"}
          </Label>
          {unreadCount > 0 && <Button variant="outline" size="sm" onClick={markAllAsRead}>Mark all as read</Button>}
        </div>

        {notifications.length === 0 ? (
          <Card className="text-center">
            <CardContent className="p-6">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You have no new notifications.</p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-180px)]"> {/* Adjust height as needed */}
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${
                  notification.read ? 'border-transparent bg-white' : 
                  notification.type === 'success' ? 'border-green-500 bg-green-50' :
                  notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                } shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <NotificationIcon type={notification.type} />
                            <CardTitle className="text-base">{notification.title}</CardTitle>
                        </div>
                        {!notification.read && (
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>Mark read</Button>
                        )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </main>
      <AppBottomNavigationBar navItems={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default NotificationsPage;