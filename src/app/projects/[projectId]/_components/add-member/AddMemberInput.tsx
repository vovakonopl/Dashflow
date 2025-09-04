'use client';

import { useParams } from 'next/navigation';
import {
  ChangeEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react';
import { z } from 'zod';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addMemberToProject } from '@/lib/actions/project/members/add-member-to-project';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useGetUsersByEmailQuery } from '@/lib/store/api';
import { TUser } from '@/lib/types/tables/user';
import { userSchema } from '@/lib/validation/user-schema';
import { useDialog } from '../dialog-context';
import SelectUserList from './SelectUserList';

const errorMsg = 'Error occurred on the server';

const AddMemberInput = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { projectId } = useParams<{ projectId: string }>();
  const debounce = useDebounce();
  const [actionState, action, isPending] = useActionState(
    addMemberToProject,
    undefined,
  );
  const { setIsOpen } = useDialog();

  // fetch list of users with current searchValue
  const { data, isLoading, isUninitialized } = useGetUsersByEmailQuery(
    searchValue,
    {
      refetchOnMountOrArgChange: true,
      skip: searchValue.length < 3, // don't fetch while the length is too short
    },
  );

  // validate fetched data
  useEffect(() => {
    if (isLoading || isUninitialized) return;

    const result = z.array(userSchema).safeParse(data);
    if (result.error) {
      setError(errorMsg);
      return;
    }

    setError(null);
  }, [data, isLoading, isUninitialized]);

  // handle the action state change
  useEffect(() => {
    if (!actionState) return;
    if (actionState.isSuccess) {
      setIsOpen(false);
      return;
    }

    setError(actionState.errors.root?.errors[0] ?? null);
  }, [actionState, setIsOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setSearchValue(e.target.value.trim());
    }, 500);
  };

  // add new member to the project
  const handleSelect = (userId: string) => {
    startTransition(() => action({ projectId, userId }));
  };

  return (
    <div>
      <Label className="mb-2" htmlFor="find-user">
        Find User
      </Label>
      <Input id="find-user" onChange={handleChange} />

      {data && !error && (
        <SelectUserList
          disabled={isPending}
          onSelect={handleSelect}
          users={data as TUser[]}
        />
      )}

      {error && !isLoading && (
        <ErrorMessage className="mt-2">{error}</ErrorMessage>
      )}
    </div>
  );
};

export default AddMemberInput;
