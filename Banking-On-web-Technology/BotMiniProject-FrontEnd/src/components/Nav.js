import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";

const Nav = props => {
  const currentRoute = useHistory().location.pathname.toLowerCase();
  console.log("currentRoute", currentRoute);
  console.log(currentRoute.includes("home") ? "tab active" : "");
  return (
    <div className="tab-bar">
      <Link
        className={
          "tab " + currentRoute.includes("home") ? "tab active" : "tab"
        }
        to="/"
      >
        Home
      </Link>
      <Link
        className={
          "tab " + currentRoute.includes("about") ? "tab active" : "tab"
        }
        to="/about"
      >
        About
      </Link>
      <Link
        className={
          "tab " + currentRoute.includes("contact") ? "tab active" : "tab"
        }
        to="/contact"
      >
        Contact
      </Link>
    </div>
  );
};

export default Nav;
