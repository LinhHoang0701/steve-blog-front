import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '16px',
    borderTop: '1px solid rgba(230, 230, 230, 1)',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  icon: {
    marginTop: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  iconItem: {
    '&:hover': {
      transform: 'scale(1.2)',
      color: 'primary',
    },
    backgroundColor: '#3d3d3d',
    cursor: 'pointer',
  },
}));
export const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6">Contact Us</Typography>
      <Box className={classes.icon}>
        <Avatar className={classes.iconItem}>
          <TwitterIcon />
        </Avatar>
        <Avatar className={classes.iconItem}>
          <FacebookIcon />
        </Avatar>
        <Avatar className={classes.iconItem}>
          <LinkedInIcon />
        </Avatar>
      </Box>
    </Box>
  );
};
