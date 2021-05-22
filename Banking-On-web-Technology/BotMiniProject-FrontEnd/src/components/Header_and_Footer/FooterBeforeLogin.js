import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import { BottomNavigation } from '@material-ui/core';
import Cookies from 'universal-cookie';

const useFooStyles = makeStyles(() => ({
  footerWithoutNavigation: {
    backgroundColor: "#400CCC",
    position: 'fixed',
    width: '100%',
    bottom: '1px',
    height: '72px',
  },

  footerWithNavigation: {
    backgroundColor: "#400CCC",
    position: 'fixed',
    width: '100%',
    bottom: '1px',
    height: '50px',

  },

  MuiBottomNavigationAction: {
    color: '#fff',
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "25px",
    fontSize: "25px"
  },

}));



const FooterBeforeLogin = () => {
  let location = window.location.hash.replace(/[#]+/g, "");
  const [locationKeys, setLocationKeys] = useState([]);
  const [isStaffLoggedIn, SetIsStaffLoggedIn] = useState(false)
  const classes = useFooStyles();
  // const [value, setValue] = React.useState(0);


  useEffect(() => {
    const cookies = new Cookies();

    const loginUserStaff = cookies.get("loginUserStaff");

    if (loginUserStaff === undefined) {

      SetIsStaffLoggedIn(false);
    }
    else {

      SetIsStaffLoggedIn(true);
    }


  }, [locationKeys,])


  return (
    <div>
      <BottomNavigation className={classes.footerWithoutNavigation}></BottomNavigation>
    </div>
  );
}

export default FooterBeforeLogin;
