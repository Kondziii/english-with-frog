import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Avatar from './Avatar';

const GameContainer = (props) => {
  return (
    <Grid container direction='row' justify='space-evenly'>
      <Grid item xs={12} md={7}>
        <Paper elevation={3} className={props.className}>
          {props.children}
        </Paper>
      </Grid>
      <Grid elevation={3} item xs={12} md={4}>
        <Paper>
          <Avatar/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameContainer;
