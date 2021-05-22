import './App.css';
import axios from 'axios';
import HeaderBeforeLogin from './components/Header_and_Footer/HeaderBeforeLogin';
// import Footer from './components/FooterAfterLogin';
import StaffOperations from './components/StaffOperations';
import { Component, Fragment, useState, useEffect } from 'react';
import Login from './components/Login';

import Carousels from './components/Carousels';
import Slider from './components/Slider';

import HomepageCarousel from './components/HomepageCarousel';


import Cookies from 'universal-cookie';
import HomePage from './page/HomePage';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [isStaffLoggedIn, SetIsStaffLoggedIn] = useState(false)

  useEffect(() => {
    const cookies = new Cookies();

    const loginUserStaff = cookies.get("loginUserStaff");

    if(loginUserStaff === undefined){
      SetIsStaffLoggedIn(false);
    }
    else {
      SetIsStaffLoggedIn(true);
    }
  });

  // const getResponse = async () => {
  // const response = await axios.get('/getuser');
  //   console.log("response");
  //   console.log(response.data);
  // }

  //  getResponse();

  const refreshPage = () => {
    window.location.reload(true);
}
  return ( 
    <Router>
      {/* {    alert("app.js") } */}
      {/* {refreshPage} */}
      {/* <HeaderBeforeLogin/>  */}
       {/* <Login />  */}
       {/* { <StaffOperations/> } */}
      {/* <Footer/> */} 
      <HomePage /> 
      {/* <Slider/>  */}
      <HomepageCarousel />  

    </Router>  
  );
};

export default App;
