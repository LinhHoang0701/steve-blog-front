import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  profile: ProfileType;
  isLoading: boolean;
  error?:any;
}

const initialState: InitialState = {
  profile: {} as ProfileType,
  isLoading: false,
  error:null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getProfile: (state) => {
      state.isLoading = false;
    },
    getProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
      state.error = null;
    },
    followProfile: (state) => {},
    followProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
      state.error = null;
    },
    unFollowProfile: (state) => {},
    unFollowProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
      state.error = null;
    },
    getError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// actions
export const {
  getProfile,
  getProfileSuccess,
  followProfile,
  followProfileSuccess,
  unFollowProfile,
  unFollowProfileSuccess,
} = authorSlice.actions;

// selector
export const selectProfile = (state: RootState) => state.profile.profile;
export const selectIsLoading = (state: RootState) => state.profile.isLoading;
export const selectError = (state: RootState) => state.oneArticleReducer.error;

export default authorSlice.reducer;
