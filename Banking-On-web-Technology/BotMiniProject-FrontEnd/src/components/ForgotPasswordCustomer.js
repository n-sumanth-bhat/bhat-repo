import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button } from "@material-ui/core";

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import CustomDialog from './StaffOperations/CustomDialog'

const useStyles = makeStyles({
  root: {

  },
  heading: {
    marginLeft: "560px",
    marginTop: "-44px",
    fontSize: "bold",
  },
  gmailPadding: {
    padding: "8px",
    marginTop: "70px",
    marginLeft: "440px",
    width: "460px",
  },
  avatar: {
    marginTop: "120px",
    backgroundColor: "red",
    marginLeft: "500px",

  },
  accountNo: {
    marginTop: "20px",
    marginLeft: "451px",
    width: "460px",

  },
  submit: {
    marginTop: "50px",
    marginLeft: "600px",
    width: "100px",
    height: "40px",

  }

})

const ForgotPasswordCustomer = () => {
  const classes = useStyles();

  const [gmail, setGmail] = useState('');
  const [account, setAccount] = useState('');

  const [primaryText, setPrimaryText] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');

  const [showDialog, setShowDialog] = useState(false);
  const [isChangeMandate, setIsChangeMandate] = useState(true);


  const handleSubmit = (event) => {
    sendPassword();
  }

  const sendPassword = async () => {
    const status = await axios.get('/forgotPassword?gmail=' + gmail + '&accountNo=' + account);
    if (status.data === "success") {
      setPrimaryText("Password has been sent successfully to your registered email-ID");
      setPrimaryButtonText("Ok");
      setShowDialog(true)
      setIsChangeMandate(!isChangeMandate)
    }
    else if (status.data === "failed") {
      setPrimaryText("Oops! Something went wrong. Plz try after sometime.");
      setPrimaryButtonText("Ok");
      setShowDialog(true)
      setIsChangeMandate(!isChangeMandate)
    }
  }
  const handleGmailChange = (event) => {
    setGmail(event.target.value);
  }
  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  }


  return (
    <div className="forgotPassword-container">

      <div classNmae={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h1 className={classes.heading}>
          Forgot Password
            </h1>
        <ValidatorForm
          onSubmit={handleSubmit}
          autoComplete="off">
          <div className={classes.gmailPadding}>
            <TextValidator
              variant="outlined"
              margin="normal"
              onChange={handleGmailChange}
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
          <div className={classes.accountNo}>
            <TextValidator
              variant="outlined"
              margin="normal"
              onChange={handleAccountChange}
              required
              fullWidth
              id="accountNo"
              label="Account Number"
              name="Account Number"
              inputProps={{ minLength: 12, maxLength: 12 }}


            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>

        </ValidatorForm>
      </div>

      {showDialog && isChangeMandate && <div>
        <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />

      </div>}

      {showDialog && !isChangeMandate && <div>
        <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />

      </div>}

    </div>
  )
}

export default ForgotPasswordCustomer;