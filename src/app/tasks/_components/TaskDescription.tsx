'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

type TTaskDescriptionProps = {
  description: string | null;
};

const TaskDescription = ({ description }: TTaskDescriptionProps) => {
  // if text doesn't fit in 4 line - wrap it and unwrap only on click
  const [isTextWrapped, setIsTextWrapped] = useState<boolean>(true);

  const toggleWrapped = () => {
    setIsTextWrapped((prev) => !prev);
  };

  if (!description) return null;

  return (
    <p
      className={cn(
        'text-muted-foreground text-sm break-words break-all text-ellipsis',
        isTextWrapped && 'line-clamp-4',
      )}
      onClick={toggleWrapped}
    >
      {description}
    </p>
  );
};

export default TaskDescription;
