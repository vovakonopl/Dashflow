'use client';

import { Button } from '@/components/ui/button';
import { toggleTaskCompletionStatus } from '@/lib/actions/task/toggle-task-completion-status';
import { useServerAction } from '@/lib/hooks/useServerAction';

type TChangeTaskStatusButtonProps = { isCompleted: boolean; taskId: string };

const ToggleTaskCompletionButton = ({
  isCompleted,
  taskId,
}: TChangeTaskStatusButtonProps) => {
  const [_, action, isPending] = useServerAction(toggleTaskCompletionStatus);

  const onClick = () => {
    action(taskId);
  };

  return (
    <Button
      variant="outline"
      className="mx-auto select-none"
      onClick={onClick}
      disabled={isPending}
    >
      {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
    </Button>
  );
};

export default ToggleTaskCompletionButton;
