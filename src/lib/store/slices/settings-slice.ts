import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TSettingsState = {
  opened: boolean;
  // appTheme: 'light' | 'dark' | 'system';
};

const initialState: TSettingsState = {
  opened: false,
  // appTheme: 'system',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    setOpened: (state: TSettingsState, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
  },
});

export const { setOpened } = settingsSlice.actions;
export default settingsSlice.reducer;
