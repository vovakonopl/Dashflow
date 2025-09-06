import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo } from 'react';
import ErrorMessage from '@/components/shared/ErrorMessage';
import User from '@/components/shared/User';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TUser } from '@/lib/types/tables/user';
import { cn } from '@/lib/utils/cn';

const SHOWED_SELECTED_MEMBERS = 5;

type TMembersToAssignSelectProps = {
  error?: string;
  members: TUser[];
  onChange: (memberIds: string[]) => void;
  values: string[];
};

const MembersToAssignSelect = ({
  error,
  members,
  onChange,
  values,
}: TMembersToAssignSelectProps) => {
  const membersMap = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const selectedMemberIdsSet = useMemo(() => new Set(values), [values]);

  const handleSelect = (memberId: string) => {
    // unselect
    if (selectedMemberIdsSet.has(memberId)) {
      onChange(values.filter((id) => id !== memberId));
      return;
    }

    // select
    onChange([...values, memberId]);
  };

  const filter = (id: string, search: string) => {
    const member = membersMap.get(id);
    if (!member) return 0;

    const name = `${member.firstName} ${member.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase()) ? 1 : 0;
  };

  // show only the first 3 selected members
  const displayedMemberNames = values
    .slice(0, SHOWED_SELECTED_MEMBERS)
    .map((id) => {
      const member = membersMap.get(id);
      if (!member) return '';

      return `${member.firstName} ${member.lastName}`;
    });

  return (
    <div className="mx-auto flex w-fit flex-col gap-2">
      <Label className={cn(error && 'text-destructive')}>
        Members to assign
      </Label>

      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-96 cursor-pointer justify-between"
          >
            <span
              className={cn(
                'overflow-hidden text-start text-ellipsis whitespace-nowrap',
                values.length < 1 && 'text-muted-foreground',
              )}
            >
              {values.length < 1
                ? 'Select members...'
                : `(${values.length}) ${displayedMemberNames.join(', ')}`}
            </span>

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command filter={filter}>
            <CommandInput placeholder="Search member..." className="h-9" />

            <CommandList>
              <CommandEmpty>Member is not found.</CommandEmpty>

              <CommandGroup>
                {members.map((member) => (
                  <CommandItem
                    key={member.id}
                    value={member.id}
                    onSelect={() => handleSelect(member.id)}
                  >
                    <User user={member} size="sm" />

                    <Check
                      className={cn(
                        'ml-auto',
                        selectedMemberIdsSet.has(member.id)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default MembersToAssignSelect;
