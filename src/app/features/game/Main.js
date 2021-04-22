import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import Vocabulary from './Vocabulary';
import { database } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVocabulary, selectGame, toggleDict } from './gameSlice';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);

  const [vocabulary, setVocabulary] = useState([]);

  const getData = async () => {
    const allvocabulary = database.ref('database/vocabulary');
    allvocabulary.on('value', (snapshot) => {
      let vocabularylist = [];
      snapshot.forEach((snap) => {
        vocabularylist.push({ key: snap.key, value: snap.val() });
      });
      setVocabulary(vocabularylist);
    });
  };

  useEffect(() => {
    getData().then(() => {
      dispatch(fetchVocabulary(vocabulary));
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
        allVocabulary={vocabulary}
      />
    </div>
  );
};

export default Main;
