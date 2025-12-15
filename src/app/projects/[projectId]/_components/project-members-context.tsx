'use client';

import { InferSelectModel } from 'drizzle-orm';
import { createContext, useContext, ReactNode } from 'react';
import { projectMembers } from '@/drizzle/schema';
import { TUser } from '@/lib/types/tables/user';

export type TProjectMember = InferSelectModel<typeof projectMembers> & {
  user: TUser;
};

type TProjectContext = {
  members: TProjectMember[];
  currentUserId: string;
};

const ProjectContext = createContext<TProjectContext | null>(null);

type TProjectProviderProps = {
  members: TProjectMember[];
  currentUserId: string;
  children: ReactNode;
};

export const ProjectProvider = ({
  members,
  currentUserId,
  children,
}: TProjectProviderProps) => {
  return (
    <ProjectContext.Provider value={{ members, currentUserId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
