import { Grid } from '@material-ui/core';
import GameTypeCard from './GameTypeCard';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { openFlashCards, openMatching, openTest, selectGame } from '../../gameSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { selectUserInfo } from '../../../auth/userSlice';
import constants from '../../../../../const';

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
  const userInfo = useSelector(selectUserInfo);

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
  };

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
          progress={
            game.selectedChapterIndex === ''
              ? null
              : userInfo.learning[
                  Object.keys(userInfo.learning)[game.selectedChapterIndex]
                ].fiszki
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[1].title}
          description={LEARN_TYPES[1].description}
          btnLabel={LEARN_TYPES[1].btnLabel}
          onStart={matchingHandler}
          progress={
            game.selectedChapterIndex === ''
              ? null
              : userInfo.learning[
                  Object.keys(userInfo.learning)[game.selectedChapterIndex]
                ].dopasowywanie
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[2].title}
          description={LEARN_TYPES[2].description}
          btnLabel={LEARN_TYPES[2].btnLabel}
          onStart={memoryHandler}
          progress={
            game.selectedChapterIndex === ''
              ? null
              : userInfo.learning[
                  Object.keys(userInfo.learning)[game.selectedChapterIndex]
                ].memory
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <GameTypeCard
          title={LEARN_TYPES[3].title}
          description={LEARN_TYPES[3].description}
          btnLabel={LEARN_TYPES[3].btnLabel}
          onStart={testHandler}
          progress={
            game.selectedChapterIndex === ''
              ? null
              : ((userInfo.learning[
                  Object.keys(userInfo.learning)[game.selectedChapterIndex]
                ].test / constants.CONST_TEST_LENGTH) * 100)
          }
        />
      </Grid>
    </Grid>
  );
};

export default GameTypeList;
