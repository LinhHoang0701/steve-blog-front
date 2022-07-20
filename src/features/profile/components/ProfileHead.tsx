import { Avatar, Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link } from 'react-router-dom';
import { followProfile, selectProfile, unFollowProfile } from '../profileSlice';

const HEIGHT = window.screen.height;

const useStyles = makeStyles((theme) => ({
  media: {
    height: HEIGHT / 3,
    minHeight: 300,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      minHeight: 150,
    },
  },
  profileImage: {
    position: 'relative',
    top: '-110px',
    justifyContent: 'center',
    width: theme.spacing(HEIGHT / 40),
    height: theme.spacing(HEIGHT / 40),
    border: '5px solid white',
    margin: 'auto',
  },
  btn: {
    position: 'absolute',
    right: '20px',
    bottom: '15px',
    backgroundColor: 'white',
    padding: '8px 10px',
    color: 'black',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '3px',
    '&:hover': {
      opacity: '0.8',
    },
    [theme.breakpoints.down('xs')]: {
      transform: 'translateX(15px)',
      padding: '3px',
    },
  },
  option: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

interface ProfileHeadProps {
  username: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ username }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // get user from local storage
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);
  const userFromStore = useAppSelector(selectProfile);
  const followingState = userFromStore.following;

  // select profile
  const profile = useAppSelector(selectProfile);

  // handle follow action
  const handleFollow = () => {
    if (curUser) {
      if (!followingState) {
        dispatch({
          type: followProfile.type,
          payload: { username: username },
        });
      } else {
        dispatch({
          type: unFollowProfile.type,
          payload: { username: username },
        });
      }
    }
  };
  return (
    <>
      <CardMedia
        className={classes.media}
        image="https://st.quantrimang.com/photos/image/2018/09/20/anh-bia-facebook-mau-den-1.jpg"
      >
        {curUser?.username === username ? (
          <Link className={classes.btn} to="/settings">
            <SettingsIcon />
            <Typography className={classes.option}>Edit Profile Setting</Typography>
          </Link>
        ) : (
          <Box className={classes.btn} onClick={handleFollow}>
            {followingState ? <CheckIcon /> : <AddIcon />}
            <Typography>Following</Typography>
          </Box>
        )}
      </CardMedia>
      <Avatar src={profile?.image} className={classes.profileImage} />
    </>
  );
};

export default ProfileHead;
