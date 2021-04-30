import { login, logout, selectUser } from './app/features/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './app/features/auth/components/Login/Login';
import Register from './app/features/auth/components/Register/Register';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider } from '@material-ui/core';
import { auth } from './app/firebase';
import { useEffect } from 'react';
import Main from './app/features/game/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// <<<<<<< memory
// import Memory from './app/features/game/memory/Memory'
// =======
import { toggleDict } from './app/features/game/gameSlice';
import Navigation from './app/features/game/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Board from './app/features/game/Board';
import FlashCards from './app/features/game/FlashCards';
import { selectGame } from './app/features/game/gameSlice';
import Memory from './app/features/game/memory/Memory';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    background: '#eee',
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
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const classes = useStyles();

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

  useEffect(() => {
    isLogged();
  }, [dispatch]);

  const toggleSideBarHandler = () => {
    dispatch(toggleDict());
  };

  return (
    <MuiThemeProvider theme={theme}>
      {!user ? (
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Redirect to='/login'></Redirect>
        </Switch>
      ) : (
        <div className={classes.root}>
          <Navigation onDictOpen={toggleSideBarHandler} />
          <Switch>
            <Route exact path='/'>
              <Main onDictOpen={toggleSideBarHandler} />
            </Route>
            <Route exact path='/flashcards'>
              <Board>
                <FlashCards
                  items={game.vocabulary[game.selectedChapterIndex]}
                />
              </Board>
            </Route>
            <Route exact path='/memory'>
              <Board>
                {/* <Memory words={game.vocabulary[value]['value']}></Memory> */}
                <Memory items={game.vocabulary[game.selectedChapterIndex]}></Memory>
              </Board>
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      )}
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
