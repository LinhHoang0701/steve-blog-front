import { RootState } from './../../app/store';
import { createSlice } from '@reduxjs/toolkit';
interface InitialState {
  tagList: string[];
  isLoading: boolean;
}

const initialState: InitialState = {
  tagList: [] as string[],
  isLoading: false,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    getListTag: (state) => {
      state.isLoading = true;
    },
    getListTagFromSaga: (state, action) => {
      state.isLoading = false;
      state.tagList = action.payload.tags;
    },
  },
});

// actions
export const { getListTag, getListTagFromSaga } = tagsSlice.actions;

// selector
export const selectTagList = (state: RootState) => state.tag.tagList;
export const selectLoadingTags = (state: RootState) => state.tag.isLoading;

export default tagsSlice.reducer;
