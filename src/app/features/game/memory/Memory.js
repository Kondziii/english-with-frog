import { makeStyles } from '@material-ui/core/styles';
import Game from './Game';
import _ from 'underscore';
import { useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    Paper,
    IconButton,
    Avatar,
  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '87vh',
      width: '100%',
      position: 'relative',
    },
    header: {
        background: 'green',
        borderRadius: '25px',
        margin: '3vh 3vh 0 3vh',
        padding: '1%',
        color: 'white',
        textAlign: 'center',
    },
    btnStyle: {
        transition: '0.2s',
        padding: '10%',
        margin: '10%',
        background: 'green',
        color: 'white',
    
        '&:hover': {
          background: 'white',
          color: 'black',
        },
      },
}))

const Memory = (props) => {
    const classes = useStyles();
    const [start, setStart] = useState(false);

    const startGame = () => {
        setStart(!start);
    }

    const wordsArray = _.shuffle(_.flatten(_.sample(_.pairs(props.items.value), 8),1));

    return (
        <div className={classes.root}>
            <Grid
                container
                direction='column'
                justify='flex-start'
                alignItems='stretch'
            >
                <Grid item>
                    <Typography className={classes.header} variant='h4'>
                    Gra w pamięć z działu:{' '}
                        <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
                    </Typography>
                    <Grid item>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            {
                                !start ?
                                <Button
                                    size='large'
                                    className={classes.btnStyle}
                                    onClick={startGame}
                                    >
                                    START
                                </Button>
                                :
                                <Game words={props.items.value} array={wordsArray}></Game>
                            }
                            
                        </Grid>
                    </Grid>
                
                </Grid>
                
            </Grid>
        </div>
    );
};

export default Memory;