import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import coinIcon from '../../../../../assets/images/coinIcon.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: 'green',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: 'white',
  },

  contentContainer: {
    padding: '10%',
    textAlign: 'center',
  },

  money: {
    marginTop: '4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
  },

  confirmButton: {
    marginTop: '4%',
    fontSize: '1rem',
    transition: '0.3s',

    '&:hover': {
      background: 'green',
      color: 'white',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide timeout='2000' direction='up' ref={ref} {...props} />;
});

const EndDialog = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon style={{ color: 'white' }} />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.contentContainer}>
          <Typography varinat='h5'>{props.description}</Typography>
          <div className={classes.money}>
            <span>+ {props.coinsAmount}</span>
            <img
              style={{ height: '2.5rem', marginLeft: '1%' }}
              src={coinIcon}
            ></img>
          </div>
          <Button className={classes.confirmButton} onClick={handleClose}>
            {props.btnTitle}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default EndDialog;
