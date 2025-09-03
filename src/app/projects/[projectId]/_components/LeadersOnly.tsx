import { ReactNode } from 'react';
import { TProjectWithTasksAndUsers } from '@/lib/types/tables/project';

type TLeadersOnlyProps = {
  children: ReactNode;
  project: TProjectWithTasksAndUsers;
  userId: string;
};

// Displays content only for members with role leader
const LeadersOnly = ({ children, project, userId }: TLeadersOnlyProps) => {
  const leaderIds: string[] = project.members
    .filter((member) => member.role === 'leader')
    .map((member) => member.userId);

  if (!leaderIds.includes(userId)) return null;

  return children;
};

export default LeadersOnly;
