import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getChapterWords } from './gameSlice';
import { useEffect } from 'react';
import FlashCardsItem from './FlashCardsItem';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },

  header: {
    background: 'green',
    borderRadius: '25px',
    margin: '3vh',
    width: '100%',
    color: 'white',
    textAlign: 'center',
  },
}));

const FlashCards = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChapterWords(props.items));
  }, []);

  return (
    <Grid container className={classes.root}>
      <Typography className={classes.header} variant='h4'>
        Fiszki z działu:{' '}
        <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
      </Typography>
    </Grid>
  );
};

export default FlashCards;
