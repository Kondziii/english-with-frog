import { makeStyles } from '@material-ui/core/styles';
// <<<<<<< memory
// import Button from '@material-ui/core/Button';
// import Memory from './memory/Memory';
// import { 
//     Paper, 
//     Grid, 
//     GridList,
//     FormControl, 
//     RadioGroup, 
//     FormControlLabel,
//     Radio,
//     Typography
//  } from '@material-ui/core';
// =======
import {
  Grid,
  GridList,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
// >>>>>>> flashcards
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { useDispatch, useSelector } from 'react-redux';
import { selectChapter } from './gameSlice';
import { selectGame } from './gameSlice';
import GameTypeList from './GameTypeList';
import GameBoardTitle from './GameBoardTitle';

const useStyles = makeStyles(() => ({
  root: {
    // minHeight: '85vh',
  },

  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '3vh',
    margin: 0,
  },

  title: {
    textAlign: 'center',
    margin: '2vh',
    marginBottom: '0hv',
    background: 'green',
    color: 'white',
    borderRadius: '25px',
  },

  title_text: {
    margin: '1vh',
    textTransform: 'uppercase',
  },

  memoraITP: {
    textAlign: 'center',
    paddingTop: '30vh',
  },
}));

const Learn = (props) => {
// <<<<<<< memory
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const game = useSelector(selectGame);
//     const [value, setValue] = React.useState('0');
//     const [choice, setChoice] = React.useState('0');

//     const handleChange = (e) => {
//         setValue(e.target.value)
//         console.log(e.target.value);
//     };
// =======
  const classes = useStyles();
  const dispatch = useDispatch();
  const game = useSelector(selectGame);

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 2;
    }
    if (isWidthUp('sm', props.width)) {
      return 2;
    }
    return 1;
  };

  const getCellHeight = () => {
    if (isWidthUp('xl', props.width)) {
      return 300;
    }
    if (isWidthUp('lg', props.width)) {
      return 250;
    }
    if (isWidthUp('md', props.width)) {
      return 200;
    }
    if (isWidthUp('sm', props.width)) {
      return 200;
    }
    return 150;
  };
// >>>>>>> flashcards

  const chapterChangeHandler = (e) => {
    dispatch(selectChapter(e.target.value));
  };

// <<<<<<< memory
//     const getCellHeight = () => {
//         if (isWidthUp('xl', props.width)) { return 300; }
//         if (isWidthUp('lg', props.width)) { return 250; }
//         if (isWidthUp('md', props.width)) { return 200; }
//         if (isWidthUp('sm', props.width)) { return 200; }
//         return 150;
//     };

//     const selectActivity = (a) => {
//         setChoice(a);
//     }
        

//     return (
//         <div>
//             { 
//             choice == '0' ?
//             <FormControl >  
//                 <RadioGroup>
//                     <Paper className={classes.title}>
//                         <Typography className={classes.title_text} variant="h3">DZIAŁY</Typography>
//                     </Paper>
//                     <GridList 
//                     cellHeight={getCellHeight()} 
//                     cols={1} 
//                     className={classes.gridList}>
//                         <GridList cellHeight={30} cols={getGridListCols()}>
//                             {Object.keys(game.vocabulary).map(key => (
//                                 <Grid key={key}>
//                                     <FormControlLabel value={key} control={<Radio color="primary"/>} label={game.vocabulary[key]['key']} onChange={handleChange}/>
//                                 </Grid>
//                             ))}
//                         </GridList>                  
//                     </GridList>
//                 </RadioGroup>
//                 <div className={classes.memoraITP}>
//                     <Button onClick={() => selectActivity('1')}>Memory</Button>
//                     <Button>Fiszki</Button>
//                     <Button>Test</Button>
//                     {/* Miejsce na testy, fiszki, memory i inne */}
//                 </div>  
//             </FormControl>
//             :
//             <Memory words={game.vocabulary[value]['value']}></Memory>
            
//         }
//         </div>         
//     );
// =======
  return (
    <FormControl className={classes.root}>
      <RadioGroup>
        <GameBoardTitle title='działy' />

        <GridList
          cellHeight={getCellHeight()}
          cols={1}
          className={classes.gridList}
        >
          <GridList cellHeight={30} cols={getGridListCols()}>
            {Object.keys(game.vocabulary).map((key) => (
              <Grid key={key}>
                <FormControlLabel
                  value={key}
                  onChange={chapterChangeHandler}
                  control={<Radio color='primary' />}
                  label={game.vocabulary[key].key}
                />
              </Grid>
            ))}
          </GridList>
        </GridList>
        <GameBoardTitle title='tryby nauki' />
        <GameTypeList />
      </RadioGroup>
    </FormControl>
  );
// >>>>>>> flashcards
};

export default withWidth()(Learn);
