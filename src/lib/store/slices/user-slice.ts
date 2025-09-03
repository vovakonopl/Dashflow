import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@/lib/types/tables/user';

type TSignedInUser = { isSignedIn: true; data: TUser };
type TSignedOutUser = { isSignedIn: false; data: null };
type TUserState = { isLoading: boolean } & (TSignedInUser | TSignedOutUser);

const initialState: TUserState = {
  isLoading: true, // init as pending request for a user data
  isSignedIn: false,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUserAndStatus: (
      state: TUserState,
      action: PayloadAction<{ data?: TUser; isLoading?: boolean }>,
    ) => {
      if (action.payload.data !== undefined) {
        state.isSignedIn = true;
        state.data = action.payload.data;
      }

      if (action.payload.isLoading !== undefined) {
        state.isLoading = action.payload.isLoading;
      }
    },

    signOut: (state: TUserState) => {
      state.isLoading = false;
      state.isSignedIn = false;
      state.data = null;
    },
  },
});

export const { setUserAndStatus, signOut } = userSlice.actions;
export default userSlice.reducer;
