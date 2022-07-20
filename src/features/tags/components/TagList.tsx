import { Box, Card, CardContent, CardHeader, Chip, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTag } from 'features/articles/articlesSlice';
import { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getListTag, selectLoadingTags, selectTagList } from '../tagsSlice';
import Loading from 'components/common/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  inforBox: {
    marginBottom: '30px',
  },
  inforTitle: { marginBottom: '10px' },
  inforText: {
    marginBottom: '10px',
  },
  tag: {
    marginRight: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
}));

const queryString = require('query-string');

const ArticleTagList = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  const tagList = useAppSelector(selectTagList);
  const isLoading = useAppSelector(selectLoadingTags);

  // fetch tags from API
  useEffect(() => {
    const action = {
      type: getListTag.type,
    };
    dispatch(action);
  }, [dispatch]);

  // handle click tags
  const handleClickTag = (tagLabel: string) => {
    dispatch(setTag(tagLabel));

    // sync url param
    const queryParams = tagLabel ? { tag: tagLabel, page: '1' } : { page: '1' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.inforBox}>
        <Alert severity="info">
          <AlertTitle className={classes.inforTitle}>Write on Medium</AlertTitle>
          <Box className={classes.inforText}>Never Write FAQ</Box>
          <Box className={classes.inforText}>Expert Writing Advice</Box>
          <Box className={classes.inforText}>Grow your readership</Box>
        </Alert>
      </Box>
      <Box>
        {isLoading ? (
          <Loading />
        ) : (
          <Card>
            <CardHeader title="Popular Tags" />
            <CardContent>
              {tagList.slice(0, 20).map((tag) => (
                <Chip
                  className={classes.tag}
                  key={nanoid()}
                  label={tag}
                  onClick={() => handleClickTag(tag)}
                />
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ArticleTagList;
