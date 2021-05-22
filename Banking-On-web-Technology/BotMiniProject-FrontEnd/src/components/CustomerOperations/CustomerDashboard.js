import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

import ShowBalance from './ShowBalance';
import Transaction from './Transaction';

const useStyles = theme => ({
    root: {
        flexGrow: 1,

    },
});
export class CustomerDashboard extends Component {
    render() {
        const classes = this.props;

        return (
            <div className={classes.root}>
                <Route exact path="/ShowBalance" component={ShowBalance} />
                <Route exact path="/transactionHistory" component={Transaction} />

            </div>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(CustomerDashboard);