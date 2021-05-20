import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, } from '../../gameSlice';
import { selectUserInfo, selectUser } from '../../../auth/userSlice';
import Grid from '@material-ui/core/Grid';
import constants from '../../../../../const';
import Frogstage from './Frogstage';
import FrogCustomized from './FrogCustomized';

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


const Avatar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  return (
    <div>
      {userInfo.frogstage < 5 &&
      <Frogstage/> }
      {userInfo.frogstage == 5 &&
      <FrogCustomized /> }
    </div>
  );
}

export default Avatar;