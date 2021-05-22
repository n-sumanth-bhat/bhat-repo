import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { Typography, Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';

import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrowsSharp';

import axios from 'axios';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Cookies from 'universal-cookie';
import Alert from '@material-ui/lab/Alert';

import StaffOperations from './StaffOperations';



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

  TextFieldPadding: {
    padding: '8px'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  passwordField: {
    margin: 'normal',
    padding: '8px',
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

});




class StaffLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      isStaff: false,
      staffId: '',
      staffPwd: '',
      showPassword: false,
      isError: false,
      isRedirectToStaffOperations: false,
      values: {
        password: '',
        showPassword: false,
      }
    }

    this.handleStaffIdChange = this.handleStaffIdChange.bind(this)

    this.handleStaffPasswordChange = this.handleStaffPasswordChange.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
    this.handleStaffAuthenticate = this.handleStaffAuthenticate.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }



  componentDidMount() {

  }

  handleStaffIdChange = (event) => {
    this.setState({ staffId: event.target.value });
  }

  handleStaffPasswordChange = (event) => {
    this.setState({ staffPwd: event.target.value });
  }


  handleClickShowPassword = () => {
    this.setState({ showStaffPassword: !this.state.showStaffPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state.values, [prop]: event.target.value });
  };

  handleStaffAuthenticate = async () => {
    const response = await axios.get('/staffAuthenticate?staffId=' + this.state.staffId + '&staffPwd=' + this.state.staffPwd);
    console.log(response.data);
    console.log(response.data.status);
    if (response.data.status === "success") {
      const cookies = new Cookies();
      cookies.set("loginUserStaff", response.data.staffId, { path: '/', expires: new Date(Date.now() + 1200000) });
      this.setState({ isRedirectToStaffOperations: true })
    }
    else {
      this.setState({ isError: true });

    }
  }

  render() {
    const { classes } = this.props;




    return (
      <div>
        <div>
          {!this.state.isRedirectToStaffOperations &&
            <Container component="main" maxWidth="xs">
              <CssBaseline />


              <Grid className="staff-login-main">
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
                  {this.state.isError && <div className={classes.alert}>
                    <Alert severity="error">Username and/or passowrd is incorrect. Please check again !!</Alert>
                  </div>}
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
                    <a href="/forgot-password-staff" variant="body2">
                      Forgot password?
            </a>
                  </Grid>

                </Grid>

              </Grid>

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

        </div>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(StaffLogin);

