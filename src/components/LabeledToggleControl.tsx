import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface LabeledToggleControlProps {
  id: string;
  label: string;
  subtext?: string;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const LabeledToggleControl: React.FC<LabeledToggleControlProps> = ({
  id,
  label,
  subtext,
  isChecked,
  onCheckedChange,
  disabled = false,
}) => {
  console.log(`Rendering LabeledToggleControl: ${label}, isChecked: ${isChecked}`);

  return (
    <div className="flex items-center justify-between space-x-2 py-3">
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={`font-medium ${disabled ? 'text-muted-foreground' : ''}`}>
          {label}
        </Label>
        {subtext && <p className="text-sm text-muted-foreground">{subtext}</p>}
      </div>
      <Switch
        id={id}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
};

export default LabeledToggleControl;