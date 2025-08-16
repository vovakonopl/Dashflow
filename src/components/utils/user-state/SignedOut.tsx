'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

type TSignedOutProps = {
  children: ReactNode;

  // If true - content will be displayed only when isLoading property will be false.
  // False by default.
  waitUntilLoaded?: boolean;
};

// Renders children only when the user is signed out and isLoading is false
const SignedOut = ({ children, waitUntilLoaded = false }: TSignedOutProps) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isSignedIn && (!waitUntilLoaded || !user.isLoading)) {
    return children;
  }

  return null;
};

export default SignedOut;
