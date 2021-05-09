import { Typography, Grid, Button, Paper, GridList } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import _ from 'underscore';
import { useDispatch } from 'react-redux';
import { getChapterWords } from './gameSlice';
import { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { addMoney, updateLearning } from '../db/updateUser';
// import { GetLearning } from '../db/getUser';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectUserInfo,
  updateMoneyState,
} from '../auth/userSlice';
import { useHistory } from 'react-router-dom';
import {
  getFirstWord,
  getSecondWord,
  getCurrentLearningState,
  getPairsNumber,
} from './gameSlice';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EndDialog from './EndDialog';
import constants from '../../../const';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '87vh',
    width: '100%',
    position: 'relative',
    // overflowY: 'auto',
    // overflowX: 'hidden',
  },

  wordItem: {
    justifyContent: 'center',
    border: '1px solid #ddd',
    padding: '0',
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

  buttonStyleBack: {
    position: 'absolute',
    left: 10,
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
  const history = useHistory();
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

  const [wordsListToDisplay, setWordListToDisplay] = useState([]);
  const [firstWord, setFirstWord] = useState(null);
  const [secondWord, setSecondWord] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updated, setUpdated] = useState(!props.state);
  const length = Object.keys(props.items.value).length;
  let polishWord;
  let englishWord;
  const [pairsNum, setPairsNum] = useState(0);

  const getGridListCols = () => {
    if (isWidthUp('md', props.width)) {
      return 5;
    }
    if (isWidthUp('sm', props.width)) {
      return 3;
    }
  };

  useEffect(() => {
    dispatch(getPairsNumber(pairsNum));
    if (pairsNum == length) {
      dispatch(getCurrentLearningState(true));
      setIsEnd(true);
      if (
        userInfo.learning[Object.keys(userInfo.learning)[props.chapterIndex]]
          .dopasowywanie != 100 &&
        updated
      ) {
        setUpdated(false);
        dispatch(
          updateMoneyState(userInfo.money + constants.COINS_AMOUNT_FOR_MATCHING)
        );
        addMoney(user.uid, constants.COINS_AMOUNT_FOR_MATCHING);
        setIsDialogOpen(true);
      }
    }
  }, [pairsNum]);

  useEffect(() => {
    let list = [];
    Object.entries(props.items.value).forEach((e) => {
      list.push({
        val: e[0],
        lan: 'en',
      });
      list.push({
        val: e[1],
        lan: 'pl',
      });
    });
    setWordListToDisplay(_.shuffle(list));
  }, []);

  useEffect(() => {
    if (firstWord && secondWord && firstWord.lan !== secondWord.lan) {
      if (firstWord.lan === 'pl') {
        polishWord = firstWord.val;
        englishWord = secondWord.val;
      } else {
        polishWord = secondWord.val;
        englishWord = firstWord.val;
      }
      if (
        englishWord in props.items.value &&
        polishWord === props.items.value[englishWord]
      ) {
        setPairs([...pairs, firstWord, secondWord]);
        setPairsNum((prevValue) => {
          return prevValue + 1;
        });
        setFirstWord(null);
        setSecondWord(null);
      }
    }
  }, [secondWord]);

  const wordComparator = (word1, word2) => {
    if (word1 === null || word2 === null) {
      return false;
    }

    if (word1.lan !== word2.lan || word1.val !== word2.val) {
      return false;
    }
    return true;
  };

  const setSelected = (word) => {
    if (firstWord === null && !wordComparator(firstWord, word)) {
      setFirstWord(word);
      dispatch(getFirstWord(word.val));
    } else if (secondWord === null && !wordComparator(firstWord, word)) {
      setSecondWord(word);
      dispatch(getSecondWord(word.val));
    } else {
      setFirstWord(word);
      setSecondWord(null);
      dispatch(getFirstWord(word.val));
      dispatch(getSecondWord(null));
    }
  };

  const backToMenuHandler = () => {
    history.push('/');
  };

  const endChapterHandler = () => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <Grid
        container
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
        <Grid item>
          <GridList
            cellHeight='auto'
            cols={getGridListCols()}
            style={{
              margin: '2vh 2vh 8vh 2vh',
              border: '1px solid #eee',
            }}
          >
            {wordsListToDisplay.length !== 0 &&
              wordsListToDisplay.map((word, index) => (
                <ListItem
                  key={index}
                  className={classes.wordItem}
                  style={{ padding: '0' }}
                  selected={
                    wordComparator(word, firstWord) ||
                    wordComparator(word, secondWord)
                  }
                >
                  <Button
                    onClick={() => setSelected(word)}
                    disabled={
                      pairs.filter((e) => wordComparator(e, word)).length > 0
                    }
                    style={{ height: '100%', width: '100%' }}
                  >
                    {word.val}
                  </Button>
                </ListItem>
              ))}
          </GridList>
          <Button
            className={classes.buttonStyleBack}
            style={{ opacity: isEnd ? 0 : 1 }}
            disabled={isEnd}
            onClick={backToMenuHandler}
          >
            <ArrowLeftIcon />
            Wróć do menu
          </Button>
          <Button
            className={classes.buttonStyleEnd}
            style={{ opacity: !isEnd ? 0 : 1 }}
            disabled={!isEnd}
            onClick={endChapterHandler}
          >
            Zakończ nauke
            <ArrowRightIcon />
          </Button>
        </Grid>
      </Grid>
      {isDialogOpen && (
        <EndDialog
          description='Gratulacje, udało ci się dopasować wszystkie wyrazy z działu, jako nagrodę
          otrzymujesz trochę monet, które możesz wydać na ulepszanie swojego
          żabiego awatara.'
          btnTitle='ok, rozumiem'
          coinsAmount={constants.COINS_AMOUNT_FOR_MATCHING}
          title='Nagroda za dopasowanie wszystkich słów'
        />
      )}
    </div>
  );
};

export default withWidth()(Matching);
