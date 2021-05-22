import React from 'react'
import { AppBar, Toolbar, Button, withStyles } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import logo from "../../images/LOGO_EDITED1.gif";

import { withRouter, Route } from 'react-router-dom';


import StaffLogin from '../StaffLogin';
import CustomerLogin from '../CustomerLogin';

import createCustomerAC from '../CustomerOperations/CreateCustomerAC';

import HomepageCarousel from "../HomepageCarousel";
import ForgotPasswordCustomer from '../ForgotPasswordCustomer'
import ForgotPasswordStaff from '../ForgotPasswordStaff';

const useStyles = theme => ({
  header: {
    backgroundColor: "#400CCC",
    height: "80px",
    fontWeight: 'bold',

  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "700px",

  },
  signUp: {
    fontFamily: "Open Sans, sans-serif",
    size: "18px",
    marginLeft: "50px",
    color: 'white',
    fontWeight: 'bold',
    fontSize: '23px',
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: '75px',
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
});

class HeaderBeforeLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      isStaffLoginClicked: false,
      isCustomerLoginClicked: false,
      isSignUpClicked: false,
    }

    this.displayDesktop = this.displayDesktop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCustomerLogin = this.handleCustomerLogin.bind(this);
    this.handleStaffLogin = this.handleStaffLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.getMenuButton = this.getMenuButton.bind(this);
  }


  componentDidMount() {
    this.setState({ isStaffLoginClicked: false })
    this.setState({ isCustomerLoginClicked: false })

  };

  displayDesktop = () => {
    const { classes } = this.props;

    return (
      <Toolbar>
        <img src={logo} className={classes.logoimage} />
        {this.BOTLogo}
        <div className={classes.menuButton}>{this.getMenuButton()}</div>
      </Toolbar>
    );
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCustomerLogin = () => {
    this.setState({ anchorEl: null });
    this.setState({ isStaffLoginClicked: false });
    this.setState({ isCustomerLoginClicked: true });

  }

  handleStaffLogin = () => {
    this.setState({ anchorEl: null });
    this.setState({ isCustomerLoginClicked: false });
    this.setState({ isStaffLoginClicked: true });

  }
  handleSignup = () => {
    this.setState({ isSignUpClicked: true })

  }



  getMenuButton = () => {
    const { classes } = this.props;

    return (
      <div>
        <Button className={classes.loginButton} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          Login
      </Button>
        <a href="/sign-up"><Button className={classes.signUp}>SignUp</Button></a>

        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >

          <a href="/customer-login"><MenuItem onClick={this.handleCustomerLogin}>Customer login</MenuItem>
          </a>

          <a href="/staff-login"><MenuItem onClick={this.handleStaffLogin}>Staff login</MenuItem>
          </a>
        </Menu>
      </div>
    )
  }


  BOTLogo = (
    <h1>
      WELCOME TO BOT
    </h1>

  );

  render() {

    const { classes } = this.props;

    return (
      <Grid>
        <header>
          <AppBar className={classes.header}>{this.displayDesktop()}</AppBar>
        </header>


        <Route exact path="/staff-login" component={StaffLogin} />
        <Route exact path="/customer-login" component={CustomerLogin} />
        <Route exatct path="/sign-up" component={createCustomerAC} />
        <Route exact path="/forgot-password" component={ForgotPasswordCustomer} />
        <Route exact path="/forgot-password-staff" component={ForgotPasswordStaff} />

        {this.state.isCustomerLoginClicked && <HomepageCarousel />}
        {this.state.isStaffLoginClicked && <HomepageCarousel />}
        {this.state.isSignUpClicked && <HomepageCarousel />}

      </Grid>
    );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(HeaderBeforeLogin));