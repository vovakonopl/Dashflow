'use client';

import { Settings, UserRoundX } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useActionStatus } from '@/app/projects/[projectId]/_components/members/useActionStatus';
import OwnerOnly from '@/app/projects/[projectId]/_components/OwnerOnly';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeMember } from '@/lib/actions/project/members/remove-member';
import { updateMemberRole } from '@/lib/actions/project/members/update-member-role';
import { useServerAction } from '@/lib/hooks/useServerAction';
import { TMemberRole } from '@/lib/types/tables/member-roles-enum';
import { TProject } from '@/lib/types/tables/project';
import { TUser } from '@/lib/types/tables/user';

type TDropdownSettingsProps = {
  currentUserId: string;
  member: TUser & { role: TMemberRole };
  project: TProject;
};

const DropdownSettings = ({
  currentUserId,
  member,
  project,
}: TDropdownSettingsProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [removeState, removeAction, isRemovePending] =
    useServerAction(removeMember);
  const [updateState, updateAction, isUpdatePending] =
    useServerAction(updateMemberRole);

  const closeMenu = useCallback(() => {
    setIsMenuOpened(false);
  }, []);

  // for remove action
  useActionStatus({
    closeMenu,
    isPending: isRemovePending,
    state: removeState,
    toastTitle: 'Failed to remove the user',
  });

  // for update action
  useActionStatus({
    closeMenu,
    isPending: isUpdatePending,
    state: updateState,
    toastTitle: 'Failed to update the role',
  });

  const handleRemoveMember = () => {
    removeAction({ projectId: project.id, userId: member.id });
  };

  const newRole: TMemberRole = member.role === 'member' ? 'leader' : 'member';
  const handleUpdateRole = () => {
    updateAction({ newRole, projectId: project.id, userId: member.id });
  };

  return (
    <DropdownMenu open={isMenuOpened} onOpenChange={setIsMenuOpened}>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer transition-all group-hover:opacity-100 lg:opacity-0"
          size="icon"
          variant="ghost"
        >
          <Settings />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Manage User</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <OwnerOnly ownerId={project.ownerId} userId={currentUserId}>
          <DropdownMenuItem
            disabled={isRemovePending || isUpdatePending}
            className="cursor-pointer disabled:opacity-50"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateRole();
            }}
          >
            <span>
              Appoint as <span className="font-medium">{newRole}</span>
            </span>
          </DropdownMenuItem>
        </OwnerOnly>

        <DropdownMenuItem
          disabled={isRemovePending || isUpdatePending}
          className="cursor-pointer disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault();
            handleRemoveMember();
          }}
        >
          <span className="text-destructive">Remove from project</span>
          <UserRoundX className="text-destructive" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSettings;
