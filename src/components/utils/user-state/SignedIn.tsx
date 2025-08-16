'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

type TSignedInProps = {
  children: ReactNode;

  // If true - content will be displayed only when isLoading property will be false.
  // False by default.
  waitUntilLoaded?: boolean;
};

// Renders children only when the user is signed in and isLoading is false
const SignedIn = ({ children, waitUntilLoaded = false }: TSignedInProps) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isSignedIn && (!waitUntilLoaded || !user.isLoading)) {
    return children;
  }

  return null;
};

export default SignedIn;
