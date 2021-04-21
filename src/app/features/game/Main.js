import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Toolbar from './Toolbar';

// import Button from '@material-ui/core/Button';
// import Vocabulary from './Vocabulary';
import React, { Component } from "react";
// import firebase from '../../firebase';
// import "firebase/remote-config";
// import "firebase/database";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openVocabulary: false,
      vocabulary: [],
      words: [],
    };
  };

  // componentDidMount = async () => {
  //   const allvocabulary = await firebase.database().ref("database/vocabulary");
  //   allvocabulary.on("value", snapshot => {
  //     let vocabularylist = [];
  //     snapshot.forEach(snap => {
  //       vocabularylist.push(snap.val());
  //     });
  //     this.setState({ vocabulary: vocabularylist });
  //   });
  //   console.log(this.state.vocabulary);
  // };

  // handleSidebarOpen = () => {
  //   this.setState({ openVocabulary: true });
  // };

  // handleSidebarClose = () => {
  //   this.setState({ openVocabulary: false });
  // };

  selectWords = (c) => {

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper>
          <AppBar position='static'>
            <Toolbar>
            </Toolbar>
          </AppBar>
        </Paper>
        {/* <Vocabulary
        open = {this.state.openVocabulary}
        onOpen = {this.handleSidebarOpen}
        onClose = {this.handleSidebarClose}
        /> */}
      </div>
    );
  };
};

export default withStyles(useStyles)(Main);
