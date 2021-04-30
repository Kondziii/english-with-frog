import { makeStyles } from '@material-ui/core/styles';
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
      <GameContainer className={classes.containerStyle}>
        {props.children}
      </GameContainer>
    </div>
  );
};

export default Board;
