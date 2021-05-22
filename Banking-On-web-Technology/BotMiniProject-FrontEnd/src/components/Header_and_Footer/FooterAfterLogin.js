import React from 'react';
import { withStyles } from "@material-ui/core";
import { BottomNavigation } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';

import DashBoard from '.././StaffOperations/DashBoard';
import CustomerDashboard from '.././CustomerOperations/CustomerDashboard';

import { BrowserRouter as Router } from 'react-router-dom';


const useFooStyles = theme => ({
  root: {
    '&.MuiBottomNavigationAction-label': {
      marginTop: '28px',
      fontSize: '25px',
      color: "black",
      display: "grid !important",
    }
  },
  label: {
    fontSize: '23px',
  },
  secondlabel: {
    fontSize: '23px',
  },
  stafflabeldebit: {
    fontSize: '23px',
  },
  stafflabelinactive: {
    fontSize: '23px',
    marginLeft: '-29px',
  },
  footerWithoutNavigation: {
    backgroundColor: "#400CCC",
    position: 'fixed',
    width: '100%',
    bottom: '1px',
    height: '72px',
  },

  footerWithNavigation: {
    backgroundColor: "#400CCC",
    position: 'fixed',
    width: '100%',
    bottom: '1px',
    height: '72px',
  },

  MuiBottomNavigationAction: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px",
    marginRight: "118px",
  },
  MuiBottomNavigationActionCredit: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px",
    marginRight: "118px",
  },
  MuiBottomNavigationActionDebit: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px",
    marginRight: "118px",
  },
  MuiBottomNavigationActionInactiveAC: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px",
    marginRight: "118px",
    minWidth: "100px",
    maxWidth: "200px",
  },
  MuiBottomNavigationActionTransaction: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px",
    marginLeft: "155px",
  },
  MuiBottomNavigationActionShowBalance: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px",
    marginRight: "118px",
  },

});



class FooterAfterLogin extends React.Component {
  constructor() {
    super();
    let location = window.location.hash.replace(/[#]+/g, "");
    this.state = {
      value: location,
      locationKeys: [],
      isStaffLoggedIn: false,
      isCustomerLoggedIn: false,

    }
  }
  componentDidMount() {
    const cookies = new Cookies();
    const loginUserStaff = cookies.get("loginUserStaff");
    const loginUserCustomer = cookies.get("loginCustomer");
    if (loginUserStaff === undefined) {
      this.setState({ isStaffLoggedIn: false });
      if (loginUserCustomer !== undefined) {
        this.setState({ isCustomerLoggedIn: true })
      }
    }

    else {
      this.setState({ isStaffLoggedIn: true });
    }


  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Router>
          {this.state.isStaffLoggedIn &&
            <div>
              <BottomNavigation
                value={this.state.value}
                onChange={(event, newValue) => {
                  this.setState({ Value: newValue });
                }}
                showLabels
                className={classes.footerWithNavigation}
              >


                <BottomNavigationAction classes={{ label: classes.label }} className={classes.MuiBottomNavigationActionCredit} activeClassName="active" value="/credit" to="/credit" component={NavLink} label="Credit" />
                <BottomNavigationAction classes={{ label: classes.stafflabeldebit }} className={classes.MuiBottomNavigationActionDebit} activeClassName="active" value="/debit" to="/debit" component={NavLink} label="Debit" />
                <BottomNavigationAction classes={{ label: classes.stafflabelinactive }} className={classes.MuiBottomNavigationActionInactiveAC} activeClassName="active" value="/inactive-accounts" to="/inactive-accounts" component={NavLink} label="Inactive Accounts" />
              </BottomNavigation>

              < DashBoard />
            </div>

          }
          {this.state.isCustomerLoggedIn &&
            <div>
              <BottomNavigation
                value={this.state.value}
                onChange={(event, newValue) => {
                  this.setState({ Value: newValue });
                }}
                showLabels
                className={classes.footerWithNavigation}
              >


                <BottomNavigationAction classes={{ label: classes.label }} className={classes.MuiBottomNavigationActionShowBalance} activeClassName="active" value="/ShowBalance" to="/ShowBalance" component={NavLink} label="ShowBalance" />
                <BottomNavigationAction classes={{ label: classes.secondlabel }} className={classes.MuiBottomNavigationActionTransaction} activeClassName="active" value="/transactionHistory" to="/transactionHistory" component={NavLink} label="Transaction" />
              </BottomNavigation>

              <CustomerDashboard />
            </div>

          }

        </Router>

      </div>
    );
  }
}

export default withStyles(useFooStyles, { withTheme: true })(FooterAfterLogin);