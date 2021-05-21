import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  FormControl,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import { selectUserInfo, selectUser, updateFrogstage, updateMoneyState } from '../../auth/userSlice';
import { updateFrogstageDB, updateMoney } from '../../db/updateUser';
import constants from '../../../../const';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#388e3c',
          },
      },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '90%',
    marginTop: '2vh',
  },

  paper: {
    backgroundColor: 'lightgrey',
  },

  text: {
    textAlign: 'center',
    padding: '15px',
  },

}));

const ShopNavigation = () => {
  const classes = useStyles();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [enoughtCoins, setEnoughtCoins] = useState(constants.COINS_AMOUNT_FOR_EVOLUTION);

  useEffect(() => {
    if (userInfo.money >= constants.COINS_AMOUNT_FOR_EVOLUTION) {
      setEnoughtCoins(true)
    }
    else {
      setEnoughtCoins(false)
    }
  }, [userInfo.money]);

  const evolve = () => {
    dispatch(updateMoneyState(userInfo.money - constants.COINS_AMOUNT_FOR_EVOLUTION));
    updateMoney(user.uid, userInfo.money - constants.COINS_AMOUNT_FOR_EVOLUTION);
    dispatch(updateFrogstage());
    updateFrogstageDB(user.uid, userInfo.frogstage + 1);
  }

  return (
    <FormControl className={classes.root}>
        <ThemeProvider theme={theme}>
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.text}>
                    Twoi mali przyjaciele są gotowi do rozwoju! Zbierz monety i wychoduj własną żabę!
                    Aby kijanki przeszły ewolucję, potrzebujesz {constants.COINS_AMOUNT_FOR_EVOLUTION} monet.
                    Powodzenia!
                </Typography>                
            </Paper>
            <Button 
            size="large" 
            variant="contained" 
            color="primary" 
            onClick={evolve}
            disabled={!enoughtCoins}>
                Evolve
            </Button>             
        </ThemeProvider>
    </FormControl> 
  );
};

export default ShopNavigation;