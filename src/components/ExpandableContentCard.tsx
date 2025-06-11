import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Icons for expand/collapse

interface ExpandableContentCardProps {
  title: string;
  triggerTextOpen?: string;
  triggerTextClosed?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const ExpandableContentCard: React.FC<ExpandableContentCardProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  console.log(`Rendering ExpandableContentCard: ${title}, isOpen: ${isOpen}`);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="sr-only">{isOpen ? 'Collapse' : 'Expand'}</span>
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="p-4 pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ExpandableContentCard;