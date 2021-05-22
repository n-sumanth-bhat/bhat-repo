import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import axios from 'axios';
import Cookies from 'universal-cookie';
import DialogBox from './DialogBox';

const Transaction = () => {
  const useStyles = makeStyles({
    root: {
      '& .approve-reject-header': {
        backgroundColor: 'rgba(0, 0, 0, 0)',

      },
    },
    table: {
      width: 700,
      background: 'white',
      color: 'blue',
      minHeight: 0,
    },
    container: {
      minHeight: 0,
    },
    message: {
      marginTop: "80px",
      textAlign: "center",
    },
    "MuiDataGrid-colCellMoving": {
      backgroundColor: "white",
    }
  });

  const getTransactionHistory = async () => {
    const response = await axios.get("/transactionHistory?gmail=" + gmail);
    setRecords(response.data);

  }

  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(true)
  const [isChangeMandate, setIsChangeMandate] = useState(false);
  const [gmail, setGmail] = useState('');
  const [primaryText, setPrimaryText] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');


  useEffect(() => {
    const cookies = new Cookies();
    const loginCustomer = cookies.get("loginCustomer");
    if (loginCustomer === undefined) {
      setPrimaryText("Customer session expired!! please login again");
      setPrimaryButtonText("Ok");
      setIsCustomerLoggedIn(false);
      setIsChangeMandate(!isChangeMandate);
    }
    else {
      setGmail(loginCustomer);
      setIsCustomerLoggedIn(true);
      getTransactionHistory();
    }
  }, [gmail]);

  const columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Transaction ID',
      headerAlign: 'center',
      align: 'center',
      hide: false,
      width: 100
    },
    {
      field: 'accountNo',
      headerName: 'Account No',
      headerAlign: "center",
      align: "center",
      width: 200,

    },

    {
      field: 'gmail',
      headerName: 'Gmail',
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: 'transType',
      headerName: 'credit/debit',
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: 'balance',
      headerName: 'Balance',
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: 'transTime',
      headerName: 'Time',
      headerAlign: "center",
      align: "center",
      width: 250,
    },

  ]

  return (

    <div className="Transaction-=History-container">

      { isCustomerLoggedIn &&
        <div style={{ minHeight: 400, minWidth: "100%" }} className={classes.root}>
          <h1 className={classes.message}> Transaction History</h1>
          <DataGrid rows={records} columns={columns} pageSize={10} />

        </div>}

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


  );
}

export default Transaction;

