import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  GridList,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame } from './gameSlice';
import GameTypeList from './GameTypeList';
import GameBoardTitle from './GameBoardTitle';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '85vh',
  },

  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '3vh',
    margin: 0,
  },

  title: {
    textAlign: 'center',
    margin: '2vh',
    marginBottom: '0hv',
    background: 'green',
    color: 'white',
    borderRadius: '25px',
  },

  title_text: {
    margin: '1vh',
    textTransform: 'uppercase',
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

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 2;
    }
    if (isWidthUp('sm', props.width)) {
      return 2;
    }
    return 1;
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

  return (
    <FormControl className={classes.root}>
      <RadioGroup>
        <GameBoardTitle title='działy' />

        <GridList
          cellHeight={getCellHeight()}
          cols={1}
          className={classes.gridList}
        >
          <GridList cellHeight={30} cols={getGridListCols()}>
            {Object.keys(game.vocabulary).map((key) => (
              <Grid key={key}>
                <FormControlLabel
                  value={key}
                  control={<Radio color='primary' />}
                  label={game.vocabulary[key]['key']}
                />
              </Grid>
            ))}
          </GridList>
        </GridList>

        <GameBoardTitle title='tryby nauki' />
        <GameTypeList />
      </RadioGroup>
    </FormControl>
  );
};

export default withWidth()(Learn);
