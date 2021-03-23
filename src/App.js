import { selectUser } from './app/features/auth/userSlice';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './app/features/auth/components/Login/Login';
import Register from './app/features/auth/components/Register/Register';

function App() {
  const user = useSelector(selectUser);

  return (
    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/register'>
        <Register />
      </Route>
    </Switch>
  );
}

export default App;
