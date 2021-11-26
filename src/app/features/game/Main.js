import React, { useEffect } from 'react';
import { database } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchVocabulary, 
  selectGame, 
  selectChapter, 
  fetchShop, 
  fetchFrogStateImage } from './gameSlice';
import Board from './composition/Board';
import Learn from './learn/Learn';
import { getUserInfo } from '../db/getUser';
import { getUserGameProgress, selectUser } from '../auth/userSlice';

const Main = (props) => {
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const user = useSelector(selectUser);


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

    dispatch(selectChapter(''));

    getUserInfo(user.uid).then((userInfo) => {
      dispatch(getUserGameProgress(userInfo));
    });

  }, []);

  return (
    <>
      <Board game={game}>
        <Learn />
      </Board>
    </>
  );
};

export default Main;