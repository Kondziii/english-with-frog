import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  GridList,
} from '@material-ui/core';
import Item from './Item';

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
    width: '100%',
    position: 'relative',
  },

}));

const ItemsList = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
      <Item></Item>
    </FormControl>    
  );
};

export default ItemsList;