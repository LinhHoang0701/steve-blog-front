import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/common/Loading';
import MenuTab from 'components/common/MenuTab';
import { NotFound } from 'components/common/NotFound';
import {
  getListArticle,
  selectCountArticles,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  selectTagByArticle,
  setNumberCurrentPage,
} from 'features/articles/articlesSlice';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { upperFirstLetter } from 'share/methods/upperFirst';
import ProfileArticles from '../components/ProfileArticleList';
import ProfileContentLayout from '../layout/ProfileContentLayout';
import ProfileHead from '../components/ProfileHead';
import ProfileInfo from '../components/ProfileInfo';
import ProfileLayout from '../layout/ProfileLayout';
import ProfilePagination from '../components/ProfilePagination';
import { getProfile, selectIsLoading } from '../profileSlice';
import { selectError } from '../../article/articleSlice';

const queryString = require('query-string');

const ProfilePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  // select author name from url
  const { username } = useParams<{ username: string }>();

  // state
  const [displayMode, setDisplayMode] = useState(0);

  const handleListArticleDisplay = (choose: number) => {
    setDisplayMode(choose);
  };

  // set initial value of current page
  useEffect(() => {
    dispatch(setNumberCurrentPage(1));
  }, [dispatch]);

  // loading state
  const isLoadingProfile = useAppSelector(selectIsLoading);

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);
  const totalArticle = useAppSelector(selectCountArticles);

  // select data for filter by tags
  const tagByArticle = useAppSelector(selectTagByArticle);

  // select data for pagination from store
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const offsetIndex = +page - 1 || currentPage - 1;

  // fetch list articles + pagination by offset + author
  useEffect(() => {
    const action =
      displayMode === 0
        ? {
            type: getListArticle.type,
            payload: {
              offset: offsetIndex * articlePerPage,
              limit: articlePerPage,
              tag: tagByArticle,
              author: username,
            },
          }
        : {
            type: getListArticle.type,
            payload: {
              offset: offsetIndex * articlePerPage,
              limit: articlePerPage,
              tag: tagByArticle,
              favorited: username,
            },
          };
    dispatch(action);
  }, [username, offsetIndex, tagByArticle, articlePerPage, displayMode, dispatch]);

  // fetch profile by username
  useEffect(() => {
    const action = {
      type: getProfile.type,
      payload: { username },
    };
    dispatch(action);
  }, [dispatch, username]);

  // pagination data
  const totalPage = totalArticle && articlePerPage ? Math.ceil(totalArticle / articlePerPage) : 0;

  // error
  const error = useAppSelector(selectError);

  if (error) {
    return <NotFound />;
  }

  return (
    <Box>
      {isLoadingProfile ? (
        <Loading />
      ) : (
        <Box>
          <ProfileLayout>
            <ProfileHead username={username} />
            <ProfileInfo username={username} />
            <ProfileContentLayout>
              <MenuTab
                option={displayMode}
                handleDisplay={handleListArticleDisplay}
                tab1={`${username ? upperFirstLetter(username) : 'My'}'s Articles`}
                tab2="Favorited Articles"
              />
              <ProfileArticles articleList={articleList} isLoading={isLoading} />
              <ProfilePagination
                totalPage={totalPage}
                pathName={`/profile/${username}`}
                tagByArticle={tagByArticle}
              />
            </ProfileContentLayout>
          </ProfileLayout>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
