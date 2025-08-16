'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

type TSignedOutProps = {
  children: ReactNode;
};

// Renders children only when the user is signed out and isLoading is false
const SignedOut = ({ children }: TSignedOutProps) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isSignedIn && !user.isLoading) return children;
  return null;
};

export default SignedOut;
