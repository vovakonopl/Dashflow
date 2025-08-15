'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

type TUserLoadingProps = {
  children: ReactNode;
};

// Renders children only while user data is loading
const UserLoading = ({ children }: TUserLoadingProps) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoading) return children;
  return null;
};

export default UserLoading;
