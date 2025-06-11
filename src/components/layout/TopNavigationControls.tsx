import React from 'react';
import { Bell, Menu, Settings } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';

interface TopNavigationControlsProps {
  title?: string;
  onMenuClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void; // Optional settings
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  title = "Dashboard",
  onMenuClick,
  onNotificationsClick,
  onSettingsClick
}) => {
  console.log("Rendering TopNavigationControls");

  return (
    <header className="bg-background sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {onNotificationsClick && (
          <Button variant="ghost" size="icon" onClick={onNotificationsClick} aria-label="View notifications">
            <Bell className="h-5 w-5" />
            {/* Optional: Add a badge for notification count */}
          </Button>
        )}
        {onSettingsClick && (
           <Button variant="ghost" size="icon" onClick={onSettingsClick} aria-label="Open settings">
            <Settings className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default TopNavigationControls;