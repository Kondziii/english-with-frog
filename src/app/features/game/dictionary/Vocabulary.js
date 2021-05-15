import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Button, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  fullList: {
    [theme.breakpoints.down('sm')]: {
      width: 300
    },
    [theme.breakpoints.up('md')]: {
      width: 500
    }
  },
  vocabulary_section_title: {
    backgroundColor: 'lightgreen',
  },
  vocabulary_section: {
    backgroundColor: 'lightgrey',
    [theme.breakpoints.down('sm')]: {
      margin: 5
    },
    [theme.breakpoints.up('md')]: {
      margin: 5,
    },
    paddingBottom: 8,
  },
  word: {
    paddingTop: 6,
    paddingLeft: 22,
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: 290
    },
    [theme.breakpoints.up('md')]: {
      width: 490
    }
  }
}));

const Vocabulary = (p) => {
  const classes = useStyles();
  const [openVocabulary, setOpenVocabulary] = useState([]);

  const fullList = () => {
    return (
      <div
        className={classes.fullList}
        role="presentation"
        onKeyDown={p.onClose}
      >
        <List>
          {
            Object.keys(p.allVocabulary).map(key => (
              <div key={key}>
                <Paper className={classes.vocabulary_section}>
                  <Paper className={classes.vocabulary_section_title}>
                    <Button className={classes.button} 
                    onClick={
                      openVocabulary.includes(key) ?
                      () => setOpenVocabulary(openVocabulary.filter(
                        item => item !== key
                      )):
                      () => setOpenVocabulary(openVocabulary.concat([key]))}>
                      <ListItem>
                        <ListItemText primary={p.allVocabulary[key]['key']}/>
                      </ListItem>
                    </Button>
                  </Paper>
                  {
                    openVocabulary.includes(key) ? 
                    Object.keys(p.allVocabulary[key]['value']).map(key2 => (
                      // <ListItem>
                        <ListItemText key={key2} className={classes.word} primary={key2 + ' - ' + p.allVocabulary[key]['value'][key2]}/>
                      // </ListItem>
                    )) : ''
                  }
                </Paper>

              </div>
            ))
          }
        </List>
      </div>
    );
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      open={p.open}
      onOpen={p.onOpen}
      onClose={p.onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      {fullList()}
    </SwipeableDrawer>
  );
};

export default Vocabulary;
