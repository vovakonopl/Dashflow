'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { z } from 'zod';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useGetUsersByEmailQuery } from '@/lib/store/api';
import { userSchema } from '@/lib/validation/user-schema';

const errorMsg = 'Error occurred on the server';

const AddMemberInput = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const debounce = useDebounce();

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setSearchValue(e.target.value.trim());
    }, 500);
  };

  return (
    <div>
      <Label className="mb-2" htmlFor="find-user">
        Find User
      </Label>
      <Input id="find-user" className="mb-2" onChange={handleChange} />

      {/* TODO: create select list with users */}

      {error && !isLoading && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default AddMemberInput;
