import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  GridList,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    // height: '90vh',
    // width: '100%',
    // position: 'relative',
  },

}));

const Items = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
      Item
    </FormControl>    
  );
};

export default Items;