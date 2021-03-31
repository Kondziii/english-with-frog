import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import UserPanel from './UserPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Logged in
            </Typography>
            <UserPanel></UserPanel>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  );
};

export default Main;
