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
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Video from '../../Video';
import useStyles from '../PanelStyles';
import { useState } from 'react';
import { auth } from '../../../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import { firestore } from '../../../../firebase';
import { createUser } from '../../../db/createUser';

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const emailValidate = (value) => {
    const isError = !value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    setEmailError(isError);
    return isError;
  };

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const passwordValidate = (value) => {
    const isError = !value.match(
      /^(?:(?:(?=.*?[0-9])(?=.*?[-!@#$%&*ˆ+=_])|(?:(?=.*?[0-9])|(?=.*?[A-Z])|(?=.*?[-!@#$%&*ˆ+=_])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%&*ˆ+=_]))[A-Za-z0-9-!@#$%&*ˆ+=_]{6,}$/
    );
    setPasswordError(isError);
    return isError;
  };

  const [password_rep, setPassword_rep] = useState('');
  const [password_repError, setPassword_repError] = useState(false);
  const password_repValidate = (value) => {
    const isError = password !== value;
    setPassword_repError(isError);
    return isError;
  };

  const register = (e) => {
    e.preventDefault();

    setEmailError(emailValidate(email));
    setPasswordError(passwordValidate(password));
    setPassword_repError(password_repValidate(password_rep));
    setEmailExists(false);

    if (!emailError && !passwordError && !password_repError) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
          userAuth.user
            .updateProfile({
              displayName: nickname,
            })
            .then(() => {
              dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: nickname,
                })
              );
              createUser(userAuth.user.uid);
            });
        })
        .catch((err) => {
          if (err) {
            setEmailExists(true);
          }
        });
    }
  };

  return (
    <div className='registerPanel'>
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
              <SupervisedUserCircleIcon />
            </Avatar>
            <Typography variant='h4'>Zarejestruj się</Typography>
            <form className={classes.formStyle} onSubmit={register}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) {
                    emailValidate(e.target.value);
                  }
                }}
                onBlur={() => emailValidate(email)}
                error={emailError || emailExists}
                helperText={
                  (emailError && 'Nieprawidłowy adres email!') ||
                  (emailExists && 'Adres email jest już w użyciu!')
                }
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='nickname'
                label='Nazwa użytkownika'
                name='nickname'
                placeholder='Wprowadź nazwę użytkownika...'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) {
                    passwordValidate(e.target.value);
                    if (password_repError) {
                      setPassword_repError(e.target.value !== password_rep);
                    }
                  }
                }}
                error={passwordError}
                helperText={
                  passwordError &&
                  'Hasło musi mieć przynajmniej 6 znaków, przynajmniej 1 duzą literę lub cyfrę!'
                }
                onBlur={() => {
                  passwordValidate(password);
                  if (password_repError) {
                    password_repValidate(password_rep);
                  }
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Potwierdzenie hasła'
                type='password'
                id='passwordConfirmation'
                autoComplete='current-password'
                placeholder='Wprowadź hasło...'
                value={password_rep}
                onChange={(e) => {
                  setPassword_rep(e.target.value);
                  if (password_repError) {
                    password_repValidate(e.target.value);
                  }
                }}
                onBlur={() => password_repValidate(password_rep)}
                error={password_repError}
                helperText={
                  password_repError && 'Podane hasła nie są takie same!'
                }
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Zarejestruj
              </Button>
              <Typography align='right'>
                Masz już konto?{' '}
                <Link className={classes.linkStyle} to='/login'>
                  {'Zaloguj się'}
                </Link>
              </Typography>
            </form>
          </div>
          <Grid item xs={false} sm={4} md={7} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
