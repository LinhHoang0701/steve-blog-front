import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const settingSlice = createSlice({
  name: 'setting',
  initialState: { currentUser: null as any, isLoading: false, error: null as any },
  reducers: {
    getUser: (state) => {
      state.isLoading = true;
    },
    getUserSaga: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateUser: (state) => {
      state.isLoading = true;
    },
    updateError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    updateUserSaga: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { getUser, updateUser, getUserSaga, updateUserSaga, updateError } =
  settingSlice.actions;
export const selectUser = (state: RootState) => state.setting.currentUser;
export const selectLoading = (state: RootState) => state.setting.isLoading;
export const selectError = (state: RootState) => state.setting.error;
export default settingSlice.reducer;
