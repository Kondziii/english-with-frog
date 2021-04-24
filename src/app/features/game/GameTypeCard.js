import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    height: '22vh',
    margin: '1vh',
    overflow: 'auto',
    position: 'relative',
    border: '2px transparent solid',
    background: '#eee',
    transition: '0.2s',

    '&:hover': {
      borderColor: 'green',
    },

    [theme.breakpoints.down('sm')]: {
      height: '17vh',
    },
  },

  spanStyle: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },

  btnStyle: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    transition: '0.3s',

    '&:hover': {
      background: 'green',
      color: 'white',
    },
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
}));

const GameTypeCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${props.className}`}>
      <CardContent className={classes.cardBck}>
        <Typography gutterBottom variant='h5' className={classes.title}>
          {props.title}{' '}
          <span className={classes.spanStyle}>- {props.description}</span>
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size='small'
          color='primary'
          className={classes.btnStyle}
          onClick={() => props.onStart()}
        >
          {props.btnLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameTypeCard;
