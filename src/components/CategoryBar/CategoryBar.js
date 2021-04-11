import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    catbar: {
        display: 'none',
        justifyContent: 'space-evenly',
        backgroundColor: 'grey',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    }
}))

function CategoryBar({ categories, setCategory }){
    const classes = useStyles();
    return (
        <div className={classes.catbar}>
            <div style={{flexBasis: '30%'}}/>
            {categories.map(category => <Button 
                                            key={category.id}
                                            disableElevation 
                                            size="large" 
                                            style={{color: 'white'}} 
                                            variant="text"
                                            onClick={() => setCategory(category.slug)}
                                            component={Link} to="/"
                                        >
                                            {category.name}
                                        </Button>)}
            <div style={{flexBasis: '30%'}}/>
        </div>
    )
}

export default CategoryBar;