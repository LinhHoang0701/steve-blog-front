import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put } from '@redux-saga/core/effects';
import articlesApi from 'api/articlesApi';
import { addArticleFromSaga, favoriteSuccessSaga, getListArticleFromSaga } from './articlesSlice';

interface PayloadActionType {
  offset: number;
  limit: number;
  tag: string;
  author: string;
  favorited: string;
}

export function* getListArticleSaga(action: PayloadAction<PayloadActionType>): SagaIterator<void> {
  try {
    const { offset, limit, tag, author, favorited } = action.payload;
    const res = yield call(articlesApi.getAll, offset, limit, tag, author, favorited);
    yield put({
      type: getListArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* getListArticleByFeedSaga(
  action: PayloadAction<PayloadActionType>
): SagaIterator<void> {
  try {
    const { offset, limit, tag, author } = action.payload;
    const res = yield call(articlesApi.getAllByFeed, offset, limit, tag, author);
    yield put({
      type: getListArticleFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* postArticleSaga(
  action: PayloadAction<{ data: { article: FormInputArticleType }; history: any }>
): SagaIterator<void> {
  try {
    const { data, history } = action.payload;
    const res = yield call(articlesApi.addOne, data);
    yield put({
      type: addArticleFromSaga.type,
      payload: res,
    });
    history.push(`/article/${res.article.slug}`);
  } catch (error) {
    console.error(error);
  }
}

export function* favoriteActionSaga(
  action: PayloadAction<FavoritePayloadProps>
): SagaIterator<void> {
  try {
    const { slug, favorited } = action.payload;
    if (favorited) {
      const res = yield call(articlesApi.unfavoriteArticle, slug);
      yield put({
        type: favoriteSuccessSaga.type,
        payload: res,
      });
    } else {
      const res = yield call(articlesApi.favoriteArticle, slug);
      yield put({
        type: favoriteSuccessSaga.type,
        payload: res,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
