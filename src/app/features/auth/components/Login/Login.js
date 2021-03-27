import frogMovie from '../../../../../assets/movies/frogMovie.mp4';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Video from '../../Video';
import useStyles from '../PanelStyles';

const Login = () => {
  const classes = useStyles();

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
            <form noValidate className={classes.formStyle}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Adres email'
                name='email'
                autoComplete='email'
                autoFocus
                placeholder='Wprowadź maila...'
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
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Zapamiętaj mnie'
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
