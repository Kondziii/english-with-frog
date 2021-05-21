import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  FormControl,
  Tab,
  Tabs,
  AppBar
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
  nav: {
    backgroundColor: 'green',
    color: "white",
    display: 'flex',
    justifyContent: 'centre',
    
  },

}));

const ShopNavigation = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
        <ThemeProvider theme={theme}>
            <AppBar className={classes.nav} position="static" color="default">
            <Tabs 
              value={props.section}
              indicatorColor="secondary"
              onChange={props.handler}
            > 
              <Tab label="Żabcia" value={props.shop[2].key} />
              <Tab label="Tło" value={props.shop[0].key }/>
              <Tab label="Ciuszki" value={props.shop[1].key}/>
            </Tabs>
            </AppBar>
        </ThemeProvider>
    </FormControl> 
  );
};

export default ShopNavigation;