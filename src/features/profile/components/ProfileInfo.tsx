import { Box, Typography, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTag } from 'features/articles/articlesSlice';
import { NavLink } from 'react-router-dom';
import { selectProfile } from '../profileSlice';

const useStyles = makeStyles({
  profileInfoContainer: {
    position: 'relative',
    top: '-100px',
    margin: 'auto',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 0,
  },
  navlink: {
    textDecoration: 'none',
  },
  info: {
    width: '60%',
    margin: '0 auto',
    textAlign: 'center',
  },
});

interface ProfileInfoProps {
  username: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ username }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // select profile
  const profile = useAppSelector(selectProfile);
  // handle go to profile home page
  const handleGoToProfileHomePage = () => {
    dispatch(setTag(null));
  };
  return (
    <Box className={classes.profileInfoContainer}>
      <NavLink
        className={classes.navlink}
        to={`/profile/${username}`}
        onClick={handleGoToProfileHomePage}
      >
        <Typography align={'center'} className={classes.userName} variant="h4" gutterBottom>
          {profile?.username}
        </Typography>
      </NavLink>
      <Typography className={classes.info}>{profile?.following}</Typography>
      <Typography className={classes.info}>{profile?.bio}</Typography>
    </Box>
  );
};

export default ProfileInfo;
