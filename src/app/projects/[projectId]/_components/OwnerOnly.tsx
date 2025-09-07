import { ReactNode } from 'react';

type TOwnerOnlyProps = {
  children: ReactNode;
  ownerId: string;
  userId: string;
};

// Displays content only for owner of the project
const OwnerOnly = ({ children, ownerId, userId }: TOwnerOnlyProps) => {
  if (userId !== ownerId) return null;

  return children;
};

export default OwnerOnly;
