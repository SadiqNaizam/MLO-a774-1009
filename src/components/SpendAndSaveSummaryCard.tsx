import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Using shadcn Progress

interface SpendAndSaveSummaryCardProps {
  spentAmount: number;
  savedAmount: number;
  budgetAmount?: number; // Optional, for progress calculation
  currencySymbol?: string;
}

const SpendAndSaveSummaryCard: React.FC<SpendAndSaveSummaryCardProps> = ({
  spentAmount,
  savedAmount,
  budgetAmount,
  currencySymbol = '$',
}) => {
  console.log("Rendering SpendAndSaveSummaryCard");
  const progressPercentage = budgetAmount && budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend & Save Summary</CardTitle>
        <CardDescription>Your financial overview for the current period.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Spent</span>
          <span className="text-lg font-semibold">{currencySymbol}{spentAmount.toFixed(2)}</span>
        </div>
        {budgetAmount !== undefined && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Budget: {currencySymbol}{budgetAmount.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">{Math.min(100, Math.max(0, progressPercentage)).toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} aria-label={`Spending progress ${progressPercentage.toFixed(0)}%`} className="h-2" />
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Saved</span>
          <span className="text-lg font-semibold text-green-600">{currencySymbol}{savedAmount.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendAndSaveSummaryCard;