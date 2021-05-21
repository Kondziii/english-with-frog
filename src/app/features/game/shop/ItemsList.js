import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  GridList,
} from '@material-ui/core';
import Item from './Item';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { selectUserInfo} from '../../auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  gridList: {
    paddingLeft: '4vh',
  }
}));

const ItemsList = (props) => {
  const classes = useStyles();
  const userInfo = useSelector(selectUserInfo);

  const getShopHeight = () => {
    if ( userInfo.frogstage < 5) {
      if (isWidthUp('xl', props.width)) {
        console.log('xl');
        return 600;
      }
      if (isWidthUp('lg', props.width)) {
        console.log('lg');
        return 590;
      }
      if (isWidthUp('md', props.width)) {
        console.log('md');
        return 650;
      }
      if (isWidthUp('sm', props.width)) {
        console.log('sm');
        return 650;
      }
      console.log('<5');
      return 590;
    }
    else {
        console.log('else');
        return 850;
    }
  };

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 2;
    }
    if (isWidthUp('sm', props.width)) {
      return 2;
    }
    return 1;
  };

  return (
    <FormControl className={classes.root}>
      <GridList           
        cellHeight='auto'
        cols={getGridListCols()}
        className={classes.gridList}
        >
        {props.section.map((item) =>  (
          <Grid key={item.key}>
            <Item 
              key={item.key} 
              price={item.value.filter( val => { return val.key == "price" })[0].value}
              image={item.value.filter( val => { return val.key == "url" })[0].value}
              bought={props.userItems[item.key]}
              chosen={item.key == props.chosenItem}
              >
            </Item>          
          </Grid>    
          ))}   
          {props.section.map((item) =>  (
            <Grid key={item.key}>
              <Item 
                key={item.key} 
                price={item.value.filter( val => { return val.key == "price" })[0].value}
                image={item.value.filter( val => { return val.key == "url" })[0].value}
                bought={props.userItems[item.key]}
                chosen={item.key == props.chosenItem}
                >
              </Item>          
            </Grid>    
            ))}   
            {props.section.map((item) =>  (
              <Grid key={item.key}>
                <Item 
                  key={item.key} 
                  price={item.value.filter( val => { return val.key == "price" })[0].value}
                  image={item.value.filter( val => { return val.key == "url" })[0].value}
                  bought={props.userItems[item.key]}
                  chosen={item.key == props.chosenItem}
                  >
                </Item>          
              </Grid>    
              ))}   
              {props.section.map((item) =>  (
                <Grid key={item.key}>
                  <Item 
                    key={item.key} 
                    price={item.value.filter( val => { return val.key == "price" })[0].value}
                    image={item.value.filter( val => { return val.key == "url" })[0].value}
                    bought={props.userItems[item.key]}
                    chosen={item.key == props.chosenItem}
                    >
                  </Item>          
                </Grid>    
                ))}   
        </GridList>  
    </FormControl>    
  );
};

export default withWidth()(ItemsList);