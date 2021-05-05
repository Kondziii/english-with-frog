import { Grid } from '@material-ui/core';
import GameTypeCard from './GameTypeCard';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { openFlashCards, openMatching, openTest } from './gameSlice';
import { useSelector } from 'react-redux';
import { selectGame } from './gameSlice';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const LEARN_TYPES = [
  {
    title: 'Fiszki',
    description: 'poznaj i naucz się słówek z działu.',
    btnLabel: 'rozpocznij nauke',
  },
  {
    title: 'Dopasowywanie',
    description: 'właściwie dopasuj słówka.',
    btnLabel: 'rozpocznij nauke',
  },
  {
    title: 'Gra w pamięć',
    description: 'znajdź pary słów.',
    btnLabel: 'rozpocznij gre',
  },
  {
    title: 'Test',
    description: 'sprawdź swoją wiedzę w krótkim teście.',
    btnLabel: 'rozpocznij test',
  },
];

const GameTypeList = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);

  const flashCardsHandler = () => {
    if (game.selectedChapterIndex === '') {
      toast.error('Nie wybrałeś działu.');
    } else {
      dispatch(openFlashCards());
      history.push('/flashcards');
    }
  };

  const memoryHandler = () => {
    if (game.selectedChapterIndex === '') {
      toast.error('Nie wybrałeś działu.');
    } else {
      dispatch(openFlashCards());
      history.push('/memory');
    }
  }

  const matchingHandler = () => {
    if (game.selectedChapterIndex === '') {
      toast.error('Nie wybrałeś działu.');
    } else {
      dispatch(openMatching());
      history.push('/matching');
    }
  };

  const testHandler = () => {
    if (game.selectedChapterIndex === '') {
      toast.error('Nie wybrałeś działu.');
    } else {
      dispatch(openTest());
      history.push('/test');
    }
  };

  return (
    <Grid container direction='row' className={classes.root}>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[0].title}
          description={LEARN_TYPES[0].description}
          btnLabel={LEARN_TYPES[0].btnLabel}
          onStart={flashCardsHandler}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[1].title}
          description={LEARN_TYPES[1].description}
          btnLabel={LEARN_TYPES[1].btnLabel}
          onStart={matchingHandler}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[2].title}
          description={LEARN_TYPES[2].description}
          btnLabel={LEARN_TYPES[2].btnLabel}
          onStart={memoryHandler}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[3].title}
          description={LEARN_TYPES[3].description}
          btnLabel={LEARN_TYPES[3].btnLabel}
          onStart={testHandler}
        />
      </Grid>
    </Grid>
  );
};

export default GameTypeList;
