import { selectUser } from './app/features/auth/userSlice';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './app/features/auth/components/Login/Login';
import Register from './app/features/auth/components/Register/Register';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider } from '@material-ui/core';

let theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const user = useSelector(selectUser);

  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
