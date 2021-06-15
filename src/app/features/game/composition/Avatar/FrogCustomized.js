import React, { useEffect } from 'react';
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

import mergeImages from 'merge-images';

import fs1 from '../../../../../assets/images/frogSkin/1.png';
import fs2 from '../../../../../assets/images/frogSkin/2.png';

import b1 from '../../../../../assets/images/background/1.png';
import b2 from '../../../../../assets/images/background/2.png';

import c1 from '../../../../../assets/images/clothes/1.png';
import c2 from '../../../../../assets/images/clothes/2.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '87vh',
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

  const [src, setSrc] = useState( null )

  const possibleFrogSkin = [fs1, fs2];
  const possibleBackground = [b1, b2];
  const possibleClothes = [c1, c2];

  useEffect( () => {
    const chosenFS = game.shop.filter( (i) => 
      { return i.key == 'frogSkin' } )[0].value.filter( (j) =>
        { return j.key == userInfo.chosenItems.frogSkin }
      )[0].value;
    const chosenB = game.shop.filter( (i) => 
      { return i.key == 'background' } )[0].value.filter( (j) =>
        { return j.key == userInfo.chosenItems.background }
      )[0].value;

    if (userInfo.chosenItems.clothes) {
      const chosenC = game.shop.filter( (i) => 
        { return i.key == 'clothes' } )[0].value.filter( (j) =>
          { return j.key == userInfo.chosenItems.clothes }
        )[0].value;

      mergeImages([
        { src: possibleBackground[userInfo.chosenItems.background-1], x: chosenB[2].value, y: chosenB[3].value },
        { src: possibleFrogSkin[userInfo.chosenItems.frogSkin-1], x: chosenFS[2].value, y: chosenFS[3].value },
        { src: possibleClothes[userInfo.chosenItems.clothes-1], x: chosenC[2].value, y: chosenC[3].value }
      ])
        .then(src => { setSrc(src) })      
    } else {
      mergeImages([
        { src: possibleBackground[userInfo.chosenItems.background-1], x: chosenB[2].value, y: chosenB[3].value },
        { src: possibleFrogSkin[userInfo.chosenItems.frogSkin-1], x: chosenFS[2].value, y: chosenFS[3].value }
      ])
        .then(src => { setSrc(src) })      
    }

  }, [userInfo.chosenItems.frogSkin, 
    userInfo.chosenItems.background, 
    userInfo.chosenItems.clothes]);


  return (
    <Card className={classes.root}>
      <CardActionArea disabled={true}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="fixed"
          image={src}
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