import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react'; // Example icon for navigation
import { Button } from '@/components/ui/button';

interface ESavingsAccountSummaryCardProps {
  accountName: string;
  balance: number;
  interestRate?: string; // e.g., "1.5% APY"
  currencySymbol?: string;
  onNavigate?: () => void; // Optional navigation action
}

const ESavingsAccountSummaryCard: React.FC<ESavingsAccountSummaryCardProps> = ({
  accountName,
  balance,
  interestRate,
  currencySymbol = '$',
  onNavigate,
}) => {
  console.log("Rendering ESavingsAccountSummaryCard for:", accountName);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{accountName}</CardTitle>
            {interestRate && <CardDescription>{interestRate}</CardDescription>}
          </div>
          {onNavigate && (
             <Button variant="ghost" size="icon" onClick={onNavigate} aria-label={`View details for ${accountName}`}>
                <ArrowRight className="h-5 w-5" />
             </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currencySymbol}{balance.toFixed(2)}
        </div>
        {/* Optional: Small progress bar or recent activity snippet */}
      </CardContent>
    </Card>
  );
};

export default ESavingsAccountSummaryCard;