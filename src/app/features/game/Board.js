import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Learn from './Learn';
import { makeStyles } from '@material-ui/core/styles';
import FlashCards from './FlashCards';
import GameContainer from './GameContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2vh 0',
  },

  containerStyle: {
    minHeight: '87vh',
    position: 'relative',
  },
}));

const Board = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        className={classes.gridContainer}
      >
        <GameContainer className={classes.containerStyle}>
          {!props.game.isFlashCardsOpen && <Learn />}
          {props.game.isFlashCardsOpen && (
            <FlashCards
              items={props.game.vocabulary[props.game.selectedChapterIndex]}
            />
          )}
        </GameContainer>
        <Grid elevation={3} item xs={12} md={4}>
          {/* <Paper>
            <Typography variant='h2'> Zaba here</Typography>
          </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Board;
