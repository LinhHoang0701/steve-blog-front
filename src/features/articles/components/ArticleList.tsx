import { Box, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Article from 'components/common/Article';
import Loading from 'components/common/Loading';
import MenuTab from 'components/common/MenuTab';
import PaginationComponent from 'components/common/PaginationComponent';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getListArticle,
  getListArticleByFeed,
  selectCountArticles,
  selectListArticles,
  selectLoadingArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  selectTagByArticle,
} from '../articlesSlice';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  articleList: {
    borderRight: '1px solid',
    borderRightColor: grey[400],
    [theme.breakpoints.down('md')]: {
      border: 'none',
    },
  },
  menuTab: {
    marginBottom: '30px',
  },
  newFeedEmpty: {
    marginLeft: '25px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      textAlign: 'center',
      marginLeft: '0',
    },
  },
}));

const ArticleList = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // state
  const [displayMode, setDisplayMode] = useState(0);

  const handleListArticleDisplay = (choose: number) => {
    setDisplayMode(choose);
  };

  // select data from store
  const articleList = useAppSelector(selectListArticles);
  const isLoading = useAppSelector(selectLoadingArticles);

  // select data for pagination from store
  const articleCount = useAppSelector(selectCountArticles);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);

  // pagination data passed
  const currentPage = useAppSelector(selectNumberCurrentPage);
  const totalPage = Math.ceil(articleCount / articlePerPage);
  const pathName = '/';

  // select data for filter by tags
  const tagByArticle = useAppSelector(selectTagByArticle);

  // get page from url param
  const { page } = queryString.parse(location.search);
  const offsetIndex = +page - 1 || currentPage - 1;

  // get tags from url param
  const { tag } = queryString.parse(location.search);
  const tagFinal = tag || tagByArticle;

  // fetch list articles + pagination by offset + filter by tags
  useEffect(() => {
    const action = {
      type: displayMode === 0 ? getListArticle.type : getListArticleByFeed.type,
      payload: {
        offset: offsetIndex * articlePerPage,
        limit: articlePerPage,
        tag: tagFinal,
      },
    };
    dispatch(action);
  }, [offsetIndex, articlePerPage, tagFinal, displayMode, dispatch]);

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Box className={classes.menuTab}>
            <MenuTab
              option={displayMode}
              handleDisplay={handleListArticleDisplay}
              tab1="Global Feed"
              tab2="Your Feed"
            />
          </Box>

          {articleList.length > 0 ? (
            <Box className={classes.articleList}>
              {articleList.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </Box>
          ) : (
            <Box className={classes.newFeedEmpty}>You haven't follow any author..</Box>
          )}

          <Box>
            {articleCount > 0 && (
              <PaginationComponent
                pathName={pathName}
                totalPage={totalPage}
                tagByArticle={tagByArticle}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ArticleList;
