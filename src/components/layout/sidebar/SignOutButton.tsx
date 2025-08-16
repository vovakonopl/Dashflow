'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { deleteSessionCookie } from '@/lib/actions/auth/delete-session-cookie';
import { signOut } from '@/lib/store/slices/user-slice';

const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async () => {
    setIsPending(true);

    try {
      await deleteSessionCookie();
    } finally {
      dispatch(signOut());
      setIsPending(false);
      router.push('/');
    }
  };
  return (
    <SidebarMenuButton
      disabled={isPending}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <LogOut />
      <span>Sign Out</span>
    </SidebarMenuButton>
  );
};

export default SignOutButton;
