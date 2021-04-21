import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 50,
        width: '100%',
        maxWidth: 1000,
        border: '1px solid black',
        background: '#C7F083',
    },
    item: {
        textAlign: 'center',
    },
    header: {
        height: 50,
        background: '#4caf50',
        textAlign: 'center',
    }
  }));

const Menu = (props) => {

    const classes = useStyles();

    const [isLoaded, setIsLoaded] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        setCategories(props.categories);
        if(categories !== []) {
            setIsLoaded(true);
        }
    }, [props])

    const select = (c) => {
        props.select(c);
    }

    const showCategories = () => {
        return categories.map((c) =>{
            return(
                <ListItem className={classes.item} key={c} button>
                    <ListItemText primary={c} onClick={() => select(c)}/>
                </ListItem>
            )        
        })
    }

    const loading = () => {
        return(
            <div>Ładowanie Trwa</div>
        )
    }

    return(
        <Box>
            <List className={classes.root}>
                <Paper className={classes.header}>Wybierz zestaw słówek</Paper>
                {   
                    isLoaded?
                    showCategories()
                    :
                    loading()
                }
            </List>
        </Box>
    )
}

export default Menu;