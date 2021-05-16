import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  FormControl,
  ButtonGroup,
  Button,
} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#388e3c',
          },
      },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    marginTop: '2vh',
    marginBottom: '2vh',
  },
}));

const ShopNavigation = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
        <ThemeProvider theme={theme}>
            <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group" fullWidth={true}>
                <Button>Żaby</Button>
                <Button>Tło</Button>
                <Button>Ciuszki</Button>
            </ButtonGroup>      
        </ThemeProvider>
    </FormControl> 
  );
};

export default ShopNavigation;