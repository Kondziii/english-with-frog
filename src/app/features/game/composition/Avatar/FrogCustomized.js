import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Paper, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectGame, } from '../../gameSlice';
import { selectUserInfo, selectUser } from '../../../auth/userSlice';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '90vh',
    maxWidth: '300',
    padding: '5vh',
  },
  media: {
    width: '100%',
    padding: 30,
  },
});


const FrogCustomized = () => {
  const classes = useStyles();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  // wybrane żaba, tło i ciuch

  // game.shop.filter( (i) => 
  // { return i.key == 'frogSkin' } )[0].value.filter( (j) =>
  //   { return j.key == userInfo.chosenItems.frogSkin }
  // )[0].value[1].value

  // game.shop.filter( (i) => 
  //   { return i.key == 'background' } )[0].value.filter( (j) =>
  //     { return j.key == userInfo.chosenItems.background }
  //   )[0].value[1].value

  // game.shop.filter( (i) => 
  //   { return i.key == 'clothes' } )[0].value.filter( (j) =>
  //     { return j.key == userInfo.chosenItems.clothes }
  //   )[0].value[1].value
  

  return (
    <Card className={classes.root}>
      <CardActionArea disabled={true}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="fixed"
          image={
            game.shop.filter( (i) => 
              { return i.key == 'frogSkin' } )[0].value.filter( (j) =>
                { return j.key == userInfo.chosenItems.frogSkin }
              )[0].value[1].value
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.displayName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FrogCustomized;