import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import _ from 'underscore';
import {addMoney, updateLearning} from '../../../../db/updateUser';
import { useSelector } from 'react-redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { useHistory } from 'react-router-dom';
import constants from '../../../../../../const';
import {
    selectUser,
    selectUserInfo,
    updateMoneyState,
  } from '../../../../auth/userSlice';
  import EndDialog from '../EndDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
        height: '87hv'
    },
    title: {
        textAlign: 'center',
        margin: '2vh',
        marginBottom: '0hv',
    },
    end: {
        margin: '1vh',
    },
    card : {
        // width: '10vw',
        // height: '15vh',
        width: '150px',
        height: '100px',
        // border: '2px solid white',     
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#4caf50',
        color: "white"
    },
    open: {
        fontSize:20,       
    },
    blank: {
        fontSize:0,
        background: 'green',
        // boxShadow: "none",
        // border: "none",
    },
    matched : {
        fontSize:20,
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none',
    },
    container: {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    gridList: {
        justifyContent: 'center',
        display: 'flex',
        height: '60vh',
    },
    gridContainer: {
        padding: '3vh',
    }
  }));

const Game = (props) => {
    const user = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);
    const classes = useStyles();
    const history = useHistory();

    let cards = [];
    const [points, setPoints] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useEffect (() => {
        if(points >= 8) {
            setIsEnded(true);
        }
    }, [points]) 

    useEffect (() => {
        if(isEnded === true) {
            if (
                userInfo.learning[Object.keys(userInfo.learning)[props.chapterIndex]]
                  .memory != 100 
              ){
                addMoney(user.uid, constants.COINS_AMOUNT_FOR_MEMORY);
                updateMoneyState(userInfo.money + constants.COINS_AMOUNT_FOR_MEMORY)
                updateLearning(user.uid, props.items.key, 'memory', 100);
                setIsDialogOpen(true);
              }           
        }
    }, [isEnded]) 

    const backToMenuHandler = () => {
        history.push('/');
      };

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
          return 4;
        }
        if (isWidthUp('lg', props.width)) {
          return 4;
        }
        if (isWidthUp('md', props.width)) {
          return 3;
        }
        if (isWidthUp('sm', props.width)) {
          return 3;
        }
        return 2;
      };
    
      const getCellHeight = () => {
        if (isWidthUp('xl', props.width)) {
          return 300;
        }
        if (isWidthUp('lg', props.width)) {
          return 250;
        }
        if (isWidthUp('md', props.width)) {
          return 200;
        }
        if (isWidthUp('sm', props.width)) {
          return 200;
        }
        return 150;
      };

    const clickHandler = (event) => {
        let card = event.target;
        
        if(cards.length === 0) {
            switchCard(card);
            cards.push(card);
        } 
        
        if(cards[0] !== card && cards.length <= 2) {
           switchCard(card);
           cards.push(card);
        }

        if(cards.length===2){ 
            if(cards[0].getAttribute("value") === props.words[cards[1].getAttribute("value")] ||
            cards[1].getAttribute("value") === props.words[cards[0].getAttribute("value")]) {
            setPoints(points + 1);
            cards[0].classList.remove(classes.open);
            cards[1].classList.remove(classes.open);
            cards[0].classList.add(classes.matched);
            cards[1].classList.add(classes.matched);
            cards = [];
            }  
        }

        if(cards.length>2) {
            switchCard(cards[0]);
            switchCard(cards[1]); 
            cards = []; 
            cards.push(card);
        }
         
    }

    const switchCard = (card) => {
        if (card.getAttribute("clicked") === "False") {
            card.setAttribute("clicked", "True");
            card.classList.add(classes.open);
            card.classList.remove(classes.blank);
        } else {
            card.setAttribute("clicked", "False");
            card.classList.add(classes.blank);
            card.classList.remove(classes.open);
        }
      };


    return(
        <Grid container className={classes.root}>         
            <div className={classes.div}>                          
                <Paper className={classes.title}>
                {
                    isEnded ?
                    <Typography className={classes.end} variant="h3">Koniec Gry</Typography>
                    :
                    <Typography className={classes.title_text} variant="h5">Zdobyte Punkty : {points}</Typography>
                }   
                </Paper>
                <Grid 
                container
                justify="center"
                alignItems="center"
                className={classes.gridContainer}>
                    <GridList 
                    cellHeight={getCellHeight} 
                    className={classes.gridList} 
                    cols={getGridListCols()}>
                        {props.array.map((value) =>  (
                            <GridListTile 
                            key={value} 
                            cols={1} 
                            className={classes.container}>
                                <Card>
                                    <CardContent>
                                        <Typography 
                                        key={value} 
                                        value={value} 
                                        className={`${classes.card} ${classes.blank}`} 
                                        onClick={clickHandler} 
                                        clicked="False">
                                            {value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>                    
                </Grid>

            </div>    
            <Button className={classes.buttonStyleBack} onClick={backToMenuHandler}>
                <ArrowLeftIcon />
                Wróć do menu
            </Button>    
            {isDialogOpen && (
                <EndDialog
                description='Gratulacje, udało ci się zakończyć grę, jako nagrodę
                otrzymujesz trochę monet, które możesz wydać na ulepszanie swojego
                żabiego awatara.'
                btnTitle='ok, rozumiem'
                coinsAmount={constants.COINS_AMOUNT_FOR_MEMORY}
                />
            )}            
        </Grid>
    )
}

export default withWidth()(Game);