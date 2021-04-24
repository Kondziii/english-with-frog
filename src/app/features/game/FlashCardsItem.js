import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  words: {
    listStyle: 'none',
    display: 'flex',
  },

  root: {
    width: '30vh',
    height: '30vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const FlashCardsItem = () => {
  const classes = useStyles();

  return (
    <li className={classes.words}>
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography color='textSecondary'>adjective</Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </li>
  );
};

export default FlashCardsItem;
