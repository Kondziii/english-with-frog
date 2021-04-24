import { Typography, Paper, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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

    [theme.breakpoints.down('md')]: {
      width: '42vh',
      height: '42vh',
    },

    [theme.breakpoints.down('xs')]: {
      width: '35vh',
      height: '42vh',
    },
  },

  wordContainer: {
    marginTop: '5vh',

    [theme.breakpoints.down('md')]: {
      marginTop: '3vh',
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: '2vh',
    },
  },

  textFieldStyle: {
    marginTop: '2vh',
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

const FlashCardsItem = () => {
  const classes = useStyles();

  return (
    <li className={classes.words}>
      <Paper elevation={3}>
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Typography
              variant='h4'
              style={{ fontWeight: 'bold' }}
              className={classes.wordContainer}
            >
              Słowo angielskie
            </Typography>
            <Typography variant='h5' className={classes.wordContainer}>
              Słowo polskie
            </Typography>
            <TextField
              id='writingCheck'
              label='Sprawdź pisownię'
              disabled
              helperText='Niestety nieprawidłowo.'
              variant='outlined'
              className={classes.textFieldStyle}
            />
          </CardContent>
          <CardActions style={{ marginTop: '2vh' }}>
            <Grid container alignItems='flex-end'>
              <Grid item xs={6}>
                <Button size='small' className={classes.btnStyle}>
                  Sprawdź pisownię
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button size='small' className={classes.btnStyle}>
                  Dodaj na koniec
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Paper>
    </li>
  );
};

export default FlashCardsItem;
