import { Settings, UserRoundX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TMemberRole } from '@/lib/types/tables/member-roles';

type TDropdownSettingsProps = {
  memberRole: TMemberRole;
};

const DropdownSettings = ({ memberRole }: TDropdownSettingsProps) => {
  const newRole: TMemberRole = memberRole === 'member' ? 'leader' : 'member';

  return (
    <DropdownMenu>
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
        <DropdownMenuItem>
          <span>
            Appoint as <span className="font-medium">{newRole}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="text-destructive">Remove from project</span>
          <UserRoundX className="text-destructive" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSettings;
