import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Button,
  CardActions,
} from '@material-ui/core';

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
      <Button className={classes.button} size="large" color="primary">
        Kup {props.price}
      </Button>
    </CardActions>
  </Card>  
  );
};

export default Items;