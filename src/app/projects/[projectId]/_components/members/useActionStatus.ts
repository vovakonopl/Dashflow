import { useEffect } from 'react';
import { toast } from 'sonner';
import { TServerActionReturn } from '@/lib/types/form-action-return';

type TActionStatus = {
  closeMenu: () => void;
  isPending: boolean;
  state?: TServerActionReturn;
  toastTitle: string;
};

export function useActionStatus({
  closeMenu,
  isPending,
  state,
  toastTitle,
}: TActionStatus) {
  // close the menu when the action is finished
  useEffect(() => {
    if (!isPending) {
      closeMenu();
    }
  }, [closeMenu, isPending, state]);

  // notify about the occurred error with sonner toast
  useEffect(() => {
    if (!state) return;
    if (!state.isSuccess) {
      toast(toastTitle, {
        description: state.errors.root?.errors[0],
        action: {
          label: 'OK',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  }, [state, toastTitle]);
}
