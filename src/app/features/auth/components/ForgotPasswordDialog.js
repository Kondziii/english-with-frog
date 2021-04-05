import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';
import SendIcon from '@material-ui/icons/Send';

const ForgotPasswordDialog = ({ open, setOpen }) => {
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setEmail('');
    setOpen(false);
  };

  const handleSend = () => {
    const config = {
      url: 'http://localhost:3000/login',
      handleCodeInApp: true,
    };

    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        toast.success(
          'Pomyślnie wysłano maila resetującego hasło - sprawdź swojego maila.'
        );
      })
      .catch(() => {
        toast.error('Podany email nie istnieje lub jest podany błędnie.');
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Zapomniałeś hasła?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Podaj maila na którego masz założone konto, a my wyślemy ci maila z
            możliwością zmiany hasła.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Adres email'
            placeholder='Wprowadź maila...'
            type='email'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Anuluj
          </Button>
          <Button onClick={handleSend} color='primary' endIcon={<SendIcon />}>
            Wyślij
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordDialog;
