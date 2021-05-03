import {Typography, Grid, Button, ListItem, List, TextField, ListSubheader} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getChapterWords } from './gameSlice';
import { useEffect } from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shuffle from 'shuffle-array';
import { selectUser } from '../auth/userSlice';
import { useSelector } from 'react-redux';
import { addMoney, updateTests } from '../db/updateUser';
import { GetTests, getTests } from '../db/getUser';

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '90vh',
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
  
    taskHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '1vh',
    },

    gridList: {
        maxHeight: '70vh',
        overflowY: 'auto',
    },

    gridListTask: {
        minHeight: '51vh',
        overflowY: 'auto',
        paddingTop: '4%',
        justifyContent: 'center',
    },
        
    resizeTextBox: {
        fontSize: '2vh',
        minWidth: '25vh',
    },

    resultTextBox: {
        width: '21vh',
        padding: '0%',
    },

  }));
  
  const Test = (props) => {

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [isEnd, setIsEnd] = useState(false);
    const [score, setScore] = useState(0);
    const [finalArray, setFinalArray] = useState([]);
    const isDone = GetTests(user.uid, props.items.key);
  
    const testWords = shuffle.pick(Object.entries(props.items.value).flatMap(([key, value]) => {
         return [
             {key: key, value: value},
         ];
     }), {'picks': 14});

     const points = testWords.flatMap((word) => {
        return [
            {key: word.key, value: word.value, input:'brak odpowiedzi', point: 0}
        ];
     });

    const temp = Array.from(testWords);
    const firstWords = temp.splice(0,7);
    const secondWords = temp.splice(-7);

    useEffect(() => {
      dispatch(getChapterWords(props.items.value));
    });
    
    const backToMenuHandler = () => {
      history.push('/');
    };
  
    const endTestHandler = () => {
      setFinalArray(points);
      setScore(() => {
            var s = 0;
            for(let word in points) {
              s+=points[word].point;
          }
          return s;
      })
      setIsEnd(true);
    };
    
    const check = (input, correct, stageOne) => {
        if(input === correct) {
            for(var word in points) {
                if(stageOne) {
                    if(points[word].value === input) {
                        points[word].input = input;
                        points[word].point = 1;
                    }
                } else {
                    if(points[word].key === input) {
                        points[word].input = input;
                        points[word].point = 1;
                    }
                }
            }
        } else {
            for(var word in points) {
                if(stageOne) {
                    if(points[word].value === correct) {
                        points[word].input = input;
                        points[word].point = 0;
                    }
                } else {
                    if(points[word].key === correct) {
                        points[word].input = input;
                        points[word].point = 0;
                    }
                }
            }
        }
    }

    var n=0;
    var m=0;


    return (
      <div className={classes.root}>
        <Grid
          container
          direction='column'
        >
            <Grid item xs={12}>
                <Typography className={classes.header} variant='h4'>
                    Test z działu:{' '}
                    <span style={{ fontWeight: 'bold' }}>{props.items.key}</span>
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridList}>
                {!isEnd && (
                <Grid>
                <Grid item>
                    <Typography className={classes.taskHeader} variant='h5'>
                        Zadanie 1. Przetłumacz podane słówka na język polski.
                    </Typography>
                
                    <Grid container className={classes.gridListTask}>
                        <List>
                            {firstWords.map((word) => (
                                <ListItem key={word.key} >
                                    <TextField 
                                    value={word.key}
                                    InputProps={{
                                    readOnly: true,
                                    classes: {input: classes.resizeTextBox}
                                    }}
                                    color='secondary'
                                    />        
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            {firstWords.map((word) => (
                                <ListItem key={word.value}>
                                    <TextField 
                                    onChange={(e) => check(e.target.value, word.value, true)}
                                    InputProps={{
                                        classes: {input: classes.resizeTextBox},
                                    }}
                                    />
                                </ListItem>
                            ))}
                        </List>              

                    </Grid>
                </Grid>
                
                <Grid item>
                    <Typography className={classes.taskHeader} variant='h5'>
                        Zadanie 2. Przetłumacz podane słówka na język angielski.
                    </Typography>

                    <Grid container className={classes.gridListTask}>
                        <List>
                            {secondWords.map((word) => (
                                <ListItem key={word.value}>
                                    <TextField 
                                    value={word.value}
                                    InputProps={{
                                    readOnly: true,
                                    classes: {input: classes.resizeTextBox}
                                    }}
                                    color='secondary'
                                    />        
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            {secondWords.map((word) => (
                                <ListItem key={word.key}>
                                    <TextField 
                                    onChange={(e) => check(e.target.value, word.key, false)}
                                    InputProps={{
                                        classes: {input: classes.resizeTextBox},
                                    }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                </Grid>
                )}
                {isEnd && (
                    <Grid item>
                        <Typography className={classes.taskHeader} variant='h4'>
                            Uzyskany wynik:{' '}
                            <span style={{ fontWeight: 'bold' }}>{score}</span>
                            /14
                        </Typography>
                        <Typography className={classes.taskHeader} variant='h6'>
                            Poniżej możesz zobaczyć swój test.
                        </Typography>
                        <Grid container className={classes.gridListTask}>
                        <List 
                            subheader = {
                                <ListSubheader> 
                                    PODANE SŁOWO
                                </ListSubheader>
                            }
                        >
                            {finalArray.map((word) => {if(n < 7) {
                                n += 1
                            return (
                                <ListItem key={word.key+'#'}>
                                    <TextField 
                                    value={word.key}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={classes.resultTextBox}
                                    size='small'                                    
                                    />   
                                </ListItem>)
                            } else {
                            return (
                                <ListItem key={word.value+'#'}>
                                    <TextField 
                                    value={word.value}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={classes.resultTextBox}
                                    size='small'
                                    />  
                                </ListItem>)
                            }
                            })}
                        </List>
                        <List
                        subheader = {
                            <ListSubheader> 
                                POPRAWNA ODPOWIEDŹ
                            </ListSubheader>
                        }
                        >
                            {finalArray.map((word) => {if(m < 7) {
                                m += 1;
                            return (
                                <ListItem key={word.value+'#'}>
                                    <TextField 
                                    value={word.value}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={classes.resultTextBox}
                                    size='small'
                                    />  
                                </ListItem>)
                            } else {
                            return (
                                <ListItem key={word.key+'#'}>
                                    <TextField 
                                    value={word.key}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={classes.resultTextBox}
                                    size='small'
                                    />  
                                </ListItem>)
                            }})}
                        </List>
                        <List
                        subheader = {
                            <ListSubheader> 
                                TWOJA ODPOWIEDŹ
                            </ListSubheader>
                        }
                        >
                            {finalArray.map((word) => (
                                <ListItem key={word.key+'$'}>
                                <TextField 
                                    value={word.input}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    className={classes.resultTextBox}
                                    size='small'
                                    error={word.point === 0 ? 1 : 0}
                                    />  
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    </Grid>
                )}
            </Grid>


            <Button
                className={classes.buttonStyleBack}
                onClick={backToMenuHandler}
            >
                <ArrowLeftIcon />
                    Wróć do menu
            </Button>
            {!isEnd && (
            <Button
                className={classes.buttonStyleEnd}
                onClick={endTestHandler}
            >
                Zakończ test
                    <ArrowRightIcon />
            </Button>
            )}

        </Grid>
      </div>
    );
  };
  
  export default Test;
  