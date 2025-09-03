import User from '@/components/shared/User';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TUser } from '@/lib/types/user';

type TSelectUserListProps = {
  disabled: boolean;
  onSelect: (id: string) => void;
  users: TUser[];
};

const SelectUserList = ({
  disabled,
  onSelect,
  users,
}: TSelectUserListProps) => {
  return (
    <ul className="mt-2 flex flex-col gap-1">
      <ScrollArea className="h-[30dvh] max-h-fit">
        {users.map((user) => (
          <li
            className="w-full rounded transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            key={user.id}
          >
            <button
              className="size-full cursor-pointer px-4 py-2 text-start"
              disabled={disabled}
              onClick={() => onSelect?.(user.id)}
            >
              <User user={user} size="sm" />
            </button>
          </li>
        ))}

        {users.length === 0 && (
          <div className="w-full text-center">
            <span className="text-muted-foreground italic">
              No matches were found
            </span>
          </div>
        )}
      </ScrollArea>
    </ul>
  );
};

export default SelectUserList;
