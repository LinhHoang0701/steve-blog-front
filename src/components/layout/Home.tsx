import { Grid, makeStyles } from '@material-ui/core';
import ArticleList from 'features/articles/components/ArticleList';
import TagList from 'features/tags/components/TagList';
import { Footer } from './Footer';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
    padding: '0 16px',
    [theme.breakpoints.up('md')]: {
      marginTop: '100px',
    },
  },
}));

const HomeLayout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <ArticleList />
        </Grid>
        <Grid item xs={12} md={3}>
          <TagList />
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeLayout;
