import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Menu from './Menu'
import React, { useState, useEffect } from 'react';
import ToolBar from '../Toolbar';
import Game from './Game';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {

  }
}));


const Memory = () => {
    const classes = useStyles();

    const [isLoaded, setIsLoaded] = useState(true);
    const [isSelected, setIsSelected] = useState(false);

    const tymczasowo = ["animals", "body", "clothes", "colours", "family", "food", "furniture", "job", "school", "shop", "sport", "time", "weather"];
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
  
    let category = null;

    const selectCategory = (c) => {
        category = c;
        setIsSelected(true);
    }

    const showBox = () => {
        if(isSelected) {
            return(<Game words={words}></Game>)
        } else {
            if(isLoaded){
                return(
                    <Menu categories={tymczasowo} 
                        select={(c) => selectCategory(c)}/>
                )
            } else {
                return(
                    <dir>Poczekaj Chwilę</dir>
                )           
            }
        }
    }

    return (
        <div className={classes.root}>
            <Paper>
                <AppBar position='static'>
                    <ToolBar></ToolBar>
                </AppBar>
            </Paper>
            <Box>
                {showBox}
            </Box> 
        </div>
    );
};

export default Memory;