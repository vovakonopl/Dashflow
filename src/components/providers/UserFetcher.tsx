'use client';

// This component is used to fetch user data when the app loads. It returns null.
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '@/lib/store/api';
import { setUserAndStatus, signOut } from '@/lib/store/slices/user-slice';
import { TUser } from '@/lib/types/user';
import { userSchema } from '@/lib/validation/user-schema';

const UserFetcher = () => {
  const { data, isError, isLoading } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(signOut());
      return;
    }

    // Validate the received data before storing it
    let validatedData: TUser | undefined = undefined;
    if (data) {
      validatedData = userSchema.safeParse(data).data;
    }

    dispatch(
      setUserAndStatus({
        data: validatedData,
        isLoading,
      }),
    );
  }, [dispatch, data, isError, isLoading]);

  return null;
};

export default UserFetcher;
