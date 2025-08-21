import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TUser } from '@/lib/types/user';
import { cn } from '@/lib/utils/cn';

type TMemberProps = {
  member: TUser;
  userId: string;
};

const Member = ({ member, userId }: TMemberProps) => {
  const avatarFallback: string = (
    member.firstName.charAt(0) + member.lastName.charAt(0)
  ).toUpperCase();

  return (
    <div className="flex w-full items-center gap-3">
      <Avatar className="size-10">
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col break-all">
        <span
          className={cn('capitalize', member.id === userId && 'font-semibold')}
        >
          {member.firstName} {member.lastName} {member.id === userId && '(Me)'}
        </span>

        <span className="text-muted-foreground text-xs">{member.email}</span>
      </div>
    </div>
  );
};

export default Member;
