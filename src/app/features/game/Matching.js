import {
    Typography,
    Grid,
    Button,
    Paper,
    GridList
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/core/styles';
  import { useDispatch } from 'react-redux';
  import { getChapterWords } from './gameSlice';
  import { useEffect, useState } from 'react';
  import ListItem from "@material-ui/core/ListItem";
  import { addMoney, updateLearning } from '../db/updateUser';
  import { GetLearning } from '../db/getUser';
  import { useSelector } from 'react-redux';
  import ArrowRightIcon from '@material-ui/icons/ArrowRight';
  import { selectUser } from '../auth/userSlice';
  import { useHistory } from 'react-router-dom';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '87vh',
      width: '100%',
      position: 'relative',
    },
  
    header: {
      background: 'green',
      borderRadius: '25px',
      margin: '3vh 3vh 0 3vh',
      padding: '1%',
      color: 'white',
      textAlign: 'center',
    },

    buttonStyleEnd: {
      position: 'absolute',
      right: 10,
      bottom: 10,
      transition: '0.2s',
  
      '&:hover': {
        color: 'white',
        background: 'green',
      },
    },
  }));

  const Matching = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const length = Object.keys(props.items.value).length;
    const pairs = Object.entries(props.items.value);
    const [choices, setChoices] = useState([]);
    const [current, setCurrent] = useState(null);
    const [selected, setSelected] = useState({});
    const [points, setPoints] = useState(1);
    const [end, setEnd] = useState(false);
    const isDone = GetLearning(user.uid, props.items.key, 'dopasowywanie');
    const history = useHistory();

    useEffect(() => {
      const all = pairs.flatMap(([val1, val2]) => {
        return [
          {lang: "en", value: val1},
          {lang: "pl", value: val2},
        ];
      })
      const randomized = all.sort(() => Math.random() - 0.5);
      setChoices(randomized);
    }, [length]);

    useEffect(() => {
      dispatch(getChapterWords(props.items.value));
    });

    const endChapterHandler = () => {
      history.push('/');
    };
    
    const isMatch = (val1, val2) =>
      pairs.some(
        ([choice1, choice2]) =>
        (choice1 === val1 && choice2 === val2) ||
        (choice1 === val2 && choice2 === val1)
      );

    const choose = (choice) => {
      if(current) {
        if (isMatch(current.value, choice.value)) {
          setSelected((val) => ({ ...val, [choice.value]: true }));
          setPoints(points+1);
          if(points === length) {
            setPoints(0);
            setEnd(true);
            if(isDone === 0) {
              addMoney(user.uid, 100);
              updateLearning(user.uid, props.items.key, 'dopasowywanie', 1);
            }
          }

        } else {
          setSelected((val) => ({ ...val, [current.value]: false }));
        }
        setCurrent(null)
      } else {
        setSelected((val) => ({ ...val, [choice.value]: true }));
        setCurrent(choice);
      }
    }

    return (
      <div className={classes.root}>
        <Grid container
              direction='column'
              justify='flex-start'
              alignItems='stretch'
        >
          <Grid item>
              <Typography className={classes.header} variant='h4'>
                  Dopasowywanie z działu:{' '}
                  <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
              </Typography>
          </Grid>
        </Grid>
        <Grid container
              direction='column'
              justify='flex-start'
              alignItems='center'
        >
          {!end && (
            <Grid container alignItems='center' justify='center'>
              {!isDone && (
                <Grid item alignItems='center'>
                  <Typography variant='h6'>
                    Dopasuj angielskie słówka i ich polskie odpowiedniki klikając na nie
                  </Typography>
                </Grid>
              )}
              {!!isDone && (
                <Grid item alignItems='center'>
                  <Typography variant='h6'>
                      Dopasowywanie z tego działu zostało już zrobione
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                <GridList cellHeight={'auto'} cols={5}>
                  {choices.map((choice) => (
                    <ListItem key={`${choice.lang}-${choice.value}`}>
                      <Button onClick={() => choose(choice)}
                              disabled = {!!selected[choice.value]}
                      >
                        {choice.value}
                      </Button>
                    </ListItem>
                  ))}
                </GridList>
              </Grid>
            </Grid>
          )}
          {end && (
            <Grid container alignItems='center' justify='center'>
              <Grid item>
                <Typography className={classes.header} variant='h4'>
                    Gratulacje! Ukończono dopasowywanie z działu:{' '}
                    <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
                </Typography>
              </Grid>
              <Button
                className={classes.buttonStyleEnd}
                onClick={endChapterHandler}
              >
                Zakończ nauke
                <ArrowRightIcon />
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    );
  };
  
  export default Matching;
  