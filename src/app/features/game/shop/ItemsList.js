import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  GridList,
} from '@material-ui/core';
import Item from './Item';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import { selectUserInfo } from '../../auth/userSlice';

const useStyles = makeStyles(() => ({
  root: {
    height: '80vh',
    width: '100%',
    position: 'relative',
  },
  img: {
    height: 150,
    width: 150,
  },
  gridContainer: {
    padding: '3vh',
    height: '75vh'
  },
  gridList: {
    height: '75vh'
  },
  grid2: {
    overflow: "auto"
  }
}));

const ItemsList = (props) => {
  const classes = useStyles();
  const userInfo = useSelector(selectUserInfo);

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 3;
    }
    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 3;
    }
    if (isWidthUp('sm', props.width)) {
      return 3;
    }
    return 2;
  };

  return (
    <FormControl className={classes.root}>
      <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.gridContainer}
      >
      <GridList           
        cellHeight='auto'
        cols={getGridListCols()}
        className={classes.gridList}
        >
        {props.section.map((item) =>  (
          <Grid key={item.key}>
            <Item 
              section={props.sectionName}
              key={item.key} 
              itemKey={item.key}
              price={item.value.filter( val => { return val.key == "price" })[0].value}
              image={item.value.filter( val => { return val.key == "url" })[0].value}
              bought={props.userItems[item.key]}
              chosen={item.key == props.chosenItem}
              >
            </Item>          
          </Grid>    
          ))}
        </GridList>
      </Grid>
    </FormControl>    
  );
};

export default withWidth()(ItemsList);