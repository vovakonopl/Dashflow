'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import TaskDetails from '@/app/projects/[projectId]/_components/task-details/TaskDetails';
import TaskForm from '@/components/shared/forms/TaskForm';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TTaskWithMemberIds } from '@/lib/types/tables/task';

type TTaskDetailsDialogProps = {
  task: TTaskWithMemberIds;
  currentUserId: string;
  userRole: 'owner' | 'leader' | 'member';
};

const TaskDetailsContent = ({
  task,
  currentUserId,
  userRole,
}: TTaskDetailsDialogProps) => {
  const t = useTranslations('projects.project.tasks.modal');
  const [isEditing, setIsEditing] = useState(false);

  const handleAfterSubmit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl capitalize">
          {isEditing ? t('actions.edit') : t('detailsTitle')}
        </DialogTitle>
        {isEditing && <DialogDescription>{t('description')}</DialogDescription>}
      </DialogHeader>

      {isEditing ? (
        <TaskForm
          projectId={task.projectId}
          task={task}
          assignedMemberIds={task.assignedMembers.map((m) => m.userId)}
          afterSubmit={handleAfterSubmit}
        />
      ) : (
        <TaskDetails
          task={task}
          currentUserId={currentUserId}
          userRole={userRole}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </>
  );
};

const TaskDetailsDialog = (props: TTaskDetailsDialogProps) => {
  return (
    <DialogContent>
      <TaskDetailsContent {...props} />
    </DialogContent>
  );
};

export default TaskDetailsDialog;
