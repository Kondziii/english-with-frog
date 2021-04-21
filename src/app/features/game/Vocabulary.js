import React, { Component } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Button, withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from '@material-ui/core/Paper';

const styles = {
  fullList: {
    width: 600
  },
  vocabulary_section_title: {
    backgroundColor: 'lightgreen',
    paddingLeft: 10,
  },
  vocabulary_section: {
    backgroundColor: 'lightgrey',
    margin: 10,
  },
  word: {
    paddingLeft: 30,
    paddingTop: 6,
  },
  button: {
    width: 580
  }
};

class Vocabulary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSidebar: false,
      openVocabulary: [],
    };
  }

  showDrawer = event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ openSidebar: true });
  };

  fullList = () => {
    const { classes, onClose, allVocabulary } = this.props;

    return (
      <div
        className={classes.fullList}
        role="presentation"
        onKeyDown={onClose}
      >
        <List>
          {
            Object.keys(allVocabulary).map(key => (
              <div key={key}>
                <Paper className={classes.vocabulary_section}>
                  <Paper className={classes.vocabulary_section_title}>
                    <Button className={classes.button} onClick={
                      this.state.openVocabulary.includes(key) ?
                      () => this.setState({openVocabulary: this.state.openVocabulary.filter(
                        item => item !== key
                      )}):
                      () => this.setState({openVocabulary: this.state.openVocabulary.concat([key])})}>
                      <ListItem>
                        <ListItemText primary={allVocabulary[key]['key']}/>
                      </ListItem>
                    </Button>
                  </Paper>
                  {
                    this.state.openVocabulary.includes(key) ? 
                    Object.keys(allVocabulary[key]['value']).map(key2 => (
                      // <ListItem>
                        <ListItemText key={key2} className={classes.word} primary={key2 + ' - ' + allVocabulary[key]['value'][key2]}/>
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

  render() {
    const { open, onOpen, onClose } = this.props;

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <SwipeableDrawer
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {this.fullList()}
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styles)(Vocabulary);
