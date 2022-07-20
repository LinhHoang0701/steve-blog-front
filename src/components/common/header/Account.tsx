import {
  Avatar,
  Button,
  ClickAwayListener,
  Divider,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  ListItem,
  Paper,
  Popper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { getUser, selectUser } from 'features/setting/settingSlice';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../../../features/auth/authSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuItem: {
    '&:hover, &:hover $menuIcon': {
      color: 'blue',
    },
    padding: '10px 30px',
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Account = () => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<null | any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleSetting = (event: any) => {
    history.push('/settings');
    setOpen(false);
  };
  const handleLogout = () => {
    history.push('/auth');
    dispatch(authActions.logoutHandler());
    setOpen(false);
  };
  const handleProfile = () => {
    // history.replace('/profile/' + currentUser?.username);
    history.push(`/profile/${currentUser?.username}`);
    setOpen(false);
  };
  function handleListKeyDown(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar src={currentUser?.image && currentUser.image} />
      </Button>
      <Popper
        style={{
          zIndex: 100,
          maxWidth: '300px',
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-end"
        disablePortal
      >
        <Paper elevation={3}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <ListItem onClick={handleClose} className={classes.menuItem}>
                <ListItemAvatar>
                  <Avatar src={currentUser?.image && currentUser.image} />
                </ListItemAvatar>
                <ListItemText
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                  primary={currentUser?.username}
                  secondary={'@' + currentUser?.email.substring(0, currentUser?.email.indexOf('@'))}
                />
              </ListItem>
              <Divider />
              <MenuItem onClick={handleProfile} className={classes.menuItem}>
                <PersonIcon color="action" className={classes.menuIcon} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleSetting} className={classes.menuItem}>
                <SettingsIcon color="action" className={classes.menuIcon} />
                Setting
              </MenuItem>
              <MenuItem onClick={handleLogout} className={classes.menuItem}>
                <ExitToAppIcon color="action" className={classes.menuIcon} />
                Logout
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};
