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
import Cookies from 'universal-cookie';

import CustomDialog from './CustomDialog';


const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    textAlign: "center"
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

const Credit = () => {
  const classes = useStyles();

  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [gmail, setGmail] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [showUserName, setShowUserName] = useState(false)
  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [isCreditSuccess, setIsCreditSuccess] = useState(false)
  const [openDialogCredit, setOpenDialogCredit] = useState(false)
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(true)

  const [isChangeMandate, setIsChangeMandate] = useState(true)

  const [primaryText, setPrimaryText] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');

  useEffect(() => {
    const cookies = new Cookies();

    const loginUserStaff = cookies.get("loginUserStaff");

    if (loginUserStaff === undefined) {
      setPrimaryText("staff session expired!! please login again");
      setPrimaryButtonText("Ok");
      setIsStaffLoggedIn(false);
      setIsChangeMandate(!isChangeMandate);
    }
    else {
      setIsStaffLoggedIn(true);
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

  const handleContinue = async (accountNo) => {
    setOpen(false)
    setShowUserName(false)
    const result = await axios.get('/credit?amount=' + amount + '&gmail=' + gmail);
    setOpenDialogCredit(true)
    if (result.data === "success") {
      setIsCreditSuccess(true)
    }
    else {
      setIsCreditSuccess(false)
    }
  };


  return (
    <div className="container">
      { isStaffLoggedIn &&
        <div>
          <div className={classes.message}>
            <h1>Credit Amount</h1>
          </div>
          <ValidatorForm
            onSubmit={handleSubmit}
            className={classes.root} autoComplete="off">
            <div className={classes.gmailField}>
              <TextValidator
                // id="standard-number"
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
                Credit
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
                { showUserName &&
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
                  </div>}

              </Dialog>
            )}
          </Grid>
          <div>
            <Grid item sm={2} className="done">
              <Dialog
                open={openDialogCredit}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                {isCreditSuccess && (
                  <div>
                    <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Amount has been successfully credited :<br />
                    A/C number : <b>{account}</b><br />
                    A/C holder Name : <b> {userName} </b><br />
                    Amount credited : <b>Rs.{amount} </b>
                      </DialogContentText>
                    </DialogContent>
                  </div>
                )}

                {!isCreditSuccess &&
                  <div>
                    <DialogTitle id="alert-dialog-title">{"Failure"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Error occurred!! Please try after sometime.
                </DialogContentText>
                    </DialogContent> </div>
                }

                <DialogActions>
                  <Button onClick={refreshPage} color="primary" autoFocus>
                    Ok
              </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </div>
        </div>
      }

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

export default Credit;
