import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import _ from 'underscore';


const useStyles = makeStyles((theme) => ({
    box: {  
        background: '#C7F083',
    },

    root: {
        margin: 50,
        width: '100%',
        height : '100%',
        maxWidth: 1000,
        border: '2px solid #4caf50',
    },
    header : {
        height: 50,
        textAlign: 'center',
        background: '#4caf50',
    },
    container: {

    },
    div : {
        width: '100%',
        textAlign: 'center',
    },
    startButton : {
        background: '#4caf50',
        width: '100%',
    },
    playground : {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    card : {
        display: 'inline-block',
        margin : 20,
        width: 200,
        height: 150,
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
    },
    button: {
        // width: '100%',
        // height: '100%',

        display: 'inline-block',
        margin : 20,
        width: 200,
        height: 150,
        background: '#4caf50',
        border: '2px solid white',     
        textAlign: 'center',   
        verticalAlign: 'middle'
    }

  }));

const Game = (props) => {
    const classes = useStyles();
   // const points = 0;
    let cards = [];
    const [points, setPoints] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [counter, setCounter] = useState(0);
    //const wordsArray = _.shuffle(_.flatten(_.pairs(props.words),1));

    const startGame = () => {
        setIsStarted(!isStarted);
    }

    useEffect (() => {
        if(points >= 8) {
            setIsEnded(true);
        }
    }, [points]) 
    
    // useEffect(() => {
    //     !isEnded && setTimeout(() => setCounter(counter + 1), 1000);
    //   }, [counter]);

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

        if(cards.length==2){ 
                if(cards[0].getAttribute("value") === props.words[cards[1].getAttribute("value")] ||
                cards[1].getAttribute("value") === props.words[cards[0].getAttribute("value")]) {
                setPoints(points + 1);
                console.log("bingo");
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
        <Grid  className={classes.root} > 
             <Grid item  className={classes.box}>
                <Grid container justify="center">  
                    {
                        isStarted ?
                            !isEnded ?
                            (<div className={classes.div}>                          
                                <div className={classes.header}>Zdobyte Punkty: {points}</div>
                                <div className={classes.playground}>
                                    {
                                        (
                                            props.array.map((value) => (
                                            <div key={value} value={value} className={`${classes.card} ${classes.blank}`} 
                                            onClick={clickHandler} clicked="False" >                                     
                                                {value} 
                                            </div>
                                            
                                            // <Button key={value} value={value} 
                                            // className={`${classes.button} ${classes.blank}`} 
                                            // onClick={clickHandler} clicked="False">                                         
                                            //      {value} 
                                            // </Button>
                                        ))
                                        )
                                    }
                                </div>
                            </div>   )  
                            :
                            <div className={classes.div} >
                                <div>Koniec Gry</div>
                                <div>Twój czas: {counter}</div>
                            </div>                  
                        :
                        <div className={classes.div}>
                            <Button  className={classes.startButton} onClick={startGame}>START</Button>
                        </div>                       
                    }
                </Grid>
            </Grid> 
        </Grid>
    )
}

export default Game;