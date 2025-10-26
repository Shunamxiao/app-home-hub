'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GameDescriptionProps = {
  description: string;
  className?: string;
  lineLimit?: number;
};

export function GameDescription({ description, className, lineLimit = 5 }: GameDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const lines = useMemo(() => description.split('\n'), [description]);
  const isLongText = lines.length > lineLimit;

  const displayText = isExpanded ? description : lines.slice(0, lineLimit).join('\n');

  return (
    <div className={cn('relative', className)}>
      <p className="whitespace-pre-line text-muted-foreground">
        {isLongText && !isExpanded ? `${displayText}...` : displayText}
      </p>
      {isLongText && (
        <div className="mt-2 text-center">
            <Button variant="link" onClick={toggleExpanded} className="text-primary">
                {isExpanded ? 'Read Less' : 'Read More'}
            </Button>
        </div>
      )}
    </div>
  );
}
