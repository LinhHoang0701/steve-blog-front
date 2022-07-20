import { call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import settingApi from '../../api/settingApi';
import { getUserSaga, updateError, updateUserSaga } from './settingSlice';

export function* getCurrentUserSaga(): SagaIterator<void> {
  try {
    const res = yield call(settingApi.getCurrentUser);
    yield put({
      type: getUserSaga.type,
      payload: res.user,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* updateCurrentUserSaga(action: PayloadAction<any>): SagaIterator<void> {
  try {
    const data = action.payload;
    const res = yield call(settingApi.updateCurrentUser, data);

    yield put({
      type: updateUserSaga.type,
      payload: res.user,
    });
  } catch (error: any) {
    yield put({
      type: updateError.type,
      payload: error.response.data.errors,
    });
  }
}
