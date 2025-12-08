'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

type TTaskDescriptionProps = {
  description: string | null;
};

const TaskDescription = ({ description }: TTaskDescriptionProps) => {
  // if text doesn't fit in 4 line - wrap it and unwrap only on click
  const [isTextWrapped, setIsTextWrapped] = useState<boolean>(true);

  if (!description) return null;

  return (
    <p
      className={cn(
        'text-muted-foreground text-sm break-words break-all text-ellipsis',
        isTextWrapped && 'line-clamp-4',
      )}
      onClick={() => setIsTextWrapped((prev) => !prev)}
    >
      {description}
    </p>
  );
};

export default TaskDescription;
