import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import Vocabulary from './Vocabulary';
import { database } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVocabulary, selectGame, toggleDict } from './gameSlice';
import Navigation from './Navigation';
import Board from './Board';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    background: '#eee',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  grid_paper: {
    height: '87vh',
    marginTop: '4vh',
    backgroundColor: 'rgb(230,230,230)',
  },
  zaba: {
    textAlign: 'center',
    paddingTop: '30vh',
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);

  const getData2 = async () => {
    return database.ref('database/vocabulary');
  };

  useEffect(() => {
    getData2().then((allvocabulary) => {
      allvocabulary.on('value', (snapshot) => {
        let vocabularylist = [];
        snapshot.forEach((snap) => {
          vocabularylist.push({ key: snap.key, value: snap.val() });
        });
        dispatch(fetchVocabulary(vocabularylist));
      });
    });
  }, []);

  const toggleSideBarHandler = () => {
    dispatch(toggleDict());
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Navigation onDictOpen={toggleSideBarHandler} />
      </Paper>
      <Vocabulary
        open={game.isDictOpen}
        onOpen={toggleSideBarHandler}
        onClose={toggleSideBarHandler}
        allVocabulary={game.vocabulary}
      />
      <Board />
    </div>
  );
};

export default Main;
