import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },

  avatarStyle: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(2, 0, 1),
  },

  paperStyle: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(0, 4, 2),
  },

  formStyle: {
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
  },

  linkStyle: {
    textDecoration: 'none',
    color: 'blue',
    cursor: 'pointer',
  },
}));

export default useStyles;
