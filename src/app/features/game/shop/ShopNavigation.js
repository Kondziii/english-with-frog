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
              <Tab label="Tło" value={Object.keys(props.shop)[0] }/>
              <Tab label="Ciuszki" value={Object.keys(props.shop)[1]}/>
              <Tab label="Żabcia" value={Object.keys(props.shop)[2]} />
            </Tabs>
            </AppBar>
        </ThemeProvider>
    </FormControl> 
  );
};

export default ShopNavigation;