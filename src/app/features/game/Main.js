import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import Vocabulary from './Vocabulary';
import { database } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVocabulary, selectGame, toggleDict } from './gameSlice';
import Navigation from './Navigation';
import Board from './Board';
import Learn from './Learn';

const useStyles = makeStyles((theme) => ({
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

  return (
    <>
      <Vocabulary
        open={game.isDictOpen}
        onOpen={props.onDictOpen}
        onClose={props.onDictOpen}
        allVocabulary={game.vocabulary}
      />
      <Board game={game}>
        <Learn />
      </Board>
    </>
  );
};

export default Main;
