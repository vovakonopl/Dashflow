'use client';

import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useProjectContext } from '@/app/projects/[projectId]/_components/project-members-context';
import TaskPriorityBadge from '@/components/shared/TaskPriorityBadge';
import User from '@/components/shared/User';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toggleTaskCompletionStatus } from '@/lib/actions/task/toggle-task-completion-status';
import { useServerAction } from '@/lib/hooks/useServerAction';
import { TTaskWithMemberIds } from '@/lib/types/tables/task';

type TTaskDetailsProps = {
  task: TTaskWithMemberIds;
  currentUserId: string;
  userRole: 'owner' | 'leader' | 'member';
  onEdit: () => void;
};

const TaskDetails = ({
  task,
  currentUserId,
  userRole,
  onEdit,
}: TTaskDetailsProps) => {
  const t = useTranslations('projects.project.tasks.modal');
  const tGlobal = useTranslations('tasksPage.task');
  const { members } = useProjectContext();

  const [, toggleAction, isPending] = useServerAction(
    toggleTaskCompletionStatus,
  );

  const assignedMembers = members.filter((member) =>
    task.assignedMembers.some(
      (assignment) => assignment.userId === member.user.id,
    ),
  );

  const isAssignedToMe = task.assignedMembers.some(
    (assignment) => assignment.userId === currentUserId,
  );

  const canCompleteTask = isAssignedToMe;
  const canEditTask = userRole === 'leader';

  return (
    <div className="flex flex-col gap-6">
      <ScrollArea className="-mr-4 max-h-[50svh] pr-4">
        <div className="flex flex-col gap-6 px-1">
          {/* Priority & Status */}
          <div className="flex flex-col items-center justify-between gap-2 max-sm:items-start sm:flex-row">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground font-medium">
                {t('field.priority.label')}:
              </span>
              <TaskPriorityBadge priority={task.priority} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                {t('field.status.label')}:
              </span>
              {task.completedAt ? (
                <span className="rounded-md bg-green-500/15 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-500">
                  {tGlobal('completed')}
                </span>
              ) : task.deadline && new Date(task.deadline) < new Date() ? (
                <span className="rounded-md bg-red-500/15 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-500">
                  {tGlobal('overdue')}
                </span>
              ) : (
                <span className="rounded-md bg-blue-500/15 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-500">
                  {tGlobal('inProgress')}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm font-medium">
              {t('field.description.label')}
            </span>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {task.description || '-'}
            </p>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm font-medium">
              {t('field.dueDate.label')}:
            </span>
            <span className="text-sm">
              {task.deadline
                ? new Date(task.deadline)
                    .toLocaleDateString('en-GB')
                    .replace(/\//g, '-')
                : '-'}
            </span>
          </div>

          {/* Assigned Members */}
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm font-medium">
              {t('field.members.labelAssigned')}
            </span>
            {assignedMembers.length > 0 ? (
              <div className="flex flex-col gap-2">
                {assignedMembers.map((member) => (
                  <User size="sm" key={member.user.id} user={member.user} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                {t('field.members.placeholder')}
              </p>
            )}
          </div>
        </div>
      </ScrollArea>

      <Separator />

      <DialogFooter className="gap-2 sm:gap-0">
        <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="w-full sm:w-auto">
            {canCompleteTask && (
              <Button
                onClick={() => toggleAction(task.id)}
                disabled={isPending}
                className={`w-full sm:w-auto ${
                  task.completedAt
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {task.completedAt
                  ? t('actions.uncomplete')
                  : t('actions.complete')}
              </Button>
            )}
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full flex-1 sm:w-auto sm:flex-none"
              >
                {t('actions.cancel')}
              </Button>
            </DialogClose>

            {canEditTask && (
              <Button
                onClick={onEdit}
                className="w-full flex-1 sm:w-auto sm:flex-none"
              >
                <Pencil className="mr-2 h-4 w-4" />
                {t('actions.edit')}
              </Button>
            )}
          </div>
        </div>
      </DialogFooter>
    </div>
  );
};

export default TaskDetails;
