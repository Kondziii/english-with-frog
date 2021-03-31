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

let theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch]);

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
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Redirect to='/' />
        </Switch>
      )}
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
