'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

type TSignedInProps = {
  children: ReactNode;
};

// Renders children only when the user is signed in and isLoading is false
const SignedIn = ({ children }: TSignedInProps) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isSignedIn && !user.isLoading) return children;
  return null;
};

export default SignedIn;
