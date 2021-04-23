import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    Grid, 
    GridList,
    FormControl, 
    RadioGroup, 
    FormControlLabel,
    Radio,
    Typography
 } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame } from './gameSlice';

const useStyles = makeStyles(() => ({
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '3vh'
    },
    title: {
        textAlign: 'center',
        margin: '2vh',
        marginBottom: '0hv',
    },
    title_text: {
        margin: '1vh'
    },
    memoraITP: {
      textAlign: 'center',
      paddingTop: '30vh',
    },
}));

const Learn = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const [value, setValue] = React.useState('0');

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) { return 4; }
        if (isWidthUp('lg', props.width)) { return 3; }
        if (isWidthUp('md', props.width)) { return 2; }
        if (isWidthUp('sm', props.width)) { return 2; }
        return 1;
    };

    const getCellHeight = () => {
        if (isWidthUp('xl', props.width)) { return 300; }
        if (isWidthUp('lg', props.width)) { return 250; }
        if (isWidthUp('md', props.width)) { return 200; }
        if (isWidthUp('sm', props.width)) { return 200; }
        return 150;
    };
        

    return (
        <FormControl >
            <RadioGroup>
                <Paper className={classes.title}>
                    <Typography className={classes.title_text} variant="h3">DZIAŁY</Typography>
                </Paper>
                <GridList 
                cellHeight={getCellHeight()} 
                cols={1} 
                className={classes.gridList}>
                    <GridList cellHeight={30} cols={getGridListCols()} container>
                        {Object.keys(game.vocabulary).map(key => (
                            <Grid>
                                <FormControlLabel value={key} control={<Radio color="primary"/>} label={game.vocabulary[key]['key']} />
                            </Grid>
                        ))}
                    </GridList>                  
                </GridList>
            </RadioGroup>
            <h1 className={classes.memoraITP}>
                Miejsce na testy, fiszki, memory i inne
            </h1>
        </FormControl>
    );
};

export default withWidth()(Learn);