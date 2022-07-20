import { PayloadAction } from '@reduxjs/toolkit';
import articlesApi from 'api/articleApi';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import {
  commentSuccess,
  getArticleSaga,
  getComment,
  getCommentFromSaga,
  getError,
} from './articleSlice';
import { push } from 'connected-react-router';
import articleApi from 'api/articleApi';

export function* getArticleBySlugSaga(action: PayloadAction<string>): SagaIterator<void> {
  try {
    const slug = action.payload;
    const res: { article: ArticleType } = yield call(articlesApi.getOne, slug);
    yield put({
      type: getArticleSaga.type,
      payload: res.article,
    });
  } catch (error) {
    yield put({
      type: getError.type,
      payload: error,
    });
  }
}

export function* deleteArticleBySlug(action: PayloadAction<string>): SagaIterator<void> {
  try {
    const slug = action.payload;
    yield call(articlesApi.deleteOne, slug);
  } catch (error) {
    console.log(error);
  }
}

export function* updateArticleBySlug(
  action: PayloadAction<{ slug: string; data: FormInputArticleType }>
): SagaIterator<void> {
  try {
    const { slug, data } = action.payload;
    yield call(articlesApi.updateOne, slug, data);
    yield put(push(`/article/${slug}`));
  } catch (error) {
    console.log(error);
  }
}
export function* getCommentSaga(action: PayloadAction<string>): SagaIterator<void> {
  try {
    const slug = action.payload;
    const res: { comments: CommentType[] } = yield call(articleApi.getCommentApi, slug);
    yield put({
      type: getCommentFromSaga.type,
      payload: res.comments,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* commentActionSaga(
  action: PayloadAction<{ slug: string; data: string }>
): SagaIterator<void> {
  try {
    const { slug, data } = action.payload;
    const res: { comment: CommentType } = yield call(articleApi.createCommentApi, slug, data);
    yield put({
      type: commentSuccess.type,
      payload: res.comment,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* deleteCommentSaga(
  action: PayloadAction<{ slug: string; id: string }>
): SagaIterator<void> {
  try {
    const { slug, id } = action.payload;
    yield call(articleApi.deleteCommentApi, slug, id);
    yield put({
      type: getComment.type,
      payload: slug,
    });
  } catch (error) {
    console.log(error);
  }
}
