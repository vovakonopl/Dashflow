import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TUser } from '@/lib/types/user';
import { cn } from '@/lib/utils/cn';

type TUserProps = {
  isCurrentUser?: boolean;
  user: TUser;
  size?: 'sm' | 'md';
};

const User = ({ isCurrentUser, user, size = 'md' }: TUserProps) => {
  const avatarFallback: string = (
    user.firstName.charAt(0) + user.lastName.charAt(0)
  ).toUpperCase();

  return (
    <div
      className={cn(
        'flex w-full items-center',
        size === 'sm' && 'gap-2',
        size === 'md' && 'gap-3',
      )}
    >
      <Avatar
        className={cn(size === 'sm' && 'size-8', size === 'md' && 'size-10')}
      >
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <div
        className={cn('flex flex-col break-all', size === 'sm' && 'text-sm')}
      >
        <span className={cn('capitalize', isCurrentUser && 'font-semibold')}>
          {user.firstName} {user.lastName} {isCurrentUser && '(Me)'}
        </span>

        <span className="text-muted-foreground text-xs">{user.email}</span>
      </div>
    </div>
  );
};

export default User;
