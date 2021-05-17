import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import { getUserGameProgress, selectUserInfo, selectUser } from '../../auth/userSlice';
import { getUserInfo } from '../../db/getUser';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '3vh',
    margin: 0,
  },
  media: {
    height: 500,
  },
});


const Avatar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  return (
    <Card className={classes.root}>
      <CardActionArea disabled={true}>
        { userInfo && game &&
        <CardMedia
          className={classes.media}
          image={game.frogStateImage.filter( (i) => 
            { return i.key == userInfo.frogstage } )[0].value}
        /> }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.displayName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Avatar;