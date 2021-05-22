import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import { makeStyles } from '@material-ui/core';
import axios from 'axios';


import DialogBox from './DialogBox';


const useStyles = makeStyles({
  custMsg: {
    align: "center",
    marginTop: "50px",
  },
  balanceMsg: {
    backgroundColor: "#400CCC",
    width: "500px",
    marginLeft: "100px",
    height: "175px",
    borderRadius: "20px",
    color: "white",
    marginTop: "50px",
  },
  balanceText: {
    fontSize: "28px",
    marginLeft: "20px",
    paddingTop: "20px",
  },
  greetingMsg: {
    marginTop: "100px",
    marginLeft: "50px",
    fontSize: "22px",
  },
  balanceNumber: {
    fontSize: "30px"
  },
});

const ShowBalance = () => {
  const classes = useStyles();

  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [primaryText, setPrimarytext] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');
  const [gmail, setgmail] = useState('');
  const [balance, setBalance] = useState('');
  const [isChangeMandate, setIsChangeMandate] = useState(true)


  useEffect(() => {
    const cookies = new Cookies();

    const loginCustomer = cookies.get("loginCustomer");

    if (loginCustomer === undefined) {
      setPrimarytext("Customer session expired!! please login again");
      setPrimaryButtonText("Ok");
      setIsCustomerLoggedIn(false);
      setIsChangeMandate(!isChangeMandate);

    }
    else {
      setgmail(loginCustomer);
      setIsCustomerLoggedIn(true);
      getBalance();

    }
  }, [isCustomerLoggedIn]);

  const getBalance = async () => {
    const response = await axios.get("/getBalance?gmail=" + gmail);
    if (response.data === "failed") {
      setBalance("");
    }
    else {
      setBalance(response.data);
    }

  }



  const BalanceMsg = () => {
    return (
      <div>
        <div className={classes.balanceText}>
          Your Account Balance is
                    <br />
          <div className={classes.balanceNumber}>Rs.{balance}</div>

        </div>
      </div>
    )
  }

  const customMsg = (

    <p className={classes.greetingMsg}>
      Hello <b>{gmail}</b> ,
    </p>
  )

  return (
    <div>

      <div className={classes.custMsg}>{customMsg}</div>
      <div className={classes.balanceMsg}>{BalanceMsg()}</div>


      { !isCustomerLoggedIn && !isChangeMandate &&
        <div>
          <DialogBox text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />
        </div>
      }

      { !isCustomerLoggedIn && isChangeMandate &&
        <div>
          <DialogBox text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />
        </div>
      }
    </div>
  )

}



export default ShowBalance;
