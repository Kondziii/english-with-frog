import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectGame, } from '../../gameSlice';
import { selectUserInfo, selectUser } from '../../../auth/userSlice';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: 'auto',
    minHeight: '90vh',
  },
  media: {
    height: '500px',
  },
});


const Frogstage = () => {
  const classes = useStyles();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  return (
    <Card className={classes.root}>
      <CardActionArea disabled={true}>
        <CardMedia
          className={classes.media}
          image={game.frogStateImage.filter( (i) => 
            { return i.key == userInfo.frogstage } )[0].value}
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

export default Frogstage;