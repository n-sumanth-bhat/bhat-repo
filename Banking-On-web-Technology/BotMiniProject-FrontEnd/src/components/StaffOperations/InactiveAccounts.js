import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

import CustomDialog from './CustomDialog';



import {
  DataGrid,
  ColDef,
  CellParams,
  GridApi,
} from "@material-ui/data-grid";


const InactiveAccounts = () => {

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
      marginTop: "96px",
      textAlign: "center",
    },
    "MuiDataGrid-colCellMoving": {
      backgroundColor: "white",
    }


  });

  const getData = async () => {
    const response = await axios.get("/showInactiveRecords");
    console.log(response.data);
    setRecords(response.data);
  }


  const columns: ColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerAlign: 'center',
      align: 'center',
      width: 250
    },
    {
      field: 'id',
      headerName: 'Unique ID',
      headerAlign: 'center',
      align: 'center',
      hide: true,
      width: 100
    },
    {
      field: 'gmail',
      headerName: 'Gmail',
      headerAlign: 'center',
      align: 'center',
      width: 250,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
    {
      field: 'accountType',
      headerName: 'A/C Type',
      headerAlign: 'center',
      align: 'center',
      width: 120,
    },
    {
      field: 'aadharNo',
      headerName: 'Aadhar-No',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      headerAlign: 'center',
      align: 'center',
      width: 100,
    },
    {
      field: 'location',
      headerName: 'Location',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Created-At',
      headerAlign: 'center',
      align: 'center',
      width: 170,
    },
    {
      field: "",
      headerName: "Approve / Reject",
      headerClassName: "approve-reject-header",
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => {
        const onApproveClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });
          const gmail = thisRow.gmail;
          const accountType = thisRow.accountType;
          const customerName = thisRow.name;
          handleApproveAccount(gmail, accountType, customerName);
        };

        const onRejectClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });

          const gmail = thisRow.gmail;
          const name = thisRow.name;
          handleRejectAccount(gmail, name);
        };

        return <div><Button
          color="primary" size="small" variant="contained" onClick={onApproveClick}>Approve</Button>
          <Button color="secondary" size="small" variant="contained" onClick={onRejectClick}>Reject</Button>
        </div>

      }
    },
  ];

  const handleApproveAccount = async (gmail, accountType, customerName) => {
    const cookies = new Cookies();
    const staffId = cookies.get("loginUserStaff");
    if (staffId === undefined) {
      approvedDialogData("Transaction failed due to timedout staff session!! Login again and continue", "Ok");
      setIsHandleAppoveDialog(true);
      setIsChangeMandate(!isChangeMandate);
      SetIsStaffLoggedIn(false);
    }
    else {
      const result = await axios.get('/approve?gmail=' + gmail + '&staffId=' + staffId + '&AccType=' + accountType);
      if (result.data === "failed") {
        approvedDialogData("Couldn't create the account. Please try after sometime!!", "Ok");
        setIsHandleAppoveDialog(true);
        setIsChangeMandate(!isChangeMandate);
      }
      else {
        var accountNumber = result.data;

        const primaryText = "Account has been successfully Created with the Account-No : " + accountNumber;
        const primaryButtonText = "Ok";
        approvedDialogData(primaryText, primaryButtonText);
        setIsHandleAppoveDialog(true);
        setIsChangeMandate(!isChangeMandate);


        getData();
      }
    }

  }

  const handleRejectAccount = async (gmail, customerName) => {
    const cookies = new Cookies();
    const staffId = cookies.get("loginUserStaff");
    if (staffId === undefined) {
      rejectedDialogData("Transaction failed due to timedout staff session!! Login again and continue", "Ok");
      setIsHandleRejectedDialog(true);
      setIsChangeMandate(!isChangeMandate);
      SetIsStaffLoggedIn(false);
    }
    else {
      const result = await axios.get('/closeAccount?gmail=' + gmail + '&name=' + customerName);
      if (result.data === "failed") {
        rejectedDialogData("Couldn't delete the account!!", "Ok");
        setIsHandleRejectedDialog(true);
        setIsChangeMandate(!isChangeMandate);
      }
      else {
        rejectedDialogData(result.data, "Ok");
        setIsHandleRejectedDialog(true);
        setIsChangeMandate(!isChangeMandate);

        getData();

      }
    }
  }

  const rejectedDialogData = (primarytext, primaryButtonText) => {
    setPrimaryText(primarytext);
    setPrimaryButtonText(primaryButtonText);
  }

  const approvedDialogData = (primarytext, primaryButtonText) => {
    setPrimaryText(primarytext);
    setPrimaryButtonText(primaryButtonText);
  }


  const classes = useStyles();
  const [records, setRecords] = React.useState([]);
  const [isStaffLoggedIn, SetIsStaffLoggedIn] = useState(true)
  const [isHandleRejectDialog, setIsHandleRejectedDialog] = useState(false);
  const [isHandleAppoveDialog, setIsHandleAppoveDialog] = useState(false);
  const [isChangeMandate, setIsChangeMandate] = useState(false);

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
      getData();
    }

  }, [isStaffLoggedIn]);







  return (
    <div className="inactive-accounts-container">
      { isStaffLoggedIn &&
        <div style={{ minHeight: 400, minWidth: "100%" }} className={classes.root}>
          <h1 className={classes.message}> Inactive Accounts List</h1>
          <DataGrid rows={records} columns={columns} pageSize={10} />
          {isHandleRejectDialog && isChangeMandate && <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={false} />}
          {isHandleRejectDialog && !isChangeMandate && <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={false} />}

          {isHandleAppoveDialog && isChangeMandate && <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={false} />}
          {isHandleAppoveDialog && !isChangeMandate && <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={false} />}
        </div>}

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
  );

}


export default InactiveAccounts;
