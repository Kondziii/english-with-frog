import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Learn from './Learn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '3vh 0',
  },
}));

const Board = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        className={classes.gridContainer}
      >
        <Grid item xs={12} md={7} className={classes.gridItem}>
          <Paper elevation={3} className={classes.paperStyle}>
            <Learn />
          </Paper>
        </Grid>
        <Grid elevation={3} item xs={12} md={4}>
          <Paper>
            <Typography variant='h2'> Zaba here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Board;
