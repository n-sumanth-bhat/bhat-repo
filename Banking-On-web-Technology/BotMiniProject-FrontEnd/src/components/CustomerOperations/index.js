import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CustDashboard from './CustomerDashboard';
import HomePage from '../../page/HomePage';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
});

export class index extends Component {
    render() {
        const classes = this.props;
        return (
            <div>
                <Grid>
                    <HomePage />
                    <Grid container className={classes.root}>
                        <Grid item sm={12}>
                            <CustDashboard />
                            <Router>
                                <Redirect to="/ShowBalance" />
                            </Router>


                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(index); 
