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
import { useState, useEffect } from 'react';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import { updateMoney, updateItems, updateChosenItems } from '../../db/updateUser';
import { 
  selectUserInfo, 
  selectUser, 
  updateMoneyState,
  updateChosenFrogSkin,
  updateChosenBackground,
  updateChosenClothes,
  updateItemsFrogSkin,
  updateItemsBackground,
  updateItemsClothes,
 } from '../../auth/userSlice';

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
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [buyReRender, setBuyReRender] = useState(false);
  const [chosenReRender, setIsChosenReRender] = useState(false);

  useEffect(() => {
    dispatch(updateMoneyState(userInfo.money - props.price));
    updateMoney(user.uid, userInfo.money - props.price);
    if (props.section == 'frogSkin') {
      dispatch(updateItemsFrogSkin(props.itemKey));
      updateItems(user.uid, 'frogSkin', props.itemKey, 1);
    }
    else if (props.section == 'background') {
      dispatch(updateItemsBackground(props.itemKey));
      updateItems(user.uid, 'background', props.itemKey, 1);
    }
    else if (props.section == 'clothes') {
      dispatch(updateItemsClothes(props.itemKey));
      updateItems(user.uid, 'clothes', props.itemKey, 1);
    };
  }, [buyReRender])

  const buyItem = () => {
    if (userInfo.money >= props.price) {
      setBuyReRender(!buyReRender);
    }
  };

  useEffect(() => {
    if (props.section == 'frogSkin') {
      dispatch(updateChosenFrogSkin(props.itemKey, 10));
      updateChosenItems(user.uid, 'frogSkin', props.itemKey, 10);
    }
    else if (props.section == 'background') {
      dispatch(updateChosenBackground(props.itemKey, 10));
      updateChosenItems(user.uid, 'background', props.itemKey, 10);
    }
    else if (props.section == 'clothes') {
      updateChosenItems(user.uid, 'clothes', props.itemKey, 10);
      dispatch(updateChosenClothes(props.itemKey, 10));
    };
  }, [chosenReRender])

  const choseItem = () => {
    setIsChosenReRender(!chosenReRender);
  };
  
  const choseNoItem = () => {
    updateChosenItems(user.uid, 'clothes', 0);
    dispatch(updateChosenClothes(0));
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
        onClick={()=>buyItem()}
        disabled={!!props.bought}>
        Kup {props.price}
      </Button>
      { props.section != 'clothes' &&
        <Button 
          className={classes.button} 
          size="large" 
          color="primary"
          onClick={()=>choseItem()}
          disabled={!props.bought || !!props.chosen}>
          Wybierz
        </Button>
      }
      { props.section == 'clothes' && !props.chosen && props.bought &&
        <Button 
          className={classes.button} 
          size="large" 
          color="primary"
          onClick={()=>choseItem()}
          disabled={!props.bought || !!props.chosen}>
          Wybierz
        </Button>
      }
      { props.section == 'clothes' && props.chosen && props.bought &&
        <Button 
          className={classes.button} 
          size="large" 
          color="primary"
          onClick={()=>choseNoItem()}>
          Anuluj
        </Button>
      }
    </CardActions>
  </Card>  
  );
};

export default Items;