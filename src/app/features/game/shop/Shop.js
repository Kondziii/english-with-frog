import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
} from '@material-ui/core';
import ShopNavigation from './ShopNavigation';
import ItemList from './ItemsList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../db/getUser';
import { getUserGameProgress, selectUser, selectUserInfo } from '../../auth/userSlice';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import constants from '../../../../const';
import Evolve from './Evolve';
import { updateFrogstageDB } from '../../db/updateUser';

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
    width: '100%',
    position: 'relative',
  },

}));

const Shop = () => {
  const classes = useStyles();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [section, setSection] = useState("frogSkin")
  
  const sectionHandler = (event, value) => {
    setSection(value);
  }

  return (
    <FormControl className={classes.root}>
      <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center">
        { userInfo && userInfo.frogstage < constants.CONST_FROG_STGES &&
        <Evolve/>}
        { game && userInfo && userInfo.frogstage == constants.CONST_FROG_STGES &&
          <Grid>
            <ShopNavigation handler={sectionHandler} shop={game.shop} section={section}></ShopNavigation>
          </Grid> }
        { game && userInfo && userInfo.frogstage == constants.CONST_FROG_STGES &&
          <Grid>
            <ItemList 
              section = {game.shop.filter( i => { return i.key == section } )[0].value}
              userItems = {userInfo.items[section]}
              chosenItem = {userInfo.chosenItems[section]}>
            </ItemList> 
          </Grid>}
      </Grid>
    </FormControl>    
  );
};

export default Shop;