import {
  Typography,
  Grid,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getChapterWords } from './gameSlice';
import { useEffect } from 'react';
import FlashCardsItem from './FlashCardsItem';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useState } from 'react';
import { getCurrentFlashCard, getCurrentLearningState } from './gameSlice';
import { useHistory } from 'react-router-dom';

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

  buttonStyleBack: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    transition: '0.2s',

    '&:hover': {
      color: 'white',
      background: 'green',
    },
  },

  buttonStyleEnd: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    transition: '0.2s',

    '&:hover': {
      color: 'white',
      background: 'green',
    },
  },

  nav: {
    fontSize: '3rem',
  },

  navContainer: {
    transition: '0.2s',
    justifyContent: 'right',

    '&:hover': {
      background: 'green',
      color: 'white',
    },
  },

  counter: {
    width: '7vh',
    height: '7vh',
    background: 'green',
    color: 'white',
    fontSize: '1rem',
    margin: theme.spacing(2),
  },
}));

const FlashCards = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const length = Object.keys(props.items.value).length;
  const [index, setIndex] = useState(props.cardIndex);
  const [prevLimit, setPrevLimit] = useState(props.cardIndex === 0);
  const [nextLimit, setNextLimit] = useState(props.cardIndex === length - 1);
  const isEnd = props.state;

  useEffect(() => {
    dispatch(getChapterWords(props.items.value));
    dispatch(getCurrentFlashCard(index));
  }, [index]);

  useEffect(() => {
    if (index == length - 1) {
      dispatch(getCurrentLearningState(true));
      //TODO push information about finishing this chapter to database of this user
    }
  });

  const nextCardHandler = () => {
    setPrevLimit(false);
    setIndex((prevIndex) => {
      if (prevIndex + 1 === length - 1) {
        setNextLimit(true);
      }
      return (prevIndex += 1);
    });
  };

  const prevCardHandler = () => {
    setNextLimit(false);
    setIndex((prevIndex) => {
      if (prevIndex - 1 === 0) {
        setPrevLimit(true);
      }
      return (prevIndex -= 1);
    });
  };

  const backToMenuHandler = () => {
    history.push('/');
    dispatch(getCurrentFlashCard(0));
  };

  const endChapterHandler = () => {
    history.push('/');
    dispatch(getCurrentFlashCard(0));
    dispatch(getCurrentLearningState(false));
  };

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
            Fiszki z działu:{' '}
            <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar className={classes.counter}>{`${
            index + 1
          }/${length}`}</Avatar>
        </Grid>
        <Grid item>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item xs={2} style={{ textAlign: 'right' }}>
              <IconButton
                className={classes.navContainer}
                onClick={prevCardHandler}
                disabled={prevLimit}
              >
                <NavigateBeforeIcon className={classes.nav} />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <FlashCardsItem
                englishWord={Object.keys(props.items.value)[index]}
                polishWord={
                  props.items.value[Object.keys(props.items.value)[index]]
                }
                index={index}
                key={Object.keys(props.items.value)[index]}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                className={classes.navContainer}
                onClick={nextCardHandler}
                disabled={nextLimit}
              >
                <NavigateNextIcon className={classes.nav} />
              </IconButton>
            </Grid>
          </Grid>

          <Button
            className={classes.buttonStyleBack}
            style={{ opacity: isEnd ? 0 : 1 }}
            disabled={isEnd}
            onClick={backToMenuHandler}
          >
            <ArrowLeftIcon />
            Wróć do menu
          </Button>
          <Button
            className={classes.buttonStyleEnd}
            style={{ opacity: !isEnd ? 0 : 1 }}
            disabled={!isEnd}
            onClick={endChapterHandler}
          >
            Zakończ nauke
            <ArrowRightIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FlashCards;
