import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Vocabulary from './Vocabulary';
import { database } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { changeView, fetchVocabulary, selectGame, toggleDict } from './gameSlice';
// import { selectUser, fetchChapterPoints, selectUserData } from '../auth/userSlice';
import Navigation from './Navigation';
import Learn from './Learn';

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
  grid_paper: {
    height: '87vh',
    marginTop: '4vh',
    backgroundColor: 'rgb(230,230,230)'
  },
  zaba: {
    textAlign: 'center',
    paddingTop: '30vh',
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const user = useSelector(selectUserData);

  const getData2 = async () => {
    return database.ref('database/vocabulary')
  };
  
  // const createUserData = () => {
  // var chapters = [];
  // game.vocabulary.map(key => {
  //   chapters.push({key:key, value:0});
  // });
  // database.ref('database/game/'+user.user.uid).set({chapters});
  // console.log(chapters);
  // };

  // const getChapterPoints = async () => {
  //   const allusers = database.ref('database/game');
  //   allusers.on('value', (snapshot) => {
  //     let userslist = [];
  //     snapshot.forEach((snap) => {
  //       userslist.push( {key:snap.key, value:snap.key} );
  //     });
     
  //     if (!userslist.includes(user.user.uid)) {
  //       createUserData();
  //       console.log('xxxx');
  //     }
  //   });
  // };

  useEffect(() => {
    getData2().then((allvocabulary) => {
      allvocabulary.on('value', (snapshot) => {
        let vocabularylist = [];
        snapshot.forEach((snap) => {
          vocabularylist.push({ key: snap.key, value: snap.val() });
        });
        dispatch(fetchVocabulary(vocabularylist));
      });
    });
  }, []);

  const toggleSideBarHandler = () => {
    dispatch(toggleDict());
  };
  const openLearnView = () => {
    dispatch(changeView('learn'));
  };
  const openTestView = () => {
    dispatch(changeView('test'));
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Navigation 
        onDictOpen={toggleSideBarHandler}
        onLearnOpen={openLearnView}
        oneTestOpen={openTestView}
        />
      </Paper>
      <Vocabulary
        open={game.isDictOpen}
        onOpen={toggleSideBarHandler}
        onClose={toggleSideBarHandler}
        allVocabulary={game.vocabulary}
      />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={11} md={7}>
          <Paper className={classes.grid_paper}>
            {game.view === 'learn' ?
            <Learn></Learn>
            :
            ''}
          </Paper>
        </Grid>
        <Grid item xs={11} md={4}>
          <Paper className={classes.grid_paper}>
            <h1 className={classes.zaba}>Tu będzie żaba</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
