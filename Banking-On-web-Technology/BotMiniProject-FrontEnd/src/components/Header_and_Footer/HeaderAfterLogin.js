import React, { useState } from 'react'
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import Cookies from 'universal-cookie';

import App from '../../App'

import {  Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Logo from "../../images/LOGO_EDITED1.gif";




const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    height: "80px",

  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "850px",

  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: '65px',
  },
  loginButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '23px',
  },
  menuLayout: {
    color: 'pink',
  },
  logoimage: {
    width: "65px",
    height: "54px",
    padding: 3
  },
}));



export default function HeaderAfterLogin() {
  const { header, loginButton, } = useStyles();
  const [setAnchorEl] = useState(null);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(true);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(true);

  const classes = useStyles();


  const displayDesktop = () => {


    return (
      <Toolbar>
        <img src={Logo} className={classes.logoimage} />
        {BOTLogo}
        <div className={classes.menuButton}>{getMenuButton()}</div>
      </Toolbar>
    );
  };

  const handleLogout = (event) => {
    const cookies = new Cookies();
    if (cookies.get("loginUserStaff") !== undefined) {
      cookies.remove("loginUserStaff");
      setIsStaffLoggedIn(false);
    }
    if (cookies.get("loginCustomer") !== undefined) {
      cookies.remove("loginCustomer");
      setIsCustomerLoggedIn(false);
    }
    setAnchorEl(event.currentTarget);
  };



  const getMenuButton = () => {
    return (
      <div>
        <a href="/"> <Button className={loginButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleLogout}>

          Logout
        </Button></a>
      </div>
    )
  }


  const BOTLogo = (
    <h1>
      Welcome To BOT
    </h1>

  );

  return (
    <Grid>
      <header>
        < AppBar className={header}>{displayDesktop()}</AppBar>
      </header>
      <div>
        {!isStaffLoggedIn && isCustomerLoggedIn &&
          <Router>
            <Redirect exact to='/' />
            <Switch>

              <Route exact path="/" component={App} />
            </Switch>

          </Router>
        }
        {isStaffLoggedIn && !isCustomerLoggedIn &&
          <Router>
            <Redirect exact to='/' />
            <Switch>

              <Route exact path="/" component={App} />
            </Switch>

          </Router>
        }
      </div>
    </Grid>
  );
}