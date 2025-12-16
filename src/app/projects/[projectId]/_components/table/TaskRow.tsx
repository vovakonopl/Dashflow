'use client';

import { DialogProvider } from '@/app/projects/[projectId]/_components/dialog-context';
import { useProjectContext } from '@/app/projects/[projectId]/_components/project-members-context';
import DeadlineCell from '@/app/projects/[projectId]/_components/table/DeadlineCell';
import PriorityCell from '@/app/projects/[projectId]/_components/table/PriorityCell';
import StatusCell from '@/app/projects/[projectId]/_components/table/StatusCell';
import TaskDetailsDialog from '@/app/projects/[projectId]/_components/task-details/TaskDetailsDialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { TTaskWithMemberIds } from '@/lib/types/tables/task';

type TTaskRowProps = {
  task: TTaskWithMemberIds;
};

const TaskRow = ({ task }: TTaskRowProps) => {
  const { currentUserId, members } = useProjectContext();
  const isCompleted = !!task.completedAt;

  const currentUserRole =
    members.find((m) => m.user.id === currentUserId)?.role || 'member';

  return (
    <DialogProvider>
      <TableRow>
        <TableCell className="break-all whitespace-normal">
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start text-left font-normal whitespace-normal hover:bg-transparent hover:underline"
            >
              {task.title}
            </Button>
          </DialogTrigger>
        </TableCell>
        <StatusCell isCompleted={isCompleted} />
        <DeadlineCell date={task.deadline} isCompleted={isCompleted} />
        <PriorityCell priority={task.priority} />
      </TableRow>

      <TaskDetailsDialog
        task={task}
        currentUserId={currentUserId}
        userRole={currentUserRole}
      />
    </DialogProvider>
  );
};

export default TaskRow;
