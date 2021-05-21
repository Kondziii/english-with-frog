import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Button,
  CardActions,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import { selectUserInfo, selectUser, updateFrogstage, updateMoneyState } from '../../auth/userSlice';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
  },
  media: {
    width: "100%",
    padding: 30,
  },
  button: {
    marginBottom: 5,
  },
}));

const Items = (props) => {
  const classes = useStyles();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const buyItem = () => {
    
  };

  const choseItem = () => {

  };

  return (
    <Card className={classes.root}>
    <CardActionArea disabled={true}>
      <CardMedia
        className={classes.media}
        component="img"
        alt="Contemplative Reptile"
        height="100%"
        image={props.image}
      />
    </CardActionArea>
    <CardActions>     

      <Button
        className={classes.button} 
        size="large" 
        color="primary" 
        onClick={buyItem()}
        disabled={!!props.bought}>
        Kup {props.price}
      </Button>
      <Button 
        className={classes.button} 
        size="large" 
        color="primary"
        onClick={choseItem()}
        disabled={!props.bought || props.chosen}>
        Wybierz
      </Button>
    </CardActions>
  </Card>  
  );
};

export default Items;