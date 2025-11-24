import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnnouncementBannerProps {
  announcement: string;
  className?: string;
}

const AnnouncementBanner = ({ announcement, className }: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!announcement || !isVisible) return null;

  return (
    <div
      className={cn(
        'bg-accent border-l-4 border-primary px-4 py-3 relative',
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-accent-foreground flex-shrink-0 mt-0.5" />
        <p className="text-accent-foreground text-sm font-medium flex-1">
          {announcement}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-accent-foreground hover:text-accent-foreground/80 transition-colors flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
