import '@fontsource/roboto';
import { Box, makeStyles } from '@material-ui/core';
import { Header, NotFound, PrivateRoute } from 'components/common';
import HomeLayout from 'components/layout/Home';
import AddArticle from 'features/article/page/AddArticle';
import DetailArticle from 'features/article/page/DetailArticle';
import LoginPage from 'features/auth/pages/LoginPage';
import ProfilePage from 'features/profile/pages/ProfilePage';
import SettingPage from 'features/setting/pages/SettingPage';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Roboto, sans-serif',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Box className={classes.root}>
        <Switch>
          <Route path="/" component={HomeLayout} exact />
          <Route path="/auth" component={LoginPage} />
          <Route path="/home" component={HomeLayout} />
          <PrivateRoute path="/article/create" component={AddArticle} />
          <PrivateRoute exact path="/article/:slug" component={DetailArticle} />
          <PrivateRoute path="/article/:slug/edit" component={AddArticle} />
          <PrivateRoute path="/settings" component={SettingPage} />
          <Route path="/profile/:username" component={ProfilePage} exact />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </>
  );
}

export default App;
