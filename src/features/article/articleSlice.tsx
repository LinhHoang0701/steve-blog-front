import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {} as ArticleType,
    isLoading: false,
    error: null,
    isShowComment: false,
    isLoadingComment: false,
    isShowCommentInput: false,
    commentText: '',
    comments: [] as CommentType[],
  },
  reducers: {
    getArticle: (state) => {
      state.isLoading = true;
    },
    getArticleSaga: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.article = action.payload;
    },
    getError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteArticle: (state) => {
      state.isLoading = false;
    },
    UpdateArticle: (state) => {
      state.isLoading = false;
    },
    toggleComment: (state) => {
      state.isShowComment = !state.isShowComment;
    },
    getComment: (state) => {},
    getCommentFromSaga: (state, action) => {
      state.comments = action.payload;
    },
    commentRequest: (state) => {
      state.isLoadingComment = true;
    },
    commentSuccess: (state, action) => {
      state.comments = [action.payload, ...state.comments];
      state.isLoadingComment = false;
      state.isShowCommentInput = false;
      state.commentText = '';
    },
    deleteComment: (state) => {},
    showCommentInput: (state) => {
      state.isShowCommentInput = true;
    },
    hideCommentInput: (state) => {
      state.isShowCommentInput = false;
      state.commentText = '';
    },
    getCommentText: (state, action) => {
      state.commentText = action.payload;
    },
  },
});

const oneArticleReducer = articleSlice.reducer;
export default oneArticleReducer;
export const selectArticle = (state: RootState) => state.oneArticleReducer.article;
export const selectIsloading = (state: RootState) => state.oneArticleReducer.isLoading;
export const selectError = (state: RootState) => state.oneArticleReducer.error;
export const showComment = (state: RootState) => state.oneArticleReducer.isShowComment;
export const commentList = (state: RootState) => state.oneArticleReducer.comments;
export const isLoadingCmt = (state: RootState) => state.oneArticleReducer.isLoadingComment;
export const isShowCmtInput = (state: RootState) => state.oneArticleReducer.isShowCommentInput;
export const commentTextValue = (state: RootState) => state.oneArticleReducer.commentText;
export const {
  getArticle,
  getArticleSaga,
  getError,
  deleteArticle,
  UpdateArticle,
  toggleComment,
  getComment,
  getCommentFromSaga,
  commentRequest,
  commentSuccess,
  deleteComment,
  showCommentInput,
  hideCommentInput,
  getCommentText,
} = articleSlice.actions;
