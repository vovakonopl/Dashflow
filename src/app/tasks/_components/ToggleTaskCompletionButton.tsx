'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { toggleTaskCompletionStatus } from '@/lib/actions/task/toggle-task-completion-status';
import { useServerAction } from '@/lib/hooks/useServerAction';

type TChangeTaskStatusButtonProps = { isCompleted: boolean; taskId: string };

const ToggleTaskCompletionButton = ({
  isCompleted,
  taskId,
}: TChangeTaskStatusButtonProps) => {
  const t = useTranslations('tasksPage.task.markAs');
  const [, action, isPending] = useServerAction(toggleTaskCompletionStatus);

  return (
    <Button
      variant="outline"
      className="mx-auto select-none"
      onClick={() => action(taskId)}
      disabled={isPending}
    >
      {t(isCompleted ? 'incomplete' : 'complete')}
    </Button>
  );
};

export default ToggleTaskCompletionButton;
