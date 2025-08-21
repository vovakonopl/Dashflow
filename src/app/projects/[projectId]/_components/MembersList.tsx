import Member from '@/app/projects/[projectId]/_components/Member';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TProjectWithTasksAndUsers } from '@/lib/types/project';
import { TUser } from '@/lib/types/user';

type TMembersListProps = {
  project: TProjectWithTasksAndUsers;
  userId: string;
};

const MembersList = ({ project, userId }: TMembersListProps) => {
  const sortedMembersList: TUser[] = project.members
    .map((member) => member.user)
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
    <ScrollArea className="-mr-2 h-96 max-h-fit min-h-64 w-fit pr-6">
      <ul className="flex flex-col gap-4">
        {sortedMembersList.map((member) => (
          <li key={member.id}>
            <Member member={member} userId={userId} />
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default MembersList;
