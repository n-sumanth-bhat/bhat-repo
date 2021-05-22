import React,{useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';

import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { AppBar,Toolbar,Typography,makeStyles,Button} from "@material-ui/core";
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrowsSharp';

import axios from 'axios';
import {withRouter,  NavLink, Redirect, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Nav from "./Nav";


import { createBrowserHistory } from 'history';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import { useCookies } from 'react-cookie';

import Cookies from 'universal-cookie';
import Alert from '@material-ui/lab/Alert';

import StaffOperations from './StaffOperations';

import Paper from '@material-ui/core/Paper';
import Header from './Header_and_Footer/HeaderBeforeLogin';
import HomePage from '../page/HomePage';

import Credit from './StaffOperations/Credit'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop:'50px',
    //display: 'full',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  
  TextFieldPadding:{
    padding:'8px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    height:'100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  passwordField:{
    margin:'normal',
    padding:'8px',
  },
  alert:{
    width : '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  
});

const headerBar = () =>{
  return(
      <Toolbar > 
          {BOTLogo}
      </Toolbar>
  );

}

const BOTLogo = (
  <Typography variant="h6" components="h1">
      Welcome From BOT-Team
  </Typography>

);


class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      gmail : '',
      customerPwd : '',
      isCustomer : false,
      isStaff : false,
      staffId : '',
      staffPwd : '',
      showPassword : false,
      isError : false,
      isRedirectToStaffOperations : false,
      isRedirectToCustomerOperations: false,
      values : {
        password: '',
        showPassword: false,
      }
    }

    this.handleGmailChange = this.handleGmailChange.bind(this);
    this.handleCustomerPasswordChange = this.handleCustomerPasswordChange.bind(this)
    this.handleStaffIdChange = this.handleStaffIdChange.bind(this)

    this.handleStaffPasswordChange = this.handleStaffPasswordChange.bind(this)
    this.handleCustomerAuthenticate = this.handleCustomerAuthenticate.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
    this.handleStaffAuthenticate = this.handleStaffAuthenticate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // handleCustomerPasswordChange
    // handleStaffIdChange
    // handleStaffPasswordChange
    // handleCustomerAuthenticate
    // handleClickShowPassword
    // handleMouseDownPassword
    // handleStaffAuthenticate

    
  }



  componentDidMount() {
    if(window.location.pathname === "/customer-login" || window.location.pathname ===  "/customer-login/"){
      this.setState({isCustomer : true });
      this.setState({isStaff : false });

    }
    else if(window.location.pathname === "/staff-login" || window.location.pathname === "/staff-login/"){
      this.setState({isCustomer : false });
      this.setState({isStaff : true });

    }
  }


handleGmailChange = (event) => {
    this.setState({gmail : event.target.value});
    //this.change = this.change.bind(this);
}
    
handleCustomerPasswordChange = (event) => {
    this.setState({customerPwd : event.target.value});
    //this.change = this.change.bind(this);
}

handleStaffIdChange = (event) => {
  this.setState({staffId : event.target.value});
  //this.change = this.change.bind(this);
}

handleStaffPasswordChange = (event) => {
  this.setState({staffPwd : event.target.value});
  //this.change = this.change.bind(this);
}

handleCustomerAuthenticate = async () => {
  console.log("inside handleCustomerAuthenticate");
  const response = await axios.get('/customerAuthenticate?Email='+this.state.gmail+'&customerPwd='+this.state.customerPwd);
  console.log(response.data);
  console.log(response.data.status);
  if( response.data.status === "success"){
    const cookies = new Cookies();
    cookies.set("loginCustomer", response.data.gmail, { path: '/', expires: new Date(Date.now()+1200000)});
    this.setState({isRedirectToCustomerOperations : true})
  }
  else{
    this.setState({isError:true});
    
  }
}

handleClickShowPassword = () => {
  // this.setState({ ...values, showPassword: !values.showPassword });
  this.setState({showPassword : !this.state.showStaffPassword});
};

handleMouseDownPassword = (event) => {
  event.preventDefault();
};

handleChange = (prop) => (event) => {
  this.setState({ ...this.state.values, [prop]: event.target.value });
  };

handleStaffAuthenticate = async () => {
  alert("Inside handleStaffAuthenticate");
  const response = await axios.get('/staffAuthenticate?staffId='+this.state.staffId+'&staffPwd='+this.state.staffPwd);
  console.log(response.data);
  console.log(response.data.status);
  if( response.data.status === "success"){
    const cookies = new Cookies();
    cookies.set("loginUserStaff", response.data.staffId, { path: '/', expires: new Date(Date.now()+1200000)});
    this.setState({isRedirectToStaffOperations : true})
  }
  else{
    this.setState({isError:true});
    
  }
}

  render(){
    const {classes } = this.props;

//     const handleGmailChange = (event) => {
//         this.setState({gmail : event.target.value});
//         //this.change = this.change.bind(this);
//     }
    
// const handleCustomerPasswordChange = (event) => {
//     this.setState({customerPwd : event.target.value});
//     //this.change = this.change.bind(this);
// }

// const handleStaffIdChange = (event) => {
//   this.setState({staffId : event.target.value});
//   //this.change = this.change.bind(this);
// }

// const handleStaffPasswordChange = (event) => {
//   this.setState({staffPwd : event.target.value});
//   //this.change = this.change.bind(this);
// }

// const handleCustomerAuthenticate = async () => {
//   console.log("inside handleCustomerAuthenticate");
// }

// const handleClickShowPassword = () => {
//   // this.setState({ ...values, showPassword: !values.showPassword });
//   this.setState({showPassword : !this.state.showStaffPassword});
// };

// const handleMouseDownPassword = (event) => {
//   event.preventDefault();
// };

// // const handleChange = (prop) => (event) => {
// //   setValues({ ...values, [prop]: event.target.value });
// //   this
// // };

// const handleStaffAuthenticate = async () => {
//   alert("Inside handleStaffAuthenticate");
//   const response = await axios.get('/staffAuthenticate?staffId='+this.state.staffId+'&staffPwd='+this.state.staffPwd);
//   console.log(response.data);
//   console.log(response.data.status);
//   if( response.data.status === "success"){
//     const cookies = new Cookies();
//     cookies.set("loginUserStaff", response.data.staffId, { path: '/', expires: new Date(Date.now()+1200000)});
//     this.setState({isRedirectToStaffOperations : true})
//   }
//   else{
//     this.setState({isError:true});
    
//   }
// }



  return (
    <div>
      {/* <HomePage /> */}
    <div>
      { !this.state.isRedirectToStaffOperations &&
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {this.state.isCustomer && 
        <Grid className="customer-login-main">
         { alert("customer")}
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Customer Sign-in
            </Typography>
        </div>
        <ValidatorForm className={classes.form} onSubmit={this.handleCustomerAuthenticate} autoComplete="off">
          <div className={classes.TextFieldPadding}>
            <TextValidator
              variant="outlined"
              margin="normal"
              onChange={this.handleGmailChange}
              required
              fullWidth
              id="gmail"
              label="Gmail Address"
              name="gmail"
              type="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                      </InputAdornment>
                  ),
              }}
                   // autoComplete="@gmail.com"
                    // validators={['required','isEmail']}
                   // errorMessages={['this field is required']}
              autoFocus
            />
          </div>
          <div className={classes.TextFieldPadding}>
            <TextValidator
              icon={<CompareArrowsSharpIcon />}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              type={this.state.values.showPassword ? 'text' : 'password'}
              value={this.state.values.password}
              onChange={this.handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                    {this.state.values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />         
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            //onClick={this.handleCustomerAuthenticate}
          >
            Sign In
          </Button>
        </ValidatorForm>
        <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
}

{this.state.isStaff && 
        <Grid className="staff-login-main">
       {/* { alert("staff") } */}
          <div className={classes.paper}>
              <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              Staff Sign-in
              </Typography>
          </div>
          <ValidatorForm className={classes.form} onSubmit={this.handleStaffAuthenticate} autoComplete="off">
            <div className={classes.TextFieldPadding}>
              <TextValidator
                      variant="outlined"
                      margin="normal"
                      onChange={this.handleStaffIdChange}
                      required
                      fullWidth
                      id="staffId"
                      label="Staff ID"
                      name="staff-id"
                    // autoComplete="@gmail.com"
                      // validators={['required','isEmail']}
                    // errorMessages={['this field is required']}
                      autoFocus
              />
            </div>
            <div className={classes.TextFieldPadding}>
              <TextValidator
                  icon={<CompareArrowsSharpIcon />}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  type={this.state.showStaffPassword ? 'text' : 'password'}
                  value={this.state.staffPwd}
                  onChange={this.handleStaffPasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {this.state.showStaffPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                }}
              />
            </div>
            {this.state.isError && <div className = {classes.alert}>
              <Alert severity="error">Username and/or passowrd is incorrect. Please check again !!</Alert>
              </div> }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // onClick={handleStaffAuthenticate}
            >
              Sign In
            </Button>
          </ValidatorForm>

        {/* {isRedirectToStaffOperations && <div><Router><Switch><Redirect exact from="/staff-login" to='/staffOperations' /> <Route component={StaffOperations} path="/staffOperations"/> </Switch></Router></div>} */}
        <Grid container>
            <Grid item xs>
            <Link href="#" variant="body2">
                Forgot password?
            </Link>
            </Grid>
            <Grid item>
            <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
          </Grid>

        </Grid>
}
        <Box mt={8}><Copyright /></Box>
      </Container>
      }
      {this.state.isRedirectToStaffOperations && <div>
        <Router>
          <Redirect to='/staffOperations' />
          <Switch>
            <Route exact path="/staffOperations" component={StaffOperations} />
          </Switch>
          </Router>
        </div>
      }
      {/* {this.state.isRedirectToCustomerOperations && <div>
        <Router>
          <Redirect to='/customerOperations' />
          <Switch>
            <Route exact path="/customerOperations" component={customerOperations} />
          </Switch>
          </Router>
        </div> */}
        {/* //} */}
      
    </div>
    </div>
  );
}
}

export default withStyles(useStyles, { withTheme: true })(Login); 

//Class Component Login