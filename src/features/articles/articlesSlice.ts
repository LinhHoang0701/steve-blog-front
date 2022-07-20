import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface InitialState {
  articleList: ArticleType[];
  articlesCount: number;
  isLoading: boolean;
  tag?: string;
  numberCurrentPage: number;
  numberArticlePerPage: number;
}

const initialState: InitialState = {
  articleList: [] as ArticleType[],
  articlesCount: 0,
  isLoading: false,
  numberCurrentPage: 1,
  numberArticlePerPage: 4,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getListArticle: (state) => {
      state.isLoading = true;
    },
    getListArticleFromSaga: (state, action) => {
      state.isLoading = false;
      state.articlesCount = action.payload.articlesCount;
      state.articleList = action.payload.articles;
    },
    getListArticleByFeed: (state) => {
      state.isLoading = true;
    },
    getListArticleByFeedFromSaga: (state, action) => {
      state.isLoading = false;
      state.articlesCount = action.payload.articlesCount;
      state.articleList = action.payload.articles;
    },
    setNumberCurrentPage: (state, action) => {
      state.numberCurrentPage = action.payload;
    },
    setNumberArticlePerPage: (state, action) => {
      state.numberArticlePerPage = action.payload;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    postArticle: (state) => {
      state.isLoading = true;
    },
    addArticleFromSaga: (state) => {
      state.isLoading = false;
    },
    favoriteRequest: (state, action) => {},
    favoriteSuccessSaga: (state, action) => {
      const articleExistingIndex = state.articleList.findIndex(
        (item) => item.slug === action.payload.article.slug
      );
      state.articleList[articleExistingIndex].favorited = action.payload.article.favorited;
      state.articleList[articleExistingIndex].favoritesCount =
        action.payload.article.favoritesCount;
    },
  },
});

// actions
export const {
  getListArticle,
  getListArticleFromSaga,
  getListArticleByFeed,
  getListArticleByFeedFromSaga,
  setNumberCurrentPage,
  setTag,
  postArticle,
  addArticleFromSaga,
  favoriteRequest,
  favoriteSuccessSaga,
} = articlesSlice.actions;

// selector
export const selectListArticles = (state: RootState) => state.article.articleList;
export const selectCountArticles = (state: RootState) => state.article.articlesCount;
export const selectLoadingArticles = (state: RootState) => state.article.isLoading;
export const selectTagByArticle = (state: RootState) => state.article.tag;
export const selectNumberCurrentPage = (state: RootState) => state.article.numberCurrentPage;
export const selectNumberArticlePerPage = (state: RootState) => state.article.numberArticlePerPage;

export default articlesSlice.reducer;
