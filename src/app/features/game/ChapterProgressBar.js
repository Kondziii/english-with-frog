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
    justifyContent: 'flex-end',
  },

  innerBar: {
    background: '#0aff00',
    height: '100%',
    transition: 'all 0.3s ease-out',
  },
}));

const ChapterProgressBar = (props) => {
  const classes = useStyles();
  const fillValue = '50%';

  return (
    <div className={classes.outerBar}>
      <div className={classes.innerBar} style={{ width: fillValue }}></div>
    </div>
  );
};

export default ChapterProgressBar;
