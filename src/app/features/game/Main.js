import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import UserPanel from './UserPanel';

import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Vocabulary from './Vocabulary';
import firebase from '../../firebase';
import "firebase/remote-config";
import "firebase/database";

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
  const [vocabulary, setVocabulary] = useState([]);
  const [openVocabulary, setOpenVocabulary] = useState(false);

  const getData = () => {
    const allvocabulary = firebase.database().ref("database/vocabulary");
    allvocabulary.on("value", snapshot => {
      let vocabularylist = [];
      snapshot.forEach(snap => {
        vocabularylist.push({ key: snap.key, value: snap.val() });
      });
      setVocabulary(vocabularylist);
    });
  } 
  
  useEffect(() => {
    getData();
  });

  const handleSidebarOpen = () => {
    setOpenVocabulary(true);
  };

  const handleSidebarClose = () => {
    setOpenVocabulary(false);
  };

  return (
      <div className={classes.root}>
        <Paper>
          <AppBar position='static'>
            <Toolbar>
              <Button variant="contained" onClick={handleSidebarOpen}>Vocabulary</Button>
              <Typography variant='h6' className={classes.title}>
                Logged in
              </Typography>
              <UserPanel></UserPanel>
            </Toolbar>
          </AppBar>
        </Paper>
        <Vocabulary
        open = {openVocabulary}
        onOpen = {handleSidebarOpen}
        onClose = {handleSidebarClose}
        allVocabulary = {vocabulary}
        />
      </div>
    );
};

export default Main;
