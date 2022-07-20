import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import clsx from 'clsx';
import { favoriteRequest, setTag } from 'features/articles/articlesSlice';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { convertArticleDate } from 'share/methods/dateFormat';
import { upperFirstLetter } from 'share/methods/upperFirst';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '200px',
      marginBottom: '20px',
      [theme.breakpoints.down('md')]: {
        borderRight: 'none',
      },
      [theme.breakpoints.down('lg')]: {
        padding: '0 24px',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '0',
      },
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '30px',
      width: '90%',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      '&:hover': {
        boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
        flexDirection: 'column',
      },
    },
    cardLeft: {
      flex: '1',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    authorName: {
      fontWeight: 600,
      fontSize: '1.2rem',
      display: 'flex',
    },
    description: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    avatar: {
      backgroundColor: blue[400],
    },
    cardAction: {
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
      },
    },
    chip: {
      marginRight: '5px',
      marginBottom: '3px',
    },
    favoritesContainer: {
      width: '100%',
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        minWidth: '75px',
      },
    },
    link: {
      textDecoration: 'none',
    },
    title: {
      cursor: 'pointer',
    },
    favoriteIcon: {
      padding: '5px !important',
    },
  })
);

interface ArticleProps {
  article: ArticleType;
}

const queryString = require('query-string');

const Article: React.FC<ArticleProps> = ({ article }) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  const { slug, author, title, updatedAt, description, favorited, favoritesCount, tagList } =
    article;

  // update tags from store
  const handleClickTag = (tagLabel: string) => {
    dispatch(setTag(tagLabel));

    // sync url param
    const queryParams = { tag: tagLabel, page: '1' };
    history.push({
      pathname: match.url,
      search: queryString.stringify(queryParams),
    });
  };

  // handle go to article detail
  const handleGoToArticleDetail = () => {
    history.push(`/article/${slug}`);
  };
  // handle favorite
  const handleFavorite = () => {
    let favoritePayload: FavoritePayloadProps = { slug: slug, favorited: favorited };
    dispatch(favoriteRequest(favoritePayload));
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Box className={classes.cardLeft}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar} src={author?.image}>
                {author?.username[0].toUpperCase()}
              </Avatar>
            }
            title={
              <Box className={classes.authorName} component="div">
                <Box>
                  <Link className={classes.link} to={`/profile/${author?.username}`}>
                    {upperFirstLetter(author?.username)}
                  </Link>
                </Box>
              </Box>
            }
            subheader={convertArticleDate(updatedAt)}
          />
          <CardContent>
            <Box
              className={clsx(classes.description, classes.title)}
              fontWeight="fontWeightMedium"
              onClick={handleGoToArticleDetail}
            >
              {title}
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {description?.slice(0, 30) + ' ...'}
            </Typography>
          </CardContent>
        </Box>

        <Box>
          <CardActions className={classes.cardAction}>
            <Box className={classes.favoritesContainer}>
              {favoritesCount}
              <IconButton className={classes.favoriteIcon} onClick={handleFavorite}>
                {favorited ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Box>
              {tagList?.map((tag) => (
                <Chip
                  className={classes.chip}
                  key={nanoid()}
                  label={tag}
                  onClick={() => handleClickTag(tag)}
                />
              ))}
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default Article;
