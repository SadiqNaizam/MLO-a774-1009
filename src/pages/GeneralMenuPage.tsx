import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose, // To close the sheet if it were modal
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label"; // Label might not be needed, using text directly
import { Home, HelpCircle, Info, MapPin, LogOut, UserCircle, FileText, Phone } from 'lucide-react';

const GeneralMenuPage = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = React.useState(true); // Open by default for a "page"
  console.log('GeneralMenuPage loaded');

  // If this page is always a sheet, navigating away should "close" it by changing route
  // Or, if it's modal, SheetClose would be used.
  // For a page-based sheet, we might not need explicit close if navigation handles it.

  const menuItems = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "My Profile", icon: UserCircle, href: "/settings" }, // Link to profile tab in settings
    { label: "Statements", icon: FileText, href: "/statements" }, // Placeholder route
    { label: "Help & Support", icon: HelpCircle, href: "/support" }, // Placeholder route
    { label: "Contact Us", icon: Phone, href: "/contact" }, // Placeholder route
    { label: "Find Branch/ATM", icon: MapPin, href: "/locations" }, // Placeholder route
    { label: "About TSB", icon: Info, href: "/about-tsb" }, // Placeholder route
  ];

  const handleLogout = () => {
    console.log("User logged out");
    // Perform logout logic (clear tokens, redirect to login)
    navigate("/login"); // Assuming a login page exists
  };
  
  // This makes the sheet appear as if it's the page content
  // It's non-modal and always open when on this route
  return (
    <div className="min-h-screen bg-muted/40"> {/* Background for the page */}
      <Sheet open={isSheetOpen} onOpenChange={(open) => {
          if (!open) navigate(-1); // Go back if sheet is "closed"
          setIsSheetOpen(open);
        }}>
        {/* No SheetTrigger needed as it's always open or opened by route */}
        <SheetContent side="left" className="w-full sm:max-w-xs p-0 flex flex-col">
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
            <SheetDescription>Navigate through your banking app.</SheetDescription>
          </SheetHeader>
          
          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-base py-3 px-4"
                onClick={() => {
                  navigate(item.href);
                  setIsSheetOpen(false); // "Close" by navigating away
                }}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          
          <Separator className="my-2" />
          
          <SheetFooter className="p-4 border-t">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
       {/* Fallback content if sheet logic were different, for now page is just the sheet */}
       <div className="p-4 ml-0 sm:ml-80"> {/* Adjust margin if sheet is persistent sidebar */}
            {/* This area would be visible if sheet wasn't full-screen or was a sidebar */}
       </div>
    </div>
  );
};

export default GeneralMenuPage;