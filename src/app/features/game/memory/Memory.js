import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Game from './Game';
import _ from 'underscore';


const Memory = (props) => {

    const wordsArray = _.shuffle(_.flatten(_.sample(_.pairs(props.words), 8),1));

    return (
        <Box>
            <Game words={props.words} array={wordsArray}></Game>
        </Box> 
    );
};

export default Memory;