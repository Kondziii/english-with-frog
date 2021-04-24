import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const GameContainer = (props) => {
  return (
    <Grid item xs={12} md={7}>
      <Paper elevation={3} className={props.className}>
        {props.children}
      </Paper>
    </Grid>
  );
};

export default GameContainer;
