import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashBoard from './DashBoard';

import HomePage from '../../page/HomePage';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});



const StaffOperations = (props) => {
    const classes = useStyles();
    return (
        <Grid>
            <HomePage />
            <Grid container className={classes.root}>
                <Grid item sm={12}>
                    <DashBoard />
                    <Router>
                        <Redirect to="/credit" />
                    </Router>

                </Grid>
            </Grid>
        </Grid>
    )
};

export default StaffOperations;
