import UserPanel from './UserPanel';
import { Button, AppBar, Toolbar, ButtonGroup} from '@material-ui/core';

const Navigation = (props) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <ButtonGroup variant="text" color="default" aria-label="text primary button group">
          <Button variant='contained' onClick={props.onDictOpen}>
            Słowniczek
          </Button>
          <Button variant='contained' onClick={props.onLearnOpen}>
            Nauka
          </Button>   
          <Button variant='contained'>
            Sklep
          </Button>
          <Button variant='contained'>
            Inne
          </Button>      
        </ButtonGroup>
        <UserPanel></UserPanel>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
