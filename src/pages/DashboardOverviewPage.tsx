import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationControls from '@/components/layout/TopNavigationControls';
import SpendAndSaveSummaryCard from '@/components/SpendAndSaveSummaryCard';
import ExpandableContentCard from '@/components/ExpandableContentCard';
import ESavingsAccountSummaryCard from '@/components/ESavingsAccountSummaryCard';
import LabeledToggleControl from '@/components/LabeledToggleControl';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import { Home, Bell, Settings as SettingsIcon, Menu as MenuIcon, UserCircle, PieChart, LayoutGrid } from 'lucide-react'; // Added MenuIcon

const DashboardOverviewPage = () => {
  const navigate = useNavigate();
  const [overwriteRemaining, setOverwriteRemaining] = React.useState(false);

  console.log('DashboardOverviewPage loaded');

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/dashboard', isActive: true },
    { label: 'Accounts', icon: LayoutGrid, href: '/account-details/sample-account-id' }, // Example, link to a sample account
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Settings', icon: SettingsIcon, href: '/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavigationControls
        title="Dashboard"
        onMenuClick={() => navigate('/general-menu')}
        onNotificationsClick={() => navigate('/notifications')}
        onSettingsClick={() => navigate('/settings')}
      />
      <main className="flex-grow overflow-y-auto p-4 space-y-6 pb-20"> {/* Added pb-20 for bottom nav */}
        <SpendAndSaveSummaryCard
          spentAmount={750.50}
          savedAmount={120.00}
          budgetAmount={1500}
          currencySymbol="$"
        />

        <ExpandableContentCard title="Your Goals & Saving Insights" defaultOpen={false}>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Track your progress towards your financial goals.</p>
            <div>
              <h4 className="font-medium">Vacation Fund</h4>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$750 / $2000</span>
                <span>37%</span>
              </div>
              {/* Placeholder for a progress bar if needed here */}
            </div>
            <div>
              <h4 className="font-medium">New Laptop</h4>
               <div className="flex justify-between text-xs text-muted-foreground">
                <span>$300 / $1200</span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </ExpandableContentCard>

        <ESavingsAccountSummaryCard
          accountName="E-Savings Account"
          balance={5300.75}
          interestRate="1.2% APY"
          currencySymbol="$"
          onNavigate={() => navigate('/account-details/esavings-123')}
        />
         <ESavingsAccountSummaryCard
          accountName="Emergency Fund"
          balance={10250.00}
          interestRate="1.0% APY"
          currencySymbol="$"
          onNavigate={() => navigate('/account-details/emergency-456')}
        />

        <div className="bg-white p-4 rounded-lg shadow">
          <LabeledToggleControl
            id="overwrite-remaining"
            label="Overwrite Remaining Funds"
            subtext="Automatically transfer unspent budget to savings at end of period."
            isChecked={overwriteRemaining}
            onCheckedChange={setOverwriteRemaining}
          />
        </div>
      </main>
      <AppBottomNavigationBar navItems={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default DashboardOverviewPage;