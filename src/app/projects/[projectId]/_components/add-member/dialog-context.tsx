'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';

type TDialogContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const DialogContext = createContext<TDialogContext | undefined>(undefined);

export const AddMemberDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </Dialog>
    </DialogContext.Provider>
  );
};

export function useAddMemberDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      'useAddMemberDialog must be used within an AddMemberDialogProvider',
    );
  }

  return context;
}
