import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { Typography,Button} from "@material-ui/core";
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';

import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrowsSharp';

import axios from 'axios';
import { Redirect, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import CustomerOperations from './CustomerOperations';

import Cookies from 'universal-cookie';
import Alert from '@material-ui/lab/Alert';


const useStyles = theme => ({
  paper: {
    marginTop: '80px',
    display: 'flex',
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
    width: '100%',
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





class CustomerLogin extends React.Component {
  constructor(){
    super();
    this.state = {
      gmail : '',
      customerPwd : '',
      isCustomer : false,
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

    this.handleCustomerAuthenticate = this.handleCustomerAuthenticate.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
  }



  componentDidMount() {
  }


handleGmailChange = (event) => {
    this.setState({gmail : event.target.value});
}
    
handleCustomerPasswordChange = (event) => {
    this.setState({customerPwd : event.target.value});
}


handleCustomerAuthenticate = async () => {
  const response = await axios.get('/customerAuthenticate?gmail='+this.state.gmail+'&customerPwd='+this.state.customerPwd);
  console.log(response.data);
  console.log(response.data.status);
  if( response.data.status === "success"){
    const cookies = new Cookies();

    cookies.set("loginCustomer",this.state.gmail, { path: '/', expires: new Date(Date.now()+120000)});
        
    this.setState({isRedirectToCustomerOperations : true})
  }
  else{
    this.setState({isError:true});
    
  }
}

handleClickShowPassword = () => {
  this.setState({showPassword : !this.state.showPassword});
};

handleMouseDownPassword = (event) => {
  event.preventDefault();
};

handleChange = () => (event) => {
  this.setState({customerPwd : event.target.value})
  };



  render(){
    const {classes } = this.props;

  return (
    <div>
      {!this.state.isRedirectToCustomerOperations && 
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Grid className="customer-login-main">
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
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.customerPwd}
              onChange={this.handleChange()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
          >
            Sign In
          </Button>
        </ValidatorForm>
        <Grid container>
            <Grid item xs>
              <a href="/forgot-password" variant="body2">
                Forgot password?
              </a>
            </Grid>
            <Grid item>
              <a href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </a>
            </Grid>
          </Grid>
        </Grid>
            </Container> }
    {this.state.isRedirectToCustomerOperations && <div>
              <Router>
          <Redirect to='/customerOperations' />
          <Switch>
            <Route exact path="/customerOperations" component={CustomerOperations} />

          </Switch>
          </Router>
        </div>
        }
    </div>
  );
}
}

export default withStyles(useStyles, { withTheme: true })(CustomerLogin); 

//Class Component Login