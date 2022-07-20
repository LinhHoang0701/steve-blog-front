import { fork, takeEvery, throttle } from '@redux-saga/core/effects';
import {
  commentActionSaga,
  deleteArticleBySlug,
  deleteCommentSaga,
  getArticleBySlugSaga,
  getCommentSaga,
  updateArticleBySlug,
} from 'features/article/articleSaga';
import {
  commentRequest,
  deleteArticle,
  deleteComment,
  getArticle,
  getComment,
  UpdateArticle,
} from 'features/article/articleSlice';
import {
  favoriteActionSaga,
  getListArticleByFeedSaga,
  getListArticleSaga,
  postArticleSaga,
} from 'features/articles/articlesSaga';
import {
  favoriteRequest,
  getListArticle,
  getListArticleByFeed,
  postArticle,
} from 'features/articles/articlesSlice';
import {
  getFollowProfileSaga,
  getProfileSaga,
  getUnFollowProfileSaga,
} from 'features/profile/profileSaga';
import { followProfile, getProfile, unFollowProfile } from 'features/profile/profileSlice';
import { getCurrentUserSaga, updateCurrentUserSaga } from 'features/setting/settingSaga';
import { getUser, updateUser } from 'features/setting/settingSlice';
import { getListTagSaga } from 'features/tags/tagsSaga';
import { getListTag } from 'features/tags/tagsSlice';
import authSaga from '../features/auth/authSaga';

export default function* rootSaga() {
  // auth feature
  yield fork(authSaga);
  //articles feature
  yield takeEvery(getListArticle.type, getListArticleSaga);
  yield takeEvery(getListArticleByFeed.type, getListArticleByFeedSaga);
  yield takeEvery(getListTag.type, getListTagSaga);
  yield takeEvery(postArticle.type, postArticleSaga);
  //article feature
  yield takeEvery(getArticle.type, getArticleBySlugSaga);
  yield takeEvery(deleteArticle.type, deleteArticleBySlug);
  yield takeEvery(UpdateArticle.type, updateArticleBySlug);
  //setting feature
  yield takeEvery(getUser.type, getCurrentUserSaga);
  yield takeEvery(updateUser.type, updateCurrentUserSaga);
  // profile feature
  yield takeEvery(getProfile.type, getProfileSaga);
  // follow feature
  yield throttle(1000, followProfile.type, getFollowProfileSaga);
  // unfollow feature
  yield throttle(1000, unFollowProfile.type, getUnFollowProfileSaga);
  // favorite feature
  yield throttle(1000, favoriteRequest.type, favoriteActionSaga);
  // comment feature
  yield takeEvery(getComment.type, getCommentSaga);
  yield takeEvery(commentRequest.type, commentActionSaga);
  yield takeEvery(deleteComment.type, deleteCommentSaga);
}
