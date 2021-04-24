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
}));

const Main = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);

  const getRef = async () => {
    return database.ref('database/vocabulary');
  };

  useEffect(() => {
    getRef().then((allvocabulary) => {
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
      <Board game={game} />
    </div>
  );
};

export default Main;
