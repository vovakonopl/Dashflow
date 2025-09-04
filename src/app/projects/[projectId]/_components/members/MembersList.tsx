import { ComponentProps } from 'react';
import LeadersOnly from '@/app/projects/[projectId]/_components/LeadersOnly';
import DropdownSettings from '@/app/projects/[projectId]/_components/members/DropdownSettings';
import OwnerOnly from '@/app/projects/[projectId]/_components/OwnerOnly';
import User from '@/components/shared/User';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TMemberRole } from '@/lib/types/tables/member-roles';
import { TProjectWithTasksAndUsers } from '@/lib/types/tables/project';
import { TUser } from '@/lib/types/tables/user';
import { cn } from '@/lib/utils/cn';

const DropdownSettingsWrapper = ({
  children,
  role,
  ...props
}: ComponentProps<typeof OwnerOnly> & {
  role: TMemberRole;
}) => {
  // if the member is a leader, then only the owner can see the settings
  if (role === 'leader') {
    return <OwnerOnly {...props}>{children}</OwnerOnly>;
  }

  return children;
};

type TMembersListProps = {
  className?: string;
  project: TProjectWithTasksAndUsers;
  userId: string;
};

const MembersList = ({ className, project, userId }: TMembersListProps) => {
  const sortedMembersList: (TUser & { role: TMemberRole })[] = project.members
    .map((member) => ({ ...member.user, role: member.role }))
    .sort((a, b) => {
      // the current user must be on the first place
      if (a.id === userId) return -1;
      if (b.id === userId) return 1;

      // compare alphabetically
      const fullNameA = (a.firstName + a.lastName).toLowerCase();
      const fullNameB = (b.firstName + b.lastName).toLowerCase();
      return fullNameA.localeCompare(fullNameB);
    });

  return (
    <ScrollArea
      className={cn('-mr-2 h-96 max-h-fit min-h-64 w-full pr-2', className)}
    >
      <ul className="flex flex-col gap-2">
        {sortedMembersList.map((member) => (
          <li
            className="group flex w-full justify-between gap-1 rounded px-2 py-1 hover:bg-black/5"
            key={member.id}
          >
            <User
              isCurrentUser={member.id === userId}
              role={member.role}
              size="sm"
              user={member}
            />

            <LeadersOnly project={project} userId={userId}>
              {/* display settings button for all users except the current one  */}
              {member.id !== userId && (
                <DropdownSettingsWrapper
                  role={member.role}
                  ownerId={project.ownerId}
                  userId={userId}
                >
                  <DropdownSettings
                    memberId={member.id}
                    memberRole={member.role}
                    projectId={project.id}
                  />
                </DropdownSettingsWrapper>
              )}
            </LeadersOnly>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default MembersList;
