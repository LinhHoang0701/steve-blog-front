import { Typography } from '@material-ui/core';
import React from 'react';

export const NotFound = () => {
  return (
    <Typography
      style={{
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="h3"
    >
      Not Found!!
    </Typography>
  );
};
