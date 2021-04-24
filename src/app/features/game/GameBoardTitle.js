import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    margin: '2vh',
    marginBottom: '0hv',
    background: 'green',
    color: 'white',
    borderRadius: '25px',
  },

  title_text: {
    margin: '1vh',
    textTransform: 'uppercase',
  },
}));

const GameBoardTitle = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.title} elevation={3}>
      <Typography className={classes.title_text} variant='h5'>
        {props.title}
      </Typography>
    </Paper>
  );
};

export default GameBoardTitle;
