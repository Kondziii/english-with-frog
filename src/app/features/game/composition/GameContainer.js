import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Avatar from './Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserGameProgress, selectUserInfo, selectUser } from '../../auth/userSlice';

const GameContainer = (props) => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Grid container direction='row' justify='space-evenly'>
      <Grid item xs={12} md={7}>
        <Paper elevation={3} className={props.className}>
          {props.children}
        </Paper>
      </Grid>
      <Grid elevation={3} item xs={12} md={4}>
        <Paper>
          { userInfo && 
          <Avatar/> }
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameContainer;
