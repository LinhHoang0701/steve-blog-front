import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import tagApi from 'api/tagApi';
import { getListTagFromSaga } from './tagsSlice';

export function* getListTagSaga(action: PayloadAction): SagaIterator<void> {
  try {
    const res = yield call(tagApi.getAll);
    yield put({
      type: getListTagFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.error(error);
  }
}
