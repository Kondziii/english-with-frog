import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import _ from 'underscore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        textAlign: 'center',
        margin: '2vh',
        marginBottom: '0hv',

    },
    title_text: {
        margin: '1vh'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    startButton: {
        textAlign: 'center',
        width: '100%',
    },
    card : {
        display: 'inline-block',
        margin : '20',
        width: '10vw',
        height: '15vh',
        background: '#4caf50',
        border: '2px solid white',     
        textAlign: 'center',   
        verticalAlign: 'middle'
    },
    open: {
        fontSize:20,
        verticalAlign: 'middle'
    },
    blank: {
        fontSize:0,
    },
    matched : {
        visibility: 'hidden',
    }
  }));

const Game = (props) => {

    const classes = useStyles();

    let cards = [];
    const [points, setPoints] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    //const [counter, setCounter] = useState(0);
    const startTime = performance.now();
    //const wordsArray = _.shuffle(_.flatten(_.pairs(props.words),1));

    const startGame = () => {
        setIsStarted(!isStarted);
    }

    useEffect (() => {
        if(points >= 8) {
            setIsEnded(true);
        }
    }, [points]) 

    const clickHandler = (event) => {
        let card = event.target;
        console.log(cards.length);
        
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
            {
                isStarted?
                (
                !isEnded ?
                (<div className={classes.div}>                          
                    <Paper className={classes.title}>
                        <Typography className={classes.title_text} variant="h3">Znajdź pary</Typography>
                        <Typography className={classes.title_text} variant="h5">Zdobyte Punkty : {points}</Typography>
                    </Paper>
                    <GridList cellHeight={160} className={classes.gridList} cols={4}>
                        {props.array.map((value) =>  (
                            <GridListTile key={value} cols={1}>
                                <Typography key={value} value={value} className={`${classes.card} ${classes.blank}`} 
                                onClick={clickHandler} clicked="False">
                                    {value}
                                </Typography>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>   )  
                :
                <div className={classes.div} >
                    <Paper className={classes.title}>
                        <Typography className={classes.title_text} variant="h3">Koniec Gry</Typography>
                        <Typography className={classes.title_text} variant="h5">Twój czas to {Math.floor((performance.now() - startTime)*100)} sekund</Typography>
                    </Paper>
                </div>
                )
                :
                <Button variant="outlined" className={classes.startButton} onClick={startGame}>START</Button>
            }          
        </Grid>
    )
}

export default Game;