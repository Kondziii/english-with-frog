import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  outerBar: {
    width: '80%',
    height: '8px',
    background: 'red',
    borderRadius: '25px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transition: 'all 0.5s ease-out',
  },

  innerBar: {
    background: '#0aff00',
    height: '100%',
    transition: 'all 0.5s ease-out',
  },

  disabledProgressBar: {
    width: '0%',
  },
}));

const ChapterProgressBar = (props) => {
  const classes = useStyles();
  const fillValue = props.fill + '%';
  return (
    <div
      className={
        props.fill === null ? classes.disabledProgressBar : classes.outerBar
      }
    >
      <div className={classes.innerBar} style={{ width: fillValue }}></div>
    </div>
  );
};

export default ChapterProgressBar;
