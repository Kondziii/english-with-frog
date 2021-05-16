import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, fetchFrogStates, setCurrentFrogState } from '../gameSlice';
import { selectUserInfo, selectUser } from '../../auth/userSlice';

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
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  const findCurrentState = () => {
    let state = userInfo.frogstage;
    return game.frogStateImage.filter( (i) => { return i.key == state } )[0].value;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={findCurrentState()}
          // image="https://firebasestorage.googleapis.com/v0/b/english-with-frog.appspot.com/o/images%2Ffrogstate%2Fkijanki1.png?alt=media&token=65950489-ced6-4d6e-936e-c4b486f22ff2"
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

export default Avatar;