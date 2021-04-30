import Toolbar from '@material-ui/core/Toolbar';
import UserPanel from './UserPanel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const ToolBar = () => {
    const classes = useStyles();
    return (
        <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Logged in
            </Typography>
            <Link variant='h6' 
              className={classes.title} to="/memory">
              Memory
            </Link>
            <UserPanel>
            
            </UserPanel>
        </Toolbar>
    )
}

export default ToolBar;