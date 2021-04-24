import { Grid } from '@material-ui/core';
import GameTypeCard from './GameTypeCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const LEARN_TYPES = [
  {
    title: 'Fiszki',
    description: 'poznaj i naucz się słówek z działu.',
    btnLabel: 'rozpocznij nauke',
  },
  {
    title: 'Dopasowywanie',
    description: 'właściwie dopasuj słówka.',
    btnLabel: 'rozpocznij nauke',
  },
  {
    title: 'Gra w pamięć',
    description: 'znajdź pary słów.',
    btnLabel: 'rozpocznij gre',
  },
  {
    title: 'Test',
    description: 'sprawdź swoją wiedzę w krótkim teście.',
    btnLabel: 'rozpocznij test',
  },
];

const GameTypeList = () => {
  const classes = useStyles();

  return (
    <Grid container direction='row' className={classes.root}>
      {LEARN_TYPES.map((learnType) => (
        <Grid item xs={12} md={4} sm={6} lg={3}>
          <GameTypeCard
            title={learnType.title}
            description={learnType.description}
            btnLabel={learnType.btnLabel}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GameTypeList;
