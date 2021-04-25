import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

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
          <Typography variant='h2'> Zaba here</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameContainer;
