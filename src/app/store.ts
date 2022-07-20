import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../share';
import createSagaMiddleware from 'redux-saga';
import articleReducer from '../features/articles/articlesSlice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import oneArticleReducer from '../features/article/articleSlice';
import authorReducer from '../features/profile/profileSlice';
import tagReducer from '../features/tags/tagsSlice';
import settingReducer from './../features/setting/settingSlice';
import rootSaga from './rootSaga';

export const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  tag: tagReducer,
  article: articleReducer,
  setting: settingReducer,
  profile: profileReducer,
  author: authorReducer,
  oneArticleReducer: oneArticleReducer,
});
// create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware, routerMiddleware(history)),
});

// run saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
