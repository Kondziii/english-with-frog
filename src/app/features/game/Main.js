import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import UserPanel from './UserPanel'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Vocabulary from './Vocabulary';
import React, { Component } from "react";
import firebase from '../../firebase';
import "firebase/remote-config";
import "firebase/database";
import Memory from './memory/Memory';
import Menu from './memory/Menu';

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
      isSelected: false,
      section: null,
    };
  };

  getData = async () => {
    const allvocabulary = firebase.database().ref("database/vocabulary");
    allvocabulary.on("value", snapshot => {
      let vocabularylist = [];
      snapshot.forEach(snap => {
        vocabularylist.push({ key: snap.key, value: snap.val() });
      });
      this.setState({ vocabulary: vocabularylist });
    });
  } 

  componentDidMount = async () => {
    await this.getData();
  };

  handleSidebarOpen = () => {
    this.setState({ openVocabulary: true });
  };

  handleSidebarClose = () => {
    this.setState({ openVocabulary: false });
  };

  selectSection = (s) => {
    this.setState({section : s});
    this.setState({isSelected : true});
    console.log(this.state.section);
  }
  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper>
          <AppBar position='static'>
            <Toolbar>
              <Button variant="contained" onClick={this.handleSidebarOpen}>Vocabulary</Button>
              <Typography variant='h6' className={classes.title}>
                Logged in
              </Typography>
              <UserPanel></UserPanel>
            </Toolbar>
          </AppBar>
        </Paper>
        <Vocabulary
        open = {this.state.openVocabulary}
        onOpen = {this.handleSidebarOpen}
        onClose = {this.handleSidebarClose}
        allVocabulary = {this.state.vocabulary}
        />
        {
          this.state.isSelected ?
          <Memory section={this.state.section}></Memory>
          :
          <Menu sections={this.state.vocabulary} select={() => this.selectSection()}/>
        }
        
      </div>
    );
  };
};

export default withStyles(useStyles)(Main);
