'use client';

import { Settings, UserRoundX } from 'lucide-react';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
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
import { TMemberRole } from '@/lib/types/tables/member-roles';

type TDropdownSettingsProps = {
  memberId: string;
  memberRole: TMemberRole;
  projectId: string;
};

const DropdownSettings = ({
  memberId,
  memberRole,
  projectId,
}: TDropdownSettingsProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [state, action, isPending] = useActionState(
    removeMemberFromProject,
    undefined,
  );

  // close the menu when the action is finished
  useEffect(() => {
    if (!isPending) {
      setIsMenuOpened(false);
    }
  }, [isPending, state]);

  // notify about the occurred error with sonner toast
  useEffect(() => {
    if (!state) return;
    if (!state.isSuccess) {
      toast('Failed to remove the user', {
        description: state.errors.root?.errors[0],
        action: {
          label: 'OK',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  }, [state]);

  const handleRemoveMember = () => {
    startTransition(() => action({ projectId, userId: memberId }));
  };

  const newRole: TMemberRole = memberRole === 'member' ? 'leader' : 'member';

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

        <DropdownMenuItem className="cursor-pointer">
          <span>
            Appoint as <span className="font-medium">{newRole}</span>
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isPending}
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
