import { Typography, Grid, Button, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getChapterWords } from './gameSlice';
import { useEffect } from 'react';
import FlashCardsItem from './FlashCardsItem';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '87vh',
    width: '100%',
    position: 'relative',
  },

  header: {
    background: 'green',
    borderRadius: '25px',
    width: '100%',
    margin: '3vh',
    padding: '1%',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10vh',

    [theme.breakpoints.down('md')]: {
      marginBottom: '15vh',
    },

    [theme.breakpoints.down('xs')]: {
      marginBottom: '20vh',
    },
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
}));

const FlashCards = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChapterWords(props.items));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Typography className={classes.header} variant='h4'>
          Fiszki z działu:{' '}
          <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
        </Typography>
      </Grid>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <IconButton className={classes.navContainer}>
            <NavigateBeforeIcon className={classes.nav} />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <FlashCardsItem />
        </Grid>
        <Grid item xs={2}>
          <IconButton className={classes.navContainer}>
            <NavigateNextIcon className={classes.nav} />
          </IconButton>
        </Grid>
      </Grid>

      <Button className={classes.buttonStyleBack}>
        <ArrowLeftIcon />
        Wróć do menu
      </Button>
      <Button className={classes.buttonStyleEnd}>
        Zakończ nauke
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default FlashCards;
