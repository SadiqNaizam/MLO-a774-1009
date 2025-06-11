import React from 'react';
import { Home, LayoutGrid, PieChart, UserCircle } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button'; // Assuming buttons will be used for nav items

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string; // Or an onClick handler
  isActive?: boolean;
}

interface AppBottomNavigationBarProps {
  navItems: NavItem[];
  onNavigate: (href: string) => void; // Simplified navigation handler
}

const AppBottomNavigationBar: React.FC<AppBottomNavigationBarProps> = ({
  navItems = [ // Default example items
    { label: 'Home', icon: Home, href: '/dashboard', isActive: true },
    { label: 'Accounts', icon: LayoutGrid, href: '/accounts' },
    { label: 'Insights', icon: PieChart, href: '/insights' },
    { label: 'Profile', icon: UserCircle, href: '/profile' },
  ],
  onNavigate,
}) => {
  console.log("Rendering AppBottomNavigationBar");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-10">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`flex flex-col items-center justify-center h-full px-2 space-y-1 rounded-none ${
              item.isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => onNavigate(item.href)}
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default AppBottomNavigationBar;