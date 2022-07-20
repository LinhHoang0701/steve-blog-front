import { Card, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    minHeight: 600,
  },
});

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const classes = useStyles();
  return <Card className={classes.root}>{children}</Card>;
};

export default ProfileLayout;
