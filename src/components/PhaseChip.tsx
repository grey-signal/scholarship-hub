import { cn } from '@/lib/utils';

interface PhaseChipProps {
  phase: number;
  label?: string;
  className?: string;
}

const PhaseChip = ({ phase, label, className }: PhaseChipProps) => {
  const getPhaseInfo = () => {
    switch (phase) {
      case 0:
        return {
          text: label || 'Not Started',
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
        };
      case 1:
        return {
          text: label || 'Registration Open',
          bgColor: 'bg-primary',
          textColor: 'text-primary-foreground',
        };
      case 2:
        return {
          text: label || 'Exam Period',
          bgColor: 'bg-warning',
          textColor: 'text-warning-foreground',
        };
      case 3:
        return {
          text: label || 'Results Published',
          bgColor: 'bg-success',
          textColor: 'text-success-foreground',
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
        };
    }
  };

  const { text, bgColor, textColor } = getPhaseInfo();

  return (
    <span
      className={cn(
        'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold',
        bgColor,
        textColor,
        className
      )}
    >
      {text}
    </span>
  );
};

export default PhaseChip;
