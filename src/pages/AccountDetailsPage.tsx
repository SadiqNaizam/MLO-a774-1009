import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TopNavigationControls from '@/components/layout/TopNavigationControls';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home, Bell, Settings as SettingsIcon, LayoutGrid, Download, Filter } from 'lucide-react';

// Mock data - in a real app, this would come from an API based on accountId
const accountData: { [key: string]: any } = {
  "esavings-123": {
    name: "E-Savings Account",
    number: "XXXX-XXXX-1234",
    balance: 5300.75,
    interestRate: "1.2% APY",
    transactions: [
      { id: 'txn1', date: '2024-07-15', description: 'Interest Payment', amount: 5.25, type: 'Credit' },
      { id: 'txn2', date: '2024-07-01', description: 'Transfer from Checking', amount: 250.00, type: 'Credit' },
      { id: 'txn3', date: '2024-06-20', description: 'Initial Deposit', amount: 5000.00, type: 'Credit' },
    ]
  },
  "emergency-456": {
    name: "Emergency Fund",
    number: "XXXX-XXXX-5678",
    balance: 10250.00,
    interestRate: "1.0% APY",
    transactions: [
      { id: 'txnA', date: '2024-07-10', description: 'Monthly Contribution', amount: 250.00, type: 'Credit' },
      { id: 'txnB', date: '2024-06-10', description: 'Monthly Contribution', amount: 250.00, type: 'Credit' },
    ]
  },
   "sample-account-id": { // Default for accounts link from bottom nav
    name: "Primary Checking",
    number: "XXXX-XXXX-0000",
    balance: 1850.60,
    transactions: [
      { id: 'txnC', date: '2024-07-28', description: 'Grocery Store', amount: -75.20, type: 'Debit' },
      { id: 'txnD', date: '2024-07-28', description: 'Coffee Shop', amount: -5.50, type: 'Debit' },
      { id: 'txnE', date: '2024-07-27', description: 'Salary Deposit', amount: 2200.00, type: 'Credit' },
    ]
  }
};


const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  console.log(`AccountDetailsPage loaded for account ID: ${accountId}`);

  const currentAccount = accountId ? accountData[accountId] : accountData["sample-account-id"]; // Fallback if no ID

  if (!currentAccount) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopNavigationControls title="Account Not Found" onMenuClick={() => navigate('/general-menu')} />
        <main className="flex-grow p-4 text-center">
          <p>Sorry, the account details could not be found.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </main>
        <AppBottomNavigationBar navItems={navItems} onNavigate={handleNavigation} />
      </div>
    );
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Accounts', icon: LayoutGrid, href: '/account-details/sample-account-id', isActive: true },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Settings', icon: SettingsIcon, href: '/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavigationControls
        title={currentAccount.name || "Account Details"}
        onMenuClick={() => navigate('/general-menu')}
        onNotificationsClick={() => navigate('/notifications')}
        onSettingsClick={() => navigate('/settings')}
      />
      <main className="flex-grow overflow-y-auto p-4 space-y-6 pb-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* Assuming a generic "Accounts" page might exist or link back to a relevant section */}
              <BreadcrumbLink asChild><Link to="/dashboard">Accounts</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentAccount.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader>
            <CardTitle>{currentAccount.name}</CardTitle>
            <CardDescription>Account Number: {currentAccount.number}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">${currentAccount.balance.toFixed(2)}</div>
            {currentAccount.interestRate && <p className="text-sm text-green-600">{currentAccount.interestRate}</p>}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">Make a Transfer</Button>
            <Button variant="outline">Pay Bills</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filter</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
              </div>
            </div>
            <Input type="search" placeholder="Search transactions..." className="mt-2" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAccount.transactions.map((tx: any) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell className={`text-right ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'Credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                 {currentAccount.transactions.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">No transactions found.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <AppBottomNavigationBar navItems={navItems} onNavigate={handleNavigation} />
    </div>
  );
};

export default AccountDetailsPage;