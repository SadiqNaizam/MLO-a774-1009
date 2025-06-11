import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

// Import newly generated pages
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import GeneralMenuPage from "./pages/GeneralMenuPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Application Pages */}
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/account-details/:accountId" element={<AccountDetailsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/general-menu" element={<GeneralMenuPage />} />

          {/* Placeholder for login if logout is used */}
          <Route path="/login" element={<div>Login Page Placeholder - Navigate to /dashboard to see app</div>} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;