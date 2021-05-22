import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Credit from './Credit';
import Debit from './Debit';
import InactiveAccounts from './InactiveAccounts';
import { Route } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
        flexGrow: 2,

    },
});

const DashBoard = ({ styles }) => {

    const classes = useStyles();
    return (
        <div className={classes.root}>


            <Route exact path="/credit" component={Credit} />
            <Route exact path="/debit" component={Debit} />
            <Route exact path="/inactive-accounts" component={InactiveAccounts} />

        </div>
    )
}

export default DashBoard;