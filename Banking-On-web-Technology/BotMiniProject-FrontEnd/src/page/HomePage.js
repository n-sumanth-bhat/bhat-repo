import React from 'react';

import Cookies from 'universal-cookie';

import HeaderBeforeLogin from '../components/Header_and_Footer/HeaderBeforeLogin';
import FooterBeforeLogin from '../components/Header_and_Footer/FooterBeforeLogin';

import HeaderAfterLogin from '../components/Header_and_Footer/HeaderAfterLogin';
import FooterAfterLogin from '../components/Header_and_Footer/FooterAfterLogin';


class HomePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isStaffLoggedIn: false,
      isCustomerLoggedIn: false,
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const loginUserStaff = cookies.get("loginUserStaff");
    const loginUserCustomer = cookies.get("loginCustomer");
    console.log("taken  customer cookie");

    if (loginUserStaff === undefined) {
      console.log("login staff undefined anta ideyalla adra olage");
      this.setState({ isStaffLoggedIn: false });
    }
    else {
      console.log("Staff login made true");
      this.setState({ isStaffLoggedIn: true });
    }
    if (loginUserCustomer !== undefined) {
      console.log("is CustomerLoggedIn made true");
      this.setState({ isCustomerLoggedIn: true });
    }
    else {
      console.log("is CustomerLoggedIn made false");
      this.setState({ isCustomerLoggedIn: false });
    }
  }



  render() {
    return (


      <div>

        {!this.state.isStaffLoggedIn && !this.state.isCustomerLoggedIn && <FooterBeforeLogin />}
        {this.state.isStaffLoggedIn && !this.state.isCustomerLoggedIn && <FooterAfterLogin />}

        {!this.state.isStaffLoggedIn && this.state.isCustomerLoggedIn && <HeaderAfterLogin />}
        {!this.state.isStaffLoggedIn && this.state.isCustomerLoggedIn && <FooterAfterLogin />}



        {!this.state.isStaffLoggedIn && !this.state.isCustomerLoggedIn && <HeaderBeforeLogin />}
        {this.state.isStaffLoggedIn && !this.state.isCustomerLoggedIn && <HeaderAfterLogin />}


      </div>
    )
  }
}

export default HomePage;