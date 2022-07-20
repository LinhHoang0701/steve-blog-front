import { CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    position: 'relative',
    top: '-90px',
  },
}));

interface ProfileContentLayoutProps {
  children: React.ReactNode;
}

const ProfileContentLayout: React.FC<ProfileContentLayoutProps> = ({ children }) => {
  const classes = useStyles();
  return <CardContent className={classes.contentContainer}>{children}</CardContent>;
};

export default ProfileContentLayout;
