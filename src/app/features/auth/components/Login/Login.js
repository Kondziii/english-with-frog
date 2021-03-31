import frogMovie from '../../../../../assets/movies/frogMovie.mp4';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Video from '../../Video';
import useStyles from '../PanelStyles';
import { useState } from 'react';
import { auth } from '../../../../firebase';
import { login } from '../../userSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const logToApp = (e) => {
    e.preventDefault();
    setLoginError(false);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
        history.push('/');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/too-many-requests':
            toast.error(
              'Konto zostało tymczasowo zablkowane ze względu na zbyt dużą liczbę nieudanych prób logowania. ' +
                'Jeśli koniecznie chcesz się zalogowac to zmień hasło.'
            );
            break;
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            setLoginError(true);
            toast.error('Nieprawidłowy email lub hasło.');
        }
      });
  };

  return (
    <div className='loginPanel'>
      <Video src={frogMovie}></Video>
      <Grid container component='main' className={classes.root}>
        <Grid
          item
          xs={12}
          sm={7}
          md={5}
          component={Paper}
          elevation={24}
          square
        >
          <div className={classes.paperStyle}>
            <Avatar className={classes.avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h4'>Zaloguj się</Typography>
            <form
              autoComplete='on'
              className={classes.formStyle}
              onSubmit={logToApp}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Adres email'
                name='email'
                autoComplete='email'
                placeholder='Wprowadź maila...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={loginError}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Hasło'
                type='password'
                id='password'
                autoComplete='current-password'
                placeholder='Wprowadź hasło...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={loginError}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Zaloguj
              </Button>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='baseline'
              >
                <Grid item>
                  <Typography>
                    <Link className={classes.linkStyle} to='/'>
                      Zapomniałeś hasła?
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    Nie masz jeszcze konta?{' '}
                    <Link className={classes.linkStyle} to='/register'>
                      {'Zarejestruj się'}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
          <Grid item xs={false} sm={4} md={7} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
