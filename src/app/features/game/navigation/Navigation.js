import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import UserPanel from './userPanel/UserPanel';

const headersData = [
  {
    label: 'Nauka',
    href: '/',
  },
  {
    label: 'Sklep',
    href: '/shop',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
  },

  header: {
    width: '100%',
    backgroundColor: 'green',
    color: 'white',
    paddingRight: '8%',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '1%',
    },
  },
  logo: {
    fontFamily: 'Dancing Script, sans-serif',
    fontSize: '2rem',
  },
  menuButton: {
    fontWeight: 700,
    size: '1.8 rem',
    marginLeft: '3vw',
    padding: '10px 30px',
    borderBottom: '2px solid transparent',
    transition: '0.2s',

    '&:hover': {
      borderColor: 'white',
    },
  },
  linksContainer: {
    marginLeft: '10vw',
  },

  userPanelContainer: {
    position: 'absolute',
    right: 70,
    top: 7,

    [theme.breakpoints.down('sm')]: {
      top: 3,
      right: 50,
    },
  },

  toolbar: {
    position: 'relative',
  },
  drawerContainer: {
    minWidth: '15vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Navigation = (props) => {
  const {
    header,
    logo,
    menuButton,
    toolbar,
    drawerContainer,
    linksContainer,
    userPanelContainer,
    root,
  } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {appLogo}
        <div className={linksContainer}>
          <Button
            {...{
              color: 'inherit',
              className: menuButton,
            }}
            style={{ margin: 0 }}
            onClick={props.onDictOpen}
          >
            Słowniczek
          </Button>
          {getMenuButtons()}
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <Link
              {...{
                color: 'inherit',
                style: { textDecoration: 'none', width: '100%' },
              }}
              onClick={props.onDictOpen}
            >
              <MenuItem>Słowniczek</MenuItem>
            </Link>

            {getDrawerChoices()}
          </div>
        </Drawer>

        <div>{appLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: 'inherit',
            style: { textDecoration: 'none', width: '100%' },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const appLogo = (
    <Typography variant='h6' component='h1' className={logo}>
      English with Frog
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: 'inherit',
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
          style={{ margin: 0 }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header className={root}>
      <AppBar className={header} position='static'>
        {mobileView ? displayMobile() : displayDesktop()}
        <div className={userPanelContainer}>
          <UserPanel></UserPanel>
        </div>
      </AppBar>
    </header>
  );
};

export default Navigation;
