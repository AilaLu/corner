import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className="components-border">
      <div className="flex-space-between">
        <div className="logo">
          <NavLink exact to="/">
            Home
            {/* <img
              src="https://companieslogo.com/img/orig/ABNB-4aaade0f.png?t=1633511992"
              alt=""
            /> */}
          </NavLink>
        </div>
        <NavLink to="/spots/new">Create a new spot</NavLink>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
