import UserPanel from './UserPanel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch } from 'react-redux';

const Navigation = (props) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button variant='contained' onClick={() => props.onDictOpen()}>
          Vocabulary
        </Button>
        <UserPanel></UserPanel>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
