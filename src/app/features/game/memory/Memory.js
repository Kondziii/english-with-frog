import { makeStyles } from '@material-ui/core/styles';
import Game from './Game';
import _ from 'underscore';
import { useState } from 'react';

import {
    Typography,
    Grid,
  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
}))

const Memory = (props) => {
    const classes = useStyles();

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
                        <Game words={props.items.value} array={wordsArray}></Game>
                    </Grid>
                
                </Grid>
                
            </Grid>
        </div>
    );
};

export default Memory;