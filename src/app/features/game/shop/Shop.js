import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid
} from '@material-ui/core';
import ShopNavigation from './ShopNavigation';
import ItemList from './ItemsList';

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
    width: '100%',
    position: 'relative',
  },

}));

const Shop = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
      <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center">
        <Grid>
          <ShopNavigation></ShopNavigation>
        </Grid>
        <Grid>
          <ItemList></ItemList>
        </Grid>
      </Grid>
    </FormControl>    
  );
};

export default Shop;