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

  const getShop = async () => {
    return database.ref('database/shop');
  };

  const getFrogRef = async () => {
    return database.ref('database/frogState')
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
    
    getShop().then((shop) => {
      shop.on('value', (snapshot) => {
        let shopItems = [];
        snapshot.forEach((snap) => {
          let items = []
          snap.forEach((item) => {
            let arg = []
            item.forEach((a) => {
              arg.push({ key: a.key, value: a.val()})
            });
            items.push({ key: item.key, value: arg})
          });
          shopItems.push({ key: snap.key, value: items });
        });
        dispatch(fetchShop(shopItems));
      });
    });
    
    getFrogRef().then((allstates) => {
      allstates.on('value', (snapshot) => {
        let iter = 1;
        let statelist = [];
        snapshot.forEach((snap) => {
          statelist.push({ key: iter, value: snap.val() });
          // statelist.push({ key: snap.key, value: snap.val() });
          iter = iter + 1;
        });
        dispatch(fetchFrogStateImage(statelist));
      });
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