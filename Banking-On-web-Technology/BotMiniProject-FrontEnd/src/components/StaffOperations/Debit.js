import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomDialog from './CustomDialog';

import Cookies from 'universal-cookie';

const useStyles = makeStyles({
  root: {
    marginTop: "30px",
    textAlign: "center",
    height: '100%',
  },
  message: {
    marginTop: "96px",
    textAlign: "center"
  },
  accNoField: {
    padding: "20px"
  },
  amtField: {
    padding: "20px"
  },
  gmailField: {
    padding: "20px"
  },
  submitButton: {
    padding: "30px"
  },

})

const Debit = () => {

  const classes = useStyles();

  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [gmail, setGmail] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [showUserName, setShowUserName] = useState(false)
  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [errMsg, setErrMsg] = useState('');
  const [isDebitSuccess, setIsDebitSuccess] = useState(false)
  const [openDialogDebit, setOpenDialogDebit] = useState(false)
  const [isStaffLoggedIn, SetIsStaffLoggedIn] = useState(true)

  const [isChangeMandate, setIsChangeMandate] = useState(true)


  const [primaryText, setPrimaryText] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');

  useEffect(() => {
    const cookies = new Cookies();
    const loginUserStaff = cookies.get("loginUserStaff");
    if (loginUserStaff === undefined) {
      setPrimaryText("staff session expired!! please login again");
      setPrimaryButtonText("Ok");
      SetIsStaffLoggedIn(false);
      setIsChangeMandate(!isChangeMandate);

    }
    else {
      SetIsStaffLoggedIn(true);
    }
  }, [isStaffLoggedIn, gmail, account, amount]);

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handleGmailChange = (event) => {
    setGmail(event.target.value);
  }


  const handleSubmit = () => {
    verifyUser();
    setSubmitted(true)
  }

  const verifyUser = async () => {
    const userDetails = await axios.get('/getUser?accNo=' + account + '&gmail=' + gmail);
    if (userDetails.data === "failed") {
      setShowUserName(false)
    }
    else {
      setShowUserName(true)
      setUserName(userDetails.data);
    }
    setOpen(true);
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleCancel = () => {
    setSubmitted(false);
    setOpen(false);
    setShowUserName(false);
  }


  const handleContinue = async () => {
    setOpen(false)
    setShowUserName(false)
    const result = await axios.get('/debit?amount=' + amount + '&gmail=' + gmail);
    setOpenDialogDebit(true)
    if (result.data === "success") {
      setIsDebitSuccess(true)
    }
    else {
      if (result.data === "NoBalance") {
        setErrMsg("In-sufficient balance")
      }
      else {
        setErrMsg("Transaction failed!!")
      }
      setIsDebitSuccess(false)
    }
  };


  return (
    <div className="container">
      {isStaffLoggedIn &&
        <Grid>
          <div className={classes.message}>
            <h1>Debit Amount</h1>
          </div>
          <ValidatorForm
            onSubmit={handleSubmit}
            className={classes.root} autoComplete="off">
            <div className={classes.gmailField}>
              <TextValidator
                label="gmail"
                onChange={handleGmailChange}
                name="gmail"
                value={gmail}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'Email is not valid']}
              />
            </div>
            <div className={classes.accNoField}>
              <TextValidator
                label="Account Number"
                onChange={handleAccountChange}
                name="account"
                value={account}
                validators={['required']}
                inputProps={{ minLength: 12, maxLength: 12 }}
                errorMessages={['this field is required']}
              />
            </div>
            <div className={classes.amtField}>
              <TextValidator
                // id="standard-number"
                label="Amount"
                onChange={handleAmountChange}
                name="amount"
                value={amount}
                type="number"
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </div>

            <div className={classes.submitButton}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Debit
                </Button>
            </div>
          </ValidatorForm>
          <Grid item sm={2} className="done">
            {(
              <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                {showUserName &&
                  <div>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Account holder Name : <b>{userName}</b>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={refreshPage} color="primary">
                        Cancel
        </Button>
                      <Button onClick={handleContinue} color="primary" autoFocus>
                        Continue
        </Button>
                    </DialogActions>
                  </div>}

                {!showUserName &&
                  <div>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Invalid input !! Please check.
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancel} color="primary">
                        Ok
        </Button>
                    </DialogActions>
                  </div>
                }

              </Dialog>)}
          </Grid>


          <Grid item sm={2} className="done">
            <Dialog
              open={openDialogDebit}
              onClose={handleCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {isDebitSuccess &&
                <div>
                  <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Amount <b>Rs.{amount} </b> has been successfully debited from the a/c <b>{account}</b><br />
            Please Collect !!
          </DialogContentText>
                  </DialogContent>
                </div>
              }
              {!isDebitSuccess &&
                <div>
                  <DialogTitle id="alert-dialog-title">{"Failure"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <b>{errMsg}</b>
                    </DialogContentText>
                  </DialogContent> </div>}
              <DialogActions>
                <Button onClick={refreshPage} color="primary" autoFocus>
                  Ok
          </Button>
              </DialogActions>

            </Dialog>
          </Grid>
        </Grid>}

      { !isStaffLoggedIn && !isChangeMandate &&
        <div>
          <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />

        </div>
      }

      { !isStaffLoggedIn && isChangeMandate &&
        <div>
          <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />

        </div>
      }
    </div>
  )
}

export default Debit;
