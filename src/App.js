import {
  login,
  logout,
  selectUser,
  selectUserInfo,
  getUserGameProgress,
} from './app/features/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './app/features/auth/components/Login/Login';
import Register from './app/features/auth/components/Register/Register';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider } from '@material-ui/core';
import { auth } from './app/firebase';
import { useLayoutEffect } from 'react';
import Main from './app/features/game/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPairsNumber, toggleDict } from './app/features/game/gameSlice';
import Navigation from './app/features/game/navigation/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Board from './app/features/game/composition/Board';
import FlashCards from './app/features/game/learn/activities/flashCards/FlashCards';
import Matching from './app/features/game/learn/activities/maching/Matching';
import Test from './app/features/game/learn/activities/quiz/Test';
import {
  selectGame,
  getCurrentFlashCard,
  getChapterWords,
  selectChapter,
  getCurrentLearningState,
  fetchShop, 
  fetchFrogStateImage,
} from './app/features/game/gameSlice';
import Memory from './app/features/game/learn/activities/memory/Memory';
import Shop from './app/features/game/shop/Shop';
import Vocabulary from './app/features/game/dictionary/Vocabulary';
import { useLocationChange } from './custom_hooks';
import { updateLearning } from './app/features/db/updateUser';
import { database } from './app/firebase';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    background: '#eee',
    zIndex: '1',
  },

  loadingCircle: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

let theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const classes = useStyles();
  const length =
    game.selectedChapterIndex === ''
      ? ''
      : Object.keys(game.vocabulary[game.selectedChapterIndex].value).length;
  const chapter =
    game.selectedChapterIndex === ''
      ? null
      : userInfo.learning[
          Object.keys(userInfo.learning)[game.selectedChapterIndex]
        ];

  const isLogged = async () => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        if (userAuth.displayName) {
          dispatch(
            login({
              email: userAuth.email,
              uid: userAuth.uid,
              displayName: userAuth.displayName,
            })
          );
        }
      } else {
        dispatch(logout());
      }
    });
  };




  const getShop = async () => {
    return database.ref('database/shop');
  };

  const getFrogRef = async () => {
    return database.ref('database/frogState')
  };

  useEffect(() => {
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
          iter = iter + 1;
        });
        dispatch(fetchFrogStateImage(statelist));
      });
    });

  }, []);



  useLayoutEffect(() => {
    isLogged();
  }, [dispatch]);

  useLocationChange((location, prevLocation) => {
    if (location === '/' && prevLocation === '/flashcards') {
      if (chapter.fiszki < ((game.currentFlashCard + 1) / length) * 100) {
        updateLearning(
          user.uid,
          Object.keys(userInfo.learning)[game.selectedChapterIndex],
          'fiszki',
          Math.round(((game.currentFlashCard + 1) / length) * 100)
        );
      }
      dispatch(getCurrentFlashCard(0));
      dispatch(getChapterWords(null));
      dispatch(getCurrentLearningState(false));
      dispatch(selectChapter(''));
    }

    if (location === '/' && prevLocation === '/matching') {
      if (chapter.dopasowywanie < (game.pairsNum / length) * 100) {
        updateLearning(
          user.uid,
          Object.keys(userInfo.learning)[game.selectedChapterIndex],
          'dopasowywanie',
          Math.round((game.pairsNum / length) * 100)
        );
      }
      dispatch(getPairsNumber(null));
      dispatch(getChapterWords(null));
      dispatch(getCurrentLearningState(false));
      dispatch(selectChapter(''));
    }
  });



  const toggleSideBarHandler = () => {
    dispatch(toggleDict());
  };

  const unAuthorizedView = () => {
    return (
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Redirect to='/login'></Redirect>
      </Switch>
    );
  };

  const authorizedView = () => {
    return (
      <div className={classes.root}>
        <Navigation onDictOpen={toggleSideBarHandler} />
        <Vocabulary
          open={game.isDictOpen}
          onOpen={toggleSideBarHandler}
          onClose={toggleSideBarHandler}
          allVocabulary={game.vocabulary}
        />
        <Switch>
          <Route exact path='/'>
            <Main onDictOpen={toggleSideBarHandler} />
          </Route>
          <Route exact path='/flashcards'>
            <Board>
              <FlashCards
                items={game.vocabulary[game.selectedChapterIndex]}
                cardIndex={game.currentFlashCard}
                state={game.isChapterFinished}
                chapterIndex={game.selectedChapterIndex}
              />
            </Board>
          </Route>
          <Route exact path='/matching'>
            <Board>
              <Matching
                items={game.vocabulary[game.selectedChapterIndex]}
                state={game.isChapterFinished}
                chapterIndex={game.selectedChapterIndex}
              />
            </Board>
          </Route>
          <Route exact path='/test'>
            <Board>
              <Test 
              items={game.vocabulary[game.selectedChapterIndex]}
              chapterIndex={game.selectedChapterIndex}
              />
            </Board>
          </Route>
          <Route exact path='/memory'>
            <Board>
              <Memory
                items={game.vocabulary[game.selectedChapterIndex]}
                state={game.isChapterFinished}
                chapterIndex={game.selectedChapterIndex}
              ></Memory>
            </Board>
          </Route>
          <Route exact path='/shop'>
            <Board>
              { userInfo && <Shop /> }
            </Board>
          </Route>
          <Redirect to='/' />
        </Switch>
      </div>
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      {!user ? unAuthorizedView() : authorizedView()}
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
