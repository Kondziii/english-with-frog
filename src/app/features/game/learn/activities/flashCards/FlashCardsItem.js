import { Typography, Paper, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  words: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
  },

  root: {
    width: '50vh',
    height: '50vh',
    textAlign: 'center',
    border: '4px solid transparent',
    transition: '0.2s',

    [theme.breakpoints.down('md')]: {
      width: '42vh',
      height: '45vh',
    },

    [theme.breakpoints.down('xs')]: {
      width: '35vh',
      height: '42vh',
    },
  },

  wordContainer: {
    marginTop: '4vh',
    transition: '0.2s',

    [theme.breakpoints.down('md')]: {
      marginTop: '2vh',
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: '1.5vh',
    },
  },

  textFieldStyle: {
    marginTop: '2vh',

    [theme.breakpoints.down('xs')]: {
      marginTop: '4vh',
    },
  },

  btnStyle: {
    transition: '0.2s',
    padding: '5%',

    '&:hover': {
      background: 'green',
      color: 'white',
    },
  },
}));

const FlashCardsItem = (props) => {
  const classes = useStyles();
  const [enteredWord, setEnteredWord] = useState('');
  const [wordError, setWordError] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const inputHandler = (event) => {
    setEnteredWord(event.target.value);
  };

  const checkWritingHandler = () => {
    setInputMode(true);
    setWordError(false);
    setIsCorrect(false);
    setEnteredWord('');
  };

  const confirmHandler = () => {
    if (enteredWord && enteredWord.toLocaleLowerCase() === props.englishWord.toLocaleLowerCase()) {
      setWordError(false);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setWordError(true);
    }
    setInputMode(false);
  };

  return (
    <li className={classes.words}>
      <Paper elevation={3}>
        <Card
          className={classes.root}
          variant='outlined'
          style={{
            borderColor: (wordError && 'red') || (isCorrect && '#0aff00'),
          }}
        >
          <CardContent>
            <Typography
              variant='h4'
              style={{ fontWeight: 'bold', opacity: inputMode ? 0 : 1 }}
              className={classes.wordContainer}
            >
              {props.englishWord}
            </Typography>
            <Typography
              variant={inputMode ? 'h4' : 'h5'}
              className={classes.wordContainer}
            >
              {props.polishWord}
            </Typography>
            <TextField
              value={enteredWord}
              onChange={inputHandler}
              id='writingCheck'
              label='Sprawdź pisownię'
              error={wordError}
              disabled={!inputMode}
              helperText={wordError && 'Niestety nieprawidłowo.'}
              variant='outlined'
              className={classes.textFieldStyle}
            />
          </CardContent>
          <CardActions style={{ marginTop: '2vh' }}>
            <Grid container alignItems='flex-end'>
              <Grid item xs={12}>
                {!inputMode ? (
                  <Button
                    size='small'
                    className={classes.btnStyle}
                    onClick={checkWritingHandler}
                  >
                    Sprawdź pisownię
                  </Button>
                ) : (
                  <Button
                    size='small'
                    className={classes.btnStyle}
                    onClick={confirmHandler}
                  >
                    Zatwierdź
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Paper>
    </li>
  );
};

export default FlashCardsItem;
