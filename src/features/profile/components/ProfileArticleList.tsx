import { Box, makeStyles } from '@material-ui/core';
import Article from 'components/common/Article';
import Loading from 'components/common/Loading';

const useStyles = makeStyles({
  articleListContainer: {
    marginTop: '30px',
  },
  articleList: {
    width: '100%',
  },
});

interface ProfileArticleListProps {
  articleList: ArticleType[];
  isLoading: boolean;
}

const ProfileArticleList: React.FC<ProfileArticleListProps> = ({ articleList, isLoading }) => {
  const classes = useStyles();
  const articleListElement =
    articleList?.length === 0 ? null : (
      <Box>
        {isLoading ? (
          <Loading />
        ) : (
          <Box className={classes.articleList}>
            {articleList?.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </Box>
        )}
      </Box>
    );
  return <Box className={classes.articleListContainer}>{articleListElement}</Box>;
};

export default ProfileArticleList;
