'use client';

import { Settings, UserRoundX } from 'lucide-react';
import { startTransition, useActionState, useCallback, useState } from 'react';
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
import { removeMemberFromProject } from '@/lib/actions/project/members/remove-member-from-project';
import { updateMemberRole } from '@/lib/actions/project/members/update-member-role';
import { useActionStatus } from '@/lib/actions/project/members/useActionStatus';
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
  const [removeState, removeAction, isRemovePending] = useActionState(
    removeMemberFromProject,
    undefined,
  );
  const [updateState, updateAction, isUpdatePending] = useActionState(
    updateMemberRole,
    undefined,
  );

  // // close the menu when the action is finished
  // // for remove action
  // useEffect(() => {
  //   if (!isRemovePending) {
  //     setIsMenuOpened(false);
  //   }
  // }, [isRemovePending, removeState]);
  //
  // // for update action
  // useEffect(() => {
  //   if (!isUpdatePending) {
  //     setIsMenuOpened(false);
  //   }
  // }, [isUpdatePending, updateState]);
  //
  // // notify about the occurred error with sonner toast
  // // for remove action
  // useEffect(() => {
  //   if (!removeState) return;
  //   if (!removeState.isSuccess) {
  //     createToast(
  //       'Failed to remove the user',
  //       removeState.errors.root?.errors[0],
  //     );
  //   }
  // }, [removeState]);
  //
  // // for update action
  // useEffect(() => {
  //   if (!updateState) return;
  //   if (!updateState.isSuccess) {
  //     createToast(
  //       'Failed to update the role',
  //       updateState.errors.root?.errors[0],
  //     );
  //   }
  // }, [updateState]);

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
    startTransition(() =>
      removeAction({ projectId: project.id, userId: member.id }),
    );
  };

  const newRole: TMemberRole = member.role === 'member' ? 'leader' : 'member';
  const handleUpdateRole = () => {
    startTransition(() =>
      updateAction({ newRole, projectId: project.id, userId: member.id }),
    );
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
