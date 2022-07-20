import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface userType {
  username: undefined | string;
  email: undefined | string;
  'email or password': undefined | string;
}
export interface userPayload {
  username?: string;
  email: string;
  password: string;
}
export interface LoginPayload {
  userInfo: userPayload;
  endPoint: string;
}
export interface authState {
  isRegister: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: userType | null;
  currentUser: any;
}

let isAuth;

const jsonUser = localStorage.getItem('user');
if (jsonUser) {
  isAuth = JSON.parse(jsonUser).token;
}
const isLoggedIn = !!isAuth;
const initialState: authState = {
  isRegister: false,
  isLoggedIn,
  isLoading: false,
  error: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginPending(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload.data.user;
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    switchAuthModeHandler(state) {
      state.isRegister = !state.isRegister;
    },
    logoutHandler(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      localStorage.removeItem('user');
    },
  },
});
export const authActions = authSlice.actions;

export const userSelector = (state: RootState) => state.auth.currentUser;
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
