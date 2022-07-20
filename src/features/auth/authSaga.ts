import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from './authSlice';
import { take, fork, call, put } from '@redux-saga/core/effects';
import { LoginPayload } from './authSlice';
import authApi from 'api/authApi';
import { push } from 'connected-react-router';

function* handleLogin(payload: LoginPayload) {
  try {
    const res: PayloadAction<any> = yield call(
      authApi.loginHandler,
      payload.userInfo,
      payload.endPoint
    );
    yield put(authActions.loginSuccess(res));
    // redirect to home page
    yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFail(error.message));
    if (error.response.data.errors) {
      yield put(authActions.loginFail(error.response.data.errors));
    }
  }
}

export default function* authSaga() {
  while (true) {
    const action: PayloadAction<LoginPayload> = yield take(authActions.loginPending.type);
    yield fork(handleLogin, action.payload);
  }
}
