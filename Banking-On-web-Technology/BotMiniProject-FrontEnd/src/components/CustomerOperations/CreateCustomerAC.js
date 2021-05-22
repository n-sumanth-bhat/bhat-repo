import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CustomDialog from '../StaffOperations/CustomDialog'

const useStyles = makeStyles({
  root: {
    marginTop: "150px",
  },
  labelHeading: {
    marginTop: "104px",
    textAlign: "center",
    fontSize: "38px",
  },
  labelName: {
    float: "left",
    marginLeft: "356px",
    fontWeight: "bold",
    fontSize: "30px",
    marginTop: "-9px",
  },
  fieldName: {
    marginTop: "-20px",
    marginLeft: "20px",
    textAlign: "center",
    width: "500px"
  },
  nameFull: {
    textAlign: "center",
    marginLeft: "40px",
    marginTop: "-104px",
  },
  labelGmail: {
    float: "left",
    marginLeft: "375px",
    fontWeight: "bold",
    fontSize: "30px",
    marginTop: "39px",

  },
  fieldGmail: {
    marginTop: "20px",
    marginLeft: "36px",
    textAlign: "center",
    width: "500px"

  },
  gmailFull: {
    textAlign: "center",
    padding: "20px",

  },
  labelAdhaar: {
    float: "left",
    marginLeft: "324px",
    marginTop: "18px",
    fontWeight: "bold",
    fontSize: "30px",

  },
  fieldAdhaar: {
    marginTop: "0px",
    marginLeft: "36px",
    textAlign: "center",
    width: "500px"

  },
  aadharfull: {
    padding: "24px",
    marginLeft: "-32px",
    textAlign: "center",

  },
  labelPassword: {
    float: "left",
    marginLeft: "369px",
    fontWeight: "bold",
    fontSize: "30px",

  },
  fieldPassword: {
    marginTop: "-20px",
    marginLeft: "40px",
    textAlign: "center",
    width: "500px"

  },
  passwordfull: {
    padding: "30px",
    marginLeft: "-50px",
    textAlign: "center",

  },
  labelDOB: {
    float: "left",
    marginLeft: "407px",
    fontWeight: "bold",
    fontSize: "30px",

  },
  fieldDOB: {
    marginTop: "-5px",
    marginLeft: "31px",
    marginBottom: "15px",
    textAlign: "center",
    width: "500px"

  },
  DOBfull: {
    padding: "24px",
    marginLeft: "-16px",
    textAlign: "center",

  },
  labelAccountType: {
    float: "left",
    marginLeft: "342px",
    fontWeight: "bold",
    fontSize: "30px",

  },
  fieldAccountType: {
    marginTop: "-20px",
    marginLeft: "20px",
    textAlign: "center",
    width: "500px"

  },
  AccountTypefull: {
    padding: "20px",
    marginLeft: "-68px",
    textAlign: "center",

  },
  labelLocation: {
    float: "left",
    marginLeft: "372px",
    fontWeight: "bold",
    fontSize: "30px",
    marginTop: "-19px",

  },
  fieldLocation: {
    marginTop: "-32px",
    marginLeft: "31px",
    textAlign: "center",
    width: "500px"

  },
  Locationfull: {
    padding: "30px",
    marginLeft: "-39px",
    textAlign: "center",


  },
  labelGender: {
    float: "left",
    marginLeft: "380px",
    fontWeight: "bold",
    fontSize: "30px",
    marginTop: "10px",

  },
  fieldGender: {
    marginTop: "-5px",
    marginLeft: "29px",
    textAlign: "center",
    width: "500px"

  },
  Genderfull: {
    textAlign: "center",

    padding: "30px",
    marginLeft: "-28px",

  },
  labelPhone: {
    float: "left",
    marginLeft: "343px",
    fontWeight: "bold",
    fontSize: "30px",

  },
  fieldPhone: {
    marginTop: "-20px",
    marginLeft: "40px",
    textAlign: "center",
    width: "500px"

  },
  phoneFull: {
    padding: "30px",
    marginLeft: "-28px",
    textAlign: "center",


  },
  submitButton: {
    textAlign: "center",
    marginBottom: "150px",
    marginTop: "20px"
  }
})

const accountType = [
  {
    value: '',
    label: '',
  },
  {
    value: 'sb',
    label: 'SB',
  },
  {
    value: 'ct',
    label: 'Current',
  },
];

const genderOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const CreateCustomerAC = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [dob, setDOB] = useState('');
  const [actype, setActype] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false)


  const [primaryText, setPrimaryText] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');

  const [showDialog, setShowDialog] = useState(false);
  const [isChangeMandate, setIsChangeMandate] = useState(true);


  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleGmailChange = (event) => {
    setGmail(event.target.value);
  }

  const handleAdhaarChange = (event) => {
    setAdhaar(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const handleAcTypeChange = (event) => {
    setActype(event.target.value);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  const handleSubmit = () => {
    handleCreateAccount();
    setSubmitted(true);
  }

  const handleCreateAccount = async () => {
    const accountCreationStatus = await axios.get('/insertData?name=' + name + '&passwd=' + password + '&aadharNo=' + adhaar + '&gmail=' + gmail + '&phone=' + phone + '&acType=' + actype + '&gender=' + gender + '&location=' + location);
    if (accountCreationStatus.data === "duplicate") {
      setPrimaryText("Gmail already exists!");
      setPrimaryButtonText("Ok");
      setShowDialog(true)
      setIsChangeMandate(!isChangeMandate)
    }
    else if (accountCreationStatus.data === "success") {
      setPrimaryText("Form has been submitted successfully !! wait for the confirmation from the bank. It may take around 2 working days.");
      setPrimaryButtonText("Ok");
      setShowDialog(true)
      setIsChangeMandate(!isChangeMandate)
    }
    else if (accountCreationStatus.data === "failed") {
      setPrimaryText("Oops! Something went wrong. Plz try after sometime.");
      setPrimaryButtonText("Ok");
      setShowDialog(true)
      setIsChangeMandate(!isChangeMandate)
    }

  }


  return (
    <div>
      <h1 className={classes.labelHeading}>Create New Account</h1>
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.root} autoComplete="off">
        <div className={classes.nameFull}>
          <span className={classes.labelName}> Name </span> <TextValidator
            label="Name"
            className={classes.fieldName}
            onChange={handleNameChange}
            name="name"
            value={name}
            validators={['required']}
            inputProps={{ minLength: 2 }}
            errorMessages={['this field is required']}
          />
        </div>
        <div className={classes.gmailFull}>
          <span className={classes.labelGmail}> Gmail</span>  <TextValidator
            className={classes.fieldGmail}
            label="gmail"
            onChange={handleGmailChange}
            name="gmail"
            value={gmail}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'Email is not valid']}
          />
        </div>
        <div className={classes.aadharfull}>
          <span className={classes.labelAdhaar}> Aadhaar No</span>
          <TextValidator
            label="Adhaar No"
            className={classes.fieldAdhaar}
            onChange={handleAdhaarChange}
            name="adhaar"
            value={adhaar}
            validators={['required']}
            inputProps={{ minLength: 12, maxLength: 12 }}
            errorMessages={['this field is required']}
          />
        </div>

        <div className={classes.phoneFull}>
          <span className={classes.labelPhone}> Phone No</span>
          <TextValidator
            label="Phone No"
            className={classes.fieldPhone}
            onChange={handlePhoneChange}
            name="phone"
            value={phone}
            validators={['required']}
            inputProps={{ minLength: 10, maxLength: 10 }}
            errorMessages={['this field is required']}
          />
        </div>

        <div className={classes.passwordfull}>
          <span className={classes.labelPassword}>Password</span> <TextField
            className={classes.fieldPassword}
            onChange={handlePasswordChange}
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <div className={classes.DOBfull}>
          <span className={classes.labelDOB}> DOB</span>  <TextField
            id="date"
            label="DOB"
            className={classes.fieldDOB}

            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className={classes.Locationfull}>
          <span className={classes.labelLocation}> Location </span>
          <TextValidator
            label="Location"
            className={classes.fieldLocation}
            onChange={handleLocationChange}
            name="location"
            value={location}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </div>

        <div className={classes.AccountTypefull}>

          <span className={classes.labelAccountType}> Account Type</span> <TextField
            id="outlined-select-currency-native"
            select
            label="Account type"
            className={classes.fieldAccountType}
            value={actype}
            onChange={handleAcTypeChange}
            validators={['required']}

            SelectProps={{
              native: true,
            }}
          >
            {accountType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>


        <div className={classes.Genderfull}>
          <span className={classes.labelGender}> Gender</span>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Gender"
            className={classes.fieldGender}
            value={gender}
            validators={['required']}
            onChange={handleGenderChange}
            SelectProps={{
              native: true,
            }}
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>

        <div className={classes.submitButton}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          //onClick={handleCreateAccount}
          >
            Submit
          </Button>
        </div>
      </ValidatorForm>

      {showDialog && isChangeMandate && <div>
        <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />

      </div>}

      {showDialog && !isChangeMandate && <div>
        <CustomDialog text={primaryText} buttonText={primaryButtonText} isRedirectToHome={true} />

      </div>}
    </div>

  );

}

export default CreateCustomerAC;