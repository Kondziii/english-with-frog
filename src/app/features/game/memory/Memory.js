import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import React, { useState, useEffect } from 'react';
import Game from './Game';
import _ from 'underscore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {

  }
}));


const Memory = (props) => {
    const classes = useStyles();

    let words = {
        apple: "jabłko",
        bacon: "boczek",
        banana: "banan",
        beef: "wołowina",
        bread: "chleb",
        butter: "masło",
        carrot: "marchewka",
        cheese: "ser",
   }

    const wordsArray = _.shuffle(_.flatten(_.pairs(words),1));

    const selectWords = () => {
        console.log(props.section)
    }

    return (
        <div className={classes.root}>
            <Box>
                <Game words={words} array={wordsArray}></Game>
            </Box> 
        </div>
    );
};

export default Memory;